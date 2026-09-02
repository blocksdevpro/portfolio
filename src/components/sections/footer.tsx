import React from "react";
import { ResumeData } from "@/types/resume";

interface FooterProps {
  data: ResumeData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className="pt-12 pb-6 border-t flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground"
        data-reveal
      >
        <div className="flex items-center gap-1 mb-2 sm:mb-0">
          <span>
            &copy; {currentYear} {data.name}.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${data.email}`}
            className="hover:text-foreground hover:underline transition-colors"
          >
            Email
          </a>
          {data.socials.twitter && (
            <a
              href={data.socials.twitter}
              className="hover:text-foreground hover:underline transition-colors"
            >
              Twitter
            </a>
          )}
          {data.socials.github && (
            <a
              href={data.socials.github}
              className="hover:text-foreground hover:underline transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </footer>

      {/* Branding Logo at bottom */}
      <div className="w-full flex justify-center pb-12 opacity-10 select-none">
        <div className="text-6xl font-black tracking-tighter font-mono">UK</div>
      </div>
    </>
  );
};
