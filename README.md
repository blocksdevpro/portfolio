# Uttam Kumbhakar's portfolio

The portfolio at [blocksdev.pro](https://blocksdev.pro), built with Next.js, React, TypeScript, and Tailwind CSS. The homepage introduces Uttam's Rust and backend work, with live links to [Boris](https://boris.blocksdev.pro) and [Calorine](https://calorine.in).

Run the local app with Bun:

```bash
bun install
bun run dev
```

Open [localhost:3000](http://localhost:3000). If a development server already runs in this workspace, reuse it.

Edit profile, project descriptions, links, experience, and education in `src/constants/resume.ts`. The page composition is in `src/app/page.tsx`. Shared visual tokens and component styles are in `src/app/globals.css`.

The page renders static content on the server. Interactive components handle the command menu, themes, local time, clipboard actions, and activity widgets. The native project disclosures and ordinary links also work without JavaScript.

GitHub activity comes through `/api/contributions`. The route validates calendar dates, caches the provider response for an hour, and returns an explicit unavailable state on failure. The graph's date slider exposes daily details to keyboard and touch users.

The music widget uses Last.fm recent tracks and links to Spotify search. Set `LASTFM_API_KEY` and `LASTFM_USERNAME` in `.env.local`, using `.env.example` as a guide. Credentials stay in the server route. Missing configuration or a failed request produces an unavailable state. Polling pauses when the page is hidden.

The portrait and the actual Boris desktop screenshot are local WebP files under `public/`. The screenshot came from `blocksdevpro/boris-assistant/website/public/boris-screenshot.png`. Calorine's architecture illustration follows its repository's documented stack.

Run the checks:

```bash
bun run lint
bunx tsc --noEmit
bun run verify:interactions
bun run build
```

With the app running, check the rendered page, assets, metadata, and live API routes:

```bash
bun run verify:site
# Use another running instance if needed:
SITE_URL=http://localhost:3100 bun run verify:site
```

`verify:interactions` executes the actual navigation and data parsing modules. It covers sticky-header offsets, focus transfer, reduced motion, browser history, calendar alignment, and malformed external data. `verify:site` checks HTTP responses from the running application. Neither replaces a browser review of layout, focus trapping, or animation.

The remaining visual review is described in `PORTFOLIO-OVERHAUL-PLAN.md`. Check desktop and mobile layouts in both themes, keyboard navigation, command-menu focus restoration, copy feedback, and reduced motion before deployment.
