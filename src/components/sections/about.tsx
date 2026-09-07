import { SectionHeading } from "@/components/section-heading";
import type { ResumeData } from "@/types/resume";

export function About({ data }: { data: ResumeData }) {
  return (
    <section id="about" className="portfolio-section" tabIndex={-1}>
      <SectionHeading number="03" sectionId="about">
        About me
      </SectionHeading>
      <div className="section-inset section-body about-copy">
        <p>
          I&apos;m Uttam, a backend developer based in {data.location}. I work
          primarily with <strong>Rust</strong>, building async systems, local AI
          applications, and developer tools.
        </p>
        <p>
          My work spans APIs, authentication, databases, and desktop
          applications. Right now, I&apos;m going deeper into systems
          programming, concurrency, and local inference.
        </p>
        <div className="focus-note">
          <span className="focus-dot" aria-hidden="true" />
          <span>Currently exploring</span>
          <strong>Concurrency & local inference</strong>
        </div>
      </div>
    </section>
  );
}
