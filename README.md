# Uttam Kumbhakar's portfolio

Source for [blocksdev.pro](https://blocksdev.pro), my portfolio for Rust backend work and projects. The site uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Run locally

Install the dependencies and start the development server:

```bash
bun install
bun run dev
```

Open [localhost:3000](http://localhost:3000).

The Last.fm widget needs two optional environment variables. Copy `.env.example` to `.env.local`, then set `LASTFM_API_KEY` and `LASTFM_USERNAME`. The widget shows an unavailable state when either value is missing.

## Available commands

```bash
bun run dev        # Start the development server
bun run build      # Create a production build
bun run start      # Serve the production build
bun run lint       # Run ESLint
bun run typecheck  # Check TypeScript types
```

## Project structure

- `src/app` contains the page, metadata, styles, sitemap, robots file, and API routes.
- `src/components` contains page sections and interactive components.
- `src/constants/resume.ts` contains profile details, experience, projects, skills, and links.
- `src/lib` contains navigation and external data parsing helpers.
- `public/portrait.webp` is the profile image.

GitHub activity loads through `/api/contributions`. Recent music loads through `/api/spotify`, which uses Last.fm data and links tracks to Spotify search. Vercel Analytics loads only on Vercel deployments.
