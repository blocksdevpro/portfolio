import assert from "node:assert/strict";

// Inspect the actual server response, so missing SSR metadata fails this check.
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const canonical = "https://blocksdev.pro/";
const fetchPage = (pathname, options = {}) =>
  fetch(new URL(pathname, base), {
    signal: AbortSignal.timeout(15_000),
    ...options,
  });
const attributes = (tag) =>
  Object.fromEntries(
    Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, key, value]) => [
      key,
      value,
    ]),
  );
const tags = (html, name) =>
  Array.from(html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g")), ([tag]) =>
    attributes(tag),
  );
const meta = (html, name) =>
  tags(html, "meta").find((tag) => tag.name === name || tag.property === name)
    ?.content;
const link = (html, rel) =>
  tags(html, "link").find((tag) => tag.rel === rel)?.href;

const response = await fetchPage("/");
assert.equal(response.status, 200, "Homepage must return 200");
assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/i);
const html = await response.text();
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "One primary heading");
assert.match(html, /<h1\b[^>]*>Uttam Kumbhakar<\/h1>/);
assert.match(html, /<title>Uttam Kumbhakar \| Rust Backend Developer<\/title>/);
assert.equal(new URL(link(html, "canonical")).href, canonical);
assert.equal(
  tags(html, "link").filter((tag) => tag.rel === "canonical").length,
  1,
);
assert.match(meta(html, "description"), /Rust backend developer in India/);
assert.ok(meta(html, "description").length < 180, "Keep the summary concise");
assert.equal(meta(html, "og:description"), meta(html, "description"));
assert.equal(meta(html, "twitter:description"), meta(html, "description"));
assert.equal(meta(html, "twitter:card"), "summary_large_image");
assert.equal(new URL(meta(html, "og:url")).href, canonical);
assert.doesNotMatch(meta(html, "robots") ?? "", /noindex|nofollow/);
assert.match(meta(html, "googlebot"), /max-image-preview:large/);
assert.match(html, /<html[^>]*lang="en"/);
assert.match(meta(html, "viewport"), /width=device-width/);

const jsonLd = Array.from(
  html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ),
  ([, json]) => JSON.parse(json),
);
assert.equal(jsonLd.length, 1, "One connected structured-data graph");
const graph = jsonLd[0]["@graph"];
const website = graph.find((entry) => entry["@type"] === "WebSite");
const profile = graph.find((entry) => entry["@type"] === "ProfilePage");
assert.equal(website.url, canonical);
assert.equal(profile.url, canonical);
assert.equal(profile.isPartOf["@id"], website["@id"]);
assert.equal(profile.mainEntity["@type"], "Person");
assert.equal(profile.mainEntity.name, "Uttam Kumbhakar");
assert.equal(website.publisher["@id"], profile.mainEntity["@id"]);
assert.ok(
  profile.mainEntity.sameAs.includes("https://github.com/blocksdevpro"),
);
assert.equal(profile.hasPart.length, 2);
for (const project of profile.hasPart) {
  assert.equal(project.author["@id"], profile.mainEntity["@id"]);
  assert.match(project.codeRepository, /^https:\/\/github.com\//);
  assert.ok(html.includes(`id="${new URL(project["@id"]).hash.slice(1)}"`));
}

const images = [
  meta(html, "og:image"),
  meta(html, "twitter:image"),
  profile.mainEntity.image,
];
for (const image of images) {
  const url = new URL(image);
  assert.equal(
    url.origin,
    new URL(canonical).origin,
    "Public image URL must use the canonical origin",
  );
  const result = await fetchPage(url.pathname + url.search);
  assert.equal(result.status, 200, image);
  assert.match(result.headers.get("content-type"), /^image\//);
}
assert.ok(meta(html, "og:image:alt"));
assert.equal(meta(html, "og:image:width"), "1200");
assert.equal(meta(html, "og:image:height"), "630");
assert.equal((await fetchPage(link(html, "icon"))).status, 200);

const robotsResponse = await fetchPage("/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \/(?:\r?\n|$)/);
assert.doesNotMatch(
  robots,
  /Disallow:\s*\//i,
  "Crawlers need access to read noindex headers",
);
assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
const sitemapResponse = await fetchPage("/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 1);
assert.doesNotMatch(
  sitemap,
  /\/api\/|localhost|<lastmod>/,
  "No API entries or artificial update timestamps",
);

for (const route of ["/api/contributions", "/api/spotify"]) {
  const api = await fetchPage(route);
  assert.equal(api.headers.get("x-robots-tag"), "noindex", route);
}
const notFound = await fetchPage("/__seo_missing_page__");
assert.equal(notFound.status, 404);
const notFoundHtml = await notFound.text();
assert.match(meta(notFoundHtml, "robots"), /noindex/);
assert.equal(
  link(notFoundHtml, "canonical"),
  undefined,
  "404 must not claim to be the homepage",
);
assert.doesNotMatch(notFoundHtml, /type="application\/ld\+json"/);

// Googlebot must receive the same indexable, server-rendered content.
const bot = await fetchPage("/", { headers: { "User-Agent": "Googlebot" } });
assert.equal(bot.status, 200);
const botHtml = await bot.text();
assert.equal(new URL(link(botHtml, "canonical")).href, canonical);
assert.equal(meta(botHtml, "description"), meta(html, "description"));
assert.match(botHtml, /Rust backend developer<\/strong>/);
console.log(
  "SEO checks passed: SSR content, metadata, linked entities, social images, crawler rules, sitemap, API noindex, 404 behavior, and Googlebot response.",
);
