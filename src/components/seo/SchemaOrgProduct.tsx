import type { Product } from '@/src/components/ProductView/types';

type SchemaOrgProductProps = {
  product: Product;
};

export function SchemaOrgProduct({ product }: SchemaOrgProductProps) {
  const image = product.featuredImage?.node;

  // pick lowest price from variations
  const prices =
    product.variations?.nodes
      ?.map((v) => parseFloat(v.price))
      .filter((p) => !isNaN(p)) ?? [];

  const lowestPrice =
    prices.length > 0 ? Math.min(...prices) : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    url: `https://photocomma.com/shop/${product.slug}`,

    image: image?.sourceUrl,

    description: product.description || product.shortDescription || undefined,

    brand: {
      "@type": "Brand",
      name: "PhotoComma",
    },

    offers: lowestPrice
      ? {
          "@type": "Offer",
          price: lowestPrice,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `https://photocomma.com/shop/${product.slug}`,
        }
      : undefined,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://photocomma.com/shop/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}