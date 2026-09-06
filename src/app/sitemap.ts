import type { MetadataRoute } from "next";
import { RESUME_DATA } from "@/constants/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: RESUME_DATA.website, changeFrequency: "monthly", priority: 1 },
  ];
}
