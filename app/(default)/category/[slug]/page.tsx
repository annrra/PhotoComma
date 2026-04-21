import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/api';
import type { GetCategoryResponse } from '@/src/components/CategoryView/types';
import { CategoryView } from '@/src/components/CategoryView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export type PostProps = {
  params: {
    slug: string;
  };
}

export default async function Category({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawCategoryData: GetCategoryResponse = await getCategory(slug);
  const category = rawCategoryData?.category ?? null;

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className={styles.screen}>
        <CategoryView category={category} />
      </div>
      <Footer mode='light' />
    </>
  );
}
