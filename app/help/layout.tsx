import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Help Center — Ahjoor",
  description:
    "Answers to common questions about Ahjoor savings circles: getting started, contributions, payouts, wallets and troubleshooting.",
  path: "/help",
});

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
