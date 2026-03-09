import { Metadata } from "next";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";
import { getProduct, getProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { ProductSchema } from "@/components/structured-data";
import { ProductDetail } from "./product-detail";

// Quick local lookup for generateMetadata (server-side, no async needed for static)
const ALL_PRODUCTS_STATIC = [...MOCK_PRODUCTS, ...PAST_WINNERS];

function findProductStatic(id: string): Product | undefined {
  return ALL_PRODUCTS_STATIC.find((p) => p.id === id);
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // Try API first (hits Supabase if configured), fall back to static
  const product = (await getProduct(id)) ?? findProductStatic(id);

  if (!product) {
    return {
      title: "Product Not Found | Launchpad.today",
      description: "This product doesn't exist on Launchpad.today.",
    };
  }

  const title = `${product.name} — AI Score ${product.aiScore} | Launchpad.today`;
  const description = `${product.tagline}. ${product.aiVerdict}`;

  const ogImageUrl = `https://launchpad.today/product/${product.id}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://launchpad.today/product/${product.id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name} — AI Score ${product.aiScore}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} scored ${product.aiScore} on Launchpad.today`,
      description: product.tagline,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  // Try API first (hits Supabase if configured), fall back to static
  const product = (await getProduct(id)) ?? findProductStatic(id);

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <ProductSchema product={product} />
      <ProductDetail product={product} />
    </>
  );
}

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "var(--deep-black)" }}
    >
      <div className="text-6xl mb-6">🛸</div>
      <h1
        className="text-2xl sm:text-4xl font-bold mb-3 neon-text-pink"
        style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif", color: "var(--neon-pink)" }}
      >
        Lost in Space
      </h1>
      <p className="text-sm text-white/40 mb-8 max-w-sm">
        This product doesn&apos;t exist or has been removed from the rankings.
      </p>
      <a
        href="/"
        className="submit-btn px-6 py-3 rounded-lg text-xs text-white inline-block"
        style={{ minHeight: "44px", display: "inline-flex", alignItems: "center" }}
      >
        Back to Rankings
      </a>
    </div>
  );
}
