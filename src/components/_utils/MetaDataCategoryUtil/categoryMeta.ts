import type { PageMetadata } from '@/src/components/_utils/MetaDataUtil/types';

const siteBase = 'https://photocomma.com';

export const categoryMetaMap: Record<string, PageMetadata> = {
  gallery: {
    title: 'Gallery',
    description: 'A collection of standalone photographs captured in different places and moments, without a unifying theme.',
    alternates: {
      canonical: `${siteBase}/category/gallery`,
    },
    openGraph: {
      title: 'Gallery - PhotoComma',
      description: 'A collection of standalone photographs captured in different places and moments, without a unifying theme.',
      images: [
        {
          url: '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: 'Gallery - PhotoComma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Gallery - PhotoComma',
      description: 'A collection of standalone photographs captured in different places and moments, without a unifying theme.',
      images: ['/og-default.jpg'],
    },
  },

  greenline: {
    title: 'Greenline',
    description: 'Greenline photography series and projects.',
    alternates: {
      canonical: `${siteBase}/category/greenline`,
    },
    openGraph: {
      title: 'Greenline - PhotoComma',
      description: 'Greenline photography series and projects.',
      images: [
        {
          url: '/og-greenline.jpg',
          width: 1200,
          height: 630,
          alt: 'Greenline - PhotoComma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Greenline - PhotoComma',
      description: 'Greenline photography series and projects.',
      images: ['/og-greenline.jpg'],
    },
  },

  gardenbed: {
    title: 'Garden Bed',
    description: 'Garden Bed photography series and projects.',
    alternates: {
      canonical: `${siteBase}/category/gardenbed`,
    },
    openGraph: {
      title: 'Garden Bed - PhotoComma',
      description: 'Garden Bed photography series and projects.',
      images: [
        {
          url: '/og-gardenbed.jpg',
          width: 1200,
          height: 630,
          alt: 'Garden Bed - PhotoComma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Garden Bed - PhotoComma',
      description: 'Garden Bed photography series and projects.',
      images: ['/og-gardenbed.jpg'],
    },
  },
};