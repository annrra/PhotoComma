/**
 * Hand-maintained routes included in the sitemap and Umami analytics.
 * Add new static pages or public categories here only.
 */

export type ChangeFreq =
  | 'monthly'
  | 'weekly'
  | 'always'
  | 'hourly'
  | 'daily'
  | 'yearly'
  | 'never';

export type StaticPageConfig = {
  slug: string;
  priority: number;
  changefreq: ChangeFreq;
};

export type PublishedCategoryConfig = {
  slug: string;
  /** WordPress category ID used to fetch posts for sitemap / analytics. */
  wpCategoryId: number;
};

export const STATIC_PAGES: StaticPageConfig[] = [
  { slug: 'apropos', priority: 0.9, changefreq: 'monthly' },
  { slug: 'prints', priority: 0.9, changefreq: 'monthly' },
];

export const PUBLISHED_CATEGORIES: PublishedCategoryConfig[] = [
  { slug: 'gallery', wpCategoryId: 2 },
  { slug: 'gardenbed', wpCategoryId: 8 },
  { slug: 'greenline', wpCategoryId: 13 },
];
