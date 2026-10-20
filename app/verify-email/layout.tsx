import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Verify your email — Ahjoor",
  description:
    "Confirm your email address to unlock your Ahjoor account and receive notifications about your savings circles.",
  path: "/verify-email",
});

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
