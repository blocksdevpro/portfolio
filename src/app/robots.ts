import type { MetadataRoute } from "next";
import { RESUME_DATA } from "@/constants/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: RESUME_DATA.website + "/sitemap.xml",
  };
}
