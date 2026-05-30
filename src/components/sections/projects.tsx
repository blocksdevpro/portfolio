"use client";

import React, { useState } from "react";
import {
  CaretDown,
  CaretUp,
  GithubLogo,
  Link as LinkIcon,
  Infinity,
} from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectsProps {
  projects: ResumeData["projects"];
}

const INITIAL_PROJECTS_COUNT = 3;

interface ProjectItemProps {
  project: ResumeData["projects"][0];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

const ProjectItem = ({
  project,
  isOpen,
  onToggle,
  isLast,
}: ProjectItemProps) => {
  return (
    <div className="group relative">
      <div className="flex group-hover:bg-accent/50 transition-colors">
        {/* Timeline Line & Icon */}
        <div className="relative ml-3 flex flex-col items-center">
          {/* Vertical Line */}
          {/* <div 
            className={`absolute top-0 bottom-0 w-px bg-border/50 ${isLast && !isOpen ? "h-full" : "h-full"}`}
          /> */}

          {/* Icon */}
          <div className="relative z-10 flex size-10 mt-3 shrink-0 select-none items-center justify-center rounded-lg border bg-card text-lg shadow-sm">
            {project.icon &&
            (project.icon.startsWith("http") ||
              project.icon.startsWith("/")) ? (
              <img
                alt={project.title}
                className="size-6 object-contain"
                src={project.icon}
              />
            ) : (
              <span>{project.icon || "📂"}</span>
            )}
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 pb-8 pl-4">
          {/* Header: Title + Toggle */}
          <div className="flex items-start justify-between pt-3 pr-4">
            <button
              type="button"
              onClick={onToggle}
              className="flex-1 text-left focus:outline-none"
            >
              <h3 className="text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <div className="mt-1 flex items-center text-xs text-muted-foreground font-mono">
                {project.date.includes("Present") ? (
                  <>
                    <span>
                      {project.date
                        .replace("- Present", "")
                        .replace("– Present", "")
                        .trim()}
                    </span>
                    <span className="mx-1.5">—</span>
                    <Infinity className="size-3.5 translate-y-px" />
                  </>
                ) : (
                  <span>{project.date}</span>
                )}
              </div>
            </button>

            <div className="flex items-center gap-1 ml-4">
              {project.links?.production && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={project.links.production}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-accent rounded-md"
                    >
                      <LinkIcon className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Live</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {project.links?.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-accent rounded-md"
                    >
                      <GithubLogo className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Source</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onToggle}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-accent rounded-md"
                  >
                    {isOpen ? (
                      <CaretUp className="size-4" />
                    ) : (
                      <CaretDown className="size-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isOpen ? "Collapse" : "Expand"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              {/* Description */}
              <div className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </div>

              {/* Highlights (Bullets) */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <span className="mr-2 mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border bg-muted/50 px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [openProjects, setOpenProjects] = useState<string[]>(
    projects.length > 0 ? [projects[0].title] : [],
  );
  const [showAll, setShowAll] = useState(false);

  const toggleProject = (title: string) => {
    setOpenProjects((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <section id="projects" className="animate-fade-in delay-600">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-foreground">Projects</h2>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
          {projects.length}
        </span>
      </div>

      <div className="flex mt-6 flex-col">
        {/* Initial projects - always visible */}
        {projects.slice(0, INITIAL_PROJECTS_COUNT).map((project, index) => (
          <ProjectItem
            key={project.title}
            project={project}
            isOpen={openProjects.includes(project.title)}
            onToggle={() => toggleProject(project.title)}
            isLast={!showAll && index === INITIAL_PROJECTS_COUNT - 1}
          />
        ))}

        {/* Additional projects - animated */}
        {projects.length > INITIAL_PROJECTS_COUNT && (
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              showAll
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              {projects.slice(INITIAL_PROJECTS_COUNT).map((project, index) => (
                <ProjectItem
                  key={project.title}
                  project={project}
                  isOpen={openProjects.includes(project.title)}
                  onToggle={() => toggleProject(project.title)}
                  isLast={
                    index === projects.length - INITIAL_PROJECTS_COUNT - 1
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {projects.length > INITIAL_PROJECTS_COUNT && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 rounded-full border border-dashed border-border/60 bg-transparent px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:border-muted-foreground/50 transition-all duration-300"
          >
            {showAll
              ? "Show Less"
              : `Show ${projects.length - INITIAL_PROJECTS_COUNT} More`}
            {showAll ? (
              <CaretUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            ) : (
              <CaretDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
