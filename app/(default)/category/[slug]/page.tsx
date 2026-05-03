import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/api';
import { getCategoryMetadata } from '@/src/components/_utils/MetaDataCategoryUtil/getCategoryMetadata';
import type { GetCategoryResponse } from '@/src/components/CategoryView/types';
import { CategoryView } from '@/src/components/CategoryView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { SchemaOrgCategory } from "@/src/components/seo/SchemaOrgCategory";

export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params;
  return getCategoryMetadata(slug);
}

export type PostProps = {
  params: {
    slug: string;
  };
}

const HIDDEN_CATEGORY_SLUGS = new Set([
  'heroslides',
  'avivarural',
  'cine',
  'motion-picture',
  'private',
  'uncategorized',
]);

export default async function Category({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  if (HIDDEN_CATEGORY_SLUGS.has(slug)) {
    notFound();
  }

  const rawCategoryData: GetCategoryResponse = await getCategory(slug);
  const category = rawCategoryData?.category ?? null;

  if (!category) {
    notFound();
  }

  return (
    <>
      <SchemaOrgCategory category={category} />
      <Header />
      <CategoryView category={category} />
      <Footer mode='light' />
    </>
  );
}
