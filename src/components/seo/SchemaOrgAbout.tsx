export function SchemaOrgAbout() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",

    name: "About | PhotoComma",
    url: "https://photocomma.com/apropos",

    description:
      "PhotoComma is a personal photography project by Andrey Raychev focused on documentary and observational images taken from everyday life.",

    image: "https://photocomma.com/og-apropos.jpg",

    mainEntity: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com",

      image: "https://photocomma.com/og-apropos.jpg",

      description:
        "Photographer, web designer and developer creating visual stories and standalone images exploring everyday moments and perception.",

      jobTitle: "Photographer, Web Designer, Web Developer",

      knowsAbout: [
        "Photography",
        "Web Design",
        "Web Development",
        "Visual Storytelling"
      ],
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