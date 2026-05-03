import type { Post } from '@/src/components/PostView/types';

type SchemaOrgPostProps = {
  post: Post | null;
};

export function SchemaOrgPost({ post }: SchemaOrgPostProps) {
  if (!post) return null;

  const image = post.featuredImage?.node;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: post.title,
    url: `https://photocomma.com/${post.slug}`,
    description: image?.altText || image?.title || post.title,
    headline: post.title,

    image: image?.sourceUrl,

    primaryImageOfPage: image?.sourceUrl
      ? {
          "@type": "ImageObject",
          contentUrl: image.sourceUrl,
          width: image?.mediaDetails?.width,
          height: image?.mediaDetails?.height,
        }
      : undefined,

    author: {
      "@type": "Person",
      name: "Andrey Raychev",
      url: "https://photocomma.com",
    },

    mainEntity: {
      "@type": "ImageObject",
      name: image?.title || post.title,
      description: image?.altText || post.title,

      contentUrl: image?.sourceUrl,
      thumbnailUrl: image?.mediaDetails?.sizes?.[0]?.sourceUrl || image?.sourceUrl,

      width: image?.mediaDetails?.width,
      height: image?.mediaDetails?.height,
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