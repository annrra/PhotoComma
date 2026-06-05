'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './pv.module.css';
import type { Product } from './types';
import { ViewControls } from '@/src/components/ViewControls';
import { useCart } from '@/src/context/CartContext/CartContext';
import classNames from 'classnames';

type ProductViewProps = {
  product: Product;
};

function formatPrice(price?: string | null) {
  if (!price) return null;

  const formatted = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
  }).format(Number(price));

  return (
    <>
      <span className={styles['price-number']}>{formatted}</span> EUR
    </>
  );
}

const ProductView = ({ product }: ProductViewProps) => {
  const { addItem } = useCart();

  const productImage = product?.featuredImage?.node;

  const variations = useMemo(() => {
    return product.variations?.nodes ?? [];
  }, [product.variations]);

  const defaultIndex = useMemo(() => {
    if (!variations.length) return 0;

    return variations.reduce((minIdx, v, i, arr) => {
      const price = Number(v.price);
      const minPrice = Number(arr[minIdx].price);

      return price < minPrice ? i : minIdx;
    }, 0);
  }, [variations]);

  const [selected, setSelected] = useState(defaultIndex);

  const activeVariation = variations[selected];
  

  return (
    <>
      <ViewControls />
      <div className={styles.panel}>
        <div className={styles.breadcrumb}>
          <Link href="/prints">
            <svg
              width={45}
              height={8}
              viewBox="0 0 45 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="prev"
                d="M0.146446 3.32845C-0.0488167 3.52371 -0.0488167 3.84029 0.146446 4.03556L3.32843 7.21754C3.52369 7.4128 3.84027 7.4128 4.03553 7.21754C4.2308 7.02228 4.2308 6.70569 4.03553 6.51043L1.20711 3.682L4.03553 0.853576C4.2308 0.658314 4.2308 0.341732 4.03553 0.146469C3.84027 -0.0487928 3.52369 -0.0487928 3.32843 0.146469L0.146446 3.32845ZM44.5 3.68201L44.5 3.18201L0.5 3.182L0.5 3.682L0.5 4.182L44.5 4.18201L44.5 3.68201Z"
                className={styles['fill-crumb']}
              />
            </svg>
            <span>Back to Shop</span></Link>
        </div>
        <div className={styles.scene}>
          <div className={styles.preview}>
            {productImage?.sourceUrl && (
              <>
                <Image
                  src={productImage?.sourceUrl}
                  alt={productImage?.altText || ""}
                  width={0}
                  height={0}
                  unoptimized
                  sizes="100vw"
                  priority
                  fetchPriority="high"
                  className={styles['preview-figure']}
                />
              </>
            )}
          </div>
          <div className={styles.info}>
            <h1>{product.title}</h1>

            <div className={styles.price}>
              {activeVariation ? formatPrice(activeVariation.price) : ''}
            </div>

            <div className={styles['variation-label']}>Select size:</div>
            <div className={styles.variations}>
              {variations.map((v, i) => {
                const label = v.attributes?.nodes?.[0]?.value ?? 'Option';

                return (
                  <div key={v.id} className={styles.variation}>
                    <button
                      onClick={() => setSelected(i)}
                      className={classNames(styles.swatch, {[styles.active]: i === selected})}
                      aria-label={label}
                      title={label}
                    >
                      {label}
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: product.description ?? '',
              }}
            />

            <button
              className={styles['cart-btn']}
              onClick={() =>
                addItem({
                  productId: product.databaseId,
                  variationId: activeVariation.id,
                  title: product.title,
                  image: productImage?.sourceUrl || '',
                  size: activeVariation.attributes.nodes?.[0]?.value || '',
                  price: Number(activeVariation.price),
                })
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductView;
