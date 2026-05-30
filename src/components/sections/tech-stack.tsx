import React from "react";
import {
  Database,
  HardDrives,
  Package,
  Terminal,
  Cpu,
  Cloud,
  Lightning,
  Cube,
  Pulse,
  Stack,
  RadioButton,
} from "@phosphor-icons/react";

interface TechStackProps {
  skills: string[];
}

type SkillConfig = {
  icon: React.ReactNode;
  className: string;
};

const SKILL_MAP: Record<string, SkillConfig> = {
  Python: {
    icon: <Lightning className="w-3 h-3" />,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
  },
  FastAPI: {
    icon: <Lightning className="w-3 h-3" />,
    className: "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800",
  },
  PostgreSQL: {
    icon: <Database className="w-3 h-3" />,
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  },
  AsyncIO: {
    icon: <Pulse className="w-3 h-3" />,
    className: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
  },
  Redis: {
    icon: <Stack className="w-3 h-3" />,
    className: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  },
  Docker: {
    icon: <Package className="w-3 h-3" />,
    className: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  },
  WebSockets: {
    icon: <Pulse className="w-3 h-3" />,
    className: "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
  },
  "REST APIs": {
    icon: <Cloud className="w-3 h-3" />,
    className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  },
  MongoDB: {
    icon: <Database className="w-3 h-3" />,
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  },
  Nginx: {
    icon: <HardDrives className="w-3 h-3" />,
    className: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700",
  },
  Pytest: {
    icon: <Cube className="w-3 h-3" />,
    className: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  },
  gRPC: {
    icon: <RadioButton className="w-3 h-3" />,
    className: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  },
  "Rust (learning)": {
    icon: <Cpu className="w-3 h-3" />,
    className: "bg-amber-50 text-amber-700 border-amber-300 border-dashed dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700",
  },
};

const DEFAULT_SKILL: SkillConfig = {
  icon: <Terminal className="w-3 h-3" />,
  className: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
};

export const TechStack: React.FC<TechStackProps> = ({ skills }) => {
  return (
    <section className="space-y-4 animate-fade-in delay-400">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Stack</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const config = SKILL_MAP[skill] ?? DEFAULT_SKILL;
          return (
            <span
              key={skill}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-medium transition-all duration-300 cursor-default hover:scale-105 ${config.className}`}
            >
              {config.icon} {skill}
            </span>
          );
        })}
      </div>
    </section>
  );
};