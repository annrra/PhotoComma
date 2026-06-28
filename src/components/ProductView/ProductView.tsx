'use client';
import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './pv.module.css';
import type { Product } from './types';
import { ViewControls } from '@/src/components/ViewControls';
import { useCart } from '@/src/context/CartContext/CartContext';
import classNames from 'classnames';
import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';

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
  const { addItem, openCart } = useCart();
  const [isImageOpen, setIsImageOpen] = useState(false);

  const productImage = product?.featuredImage?.node;

  const variations = useMemo(() => {
    return product.variations?.nodes ?? [];
  }, [product.variations]);

  const defaultIndex = useMemo(() => {
    if (!variations.length) return 0;

    const defaults = product.defaultAttributes?.nodes ?? [];

    // 1. Try match WooCommerce default attributes
    if (defaults.length) {
      const matchIndex = variations.findIndex(v => {
        const attrs = v.attributes?.nodes ?? [];

        return defaults.every(def =>
          attrs.some(
            a => a.name === def.name && a.value === def.value
          )
        );
      });

      if (matchIndex !== -1) return matchIndex;
    }

    // 2. Fallback: cheapest variation
    return variations.reduce((minIdx, v, i, arr) => {
      const price = Number(v.price);
      const minPrice = Number(arr[minIdx].price);

      return price < minPrice ? i : minIdx;
    }, 0);
  }, [variations, product.defaultAttributes]);

  const [selected, setSelected] = useState(defaultIndex);

  const activeVariation = variations[selected];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsImageOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
          <div className={styles.preview} onClick={() => setIsImageOpen(true)}>
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

            <div className={styles.info}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: product.description ?? '',
                }}
              />
              <SeparatorDecorator />
              <div
                className={styles.details}
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription ?? '',
                }}
              />
            </div>

            <button
              className={styles['cart-btn']}
              onClick={() => {
                addItem({
                  productId: product.databaseId,
                  variationId: activeVariation.databaseId,
                  title: product.title,
                  image: productImage?.sourceUrl || '',
                  size: activeVariation.attributes.nodes?.[0]?.value || '',
                  price: Number(activeVariation.price),
                  quantity: 1,
                });

                // UX rule: open cart drawer after adding
                openCart();
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {isImageOpen && productImage?.sourceUrl && (
        <div className={styles.modal} onClick={() => setIsImageOpen(false)}>
          <button onClick={() => setIsImageOpen(false)} className={styles.close}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.96381 8.02502L10.8114 11.8727L6.96443 15.7197C6.67153 16.0126 6.67153 16.4874 6.96443 16.7803C7.25732 17.0732 7.73219 17.0732 8.02509 16.7803L11.8721 12.9333L15.7191 16.7803C16.012 17.0732 16.4869 17.0732 16.7798 16.7803C17.0727 16.4874 17.0727 16.0126 16.7798 15.7197L12.9328 11.8727L16.7804 8.02502C17.0733 7.73213 17.0733 7.25725 16.7804 6.96436C16.4875 6.67147 16.0126 6.67147 15.7197 6.96436L11.8721 10.812L8.02447 6.96436C7.73158 6.67147 7.2567 6.67147 6.96381 6.96436C6.67092 7.25725 6.67092 7.73213 6.96381 8.02502Z"
                fill="black"
                className={styles['fill-x']}
              />
            </svg>
          </button>
          <div className={styles['modal-content']}>
            <Image
              src={productImage.sourceUrl}
              alt={productImage?.altText || ""}
              width={1200}
              height={1200}
              unoptimized
              className={styles['modal-image']}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductView;
