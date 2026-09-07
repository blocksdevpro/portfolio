# Portfolio Phase 2: detail, feedback, and browsing experience

Prepared 6 September 2026 for Uttam Kumbhakar / blocksdev.pro.

Phase 1 is implemented. Phase 2 refines the existing portfolio until its spacing, information hierarchy, interactions, and mobile presentation feel deliberate throughout the visit. The main reference is [chanhdai.com](https://chanhdai.com/), inspected in the preview browser and supported by its public source. The [detailed reference review](docs/phase-2/REFERENCE-REVIEW.md) records observations, exact motion settings, screenshots, and review limits.

Implementation update, 6 September 2026: the core work in milestones A–D is implemented. The original proposal remains below as the design record. See [implementation and verification](docs/phase-2/IMPLEMENTATION.md) for shipped decisions, browser evidence, measured performance, and the remaining physical-device and screen-reader review. The acceptance checklist below describes the complete review scope; unchecked composite items must not be read as a claim that every part has been verified.

## 1. The intended experience

A visitor should recognize Uttam's specialty, encounter two convincing projects, inspect the engineering, and contact him without friction. Each interaction should acknowledge what happened in the place where it happened.

The reference's strongest lesson is how its details agree: repeated text edges, quiet metadata, consistent row feedback, and a small number of memorable interactions. Apply that consistency to the portfolio's existing copper accent, UK mark, and Rust focus.

Keep the current page order and 768px frame. Make the first project feel worth exploring, the diagrams worth reading, and the controls pleasant to use repeatedly.

## 2. Current baseline and feedback

The initial checkout was at `7f37fc4`. During the review, the workspace changed Boris from a screenshot to an architecture illustration and added an explicit project category. The baseline below is that inspected diagram version. Both Boris and Calorine use diagrams. The earlier screenshot-based proposal is historical context. Further application edits appeared while the planning documents were being written, including a separate Boris architecture component. Those in-progress edits are outside this baseline and need their own final browser review.

| Area | Current result | Phase 2 feedback |
| --- | --- | --- |
| Page structure | Shared frame, early projects, contact section, and smaller personal widgets are implemented | The composition is a sound foundation. Tighten the visual hierarchy within it |
| First screen | At the observed desktop width, Selected work begins around 635px down the document. On the initial 390px review its heading begins around 540px | Preserve this proximity. Do not let a larger graphic push work several screens away |
| UK illustration | Original SVG with fine-pointer color/opacity feedback | Add localized lighting and a more intentional relationship with the profile. Keep the static drawing complete |
| Typography | Name is prominent, but mobile role text is 9px, diagram descriptions are 8px, and technology labels are 10px | Increase meaningful metadata to 12–13px and project prose to 14–15px on mobile. Reflow instead of shrinking |
| Section headings | 17px mobile / 18px desktop, with repeated right-hand phrases | Try 20–22px mobile / 22–24px desktop. Use useful context such as a project count instead of generic decoration |
| Project media | Both projects now use the same branching diagram layout | Keep the shared visual language, but give Boris a voice/agent flow and Calorine an API/data flow |
| Project evidence | All engineering highlights, including the grant claim, sit inside disclosures | Show one or two verified highlights before expansion. Keep the detailed explanation below |
| Diagram captions | Both current figures display `01`; source descriptions are hidden visually | Number figures deliberately and add a readable visible description of what each figure represents |
| Navigation | Real anchors, sticky header, active state, and focus transfer exist | Refine the active indicator and equivalent hover/focus feedback. Exercise rapid navigation and history in a browser |
| Command menu | Search, nine actions in the observed state, selection, and focus restoration exist | Refine grouping, action hints, empty-state feedback, and overlay motion. Add an explicit System theme action |
| Copy | Success and failure messages exist, with a 3-second reset in the contact component | Animate the icon in place, reserve feedback space, and unify contact and command-menu behavior |
| Activity | A live graph and keyboard/touch date slider work with explicit data states | Add months, date range, intensity legend, selected-day treatment, and a clear mobile scrolling cue |
| Contact and music | Email is visible; listening activity renders independently | Give email an unmistakable action affordance and prevent long tracks or status feedback from shifting the layout |
| Content model | Timezone is explicit. Project status is still hardcoded in the renderer | Model project status before supporting other states. Do not add an availability claim without confirmed copy |

Reviewed project presentation: [desktop baseline](docs/phase-2/evidence/portfolio-projects-desktop.png). Mobile feedback in the table comes from the earlier 390px inspection, before subsequent application edits.

## 3. Visual refinement

### Frame and spacing

Keep one owner for each border so adjacent elements do not create double rules. Align headings, descriptions, media, and footer content to shared inner edges. Use 24px desktop and 16px mobile content padding unless a component's content requires a documented exception.

Prototype two treatments for major section breaks: the current continuous rules and restrained 16–24px hatched bands. Compare the hero-to-work and work-to-experience transitions in both themes. Prefer the simpler treatment wherever the band adds empty height without improving grouping.

Use decorative full-width rules only at major boundaries. Keep the page free of horizontal overflow, including at 200% text zoom. Test actual border contrast separately from text and focus contrast.

### Type and copy

Keep Inter for reading and JetBrains Mono for dates and short technical labels. Reserve uppercase for occasional short labels. Essential information should not depend on 7–10px text.

Keep the specialty visible and static. Make the hero role come from the profile data. Review the name at 360px with the real portrait beside it; allow a balanced wrap rather than reducing it until it becomes weak.

Replace generic section annotations with facts when useful: `2 active projects`, the relevant work period, or the activity date range. Omit annotations that repeat the heading. Preserve genuine project descriptions and the accurate education details.

### UK graphic and personal detail

Compare the current separate illustration band with a composition that connects the portrait/name row more closely to the drawing. Use the real name and both themes in the comparison. Target roughly the current hero height, with the project heading still near the initial desktop fold.

The preferred interaction is a localized copper highlight that follows a fine pointer within the illustration. It should settle when the pointer leaves and stop when the graphic is offscreen. Use CSS custom properties or SVG gradient coordinates updated through a small client component; do not rerender the whole page for pointer movement.

A press response is optional. If pressing the graphic triggers anything, give the control a meaningful accessible name and keyboard activation. Keep purely decorative paths hidden from assistive technology. Under reduced motion, render the finished static illustration.

Retain the current portrait. A lighting toggle requires suitable alternate artwork and is an optional later experiment. A rotating personal note may be tried in a reserved line, but must not replace the role or primary description.

## 4. Project details should reward exploration

Each project should present this sequence:

1. Name, category, and meaningful status.
2. A concise purpose and independent Live site / Source actions.
3. Its architecture illustration and a visible caption.
4. One or two concrete engineering highlights.
5. A short technology list and an Engineering details disclosure.

Move or repeat the primary project links above the diagram only if browser review shows the existing lower placement is too hard to find. Avoid filling the card with duplicate actions.

**Boris.** Explain speech input, agent decisions, approval-controlled tools, and voice output. Distinguish local speech processing from language models reached through OpenRouter. The diagram should not imply that every stage runs locally. Use a compact flow on desktop and a readable vertical flow on mobile. The explanation should make the engineering choices visible without requiring a visitor to know every library name.

**Calorine API.** Explain the authenticated API, PostgreSQL data, R2 images, and OpenRouter meal analysis. Keep service relationships distinct from a chronological request sequence. If an example sequence is shown, label it as an illustrative request flow and derive it from the documented implementation.

**Optional diagram exploration.** Selecting a node can highlight its connections and show one sentence in a fixed detail area. Provide the same selection through click, touch, and keyboard. This is explanatory UI, not a live system monitor. Never display fabricated throughput, latency, or operational status. Start with static readable diagrams and add this interaction only if it improves comprehension.

**Disclosures.** Preserve native `details`/`summary` behavior and no-JavaScript access. Animate the chevron and, where supported, a short content transition. Keep a plain instant fallback. Rapid open/close actions should reverse or settle cleanly without clipped text, misplaced focus, or a long queue of animations. Never make the entire multi-action project card a button.

**Evidence.** Link the Boris grant to a public source if available. Otherwise omit the claim from the prominent summary until supported. Preserve both active project destinations, already confirmed in the earlier work. Add performance metrics only when measured and attributable.

## 5. A consistent feedback system

These are proposed portfolio values. They are intentionally separate from the measured reference settings.

| Action | Proposed response | Timing / movement | Keyboard, touch, and reduced motion |
| --- | --- | --- | --- |
| Hover a link | Text or surface changes; directional arrow nudges | 140–180ms; up to 2px | Visible focus gets equivalent emphasis; touch never depends on hover; no movement with reduced motion |
| Press a button | Slight compression, then release | 80–120ms down; 140–180ms release; scale around 0.98 | Keep the hit area fixed and at least 44px for primary controls; remove scaling with reduced motion |
| Copy email or section URL | Idle icon becomes a check only after success; failure explains how to copy manually | 180–240ms icon swap; 1.5–2 seconds success visibility | Reserve width; announce through a status region; repeated presses restart the reset timer |
| Open project details | Chevron changes immediately; content enters beneath its own summary | 150–220ms; optional 2–4px content travel | Native disclosure semantics, logical focus order, instant reduced-motion fallback |
| Change active section | Marker moves or fades to the new link | 160–200ms | Preserve anchors, history, modified clicks, and `aria-current`; marker must not be the only cue |
| Open command menu | Panel appears with subtle opacity/scale response and focused search | 160–220ms; scale 0.98→1 | Modal behavior, Escape, focus trap, and restoration; instant reduced-motion state |
| Search or select a result | Highlight follows selection; results and action hint update in place | Immediate result update; at most 100ms visual emphasis | Expose the selected result; no delayed execution; accessible empty state |
| Change theme | Theme responds promptly; icon confirms the destination | Compare instant palette change with a 220–300ms existing circular reveal | Explicit Light/Dark/System choices; no reveal with reduced motion; repeated clicks must settle |
| Explore activity | Selected day and readable detail update together | Immediate data update; 100–140ms highlight | Slider remains keyboard/touch accessible; selected date remains in view |
| Enter a section | Optional one-time fade for secondary material | 180–220ms; at most 4px | Hero and essential text are immediately visible; no blur on reading text; no reveal dependency without JS |

One action gets one dominant response. For example, copy success needs the local check and status text; it does not also need a toast, a bouncing button, and a sound.

Use contextual tooltips on icon-only actions. Show them on keyboard focus, retain explicit accessible labels, and avoid hiding required explanations inside them. Add section-link copying to Work, About, and Contact only if it remains discoverable on touch.

Sound is an optional final experiment with a visible preference and a silent default. The reference contains intentional sound hooks, but visual feedback must carry the full meaning independently. Do not introduce sound or haptic libraries merely to match its dependency list.

## 6. Mobile should feel designed for the device

The reference moves search/menu access to the bottom on mobile. Compare two approaches for this smaller portfolio:

| Approach | Benefit | Cost | Initial preference |
| --- | --- | --- | --- |
| Keep the compact header | Three section links stay obvious; preserves the current reading area | Less reachable near the thumb | Preferred if 360px labels and controls remain comfortable |
| Small bottom action bar | Work, search, and contact become easier to reach | Permanent overlay, safe-area handling, and potential keyboard conflicts | Prototype only if the header becomes cramped or travel feels excessive |

Use actual side-by-side browser prototypes during implementation before choosing a new navigation pattern. Do not ship both full navigation systems at once.

Reflow diagram services vertically or into clear stacked groups at narrow widths. Keep technology labels readable and allow wrapping. Shorten `X / Twitter` to `X` if needed to keep the social strip balanced. Maintain a visible text identity for each social link.

Verify the command menu with the software keyboard, portrait/landscape changes, and long search results on a real phone. Ensure any bottom controls respect safe areas and do not cover the final contact action. Viewport simulation alone does not establish those behaviors.

## 7. Secondary sections need the same finish

**Experience and education.** Align dates and logos/icons, retain readable company and university names, and keep the content proportionate. The existing single work entry does not need the reference's nested company/role disclosure hierarchy. Use the most informative responsibilities first.

**About and stack.** Keep the grouped stack. Give the About copy a distinct purpose rather than repeating the hero. A short personal detail may add warmth, but it needs authentic content. Avoid turning the technology list into an endless animated carousel.

**Activity.** Add month labels, exact start/end dates, and a less-to-more legend. Tie hover and slider selection to one selected date. Highlight the corresponding day and scroll it into the graph's viewport when needed. Keep the current range input unless a replacement demonstrably improves both keyboard and touch use.

**Contact.** Refine the email link and copy control as a single aligned row with independent hit areas. Reserve space for success and failure text. Keep a selectable email visible after a clipboard failure. Test long text and 200% zoom.

**Music.** Keep the listening detail small and secondary. Preserve idle, loading, failure, and track states. Pause decorative equalizer motion as well as unnecessary polling when the page is hidden. Check long artist/title wrapping without changing the surrounding contact layout.

**Footer and sharing.** Refine the existing favicon, social-preview card, and footer to match the final UK treatment. Check the real generated social image. Add a source link if the intended repository is public. A full build-metadata colophon is optional for this portfolio.

## 8. Implementation ownership

Keep static content in Server Components and introduce small client boundaries for behavior. Shared tokens belong in `globals.css`; components own their own interaction state.

| Owner | Planned responsibility |
| --- | --- |
| `src/app/globals.css` | Type, spacing, borders, feedback timings, focus parity, responsive rules, reduced-motion fallbacks |
| `src/components/brand.tsx` and optional `brand-interaction.tsx` | Static UK geometry separated from pointer/press state |
| `src/components/section-heading.tsx` | Heading hierarchy, useful detail text, optional section-link action |
| `src/components/sections/hero.tsx` and `local-time.tsx` | Profile composition, static specialty, stable time display |
| `src/components/sections/projects.tsx` | Summary/detail hierarchy and project action placement |
| Optional `src/components/project-architecture.tsx` | Typed diagram content, selected node, fixed explanatory area |
| `src/types/resume.ts` and `src/constants/resume.ts` | Explicit category/status, diagram nodes/relationships, supported evidence, summary highlights |
| `src/components/copy-email.tsx` and optional `src/hooks/use-copy-feedback.ts` | Shared clipboard success/failure/reset behavior used by contact and command actions |
| `src/components/command-menu.tsx` | Search, selection, grouped actions, explicit theme choices, dialog focus |
| `src/components/sections/header.tsx` and `src/lib/scroll-to-section.ts` | Active location, navigation ownership, sticky clearance, browser history |
| `src/hooks/use-theme-transition.ts` and `mode-switcher.tsx` | Theme preference and guarded transition; preserve the existing fallback behavior |
| `src/components/sections/activity.tsx` | Date labels, legend, selected-day highlight, graph scrolling |
| `src/components/sections/contact.tsx`, `spotify.tsx`, and `footer.tsx` | Contact alignment, stable feedback, music states, closing details |

Use a shared clipboard hook because two existing callers need the same lifecycle, rather than a generic animation framework. Model clipboard state as `idle`, `pending`, `copied`, or `failed`. Each copy attempt owns its reset timer; a later attempt must not be reset by an earlier timer.

For interactive diagrams, use typed nodes with stable IDs, labels, descriptions, and relationships. Keep project content in the resume data instead of adding more `projectId === "boris"` branches. The diagram owns only the selected node ID. Selecting a node changes the highlight and explanation together.

For themes, model the saved preference as `system | light | dark`, separately from the currently resolved light/dark palette. The theme provider remains the source of truth. Existing transition guards and dialog-navigation focus sequencing are constraints to preserve, not incidental code to replace during styling.

Start with CSS, SVG, and the Web Animations API where needed. A dedicated motion library is an alternative only if several validated interactions require complex spring or layout coordination and the production bundle cost is acceptable.

## 9. Delivery sequence

| Milestone | Work | Reviewable result / completion condition |
| --- | --- | --- |
| A. Visual precision | Type scale, border ownership, section hierarchy, spacing, mobile diagram reflow, useful captions | Hero and both projects reviewed in light/dark at desktop and mobile widths; no essential microtext |
| B. Feedback consistency | Link/focus/press states, copy icon lifecycle, disclosures, command menu, theme choices | Work → details → search → contact → copy journey works repeatedly without jumps or ambiguous state |
| C. Signature detail | Compare hero compositions and static versus pointer-lit UK artwork | One chosen original treatment, complete when static, responsive when interactive, stopped offscreen |
| D. Information polish | Visible project highlights, distinct diagrams, activity context, long-text handling, final footer/share assets | Projects explain different engineering decisions; activity is understandable; contact remains stable in every state |
| E. Browser finish | Full layout, input, motion, failure-state, and production review | Recorded evidence satisfies the checklist below; remaining limitations are explicit |

Keep optional portrait variants, rotating personal copy, a mobile dock, sound, and diagram node exploration behind the main milestones. Finish the core experience before adding another effect.

## 10. Verification and carryover from Phase 1

During this review, lint and TypeScript checks passed. All 13 existing interaction-module tests passed. `verify:site` passed against the running development app, including both widget routes returning HTTP 200. The browser confirmed the local command menu opens with search focus and Escape returns focus to its trigger. These checks preceded subsequent application edits. They support the reviewed baseline, not a completed Phase 2 acceptance claim.

Phase 1's production performance measurements, comprehensive browser matrix, screen-reader review, and real-device checks remain unverified. Complete them as the final Phase 2 delivery checks. This does not reopen the completed Phase 1 implementation.

Acceptance checklist:

- [ ] Review 360, 390, 768, 1280, and 1440px widths in both themes, plus 200% text zoom. No page-wide horizontal scrolling.
- [ ] Verify meaningful text contrast, focus visibility, 44px primary control targets, and consistent focus/hover emphasis.
- [ ] Capture the first screen, both project entries, expanded details, command search, contact feedback, and activity at desktop and mobile sizes.
- [ ] Run the complete journey using mouse, keyboard, and touch. Include rapid repeated actions, Escape, outside-click dismissal, empty search, and return focus.
- [ ] Test direct hash visits, reload, Back/Forward, modified clicks, and navigation while a previous smooth scroll is still in progress.
- [ ] Verify clipboard success, denied access, repeated clicks, and reset timing. Confirm failure never shows success.
- [ ] Verify Light, Dark, and System preferences across reloads. Check first paint and rapid theme changes.
- [ ] Verify reduced motion and no-JavaScript reading. Keep the hero, ordinary links, and native disclosures usable.
- [ ] Exercise activity and music loading, empty, malformed, failed, and success states in the browser. Check layout stability and hidden-page behavior.
- [ ] Check every project/source/contact destination, favicon, canonical metadata, robots, sitemap, and generated social image.
- [ ] Run `bun run lint`, `bunx tsc --noEmit`, `bun run verify:interactions`, `bun run verify:site`, and `bun run build` on the final implementation.
- [ ] Add browser regressions for the key journeys, not assertions that only match CSS classes. Keep the existing module tests.
- [ ] Measure the production build under documented Lighthouse mobile conditions. Retain Phase 1 targets of performance/accessibility ≥95, LCP ≤2.5s, and CLS ≤0.1. Field INP ≤200ms requires actual user data and is not established by a lab run.
- [ ] Review a real phone and a screen reader before declaring the interaction work complete.

The next review is on a physical phone and with a screen reader. Optional sound, portrait variants, a mobile dock, and selectable diagram nodes remain deferred.
