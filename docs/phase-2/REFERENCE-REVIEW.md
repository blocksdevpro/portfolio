# Reference review: the details behind chanhdai.com

Reviewed 6 September 2026. This review supports the [Phase 2 plan](../../PORTFOLIO-PHASE-2-PLAN.md). Phase 1 is the completed implementation foundation.

## What the browsing experience gets right

The page establishes a precise structure before adding motion. Almost every detail has a place: an icon column, a text baseline, a metadata row, or a figure caption. Interaction changes that familiar structure just enough to acknowledge the visitor. The page feels responsive because the response is attached to the thing being used.

The most useful lesson for Uttam's portfolio is consistency at small scales. A more expressive monogram would help, but equally important are readable diagram labels, deliberate disclosure states, and copy feedback that does not move the email address.

## Evidence and limits

I opened the live homepage in the collaborative preview browser, inspected desktop layouts at 1280 × 800 in both themes, and inspected the mobile layout at 390 × 844. I scrolled through the page, toggled the portrait and theme, searched the command menu, copied the public email address, expanded a project, and opened the mobile menu. I also read the public source for the specific interactions below.

The deployed footer reported build `dc4bf70`, dated 2026-09-05. Source links below refer to repository `main` as read on the review date. A repository file is supporting implementation evidence, not proof that every exported component appears on the current homepage.

Screenshots capture visual states, not animation smoothness. I did not measure frame rate, perform a screen-reader audit, test a physical phone, or assess audible sound quality or haptics. The preview's resize tool changes the viewport without changing its desktop user agent. Some background-tab actions did not take effect until the intended tab was shown; those attempts are not website failures. A synthetic mousemove probe did not establish the monogram's physical hover feel, so its spring settings are source evidence.

Saved evidence:

- [Desktop, light](evidence/reference-desktop-light.png)
- [Desktop, dark](evidence/reference-desktop-dark.png)
- [Mobile metadata and successful copy state](evidence/reference-mobile-copy.png)
- [Projects with an additional disclosure open](evidence/reference-projects.png)

## Composition and typography

| Detail | Observed behavior or source evidence | Why it works | Application to Uttam |
| --- | --- | --- | --- |
| Continuous frame | A roughly 768px central frame, with fine vertical rails and horizontal rules extending into the outer page | Different sections share the same underlying geometry | Retain the existing 768px frame. Refine intersections and selected full-width dividers |
| Header | A 56px header stays at the top. Small separators distinguish navigation, search, repository information, and theme | Dense controls remain understandable | Keep Work, About, and Contact prominent. Refine spacing rather than adding more destinations |
| Hero composition | The large isometric mark, portrait, name, and subtitle occupy connected cells. The portrait sits against the lower edge of the graphic | The identity feels composed as one object | Explore a more connected UK illustration/profile composition within the current shallow hero |
| Border hierarchy | Solid rules define sections; dashed rules separate supporting columns; diagonal stripes mark larger breaks | Borders communicate grouping without large cards or shadows | Use distinct rules for page sections and diagram internals. Introduce stripes sparingly |
| Heading hierarchy | Large section headings contrast with smaller row titles. Counts sit as quiet superscripts beside headings | The scan path stays clear on a long page | Increase the current 17–18px section-heading emphasis. Remove decorative right-hand phrases that add little information |
| Type roles | Sans-serif interface text, monospace metadata, handwritten annotations, and serif testimonials serve different jobs | Variation has an explicit purpose | Keep Inter and JetBrains Mono. One optional personal annotation is enough; a third font is not required |
| Tiny alignment decisions | Icon tiles share an axis. Dates use tabular numerals. Description text aligns below the associated heading | Reading does not require repeatedly finding a new starting edge | Align dates, chevrons, links, technology labels, and diagram captions systematically |
| Visual restraint | Surface changes are usually slight. Natural avatar color provides contrast within a mostly neutral page | The few expressive elements receive attention | Keep copper selective and preserve natural portrait color |

