import type { ResumeData } from "@/types/resume";
import { CALORINE_PROJECT } from "@/constants/archived-projects";

export const RESUME_DATA: ResumeData = {
  name: "Uttam Kumbhakar",
  title: "Rust Backend Developer",
  description:
    "I build backend systems in Rust, local AI apps, and developer tools.",
  avatar: "/portrait.webp",

  location: "Jharkhand, India",
  timezone: "Asia/Kolkata",
  email: "mail@blocksdev.pro",
  website: "https://www.blocksdev.pro",
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
      id: "vstretch",
      title: "vstretch",
      category: "WINDOWS UTILITY",
      subtitle: "Automatic display switching for FPS games",
      date: "2026",
      status: "active",
      summaryHighlights: [
        "Automatically applies stretched resolution for Valorant and CS2.",
        "Restores the previous desktop display settings when the game exits.",
      ],
      media: {
        kind: "architecture",
        layout: "pipeline",
        title: "From game detection to display switching",
        nodes: [
          {
            title: "Preset",
            detail: "Saved stretch",
            icon: "storage",
          },
          {
            title: "Watch games",
            detail: "Valorant & CS2",
            icon: "cpu",
          },
          {
            title: "Switch display",
            detail: "Win32 APIs",
            icon: "monitor",
          },
        ],
        caption:
          "A saved stretch preset applies through Win32 display APIs when Valorant or CS2 gains focus. The previous desktop display settings return when the game exits, with optional restoration on Alt+Tab.",
      },
      description:
        "A Rust Windows tray app that automatically switches to stretched resolution for Valorant and CS2, then restores your desktop when the game exits.",
      highlights: [
        "Game detection, saved tray presets, and a configurable global hotkey for manual switching.",
        "Temporary Win32 display changes with crash recovery and optional desktop restoration on Alt+Tab.",
        "A Ratatui terminal interface and in-app updates verified against SHA-256 release checksums.",
      ],
      primaryTech: ["Rust", "Win32 APIs", "Ratatui"],
      tech: [
        "Rust",
        "Win32 APIs",
        "tray-icon",
        "Ratatui",
        "Crossterm",
        "Serde",
        "TOML",
        "Reqwest",
        "SHA-256",
      ],
      links: {
        production: "https://vstretch.blocksdev.pro",
        github: "https://github.com/blocksdevpro/vstretch",
      },
    },
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
  ],
  moreProjects: [CALORINE_PROJECT],
  education: [
    {
      school: "Binod Bihari Mahto Koyalanchal University (BBMKU)",
      degree: "Bachelor of Commerce (B.Com)",
      year: "2024 – 2028",
    },
  ],
  languages: [],
};

export const ALL_PROJECTS = [
  ...RESUME_DATA.projects,
  ...RESUME_DATA.moreProjects,
];
