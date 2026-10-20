import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * Invite links are single-use and tokenised, so the route has no stable
 * address to point a canonical URL at. It is marked `noindex` instead and the
 * tokens are never listed in the sitemap.
 */
export const metadata: Metadata = pageMetadata({
  title: "Join a savings circle — Ahjoor",
  description:
    "Use your invite link to join an Ahjoor savings circle and start contributing with your group.",
  robots: { index: false, follow: false },
});

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
