import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  Database,
  GithubLogo,
  HardDrives,
  Cpu,
  Cloud,
} from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/section-heading";
import type { ResumeData } from "@/types/resume";

function Architecture() {
  return (
    <figure
      className="architecture-preview"
      aria-label="Calorine architecture. An Axum API uses PostgreSQL through SQLx, Cloudflare R2 for image storage, and OpenRouter for meal analysis. Authentication uses Google OAuth and JWT."
    >
      <div aria-hidden="true" className="architecture-content">
        <div className="architecture-caption">
          <span>CALORINE / SYSTEM OVERVIEW</span>
          <span>01</span>
        </div>
        <div className="architecture-api">
          <div className="architecture-icon">
            <Cpu size={24} weight="duotone" />
          </div>
          <div>
            <strong>Calorine API</strong>
            <span>Rust · Axum · Tokio</span>
          </div>
          <span className="architecture-auth">OAuth + JWT</span>
        </div>
        <div className="architecture-connections">
          <i />
          <i />
          <i />
        </div>
        <div className="architecture-services">
          <div>
            <Database size={20} />
            <strong>PostgreSQL</strong>
            <span>Data / SQLx</span>
          </div>
          <div>
            <HardDrives size={20} />
            <strong>Cloudflare R2</strong>
            <span>Image storage</span>
          </div>
          <div>
            <Cloud size={20} />
            <strong>OpenRouter</strong>
            <span>Meal analysis</span>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Backend architecture illustration, based on the Calorine repository.
      </figcaption>
    </figure>
  );
}

export function Projects({ projects }: { projects: ResumeData["projects"] }) {
  return (
    <section id="projects" className="portfolio-section" tabIndex={-1}>
      <SectionHeading number="01" detail="Ideas, shipped.">
        Selected work
      </SectionHeading>
      {projects.map((project, index) => (
        <article
          key={project.id}
          id={project.id}
          className="project-entry section-inset"
        >
          <div className="project-topline">
            <span>
              0{index + 1} / {project.date}
            </span>
            <span className="project-status">
              <span />
              Active project
            </span>
          </div>
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <span className="project-category">
              {project.media.kind === "screenshot"
                ? "DESKTOP APPLICATION"
                : "BACKEND SYSTEM"}
            </span>
          </div>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-media">
            {project.media.kind === "screenshot" ? (
              <a
                href={project.links?.production}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"Visit " + project.title + " website"}
                className="project-image-link"
              >
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  width={project.media.width}
                  height={project.media.height}
                  sizes="(max-width: 768px) 92vw, 718px"
                  className="project-screenshot"
                />
                <span className="image-link-caption">
                  Meet Boris <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </a>
            ) : (
              <Architecture />
            )}
          </div>
          <div className="project-bottomline">
            <ul
              className="project-stack"
              aria-label={project.title + " primary technologies"}
            >
              {project.tech.slice(0, 4).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <nav
              className="project-links"
              aria-label={project.title + " links"}
            >
              {project.links?.production && (
                <a
                  href={project.links.production}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo size={16} aria-hidden="true" />
                  Source
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
              <CaretDown size={15} aria-hidden="true" />
            </summary>
            <div className="project-details-body">
              <ul>
                {project.highlights?.map((highlight) => (
                  <li key={highlight}>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-6">
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
