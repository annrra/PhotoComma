import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/api';
import type { GetCategoryResponse } from '@/src/components/CategoryView/types';
import { CategoryView } from '@/src/components/CategoryView';

export type PostProps = {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawCategoryData: GetCategoryResponse = await getCategory(slug);
  const category = rawCategoryData?.category ?? null;

  if (!category) {
    notFound();
  }

  return <CategoryView category={category} />;
}
