import { ArrowRight, Briefcase } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/section-heading";
import type { ResumeData } from "@/types/resume";

export function Experience({
  experience,
}: {
  experience: ResumeData["experience"];
}) {
  return (
    <section id="experience" className="portfolio-section" tabIndex={-1}>
      <SectionHeading number="02">
        Experience
      </SectionHeading>
      {experience.map((job) => (
        <article
          className="section-inset section-body"
          key={job.company + job.period}
        >
          <div className="experience-heading">
            <span className="entry-icon">
              <Briefcase size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3>{job.company}</h3>
              <p>{job.title}</p>
            </div>
            <span className="entry-date">{job.period}</span>
          </div>
          <p className="experience-location">{job.description}</p>
          <ul className="detail-list">
            {job.details.map((detail) => (
              <li key={detail}>
                <ArrowRight size={13} aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
