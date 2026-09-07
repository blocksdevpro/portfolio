# Phase 2 implementation

Implemented 6 September 2026. The [approved plan](../../PORTFOLIO-PHASE-2-PLAN.md) and [reference review](REFERENCE-REVIEW.md) remain the design record.

## What changed

The portfolio retains its 768px frame, copper accent, and content order. The hero is shorter, headings and metadata have a more consistent scale, and primary actions have matching hover, focus, and press feedback. The role now comes from profile data.

Boris shows a speech → agent → voice pipeline. Calorine shows an API connected to its database, image storage, and AI provider. Both diagrams use typed content, visible captions, and vertically arranged services on mobile. Links and two useful highlights appear before the native engineering disclosure. Unsupported grant wording was removed.

Contact and command-menu copy actions share one lifecycle: pending, success, failure, and a two-second reset. Repeated attempts cancel older reset timers; closing the dialog invalidates unfinished attempts. Failures leave a selectable email visible. Work and About headings also offer a section-link copy action.

The command menu groups actions, keeps its result area stable during filtering, describes the selected Enter action, and offers Light, Dark, and System preferences. Theme transitions take 280ms. The existing navigation focus and history behavior remains.

The UK artwork has a localized copper light that follows a fine pointer. It stops on pointer exit, offscreen, in a hidden document, and with reduced motion. It is complete as static artwork on touch devices. The generated social card now uses the same UK geometry as the header and footer.

Activity adds month labels, an exact date interval, an intensity legend, and a selected-day outline. Keyboard selection scrolls within the graph. Music handles long titles and pauses equalizer motion while hidden. Loading and unavailable activity use the same reserved space.

## Visual decisions

Two hero compositions were rendered side by side: the existing separated drawing/profile and a connected portrait with a hatched work divider. The separated version keeps the identity and artwork readable without overlapping content. It is the shipped choice. The artwork was repositioned to keep the K inside its viewBox.

The compact header remains usable at 360px, so no second navigation bar was added. Static, distinct diagrams communicate both projects without requiring node selection. Sound, portrait variants, a bottom dock, and interactive nodes remain optional.

## Verification

- Production build, ESLint, and TypeScript checks pass.
- All 13 existing navigation/data module tests pass.
- All 24 Playwright browser tests pass against the production server.
- Axe WCAG A/AA scans report no violations at 360, 390, 768, 1280, and 1440px in light and dark themes, with an expanded project disclosure.
- No page-wide horizontal overflow in the width matrix. Touch emulation and 200% CSS zoom pass the automated journey checks.
- Browser regressions cover command filtering, no results, arrow selection, focus trapping/restoration, Escape/outside dismissal, direct hashes, reload and Back/Forward, explicit theme persistence, system appearance changes, clipboard success/failure/retry/reset, stale clipboard completion, activity selection, widget empty/malformed/failure/loading, long music titles, reduced motion, and no-JavaScript reading.
- The live HTTP verifier confirms the homepage, project links, anchor targets, portrait, favicon, social image, canonical-related routes, robots and sitemap. Both widget routes returned HTTP 200 with real provider data.

The preview responds to navigation and inspection, but its screenshot operation failed during this implementation. Visual review used an isolated Chromium test browser. This does not establish that preview screenshot capture is repaired.

## Reproducing the review

Run `bun run build`, then `bun run start --port 3100`. In a separate PowerShell terminal:

```powershell
$env:SITE_URL='http://localhost:3100'
bun run test:browser
bun run verify:site
node scripts/capture-phase2.mjs
```

The [implementation images](implementation/) contain hero, both projects, expanded details, search, contact feedback, activity, and the generated social card at 1280px/light and 390px/dark. Project element captures hide the sticky header and skip link so they do not cover the cropped content. Full-page test captures remain in the ignored `test-results/` directory. Widget screenshots contain the live response at capture time.

## Production performance

The final local production audit uses Lighthouse 13.4.1 and HeadlessChrome 152 with mobile simulation: 412?823 viewport, 4? CPU slowdown, 150ms RTT, and 1,638Kbps throughput. See the [machine-readable result](implementation/lighthouse-summary.json).

| Metric | Result | Target |
| --- | --- | --- |
| Performance | 91 | ?95, still open |
| Accessibility | 100 | ?95 |
| Best practices | 100 | ? |
| SEO | 100 | ? |
| LCP | 3.5s | ?2.5s, still open |
| CLS | 0 | ?0.1 |
| Total blocking time | 50ms | Lab measurement, not field INP |

An initial audit scored 90 performance; an isolated repeat scored 91. The final font/analytics change retains 91 and removes the local Vercel script 404. Font display is optional so slow loads can retain the metric-adjusted fallback; it did not establish a meaningful LCP improvement in this audit. The LCP element is the visible first-project description. Further delivery/critical-resource investigation is required to meet the performance target; this milestone is not complete.

## Remaining review limits

Physical-phone software-keyboard behavior, orientation changes, Safari/Firefox, a manual screen-reader pass, browser text-only zoom, modified clicks, and hidden-tab polling have not received a complete manual review. CSS zoom and touch emulation are useful checks but do not replace those reviews. Automated accessibility scores do not establish full accessibility. Field INP requires real visitor data. No deployment was performed.
