import type { Product } from '@/src/components/ProductView/types';

function cleanText(input?: string | null) {
  if (!input) return "";

  return input
    .replace(/<[^>]*>/g, "") // remove HTML
    .replace(/\s+/g, " ")    // collapse whitespace + newlines
    .trim();                 // remove leading/trailing spaces/newlines
}

export type ProductMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
  };
};

export function generateProductMetadata(product: Product): ProductMetadata {
  const siteBase = "https://photocomma.com";

  const image = product.featuredImage?.node?.sourceUrl;

  const description =
    product.description || product.shortDescription || "";

  return {
    title: product.title,
    description: cleanText(description),

    alternates: {
      canonical: `${siteBase}${product.uri}`,
    },

    openGraph: {
      title: product.title,
      description: cleanText(description),
      images: image
        ? [
            {
              url: image.startsWith("http") ? image : `${siteBase}${image}`,
              width: 1200,
              height: 630,
              alt: product.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: cleanText(description),
      images: image ? [image] : [],
    },
  };
}