'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './pv.module.css';
import type { Product } from './types';
import classNames from 'classnames';

type Props = {
  product: Product;
};

function formatPrice(price: string) {
  const formatted = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
  }).format(Number(price));

  return (
    <>
      <span className={styles['price-number']}>{formatted}</span> EUR
    </>
  );
}

const ProductCard = ({ product }: Props) => {
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
    <div className={styles.item}>
      <Link href={`/shop/${product.slug}`}>
        {product.featuredImage?.node?.sourceUrl && (
          <Image
            src={product.featuredImage.node.sourceUrl}
            alt={product.featuredImage.node.altText || product.title}
            width={600}
            height={600}
            className={styles.image}
            unoptimized
          />
        )}
      </Link>

      <div className={styles['product-content']}>
        <h2>{product.title}</h2>

        <div className={styles['purchase-info']}>
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
                  />
                  <span className={styles.tooltip}>{label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.price}>
            {activeVariation ? formatPrice(activeVariation.price) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;