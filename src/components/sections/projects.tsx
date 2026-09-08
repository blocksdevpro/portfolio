import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/section-heading";
import { ProjectArchitecture } from "@/components/project-architecture";
import type { ResumeData } from "@/types/resume";

export function Projects({ projects }: { projects: ResumeData["projects"] }) {
  return (
    <section
      id="projects"
      className="portfolio-section"
      tabIndex={-1}
      aria-labelledby="projects-heading"
    >
      <SectionHeading
        number="01"
        id="projects-heading"
        sectionId="projects"
        detail={`${projects.length} projects`}
      >
        Selected work
      </SectionHeading>
      {projects.map((project, index) => (
        <article
          key={project.id}
          id={project.id}
          className="project-entry section-inset"
          aria-labelledby={`${project.id}-title`}
        >
          <div className="project-title-row">
            <div className="project-title">
              <span className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 id={`${project.id}-title`}>{project.title}</h3>
            </div>
            <span className="project-year">{project.date}</span>
          </div>
          <p className="project-description">{project.description}</p>
          <ProjectArchitecture media={project.media} />
          <div className="project-bottomline">
            <ul
              className="project-stack"
              aria-label={`${project.title} primary technologies`}
            >
              {project.primaryTech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <nav className="project-links" aria-label={`${project.title} links`}>
              {project.links?.production && (
                <a
                  href={project.links.production}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit project <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo size={16} aria-hidden="true" /> Source
                </a>
              )}
            </nav>
          </div>
          <details className="project-details">
            <summary>
              <span>
                Engineering details
                <span className="sr-only"> for {project.title}</span>
              </span>
              <CaretDown size={16} aria-hidden="true" />
            </summary>
            <div className="project-details-body">
              <ul className="project-implementation">
                {project.highlights?.map((highlight) => (
                  <li key={highlight}>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="project-full-stack">
                <span className="text-foreground">Full stack · </span>
                {project.tech.join(" · ")}
              </p>
            </div>
          </details>
        </article>
      ))}
    </section>
  );
}
