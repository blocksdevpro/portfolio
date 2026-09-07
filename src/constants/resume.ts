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
        context: "Windows · Rust · Tauri v2",
        nodes: [
          {
            title: "Listen",
            detail: "Local speech recognition with Parakeet",
            icon: "microphone",
          },
          {
            title: "Reason & act",
            detail: "Agent runtime, memory, and tools",
            icon: "cpu",
          },
          {
            title: "Respond",
            detail: "Voice output with Supertone",
            icon: "speaker",
          },
        ],
        note: "Language models via OpenRouter. Sensitive tools require approval.",
        caption:
          "Boris connects local speech processing to an agent and voice output.",
      },
      description:
        "A Rust-powered Windows assistant with local speech recognition, natural voice replies, and tools that ask before taking sensitive actions.",
      highlights: [
        "Modular multi-crate Rust architecture for audio, inference, agent runtime, and desktop integration.",
        "Agent capabilities including tools, sessions, memory, search, and approval-controlled shell execution.",
        "Local wake-word detection, Parakeet speech recognition, and Supertone speech output. Language models connect through OpenRouter.",
        "Shipped as a Tauri v2 Windows desktop app with signed in-app updates.",
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
        context: "Rust · Axum · Tokio",
        nodes: [
          {
            title: "PostgreSQL",
            detail: "Application data, accessed through SQLx",
            icon: "database",
          },
          {
            title: "Cloudflare R2",
            detail: "Image storage for uploaded meals",
            icon: "storage",
          },
          {
            title: "OpenRouter",
            detail: "Multimodal models for meal analysis",
            icon: "cloud",
          },
        ],
        note: "Google OAuth + JWT · Structured tracing · SQLx migrations",
        caption:
          "The API connects persistent data, image storage, and meal analysis.",
      },
      description:
        "A Rust backend for calorie tracking and fitness, with secure authentication, image storage, and AI-powered meal analysis.",
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
