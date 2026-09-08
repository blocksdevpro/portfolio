type FeedbackCue = "copy-success" | "copy-failure" | "theme" | "command-open" | "command-confirm";

const sampleNames = ["copy", "theme", "command-open", "command-confirm"] as const;
type SampleName = typeof sampleNames[number];
type Sample = { buffer: AudioBuffer; offset: number; duration: number; peak: number };

const cues: Record<FeedbackCue, { sample: SampleName; rate: number; level: number; cutoff: number }> = {
  "copy-success": { sample: "copy", rate: 1.08, level: 0.09, cutoff: 4200 },
  "copy-failure": { sample: "copy", rate: 0.72, level: 0.045, cutoff: 2200 },
  theme: { sample: "theme", rate: 1, level: 0.075, cutoff: 3000 },
  "command-open": { sample: "command-open", rate: 0.95, level: 0.035, cutoff: 3000 },
  "command-confirm": { sample: "command-confirm", rate: 1.05, level: 0.075, cutoff: 3800 },
};

let files: Promise<ArrayBuffer[]> | null = null;

/** Cache local CC0 samples ahead of interaction without opening an audio context. */
export function preloadFeedbackAudio() {
  files ??= Promise.all(sampleNames.map(async (name) => {
    const response = await fetch(`/audio/feedback/${name}.ogg`);
    if (!response.ok) throw new Error("Could not load feedback audio");
    return response.arrayBuffer();
  })).catch((error: unknown) => {
    files = null;
    throw error;
  });
  return files;
}

function prepare(buffer: AudioBuffer): Sample {
  let peak = 0;
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    for (const value of buffer.getChannelData(channel)) peak = Math.max(peak, Math.abs(value));
  }
  let first = buffer.length, last = 0;
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i]) > peak * 0.01) { first = Math.min(first, i); last = Math.max(last, i); }
    }
  }
  const offset = Math.max(0, first / buffer.sampleRate - 0.002);
  const end = Math.min(buffer.duration, (last + 1) / buffer.sampleRate + 0.008);
  return { buffer, offset, duration: Math.max(0.01, end - offset), peak: Math.max(peak, 0.001) };
}

function createFeedbackAudio() {
  // A separate channel keeps UI retriggers from interrupting the UK inspection.
  const context = new AudioContext();
  const samples = new Map<SampleName, Sample>();
  let loading: Promise<void> | null = null;
  let waking: Promise<void> | null = null;
  let request = 0;
  let voice: { stop: () => void } | null = null;
  let fadingVoice: (() => void) | null = null;

  function resume() {
    if (context.state === "running" || context.state === "closed") return Promise.resolve();
    waking ??= context.resume().finally(() => { waking = null; });
    return waking;
  }

  function load() {
    if (samples.size === sampleNames.length) return Promise.resolve();
    loading ??= preloadFeedbackAudio().then(async (data) => {
      const decoded = await Promise.all(data.map(bytes => context.decodeAudioData(bytes.slice(0))));
      decoded.forEach((buffer, index) => samples.set(sampleNames[index], prepare(buffer)));
    }).finally(() => { loading = null; });
    return loading;
  }

  function contact(kind: FeedbackCue) {
    if (document.hidden || context.state !== "running") return;
    const cue = cues[kind];
    const sample = samples.get(cue.sample);
    if (!sample) return;
    voice?.stop();
    const now = context.currentTime;
    const duration = Math.min(sample.duration / cue.rate, 0.2);
    const source = context.createBufferSource();
    source.buffer = sample.buffer;
    source.playbackRate.value = cue.rate;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = cue.cutoff;
    filter.Q.value = 0.5;
    const envelope = context.createGain();
    const level = cue.level / sample.peak;
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(level, now + 0.001);
    envelope.gain.setValueAtTime(level, now + Math.max(0.002, duration - 0.012));
    envelope.gain.linearRampToValueAtTime(0, now + duration);
    const mix = context.createGain();
    source.connect(filter).connect(envelope).connect(mix).connect(context.destination);
    const finish = () => { source.stop(); mix.disconnect(); };
    const currentVoice = {
      stop() {
        // Restart on every action, with at most one outgoing six-millisecond fade.
        fadingVoice?.();
        fadingVoice = finish;
        mix.gain.setTargetAtTime(0, context.currentTime, 0.0015);
        source.stop(context.currentTime + 0.006);
      },
    };
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      envelope.disconnect();
      mix.disconnect();
      if (voice === currentVoice) voice = null;
      if (fadingVoice === finish) fadingVoice = null;
    };
    voice = currentVoice;
    source.start(now, sample.offset);
    source.stop(now + duration);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) return;
    request++;
    voice?.stop();
    voice = null;
    fadingVoice?.();
    fadingVoice = null;
  });

  return {
    resume,
    load,
    play(kind: FeedbackCue) {
      const current = ++request;
      const requestedAt = performance.now();
      if (context.state === "running" && samples.size === sampleNames.length) contact(kind);
      else void Promise.all([resume(), load()]).then(() => {
        // Never replay a backlog when a suspended tab/context wakes up.
        if (current === request && performance.now() - requestedAt < 120) contact(kind);
      }).catch(() => {});
    },
  };
}

let audio: ReturnType<typeof createFeedbackAudio> | null = null;

/** Unlock synchronously from the gesture, before clipboard/theme work awaits. */
export function primeFeedbackAudio() {
  try {
    audio ??= createFeedbackAudio();
    void Promise.all([audio.resume(), audio.load()]).catch(() => {});
  } catch {
    // Audio support or autoplay policy must never block the action itself.
  }
}

export function playFeedback(kind: FeedbackCue) {
  try {
    primeFeedbackAudio();
    audio?.play(kind);
  } catch {
    // Feedback is optional when the browser cannot play audio.
  }
}
