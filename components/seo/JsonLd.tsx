import { serializeJsonLd } from "@/lib/seo/jsonLd";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a schema.org JSON-LD block. Must be used in a Server Component so
 * the markup is present in the server-rendered HTML.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
