import type { HeroSlidesProps } from '@/src/components/HeroSlides/HeroSlides';

export function SchemaOrg({ slides }: { slides: HeroSlidesProps['slides'] }) {
  const itemList =
    slides?.map((slide, index) => {
      const image = slide.featuredImage?.node;
      const hasUrl = slide.nextHeroslidePosition?.heroSlidePostUrl;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: slide.title,
        ...(hasUrl && {
          url: `https://photocomma.com/${hasUrl}`,
        }),

        item: {
          "@type": "ImageObject",
          name: slide.title,
          description: image?.altText || slide.title,
          contentUrl: image?.sourceUrl,
          thumbnailUrl: image?.mediaDetails?.sizes?.[0]?.sourceUrl || image?.sourceUrl,
        },
      };
    }) || [];

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

    image: "https://photocomma.com/og-default.jpg",

    mainEntity: {
      "@type": "ItemList",
      name: "Featured Photography",
      itemListElement: itemList,
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