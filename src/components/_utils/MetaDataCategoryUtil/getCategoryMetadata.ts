// /src/lib/getCategoryMetadata.ts

import { categoryMetaMap } from './categoryMeta';
import type { PageMetadata } from '@/src/components/_utils/MetaDataUtil/types';

export function getCategoryMetadata(slug: string): PageMetadata {
  const fallback: PageMetadata = {
    title: 'Category',
    description: 'Explore photography categories on PhotoComma.',
    openGraph: {
      title: 'Category - PhotoComma',
      description: 'Explore photography categories on PhotoComma.',
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
      title: 'Category - PhotoComma',
      description: 'Explore photography categories on PhotoComma.',
      images: ['/og-default.jpg'],
    },
  };

  return categoryMetaMap[slug] ?? fallback;
}