import React from "react";
import { GraduationCap, Translate } from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";

interface EducationProps {
  education: ResumeData["education"];
  languages: ResumeData["languages"];
}

export const Education: React.FC<EducationProps> = ({
  education,
  languages,
}) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in delay-700"
    >
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {edu.school}
                  </h3>
                  <p className="text-xs text-muted-foreground">{edu.degree}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono text-right ml-2">
                {edu.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">
          Languages
        </h2>
        <div className="space-y-4">
          {languages.map((lang, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2 last:border-0"
            >
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                  <Translate className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-medium text-foreground">
                  {lang.language}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
