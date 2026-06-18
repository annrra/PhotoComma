import type { ProductsResponse } from "@/src/components/PrintsView/types";

type SchemaOrgPrintsProps = {
  products: ProductsResponse["products"]["nodes"];
};

export function SchemaOrgPrints({ products }: SchemaOrgPrintsProps) {
  
  const items =
    products?.map((product, index) => {
      const image = product.featuredImage?.node;

      // take lowest variation price (if exists)
      const price =
        product.variations?.nodes
          ?.map(v => parseFloat(v.price))
          .filter(Boolean)
          .sort((a, b) => a - b)[0];

      return {
        "@type": "ListItem",
        position: index + 1,
        url: `https://photocomma.com/shop/${product.slug}`,
        item: {
          "@type": "Product",

          name: product.title,

          description: undefined, // not available in type

          image: image?.sourceUrl,

          offers: price
            ? {
                "@type": "Offer",
                price: price,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `https://photocomma.com/shop/${product.slug}`,
              }
            : undefined,
        },
      };
    }) || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: "Photography Prints | PhotoComma",
    url: "https://photocomma.com/prints",
    description:
      "Fine art photography prints by Andrey Raychev, available worldwide.",

    mainEntity: {
      "@type": "ItemList",
      name: "Fine Art Photography Prints",
      itemListElement: items,
    },

    author: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com",
    },

    publisher: {
      "@type": "Organization",
      name: "PhotoComma",
      url: "https://photocomma.com",
    },

    isPartOf: {
      "@type": "WebSite",
      name: "PhotoComma",
      url: "https://photocomma.com",
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