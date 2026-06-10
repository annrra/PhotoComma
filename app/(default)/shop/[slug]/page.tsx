import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/woocommerce/wooapi';
import type { GetProductResponse } from '@/src/components/ProductView/types';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ProductView } from '@/src/components/ProductView';
import styles from './page.module.css';

type ProductProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawProductData: GetProductResponse = await getProduct(slug);
  const product = rawProductData?.product ?? null;

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className={styles.stage}>
        <Header />
        <ProductView product={product} />
        <Footer mode='light' />
      </div>
    </>
  );
}
