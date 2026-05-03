import type { Category } from '@/src/components/CategoryView/types';
import { categoryMetaMap } from "@/src/components/_utils/MetaDataCategoryUtil/categoryMeta";

type SchemaOrgCategoryProps = {
  category: Category | null;
};

export function SchemaOrgCategory({ category }: SchemaOrgCategoryProps) {
  if (!category) return null;

  const meta = categoryMetaMap[category.slug];

  const items =
    category.posts?.nodes
      ?.slice(0, 12)
      .map((post, index) => {
        const image = post.featuredImage?.node;

        return {
          "@type": "ListItem",
          position: index + 1,
          url: `https://photocomma.com/${post.slug}`,
          item: {
            "@type": "ImageObject",
            name: image?.title || post.title,
            description: image?.altText || post.title,
            contentUrl: image?.sourceUrl,
            thumbnailUrl: image?.mediaDetails?.sizes?.[0]?.sourceUrl || image?.sourceUrl,
          },
        };
      }) || [];

  const imageUrl =
    meta?.openGraph?.images?.[0]?.url ||
    category.posts?.nodes?.[0]?.featuredImage?.node?.sourceUrl;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: category.name,
    url: `https://photocomma.com/category/${category.slug}`,
    description: meta?.description || category.description || category.name,

    primaryImageOfPage: imageUrl
      ? {
          "@type": "ImageObject",
          url: imageUrl.startsWith("http")
            ? imageUrl
            : `https://photocomma.com${imageUrl}`,
        }
      : undefined,

    author: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com",
    },

    publisher: {
      "@type": "Organization",
      name: "PhotoComma",
      url: "https://photocomma.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://photocomma.com/logo.png",
        "width": 256,
        "height": 256
      }
    },

    mainEntity: {
      "@type": "ItemList",
      name: `${category.name} photo collection`,
      itemListElement: items,
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