import type { ResumeData } from "@/types/resume";

export const RESUME_DATA: ResumeData = {
  name: "Uttam Kumbhakar",
  title: "Rust Backend Developer",
  description:
    "I build backend systems in Rust, local AI apps, and developer tools.",
  avatar: "/portrait.webp",

  location: "Jharkhand, India",
  timezone: "Asia/Kolkata",
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
      id: "boris",
      title: "Boris",
      category: "DESKTOP APPLICATION",
      subtitle: "A voice assistant for your desktop",
      date: "2026",
      status: "active",
      summaryHighlights: [
        "Local speech recognition, built into a Windows desktop app.",
        "An agent with memory, tools, and approval-controlled actions.",
      ],
      media: {
        kind: "architecture",
        layout: "pipeline",
        title: "From voice to action",
        nodes: [
          {
            title: "Listen",
            detail: "Parakeet",
            icon: "microphone",
          },
          {
            title: "Agent",
            detail: "Memory & tools",
            icon: "cpu",
          },
          {
            title: "Reply",
            detail: "Supertone",
            icon: "speaker",
          },
        ],
        caption:
          "Parakeet recognizes speech locally, then an agent with memory and tools processes the request using language models via OpenRouter. Supertone speaks the reply. Sensitive actions require approval.",
      },
      description:
        "A Windows voice assistant that listens locally, remembers context, and asks before taking sensitive actions.",
      highlights: [
        "Separate Rust crates for audio, inference, agent tools, and desktop integration.",
        "Language models via OpenRouter, with approval required for sensitive tools.",
        "Local wake-word detection, persistent sessions, and signed in-app updates.",
      ],
      primaryTech: ["Rust", "Tauri v2", "ONNX Runtime"],
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
      id: "calorine",
      title: "Calorine API",
      category: "BACKEND SYSTEM",
      subtitle: "The backend behind better habits",
      date: "2026",
      status: "active",
      summaryHighlights: [
        "Google OAuth and JWT authentication with CSRF protection.",
        "Image storage and AI meal analysis behind a typed Rust API.",
      ],
      media: {
        kind: "architecture",
        layout: "branches",
        title: "Calorine API",
        nodes: [
          {
            title: "PostgreSQL",
            detail: "Data",
            icon: "database",
          },
          {
            title: "Cloudflare R2",
            detail: "Photos",
            icon: "storage",
          },
          {
            title: "OpenRouter",
            detail: "Meal analysis",
            icon: "cloud",
          },
        ],
        caption:
          "Calorine API connects to PostgreSQL for application data through SQLx, Cloudflare R2 for meal photos, and OpenRouter for AI meal analysis.",
      },
      description:
        "The backend for a calorie-tracking app, with secure sign-in, meal photo storage, and AI nutrition analysis.",
      highlights: [
        "Google OAuth and JWT sessions with CSRF protection.",
        "Async request handling with Tokio, structured tracing, typed errors, and SQLx migrations.",
      ],
      primaryTech: ["Rust", "Axum", "PostgreSQL"],
      tech: [
        "Rust",
        "Axum",
        "Tokio",
        "PostgreSQL",
        "SQLx",
        "JWT",
        "Google OAuth 2.0",
        "Cloudflare R2",
        "OpenRouter",
      ],
      links: {
        production: "https://calorine.in",
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
