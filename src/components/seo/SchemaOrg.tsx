export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Photography & Visual Stories | PhotoComma",
    url: "https://photocomma.com",
    description:
      "Photo comma is a personal photography project with photo stories and stand alone images without particular connection with each other taken randomly from here and there.",

    author: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com",
    },

    mainEntity: {
      "@type": "ImageGallery",
      name: "PhotoComma Photography Portfolio",
      description:
        "Photography portfolio featuring documentary and thematic image series by Andrey Raychev.",
    },

    image: "https://photocomma.com/og-default.jpg",
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