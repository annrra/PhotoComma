import { getMetaBySlug } from '@/lib/api';
import type { MetaResponse, PageMetadata } from './types';

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export async function generatePageMetadata(slug: string): Promise<PageMetadata> {
  const meta: MetaResponse | null = await getMetaBySlug(slug);
  
  if (!meta || !meta.post) {
    const description = 'This page does not exist. Explore photography projects and images by Andrey Raychev on PhotoComma.';

    return {
      title: 'Not Found',
      description: 'Page not found',
			openGraph: {
        title: 'Page Not Found - PhotoComma',
        description,
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
        title: 'Page Not Found - PhotoComma',
        description,
        images: ['/og-default.jpg'],
      }
    };
  }

  const metaPost = meta.post;
  const metaData = metaPost.meta;

  const openGraphImage = metaData.metaOpengraphimage?.node?.sourceUrl;
  const siteBase = 'https://photocomma.com';
  const ogImageUrl = openGraphImage
    ? openGraphImage.startsWith('http')
      ? openGraphImage
      : `${siteBase}${openGraphImage}`
    : '/og-default.jpg';

  const metadata: PageMetadata = {
    title: metaData.metaTitle ?? metaPost.title,
    description: metaData.metaDescription ?? stripHtml(metaPost.excerpt),
    alternates: {
      canonical: `${siteBase}/${slug}`,
    },
    openGraph: {
      title: metaData.metaTitle,
      description: metaData.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.metaTitle,
      description: metaData.metaDescription,
      images: [],
    },
  };

  metadata.openGraph.images = [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: metaPost.title,
    },
  ];

  metadata.twitter.images = [ogImageUrl];

  return metadata;
}
