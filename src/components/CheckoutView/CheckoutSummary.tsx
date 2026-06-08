import styles from './cs.module.css';
import { CheckoutItem } from './checkoutTypes';

type Props = {
  items: CheckoutItem[];
};

export function CheckoutSummary({ items }: Props) {
  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className={styles.summary}>
      <h3 className={styles.heading}>Order summary</h3>

      {items.map((item) => (
        <div key={item.key}>
          {item.title} × {item.quantity}
        </div>
      ))}

      <span className={styles.sep}></span>

      <div className={styles.total}>
        <span className={styles.label}>Total:</span>
        <span className={styles['total-val']}>{total.toFixed(2)}</span>
      </div>
    </div>
  );
}