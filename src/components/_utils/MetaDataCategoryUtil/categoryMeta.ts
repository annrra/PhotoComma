import type { PageMetadata } from '@/src/components/_utils/MetaDataUtil/types';

const siteBase = 'https://photocomma.com';

export const categoryMetaMap: Record<string, PageMetadata> = {
  gallery: {
    title: 'Gallery',
    description: 'A collection of standalone photographs captured in different places and moments, each standing on its own.',
    alternates: {
      canonical: `${siteBase}/category/gallery`,
    },
    openGraph: {
      title: 'Gallery - PhotoComma',
      description: 'A collection of standalone photographs captured in different places and moments, each standing on its own.',
      images: [
        {
          url: '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'Black and white photograph of a bent tree and a curving road',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Gallery - PhotoComma',
      description: 'A collection of standalone photographs captured in different places and moments, each standing on its own.',
      images: ['/og-default.jpg'],
    },
  },

  greenline: {
    title: 'Greenline - Photo series on nature and human connection',
    description: 'A photographic series exploring the subtle connection between humankind and nature through everyday moments and environments.',
    alternates: {
      canonical: `${siteBase}/category/greenline`,
    },
    openGraph: {
      title: 'Greenline - Photo series on nature and human connection - PhotoComma',
      description: 'A photographic series exploring the subtle connection between humankind and nature through everyday moments and environments.',
      images: [
        {
          url: '/og-greenline.jpg',
          width: 1200,
          height: 630,
          alt: 'Black and white photograph of wooden birdhouses hanging on a wall',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Greenline - Photo series on nature and human connection - PhotoComma',
      description: 'A photographic series exploring the subtle connection between humankind and nature through everyday moments and environments.',
      images: ['/og-greenline.jpg'],
    },
  },

  gardenbed: {
    title: 'Garden Bed - Travel and gardening photography series',
    description: 'A photographic series documenting moments from a long journey shaped by nature and gardening, reflecting a gradual shift in perspective and way of living.',
    alternates: {
      canonical: `${siteBase}/category/gardenbed`,
    },
    openGraph: {
      title: 'Garden Bed - Travel and gardening photography series - PhotoComma',
      description: 'A photographic series documenting moments from a long journey shaped by nature and gardening, reflecting a gradual shift in perspective and way of living.',
      images: [
        {
          url: '/og-gardenbed.jpg',
          width: 1200,
          height: 630,
          alt: 'Black and white photograph of a tree with barbed wire fence',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Garden Bed - Travel and gardening photography series - PhotoComma',
      description: 'A photographic series documenting moments from a long journey shaped by nature and gardening, reflecting a gradual shift in perspective and way of living.',
      images: ['/og-gardenbed.jpg'],
    },
  },
};