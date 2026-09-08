type Cue = "accept" | "complete";
type Sample = { buffer: AudioBuffer; offset: number; duration: number; peak: number };
let files: Promise<[ArrayBuffer, ArrayBuffer]> | null = null;

// Fetch the small local samples before interaction, without starting audio.
export function preloadBrandAudio() {
  files ??= Promise.all(["/audio/uk-press.ogg", "/audio/uk-release.ogg"].map(async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not load monogram audio");
    return response.arrayBuffer();
  })).then(([press, release]): [ArrayBuffer, ArrayBuffer] => [press, release]).catch((error: unknown) => {
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
  // Trim leading silence so the physical contact lands on the user's click.
  const offset = Math.max(0, first / buffer.sampleRate - 0.002);
  return { buffer, offset, duration: Math.max(0.01, (last + 1) / buffer.sampleRate - offset), peak: Math.max(peak, 0.001) };
}

export function createBrandAudio() {
  const context = new AudioContext();
  const output = context.createGain();
  const volume = 0.75;
  output.gain.value = volume;
  output.connect(context.destination);
  let samples: Record<Cue, Sample> | null = null;
  const ready = preloadBrandAudio().then(async ([press, release]) => {
    const [accept, complete] = await Promise.all([
      context.decodeAudioData(press.slice(0)),
      context.decodeAudioData(release.slice(0)),
    ]);
    samples = { accept: prepare(accept), complete: prepare(complete) };
  }).catch(() => {});
  let enabled = true, cue = 0;
  let waking: Promise<void> | null = null;
  let voice: { stop: () => void } | null = null;
  let fadingVoice: (() => void) | null = null;

  function resume() {
    if (context.state === "running" || context.state === "closed") return Promise.resolve();
    waking ??= context.resume().finally(() => { waking = null; });
    return waking;
  }
  function cancel() {
    cue++;
    voice?.stop();
    voice = null;
  }
  function contact(kind: Cue) {
    if (!enabled || !samples || context.state !== "running") return;
    voice?.stop();
    const sample = samples[kind];
    const now = context.currentTime;
    const complete = kind === "complete";
    const rate = complete ? 1.12 : 0.88;
    const duration = Math.min(sample.duration / rate, 0.24);
    const source = context.createBufferSource();
    source.buffer = sample.buffer;
    source.playbackRate.value = rate;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = complete ? 4600 : 3400;
    filter.Q.value = 0.5;
    const envelope = context.createGain();
    const level = (complete ? 0.1 : 0.14) / sample.peak;
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(level, now + 0.001);
    envelope.gain.setValueAtTime(level, now + Math.max(0.002, duration - 0.018));
    envelope.gain.linearRampToValueAtTime(0, now + duration);
    const mix = context.createGain();
    source.connect(filter).connect(envelope).connect(mix).connect(output);
    source.start(now, sample.offset);
    source.stop(now + duration);
    const finish = () => { source.stop(); mix.disconnect(); };
    const currentVoice = {
      stop() {
        // Keep at most one outgoing fade, even for many clicks in one audio frame.
        fadingVoice?.();
        fadingVoice = finish;
        mix.gain.setTargetAtTime(0, context.currentTime, 0.0015);
        source.stop(context.currentTime + 0.006);
      },
    };
    voice = currentVoice;
    source.onended = () => {
      source.disconnect(); filter.disconnect(); envelope.disconnect(); mix.disconnect();
      if (voice === currentVoice) voice = null;
      if (fadingVoice === finish) fadingVoice = null;
    };
  }
  return {
    resume,
    cancel,
    play(kind: Cue) {
      if (!enabled) return;
      const requested = ++cue;
      const requestedAt = performance.now();
      if (context.state === "running" && samples) contact(kind);
      else {
        void Promise.all([resume(), ready]).then(() => {
          if (requested === cue && performance.now() - requestedAt < 120) contact(kind);
        }).catch(() => {});
      }
    },
    mute(value: boolean) {
      enabled = !value;
      cancel();
      output.gain.setTargetAtTime(value ? 0 : volume, context.currentTime, 0.012);
    },
    close() { cancel(); fadingVoice?.(); fadingVoice = null; void context.close().catch(() => {}); },
  };
}
