/**
 * Single source of truth for the public site URL.
 *
 * `NEXT_PUBLIC_SITE_URL` is inlined at build time, so the sitemap, robots.txt,
 * canonical URLs and JSON-LD all resolve to the same origin. When the variable
 * is unset the app falls back to the local development origin so metadata is
 * still valid (absolute) instead of throwing.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return FALLBACK_SITE_URL;
  return configured.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
