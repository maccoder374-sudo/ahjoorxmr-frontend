import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/siteUrl";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Public, indexable routes only. Private app routes (`/dashboard/**`) are
 * excluded on purpose and disallowed in `app/robots.ts`.
 *
 * `/invite/[token]` is not listed: invite links are single-use, tokenised URLs
 * with no stable address, and the 404 page is never listed either.
 */
const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/help", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculator", changeFrequency: "monthly", priority: 0.7 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/login", changeFrequency: "yearly", priority: 0.5 },
  { path: "/forgot-password", changeFrequency: "yearly", priority: 0.3 },
  { path: "/verify-email", changeFrequency: "yearly", priority: 0.3 },
  { path: "/offline", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
