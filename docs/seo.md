# SEO maintenance

The page describes Uttam Kumbhakar's Rust backend work, local AI applications, and projects. Keep those descriptions accurate and consistent with the visible portfolio. The canonical site is `https://blocksdev.pro/`.

## What the implementation covers

- Homepage title, concise description, canonical URL, and matching Open Graph and Twitter metadata.
- Typed `WebSite` and `ProfilePage` structured data, with a `Person` entity and references to the displayed project source code. Profile data comes from `src/constants/resume.ts`.
- Server-rendered content, one primary heading, crawlable project links, a square SVG favicon, and a generated social preview.
- A sitemap containing the canonical homepage. Section fragments are not separate pages. No artificial modification date is emitted.
- `X-Robots-Tag: noindex` on API responses. Robots.txt allows crawling so search engines can read that header. Missing pages return 404 and noindex without the homepage canonical or profile data.
- `data-nosnippet` on listening activity, contribution details, and the local clock, keeping transient widget text out of search snippets.
- Portrait preloading with high fetch priority, and one shared contribution tooltip with reusable date formatters to reduce browser work.

## Verify a change

1. Run `bun run lint`, `bun run typecheck`, `bun run build`, and `bun audit`.
2. Start the production server with `bun run start`.
3. Run `bun run verify:seo`. Pass a URL after `--` to check a different server.
4. Check mobile layout and Lighthouse performance after changes to images, fonts, or interactive components. Local Lighthouse results are laboratory measurements, not real visitor Core Web Vitals or ranking predictions.

## After deployment

1. Run `bun run verify:seo -- https://blocksdev.pro` against the deployed site.
2. Confirm that alternate domains redirect permanently to `https://blocksdev.pro/`. Manage domain redirects in the hosting provider rather than redirecting localhost or preview builds in application code.
3. Verify the domain in Google Search Console, submit `https://blocksdev.pro/sitemap.xml`, and inspect the homepage URL. Request indexing after the new version is live.
4. Validate the deployed homepage in Google's Rich Results Test. Structured data provides context and eligibility where applicable; Google decides whether to display enhanced results.
5. Monitor indexing, queries, clicks, and real visitor Core Web Vitals in Search Console. Use the observed queries to guide substantive project write-ups, with real implementation details and outcomes.

Do not add fabricated ratings, hidden keyword lists, or thin pages for combinations of cities and services. Build search relevance through useful project content and genuine references from your project repositories and public profiles.

## References

Google documents how [titles](https://developers.google.com/search/docs/appearance/title-link) and [snippets](https://developers.google.com/search/docs/appearance/snippet) are selected. Its [site name](https://developers.google.com/search/docs/appearance/site-names) and [profile page](https://developers.google.com/search/docs/appearance/structured-data/profile-page) guides explain the structured data used here. Its [noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains why API responses must remain crawlable for exclusion headers to work.
