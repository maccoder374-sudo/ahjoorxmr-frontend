import { absoluteUrl, getSiteUrl } from "@/lib/seo/siteUrl";
import type { HelpFaqItem } from "@/data/helpFaqs";

/**
 * Serializes JSON-LD for inline embedding in a `<script>` tag.
 *
 * `<` is escaped so a value can never terminate the script element early.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * `Organization` markup for the landing page. Every value is taken from the
 * app itself (name, tagline, icons, the Telegram community link and the
 * in-app support centre) — no invented profiles.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ahjoor",
    alternateName: "Ahjoor — Save With Friends",
    url: getSiteUrl(),
    description:
      "Decentralized savings circles powered by blockchain. Join a circle, contribute in crypto, receive payouts — borderless, trustless, automated.",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icons/icon-512.png"),
      width: 512,
      height: 512,
    },
    sameAs: ["https://t.me/ahjoor"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: absoluteUrl("/help"),
      availableLanguage: ["en"],
    },
  };
}

/**
 * `FAQPage` markup built from the same entries the help centre renders, so
 * the structured data can never drift from the visible content.
 */
export function buildFaqPageJsonLd(faqs: HelpFaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
