import JsonLd from "@/components/seo/JsonLd";
import HelpClient from "@/components/help/HelpClient";
import { buildFaqPageJsonLd } from "@/lib/seo/jsonLd";
import { HELP_FAQS } from "@/data/helpFaqs";

export default function HelpPage() {
  return (
    <>
      <JsonLd data={buildFaqPageJsonLd(HELP_FAQS)} />
      <HelpClient />
    </>
  );
}
