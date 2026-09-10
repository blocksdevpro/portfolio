import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // API responses carry noindex headers; crawlers must be able to read them.
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", SITE_URL).href,
  };
}
