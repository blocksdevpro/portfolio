import React from "react";
import { ArrowUpRight, GithubLogo, LinkedinLogo, Globe, XLogo } from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";

interface SocialsProps {
  socials: ResumeData["socials"];
}

export const Socials: React.FC<SocialsProps> = ({ socials }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fade-in delay-200">
      {socials.github && (
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 p-2 text-muted-foreground hover:text-accent-foreground hover:bg-primary-foreground border rounded-md group transition-all duration-200"
        >
          <GithubLogo className="w-4 h-4" />
          <span className="text-xs font-medium group-hover:underline underline-offset-4">
            GitHub
          </span>
          <ArrowUpRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 p-2 border rounded-md text-muted-foreground hover:text-accent-foreground hover:bg-primary-foreground group transition-all duration-200"
        >
          <LinkedinLogo className="w-4 h-4 group-hover:text-blue-600" />
          <span className="text-xs font-medium group-hover:underline underline-offset-4">
            LinkedIn
          </span>
          <ArrowUpRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}
      {socials.twitter && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 p-2 border rounded-md text-muted-foreground hover:text-accent-foreground hover:bg-primary-foreground group transition-all duration-200"
        >
          <XLogo className="w-4 h-4 group-hover:text-blue-600" />
          <span className="text-xs font-medium group-hover:underline underline-offset-4">
            Twitter
          </span>
          <ArrowUpRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}
      {socials.website && (
        <a
          href={socials.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 p-2 border rounded-md text-muted-foreground hover:text-accent-foreground hover:bg-primary-foreground group transition-all duration-200"
        >
          <Globe className="w-4 h-4 group-hover:text-green-500" />
          <span className="text-xs font-medium group-hover:underline underline-offset-4">
            Website
          </span>
          <ArrowUpRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      )}
    </div>
  );
};
