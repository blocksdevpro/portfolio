# Portfolio overhaul plan

Prepared 6 September 2026 for Uttam Kumbhakar / blocksdev.pro.

Build a precise, minimal portfolio that expresses Uttam's work in Rust, asynchronous backends, and local AI. The intended impression is confident engineering with meticulous presentation. The primary visitor is a potential employer or collaborator; the primary journey is understanding Uttam's specialty, inspecting his work, and contacting him.

The first implementation is now in the application. Both projects are active, as confirmed by Uttam: Boris at https://boris.blocksdev.pro and Calorine at https://calorine.in. The implementation uses the authentic Boris screenshot and the documented Calorine backend architecture. The next pass is a hands-on browser review of desktop, mobile, keyboard behavior, and motion.

**Evidence and review limits**

Reviewed the [live reference homepage](https://chanhdai.com/), its [public repository overview](https://github.com/ncdai/chanhdai.com), the author's published [dark screenshot](https://assets.chanhdai.com/images/screenshot-desktop-dark.webp?t=1778602757) and [light screenshot](https://assets.chanhdai.com/images/screenshot-desktop-light.webp?t=1778602757), and the [social links](https://chanhdai.com/blocks/marketing/social-links-01) and [Line Nav](https://chanhdai.com/components/line-nav) documentation. Screenshots illustrate published desktop designs; they are not fresh captures of the current deployment. The interactive browser connection was unavailable, so mobile rendering, hover feel, keyboard behavior, animation smoothness, and measured performance remain unverified. Current portfolio findings below come from its actual source files, not the older source dump in project.md.

**1. What makes the reference compelling**

The published screenshots show a narrow central frame, continuous vertical rails, and horizontal rules tying the profile, metadata, and socials together. A large wireframe brand graphic supplies the focal point. The portrait introduces warmth; restrained icons, monochrome surfaces, and distinct name/body/metadata typography establish hierarchy. Both themes preserve the same structure. These choices make the page feel like a coherent composition. [Dark reference](https://assets.chanhdai.com/images/screenshot-desktop-dark.webp?t=1778602757), [light reference](https://assets.chanhdai.com/images/screenshot-desktop-light.webp?t=1778602757).

The live homepage combines personal identity, work, and substantial supporting content. Its breadth fits an established design engineer with a component registry. Uttam's two projects should receive a more direct path from the introduction. [Reference homepage](https://chanhdai.com/).

The social block documentation illustrates shared borders, generous clickable areas, and subtle hover surfaces. The navigation documentation describes explicit active markers. These are useful interaction principles; their runtime quality still needs hands-on review. [Social block](https://chanhdai.com/blocks/marketing/social-links-01), [navigation](https://chanhdai.com/components/line-nav).

**2. Current portfolio: keep and improve**

| Area | Source finding | Planned change |
| --- | --- | --- |
| Foundation | Next.js 16, React 19, Tailwind 4, theme provider, reusable sections, centralized resume data | Retain the stack and content architecture |
| Hierarchy | Projects follow socials, Spotify, About, stack, and experience | Place selected work directly after the compact introduction and social links |
| Hero | Role appears as subtitle and again inside an information card; avatar is rotated with a heavy shadow | State the role once; align portrait and typography to the page frame |
| Visual language | Rounded metadata cards, colored skill pills, timeline, project rules, and reactive dots use different treatments | Introduce shared spacing, surfaces, borders, type, and icon rules |
| Projects | Both entries have detailed text and technology lists, with no product preview | Give Boris a real screenshot and Calorine a clearly labelled architecture illustration |
| Contact | Email is present in metadata, footer, and command menu | Add an unmistakable email action in the hero and a closing contact section |
| Personal details | Time uses the visitor's timezone; availability is hardcoded | Display Asia/Kolkata time labelled IST and model availability explicitly |
| Activity | GitHub fetching is coupled to About; failures can leave a misleading zero total | Separate activity, validate responses, and distinguish unavailable from actual zero |
| Controls | Command menu already supports search, arrows, copy feedback, theme switching, and navigation | Preserve useful behavior and verify focus semantics and keyboard selection |
| Verification | Existing interaction script checks source patterns | Preserve relevant regressions; add browser behavior checks when implementing |

**3. Proposed art direction**

Use a neutral frame with one small copper accent associated with Rust. Reserve green for genuine status. Keep the portrait and project media in natural color. Make geometry, spacing, and typography the dominant visual tools.

These are proposed starting values, not measurements of the reference:

| Token | Proposal |
| --- | --- |
| Content frame | 768px maximum outer width; 24px desktop and 16px mobile inner padding |
| Background | Light: #FAFAFA; dark: #0B0B0C |
| Raised surface | Light: #FFFFFF; dark: #121214 |
| Primary text | Light: #18181B; dark: #F4F4F5 |
| Secondary text | Light: #606068; dark: #A1A1AA |
| Dividers | Light: #E4E4E7; dark: #27272A; interactive boundaries checked separately |
| Copper accent | Light: #9A431E; dark: #E5A17A; verify each text/background pairing |
| Typography | Keep Inter for prose and headings, JetBrains Mono for dates, short labels, shortcuts, and diagrams |
| Name | 40px desktop / 32px mobile, tight tracking, about 1.1 line height |
| Section titles | 20px / 24px line height, semibold |
| Reading text | 15–16px / 24–26px line height |
| Metadata | 12–13px; avoid the existing 10px uppercase technology lists |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64px scale |
| Corners | 6px controls; 10px media and dialogs; content sections joined by rules |
| Shadows | Minimal; primarily for overlays |

Create an original UK monogram as a restrained SVG construction drawing with a few connection points. Position it in a shallow hero band, approximately 160px high on desktop and 88px on mobile. Use it as the signature graphic. Keep decorative lines separate from functional boundaries so subtle decoration never makes controls hard to identify. The SVG remains decorative and hidden from assistive technology.

Replace the page-wide pointer grid with this localized graphic. A fine-pointer hover may brighten one path or node. Its default static state must already look complete. Keep the first project close to the first screen rather than allowing the graphic to dominate the page.

**4. Page composition and content**

Reading order:

1. Slim navigation: UK, Work, About, Contact, quick actions, theme toggle.
2. Shallow signature graphic and profile introduction.
3. Compact location/status row and social links.
4. Selected work: Boris, then Calorine API.
5. Experience.
6. About and grouped stack.
7. GitHub activity.
8. Education.
9. Contact, optional Spotify detail, and compact footer.

Hero draft, based on the existing resume content:

> Uttam Kumbhakar
>
> Rust backend developer.
>
> I build async backend systems, local AI applications, and developer tools.
>
> View work → · Email me ↗
>
> Jharkhand, India · HH:MM IST

Use a 72–88px upright portrait beside the identity where space permits. Allow the full name to wrap naturally. Remove the unexplained verification mark. Show availability from an explicit data field; confirm the current hardcoded claim before publishing revised availability copy. Group GitHub, LinkedIn, and X into one ruled strip with consistent arrow placement and accessible labels.

**Boris:** Give this the strongest project presentation: short title, one-sentence purpose, actual product screenshot in a consistent media frame, a small evidence line, and two concise engineering highlights. Show the grant claim only as supported by the existing project content and preferably link its evidence before launch. Use “Visit project” and “Source” as independent links. Suggested summary: “A local AI voice assistant for Windows, built in Rust.” Keep detailed wake-word, speech, agent, and desktop architecture available in an accessible disclosure below the summary.

**Calorine API:** Use a similarly composed entry with less visual weight. Suggested summary: “A Rust backend for calorie tracking, authentication, and AI meal analysis.” Create a clearly labelled architecture illustration from the documented Axum, PostgreSQL, Cloudflare R2, and OpenRouter stack. Include both the live application at https://calorine.in and Source. Add API documentation only if a working destination exists.

Show roughly four core technologies per project in the summary; expose the complete list with the engineering details. Keep both projects' purpose, main links, and evidence visible without expansion. Use consistent disclosure buttons with explicit labels, chevron state, and aria-expanded. Avoid making a whole multi-action project row clickable.

Experience should be a clean company/role/date row followed by two or three concrete responsibilities from existing content. Keep the full date range and remote context; do not invent performance percentages. Group the stack as Languages, Backend, Data, and Infrastructure using neutral text rows and restrained icons. Retain the B.Com accurately and give it proportionate space.

End with “Have a backend project in mind?” and a visible mailto link plus a separate copy-email action. Put Spotify here as a small personal detail. Do not add a contact form or resume-download button without the corresponding working service or file.

**5. Interaction specification**

| Interaction | Required behavior |
| --- | --- |
| Header | Sticky, about 56px tall, lightly opaque after scroll; position and height remain stable |
| Navigation | Real hash anchors; meaningful active state; sticky clearance; working direct links, reload, and Back/Forward |
| Keyboard navigation | Skip link; visible focus; section navigation moves focus appropriately; modified clicks retain expected browser behavior |
| Command menu | Click trigger plus Ctrl/Command+K; accurate platform hint; Escape; arrows; Enter; visible empty state; selected result exposed to assistive technology |
| Dialog model | Choose explicit accessible modal behavior; preserve scroll position on open/close and existing navigation focus-race fixes |
| Links | Subtle text/surface transition in 140–180ms; arrows move at most 2px; equivalent focus treatment |
| Copy email | Announce success only after clipboard success; retain visible selectable email and clear failure feedback |
| Theme | System default with persistent override; check first-paint flash; retain guarded theme transition and reduced-motion fallback |
| Reveals | Hero immediately readable; below-fold entries may fade/translate 4–6px over 180–240ms once; no blur on reading text |
| Reduced motion | Static schematic, instant theme change, no movement or continuous animation |
| Touch | Minimum 44px primary control targets; no hover-only information or actions |
| Async widgets | Reserved dimensions; validated data; loading/empty/error/success states; unavailable data never becomes a fabricated zero |

For GitHub activity, cache validated responses server-side and provide a readable summary with date range and a GitHub link. Use calendar dates consistently to avoid timezone shifts. Keep any horizontal scrolling inside the graph with a visible affordance; avoid hundreds of tab stops. Detail access must also work with keyboard or touch, such as a roving selection with a shared readable detail panel.

Spotify should distinguish a real idle state from a request failure. Keep its footprint stable, and suspend unnecessary polling while the document is hidden. Both external widgets must fail independently of the portfolio content.

**6. Implementation sequence and file map**

1. **Foundation and hierarchy.** Establish tokens in src/app/globals.css and the framed shell in src/app/layout.tsx. Recompose src/app/page.tsx. Refine header.tsx and hero.tsx, create the UK SVG, and unify section headings/dividers. Review the first screen and Boris entry in both themes and on mobile before extending the treatment.
2. **Project presentation and content.** Rework projects.tsx; add genuine media under public/projects/. Extend src/types/resume.ts and src/constants/resume.ts with stable project IDs, optional image/alt text, concise summaries, evidence links, availability, and timezone. Reuse existing architecture/features/challenges fields where appropriate. Rework experience.tsx, tech-stack.tsx, education.tsx, socials.tsx, and footer.tsx; add a contact section.
3. **Interaction and data quality.** Refine command-menu.tsx, scroll-to-section.ts, viewport-reveals.tsx, and use-theme-transition.ts. Extract contributions from about.tsx into an isolated widget with a server-side data boundary. Refine spotify.tsx and its existing API route. Remove unused pointer-grid code after replacing its visual role.
4. **Delivery polish.** Add intentional favicon and social-preview artwork, canonical/Open Graph metadata, sitemap and robots routes. Check all assets and destinations. Review mobile, keyboard, themes, failure states, and production build performance. Update the README to describe this portfolio.

Keep page composition and static sections as Server Components where practical; isolate state, DOM events, and browser APIs in small Client Components. Audit icon imports before moving a component across that boundary. Use CSS and SVG for the planned decoration and motion. Existing libraries are sufficient for this scope.

The existing scripts/verify-interactions.mjs encodes specific old styling, including the pointer grid and absence of a navigation underline. Revise those contracts deliberately alongside the corresponding design changes. Preserve the behavioral regressions they were protecting, especially scroll position and focus restoration; a regex pass alone is not interaction evidence.

**7. Acceptance criteria**

- Within a brief first glance, a visitor can identify Uttam, his Rust/backend specialty, and a route to work and contact. On a typical desktop viewport the selected-work heading or first project should begin near the fold; validate using real copy and media.
- Inspect 360, 390, 768, 1280, and 1440px widths in light and dark themes. Check 200% text zoom, long project titles, the full email, and the university name. No page-wide horizontal scrolling.
- Shared content edges, divider positions, icon sizes, and spacing are consistent across every section. Project screenshots are legible and correctly cropped; placeholders do not ship.
- Verify normal text contrast of at least 4.5:1 and functional controls/focus indicators against applicable contrast requirements. Decorative faint lines are not used as the sole interactive affordance.
- Complete the key journeys using mouse, touch, and keyboard: navigation, project links/disclosures, command search, copy success/failure, theme switching, and contact. Verify logical focus order and dialog announcements with a screen reader.
- Check GitHub and Spotify loading, empty, malformed, failed, and successful responses. No misleading statistics or disruptive layout shifts.
- Reduced motion and JavaScript-disabled reading preserve all essential content and ordinary links. Slow external services do not delay primary content.
- Run bun run lint, bunx tsc --noEmit, bun run build, and the updated interaction checks. Add a small browser regression suite for the important journeys, not tests that merely assert class strings.
- Measure the production build. Targets: Lighthouse mobile performance and accessibility at least 95 under documented conditions; LCP at most 2.5s, CLS at most 0.1, and field INP at most 200ms when enough real-user data exists. These are targets, not current scores or guarantees.

**8. Inputs to resolve during implementation**

Use current portrait and real resume data as the starting point. Obtain or capture an authentic Boris screenshot; verify the Calorine architecture against its project. Confirm availability and any grant evidence before publishing those claims. A downloadable resume and dedicated case-study routes can be added later when supporting content exists. The first release should give the existing two projects complete, polished presentations.

The first implementation milestone is a reviewable homepage shell, hero, and Boris entry in both themes and at desktop/mobile widths. Once that composition is sound, carry its rules through the remaining sections and complete interaction verification.
