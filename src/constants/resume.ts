import { ResumeData } from "@/types/resume";

export const RESUME_DATA: ResumeData = {
  name: "Uttam Kumbhakar",
  title: "Python Backend Engineer",
  description: "Real-time systems · Automation · 100+ shipped projects",
  avatar:
    "https://40ar4rk0hv.ufs.sh/f/9Pu2ZyQIW8BFkxw2CxtHqGNu7tCzy62FwhZjiv9UlmR30p15",

  location: "Dhanbad (JH), India",
  email: "mail@blocksdev.pro",
  website: "https://blocksdev.pro",
  summary:
    "Self-taught Python backend engineer with 3+ years of experience delivering 100+ projects for international clients across APIs, automation systems, bots, scrapers, AI integrations, and payment processing. Earned ₹60L+ in freelance revenue working with clients across the US, Europe, and Southeast Asia. Currently building FastQ and learning Rust. Looking for a full-time remote backend role.",
  pronouns: "he/him",
  socials: {
    github: "https://github.com/blocksdevpro",
    linkedin: "https://www.linkedin.com/in/uttam-kumbhakar/",
    twitter: "https://x.com/blocksdev_pro",
  },
  skills: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "AsyncIO",
    "Redis",
    "Docker",
    "WebSockets",
    "REST APIs",
    "MongoDB",
    "Nginx",
    "Pytest",
    "gRPC",
    "Rust (learning)",
  ],
  experience: [
    {
      title: "Freelance Backend Engineer",
      company: "Independent Contractor",
      period: "Jan 2022 – Present",
      description: "Remote (International — US, Europe, SEA)",
      details: [
        "Delivered 100+ backend projects for international clients via Fiverr, Upwork, and direct referrals — earning ₹60L+ over 3 years.",
        "Built REST APIs, automation pipelines, Telegram bots, web scrapers, AI/LLM integrations, and payment systems across dozens of client verticals.",
        "Operated across the full delivery lifecycle: scoping, architecture, implementation, deployment, and post-launch support.",
        "Maintained high client satisfaction with repeat business and long-term retainer relationships across multiple timezones.",
      ],
    },
    {
      title: "Backend Developer",
      company: "Async Integrations d.o.o.",
      period: "March 2025 – August 2025",
      description: "Remote (Zagreb, Croatia)",
      details: [
        "Designed and implemented FastAPI microservices for a multi-tenant CRM serving real-time dashboard data.",
        "Optimized PostgreSQL queries, reducing API response times under production load.",
        "Implemented JWT & OAuth 2.0 authentication across backend services.",
        "Integrated Pipedrive CRM API with retry logic and fault tolerance.",
        "Dockerized and deployed services to DigitalOcean.",
      ],
    },
  ],
  projects: [
    {
      title: "Tron Payments API",
      date: "Feb 2022 – Nov 2023",
      icon: "💎",
      description:
        "Production TRON blockchain payment processor built from scratch — no third-party SDK. Achieved sub-1-second transaction detection via WebSocket event streaming, faster than Tronscan's own indexer. Ran reliably on a 2-core/4GB VPS using TronGrid's free tier through aggressive async optimization.",
      metrics: [
        { label: "Transactions", value: "50K+" },
        { label: "Uptime", value: "99.9%" },
        { label: "Confirm", value: "<1s" },
      ],
      highlights: [
        "⚡ Faster than Tronscan's own indexer",
        "🔍 Full TRC20 event log parsing",
        "🔔 Two-phase payment confirmation",
        "🔐 Multi-tenant wallet management",
        "♻️ Fault-tolerant WS reconnection with missed-block recovery",
        "🖥️ Free WebSocket API on a 2-core/4GB VPS",
      ],
      features: [
        "TRX & TRC-20 token support",
        "Unique address generation per payment",
        "Missed-block recovery on reconnect",
        "Gas fee optimization",
      ],
      tech: ["Python", "AsyncIO", "WebSockets", "MongoDB", "TronGrid API"],
    },
    {
      title: "Calorine | AI Nutrition Tracker",
      date: "Feb 2026 - Present",
      icon: "🥗",
      description:
        "Snap photos of meals and get instant nutritional breakdowns. AI-powered platform converting visual data into macro feedback with smart journaling and analytics.",
      metrics: [
        { label: "Users", value: "1.2K+" },
        { label: "Accuracy", value: "95%" },
        { label: "Response", value: "<2s" },
      ],
      highlights: [
        "📸 Instant food recognition from photos",
        "🤖 AI-powered macro calculation",
        "📊 Smart journaling with progress tracking",
        "⚡ Sub-2 second image analysis",
        "🔐 Privacy-first with local storage option",
      ],
      architecture: "Next.js → FastAPI → TensorFlow/OpenAI Vision → PostgreSQL",
      features: [
        "Computer Vision: YOLOv8 + Custom food dataset",
        "Nutrition DB: 500k+ food items",
        "Smart suggestions based on dietary goals",
        "Meal pattern analysis & insights",
      ],
      tech: ["Next.js", "FastAPI", "Computer Vision", "PostgreSQL", "OpenAI"],
      links: {
        production: "https://calorine.in",
      },
    },
  ],
  education: [
    {
      school: "Binod Bihari Mahto Koyalanchal University",
      degree: "B.Com",
      year: "Feb 2028 (Expected)",
    },
  ],
  languages: [
    { language: "English", level: "Fluent" },
    { language: "Hindi", level: "Native" },
  ],
};
