import { MetadataRoute } from "next";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";

const BASE_URL = "https://launchpad.today";

export default function sitemap(): MetadataRoute.Sitemap {
  const allProducts = [...MOCK_PRODUCTS, ...PAST_WINNERS];

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(product.submittedAt),
    changeFrequency: "weekly" as const,
    priority: product.isWinner ? 0.9 : 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...productEntries,
  ];
}
