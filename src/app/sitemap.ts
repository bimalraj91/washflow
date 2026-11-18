import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-18");
  return [
    { url: SITE.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
