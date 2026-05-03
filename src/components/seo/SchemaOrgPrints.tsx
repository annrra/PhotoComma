export function SchemaOrgPrints() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Prints | PhotoComma",
    "url": "https://photocomma.com/prints",
    "description": "Fine art photography prints by Andrey Raychev, available worldwide. Carefully produced prints from selected photographic projects.",

    "mainEntity": {
      "@type": "CreativeWork",
      "name": "PhotoComma Print Availability",
      "description": "Selected photographic works available as fine art prints, produced and shipped worldwide."
    },

    "author": {
      "@type": "Person",
      "name": "Andrey Raychev",
      "url": "https://photocomma.com"
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