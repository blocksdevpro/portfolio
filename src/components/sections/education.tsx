import { GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/section-heading";
import type { ResumeData } from "@/types/resume";

export function Education({
  education,
  languages,
}: Pick<ResumeData, "education" | "languages">) {
  return (
    <section id="education" className="portfolio-section" tabIndex={-1}>
      <SectionHeading number="05">Education</SectionHeading>
      <div className="section-inset section-body">
        {education.map((edu) => (
          <div className="education-entry" key={edu.school}>
            <span className="entry-icon">
              <GraduationCap size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3>{edu.school}</h3>
              <p>{edu.degree}</p>
            </div>
            <span className="entry-date">{edu.year}</span>
          </div>
        ))}
        {languages.length > 0 && (
          <p className="mt-5 text-sm text-muted-foreground">
            {languages
              .map((item) => item.language + " · " + item.level)
              .join(" / ")}
          </p>
        )}
      </div>
    </section>
  );
}
