'use client';
import styles from './pv.module.css';
import PrintsInfoPanel from './PrintsInfoPanel';
import ProductCard from './ProductCard';
import { ViewControls } from '@/src/components/ViewControls';
import type { Product } from "./types";

type PrintsViewProps = {
  products: Product[];
};

const PrintsView = ({ products }: PrintsViewProps) => {
  console.log(JSON.stringify(products, null, 2));
  

  return (
    <>
      <ViewControls />
      <div className={styles.pane}>
        <div className={styles.panel}>
          <PrintsInfoPanel />
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.databaseId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PrintsView;
