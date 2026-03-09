import { Product } from "@/lib/types";

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Launchpad.today",
    url: "https://launchpad.today",
    description:
      "The daily startup launch ranking. AI judges every submission and crowns the Product of the Day, Week, and Month.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://launchpad.today/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  // Map aiScore (0-100) to a 1-5 rating scale
  const ratingValue = Math.round((product.aiScore / 100) * 5 * 10) / 10;
  const clampedRating = Math.min(5, Math.max(1, ratingValue));

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: product.url,
    applicationCategory: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clampedRating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1,
      reviewCount: 1,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Launchpad.today AI",
      },
      reviewBody: product.aiVerdict,
      reviewRating: {
        "@type": "Rating",
        ratingValue: clampedRating,
        bestRating: 5,
        worstRating: 1,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
