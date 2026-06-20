import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/woocommerce/wooapi';
import type { GetProductResponse } from '@/src/components/ProductView/types';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ProductView } from '@/src/components/ProductView';
import styles from './page.module.css';
import { SchemaOrgProduct } from '@/src/components/seo/SchemaOrgProduct';
import { generateProductMetadata } from '@/src/components/_utils/MetaDataProductUtil/MetaDataProductUtil';

export async function generateMetadata({ params }: ProductProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const rawProductData = await getProduct(slug);
  const product = rawProductData?.product;

  if (!product) {
    notFound();
  }

  return generateProductMetadata(product);
}

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
      <SchemaOrgProduct product={product} />
      <div className={styles.stage}>
        <Header />
        <ProductView product={product} />
        <Footer mode='light' />
      </div>
    </>
  );
}
