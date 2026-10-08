import type { Project } from "@/types/resume";

// Complete snapshot kept for restoration, also used by the compact project list.
export const CALORINE_PROJECT: Project = {
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
};
