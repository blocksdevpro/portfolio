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

The portrait is a local WebP file under `public/`. Boris and Calorine use architecture illustrations built into the page, showing their documented components in a shared visual style.

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

The Phase 2 browser suite covers five viewport widths in both themes, accessibility scans, keyboard and touch journeys, theme persistence, clipboard failures and retries, widget states, and reading without JavaScript:

```bash
bunx playwright install chromium
bun run test:browser
```

Set `SITE_URL` to test another running instance. For example, in PowerShell: `$env:SITE_URL='http://localhost:3100'`. Run `node scripts/capture-phase2.mjs` against a production server to regenerate the desktop and mobile review images (defaults to port 3100).

See [Phase 2 implementation and verification](docs/phase-2/IMPLEMENTATION.md) for results, visual decisions, and remaining real-device checks. Vercel Analytics is included only in Vercel builds. Fonts use an adjusted fallback if they cannot load promptly, avoiding a late text swap on slow connections.
