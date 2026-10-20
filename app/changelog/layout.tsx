import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Changelog — Ahjoor",
  description:
    "New features, improvements and fixes shipped in the latest Ahjoor releases.",
  path: "/changelog",
});

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
