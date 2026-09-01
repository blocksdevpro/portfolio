import { ResumeData } from "@/types/resume";

export const RESUME_DATA: ResumeData = {
  name: "Uttam Kumbhakar",
  title: "Rust Backend Developer",
  description: "Rust · Async backend systems · Local AI applications",
  avatar:
    "https://40ar4rk0hv.ufs.sh/f/9Pu2ZyQIW8BFkxw2CxtHqGNu7tCzy62FwhZjiv9UlmR30p15",

  location: "Jharkhand, India",
  email: "mail@blocksdev.pro",
  website: "https://blocksdev.pro",
  summary:
    "Backend developer focused primarily on Rust, building async backend systems, local AI applications, and developer tools. Experienced with Axum, Tokio, PostgreSQL, SQLx, authentication systems, and production API development. Currently deepening expertise in systems programming, concurrency, and local inference.",
  pronouns: "he/him",
  socials: {
    github: "https://github.com/blocksdevpro",
    linkedin: "https://www.linkedin.com/in/uttam-kumbhakar/",
    twitter: "https://x.com/blocksdev_pro",
  },
  skills: [
    "Rust",
    "Python",
    "SQL",
    "Axum",
    "Tokio",
    "SQLx",
    "FastAPI",
    "PostgreSQL",
    "REST APIs",
    "MongoDB",
    "Async Programming",
    "Concurrent Systems",
    "Docker",
    "DigitalOcean",
    "Cloudflare",
    "Git",
  ],
  experience: [
    {
      title: "Junior Backend Developer",
      company: "Async Integrations d.o.o.",
      period: "Mar 2025 – Aug 2025",
      description: "Remote (Zagreb, Croatia)",
      details: [
        "Developed backend services for a multi-tenant CRM platform using FastAPI and PostgreSQL.",
        "Improved API performance through query optimization and database indexing.",
        "Integrated the Pipedrive CRM API with retry logic and fault-tolerant error handling for reliable data synchronization.",
        "Containerized and deployed services to DigitalOcean, managing production configuration and environments.",
      ],
    },
  ],
  projects: [
    {
      title: "Boris — Local-First AI Voice Assistant",
      date: "2026",
      icon: "🎙️",
      description:
        "A local-first AI voice assistant for Windows with wake-word detection, speech recognition, LLM-driven tools, and speech synthesis. Superteam Grant recipient ($200 USDG).",
      highlights: [
        "Modular multi-crate Rust architecture for audio, inference, agent runtime, and desktop integration.",
        "Agent capabilities including tools, sessions, memory, search, and approval-controlled shell execution.",
        "Shipped as a Tauri v2 Windows desktop app with local inference and in-app updates.",
      ],
      tech: [
        "Rust",
        "Tokio",
        "Tauri v2",
        "ONNX Runtime",
        "cpal",
        "Parakeet",
        "Silero VAD",
        "Supertone",
      ],
      links: {
        production: "https://boris.blocksdev.pro",
        github: "https://github.com/blocksdevpro/boris-assistant",
      },
    },
    {
      title: "Calorine API — Calorie Tracking & Fitness Backend",
      date: "2026",
      icon: "🥗",
      description:
        "A production-grade REST API for calorie tracking and fitness, with secure authentication, image storage, and AI-powered meal analysis.",
      highlights: [
        "Google OAuth 2.0 and JWT authentication with CSRF protection and secure session handling.",
        "AI-powered meal analysis pipeline using Cloudflare R2 and multimodal LLM inference.",
        "Tokio concurrency, structured tracing, typed errors, and SQLx migrations across the backend.",
      ],
      tech: [
        "Rust",
        "Axum",
        "Tokio",
        "PostgreSQL",
        "SQLx",
        "JWT",
        "Google OAuth 2.0",
        "Cloudflare R2",
        "OpenAI API",
      ],
      links: {
        github: "https://github.com/blocksdevpro/rust-backend",
      },
    },
  ],
  education: [
    {
      school: "Binod Bihari Mahto Koyalanchal University (BBMKU)",
      degree: "Bachelor of Commerce (B.Com)",
      year: "2024 – 2028",
    },
  ],
  languages: [],
};
