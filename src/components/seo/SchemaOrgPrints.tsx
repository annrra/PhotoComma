export function SchemaOrgPrints() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",

    name: "Prints | PhotoComma",
    url: "https://photocomma.com/prints",

    description:
      "Fine art photography prints by Andrey Raychev, available worldwide. Carefully produced prints from selected photographic projects.",

    mainEntity: {
      "@type": "Offer",
      name: "Fine Art Photography Prints",

      description:
        "Each photograph is available as a carefully produced print with worldwide shipping.",

      areaServed: "Worldwide",

      seller: {
        "@type": "Person",
        name: "Andrey Raychev",
      }
    },

    author: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com"
    },

    publisher: {
      "@type": "Organization",
      name: "PhotoComma",
      url: "https://photocomma.com"
    },

    isPartOf: {
      "@type": "WebSite",
      name: "PhotoComma",
      url: "https://photocomma.com"
    }
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