The [panel components](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/panel.tsx) and [global styles](https://github.com/ncdai/chanhdai.com/blob/main/src/styles/globals.css) explain the repeated rails, text sizes, and stripe dividers. The [profile header](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/profile-header.tsx) shows how the portrait, mark, name, and subtitle share a grid.

## Motion and feedback inventory

The numeric values in this table come from inspected source or live animation data. They are reference values, not Phase 2 defaults.

| Interaction | Detail | Assessment |
| --- | --- | --- |
| Isometric mark | A radial highlight follows pointer coordinates through springs with stiffness 300, damping 30, and mass 0.1. Pointer tracking stops when the graphic is offscreen, for reduced motion, or when hover is unavailable | The highlight changes the apparent lighting of an existing drawing. It does not need to drag the whole hero around |
| Mark press | The face moves 16 SVG units and the outline changes shape. The press spring uses stiffness 200, damping 18, and mass 0.5. The tap handler requests a metallic click sound | This is a small physical response with a clear cause. Its sound was verified in code, not by listening |
| Portrait lighting | Four image variants cover light/dark themes and lights on/off. Image layers fade over 1200ms with `cubic-bezier(0.42,0,0.58,1)` | A memorable personal detail. It needs real alternate artwork, not a generic brightness filter |
| Rotating subtitle | Two states observed include the role and a personal statement. Source cycles every 3 seconds, uses 300ms transitions, moves from -20% to 0% on entry and toward 40% on exit, and adds 1px blur. A 1500ms shimmer runs once per displayed item | Supporting text can be playful because identity remains static. Reserve space and avoid rotating essential information |
| Visibility-aware motion | Subtitle cycling runs only while its region and page are visible | Avoids invisible work and missed animation sequences |
| Copy email | The live click produced a check icon. The shared icon swap uses opacity, scale 0.25→1, and blur 4px→0 with a 300ms spring and zero bounce. The clipboard hook resets after 1500ms and also models failure | A good example of complete feedback: action, acknowledgement, return to idle. Sound and haptic hooks exist but were not physically verified |
| Buttons | Inspected mobile control classes include `active:scale-[0.98]`; live copy-button transitions reported 150ms | A modest press response distinguishes pressing from hovering without moving adjacent content |
| Theme | The live homepage changes the theme directly and animates its icons. Its source includes a click sound and a `D` shortcut. The moon icon has a 1.2-second wobble sequence | The dramatic circular theme transitions in its registry are separate demos. Do not describe those as the homepage behavior |
| Social links | The current homepage uses compact outlined icon buttons with tooltips naming the platform and handle | The earlier Phase 1 review described a different social-links block. Preserve Uttam's useful text labels while borrowing the consistent feedback |
| Tooltips | Source specifies directional entry, fade, and small scale change; the provider defaults to zero delay | Useful for compact icon controls. They should supplement accessible names and touch-visible information |
| Project rows | Opening `chanhdai.com` kept the first project open and exposed a short description plus technologies. Rows have a hover surface, a quiet external-link icon, and chevrons with a 150ms setting | Visitors choose the detail level without losing the row identity. A height animation was not established in this inspection |
| Experience | Company context groups role, work type, dates, and duration. Role controls share hover/focus treatment and stateful chevrons | Structure does more work than motion. Uttam's single role can remain simpler |
| Section links | Source places a copy-link control beside a section title and reveals it on hover | Useful for sharing work. Uttam's version should also reveal on keyboard focus and remain discoverable on touch |
| Sponsor logos | Source cycles every 2400ms with a 125ms column stagger and 500ms transitions, using small vertical travel and blur | Restrained choreography, but a sponsor carousel needs actual sponsor content |
| Testimonials | Desktop has fixed featured quotes plus additional moving rows, with opposite directions visible in live animation data. The mobile review showed a simpler stacked presentation | Evidence and attribution create credibility. Do not add filler testimonials to reproduce the movement |
| Return to top | The control's opacity depends on scroll direction: 0.3 while moving down, 1 while moving up, with 300ms transitions. It respects bottom safe-area spacing | Secondary navigation becomes noticeable when it is more likely to be useful |

Sources for the interaction details:

- [Isometric mark](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/chanhdai-mark-isometric.tsx)
- [Avatar layers](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/avatar-lights.tsx) and [avatar toggle](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/avatar-lights-toggle.tsx)
- [Subtitle wrapper](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/flip-sentences.tsx) and [text-flip implementation](https://github.com/ncdai/chanhdai.com/blob/main/src/registry/components/text-flip/text-flip.tsx)
- [Icon swap](https://github.com/ncdai/chanhdai.com/blob/main/src/registry/components/icon-swap/icon-swap.tsx), [copy button](https://github.com/ncdai/chanhdai.com/blob/main/src/registry/components/copy-button/copy-button.tsx), and [clipboard state](https://github.com/ncdai/chanhdai.com/blob/main/src/hooks/use-copy-to-clipboard.ts)
- [Homepage theme toggle](https://github.com/ncdai/chanhdai.com/blob/main/src/components/theme-toggle.tsx) and [moon icon](https://github.com/ncdai/chanhdai.com/blob/main/src/components/animated-icons/moon-icon.tsx)
- [Live social section](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/social-links.tsx) and [tooltip component](https://github.com/ncdai/chanhdai.com/blob/main/src/components/base/ui/tooltip.tsx)
- [Project rows](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/projects/project-item.tsx), [experience positions](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/experiences/experience-position-item.tsx), and [section-link control](https://github.com/ncdai/chanhdai.com/blob/main/src/features/portfolio/components/panel-title-copy.tsx)
- [Logo carousel](https://github.com/ncdai/chanhdai.com/blob/main/src/registry/components/logos-carousel/logos-carousel.tsx)

## How information appears during the visit

**First screen.** The illustration establishes identity. The portrait introduces a person. The name remains readable while the subtitle changes. The little figure label and handwritten note invite exploration without becoming primary actions.

**Metadata.** Location, time, contact, and profile facts share compact rows. Each row puts its icon, label, and optional action in predictable positions. Time includes the visitor's relative difference. Copy stays beside the corresponding contact detail.

**Activity.** Month labels explain the horizontal axis. A caption gives the total, exact date range, and source. The intensity legend gives the shading meaning. On mobile, horizontal content fades at the edge to suggest more data. Those explanatory details make the graph useful rather than purely decorative.

**Work history and projects.** A summary remains visible when details close. Additional text appears under its own row. Technology tags wrap compactly. External links have a different visual role from the disclosure controls. The first project is expanded by default, so visitors can understand the disclosure pattern without guessing.

**Search.** The desktop palette was about 512px wide and 408px high in the observed state. Searching `projects` returned a portfolio destination and a related blog result under separate group labels. The panel kept its dimensions. Selection background and a bottom action hint explain what Enter will do. The live menu also contains explicit Light, Dark, and System choices.

**Mobile navigation.** Desktop navigation links disappear from the top bar. Search and a menu button appear in a compact bottom control. Opening the menu exposes destinations above that control. This is a specific adaptation for a large site; Uttam's three section links may work better in a simpler header.

**Footer.** The reference closes with a structured project colophon, including author, build, date, source, license, typeface, and stack. It reinforces that the website itself is a piece of work. Uttam needs only the useful subset: authorship, source if public, contact, and a clear route back up.

These layout and content observations come from the [live homepage](https://chanhdai.com/), including its mobile state. They are not instructions to reproduce its entire information architecture.

## What I would borrow first

The highest-value transfers are border alignment, stronger section hierarchy, clearer metadata, localized copy and press feedback, one expressive UK graphic, and project details that reward opening them. Together they would make the portfolio feel more deliberate on every scroll.

The reference serves a design engineer with a registry, blog, sponsors, and extensive work history. Uttam's strongest story is two Rust projects. Keep that story close to the introduction. The corresponding Phase 2 plan gives the diagrams distinct engineering narratives and treats motion as support for those narratives.

Portrait lighting, rotating personal text, sound, and a mobile dock are optional experiments. They should earn their place through a side-by-side browser review, after the core presentation and feedback are consistent.
