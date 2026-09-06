import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CopyEmail } from "@/components/copy-email";
import { SpotifyNowPlaying } from "@/components/sections/spotify";

export function Contact({ email }: { email: string }) {
  return (
    <section
      id="contact"
      className="contact-section section-inset"
      tabIndex={-1}
    >
      <p className="eyebrow">LET&apos;S BUILD SOMETHING</p>
      <h2>Have a backend project in mind?</h2>
      <p>I&apos;d love to hear about it. Send me a note.</p>
      <div className="contact-actions">
        <a href={"mailto:" + email}>
          {email}
          <ArrowUpRight size={21} aria-hidden="true" />
        </a>
        <CopyEmail email={email} />
      </div>
      <SpotifyNowPlaying />
    </section>
  );
}
