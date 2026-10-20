import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo/siteUrl";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path used for the canonical URL, e.g. `/help`. Omit when the page has no stable address. */
  path?: string;
  robots?: Metadata["robots"];
}

/**
 * Builds the metadata object every public route exports, so titles,
 * descriptions and canonical URLs stay consistent across the app.
 */
export function pageMetadata({
  title,
  description,
  path,
  robots,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    ...(path ? { alternates: { canonical: absoluteUrl(path) } } : {}),
    ...(robots ? { robots } : {}),
  };
}
