export function SchemaOrgAbout() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About | PhotoComma",
    "url": "https://photocomma.com/apropos",
    "description": "PhotoComma is a personal photography project by Andrey Raychev focused on documentary and observational images taken from everyday life.",
    
    "mainEntity": {
      "@type": "Person",
      "name": "Andrey Raychev",
      "url": "https://photocomma.com",
      "description": "Photographer behind PhotoComma, creating visual stories and standalone images exploring everyday moments and visual contradictions."
    },

    "publisher": {
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