import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";

interface ExperienceProps {
  experience: ResumeData["experience"];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="space-y-6" data-reveal>
      <h2 className="text-xl font-bold text-foreground">Experience</h2>

      <div className="relative border-l ml-3 space-y-10">
        <div className="absolute -left-px top-0 h-2 w-px bg-background"></div>
        {experience.map((job, index) => (
          <div key={index} className="relative pl-8 group">
            <div className="absolute -left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-300 ring-4 ring-background transition-colors group-hover:bg-zinc-400 dark:bg-muted dark:group-hover:bg-zinc-500"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-foreground">{job.title}</h3>
              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                {job.period}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-2 font-semibold">
              {job.company}{" "}
              <span className="text-muted-foreground font-normal">
                • {job.description}
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {job.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 size-3 shrink-0 text-muted-foreground/45 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                    weight="bold"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
