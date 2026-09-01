import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";

interface ProjectsProps {
  projects: ResumeData["projects"];
}

type Project = ResumeData["projects"][number];

interface ProjectEntryProps {
  project: Project;
}

const ProjectMark: React.FC<Pick<Project, "icon" | "title">> = ({
  icon,
  title,
}) => {
  if (!icon) {
    return null;
  }

  if (icon.startsWith("http") || icon.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="" className="size-5 object-contain" src={icon} />
    );
  }

  return (
    <span
      aria-label={`${title} mark`}
      className="text-lg grayscale transition duration-200 group-hover:grayscale-0"
      role="img"
    >
      {icon}
    </span>
  );
};

const ProjectEntry: React.FC<ProjectEntryProps> = ({ project }) => {
  return (
    <article className="group border-b border-border py-6 first:pt-5 last:pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[11px] text-muted-foreground">
            {project.date}
          </p>
          <div className="flex items-start gap-2.5">
            <ProjectMark icon={project.icon} title={project.title} />
            <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-blue-500 sm:text-lg">
              {project.title}
            </h3>
          </div>
        </div>

        {(project.links?.production || project.links?.github) && (
          <nav
            aria-label={`${project.title} links`}
            className="flex shrink-0 items-center gap-4 pl-7.5 sm:pl-0 sm:pt-6"
          >
            {project.links.production && (
              <a
                href={project.links.production}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-blue-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <LinkIcon className="size-3.5" />
                Live
                <ArrowUpRight className="size-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-blue-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <GithubLogo className="size-3.5" />
                Source
                <ArrowUpRight className="size-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </nav>
        )}
      </div>

      <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2.5 text-sm leading-5 text-muted-foreground"
            >
              <ArrowRight
                aria-hidden="true"
                className="mt-1 size-3 shrink-0 text-border transition-colors group-hover:text-blue-500"
                weight="bold"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70">
          Stack
        </span>
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="inline-flex rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="space-y-6 animate-fade-in delay-600">
      <h2 className="text-xl font-bold text-foreground">Projects</h2>

      <div className="border-t border-border">
        {projects.map((project) => (
          <ProjectEntry key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
