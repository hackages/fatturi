import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";

const BASE = "https://blog.fatturi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${BASE}/categorie/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/premiers-pas`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...categories,
    ...posts,
  ];
}
