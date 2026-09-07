export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  date: string;
  status: "active" | "archived";
  description: string;
  tech: string[];
  summaryHighlights: [string, string];
  media: {
    kind: "architecture";
    layout: "pipeline" | "branches";
    title: string;
    context: string;
    nodes: {
      title: string;
      detail: string;
      icon: "microphone" | "cpu" | "speaker" | "database" | "storage" | "cloud";
    }[];
    note: string;
    caption: string;
  };
  links?: {
    production?: string;
    github?: string;
  };
  highlights?: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  description: string;
  avatar: string;
  location: string;
  timezone: string;
  email: string;
  website: string;
  summary: string;
  pronouns?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: { language: string; level: string }[];
}
