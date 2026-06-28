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

const defaultShortDescription = `
  <p>Printed on high-quality 320 gsm matte fine art paper with a smooth, non-reflective finish that enhances detail and color depth while ensuring durability over time. Perfect for framing, gifting, or displaying in any space.</p>
  <p>Each print is produced with attention to composition and may include slight white margins depending on the original aspect ratio to preserve the full image area without cropping.</p>
  <p>Please note that minor variations in dimensions may occur due to printing tolerances and bleed margins. Colors may also vary slightly depending on screen settings and print calibration.</p>
`;

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawProductData: GetProductResponse = await getProduct(slug);
  const product = rawProductData.product;
  if (!product) notFound();

  const normalizedProduct = {
    ...product,
    shortDescription:
      product.shortDescription?.trim() || defaultShortDescription,
  };

  return (
    <>
      <SchemaOrgProduct product={normalizedProduct} />
      <div className={styles.stage}>
        <Header />
        <ProductView product={normalizedProduct} />
        <Footer mode='light' />
      </div>
    </>
  );
}
