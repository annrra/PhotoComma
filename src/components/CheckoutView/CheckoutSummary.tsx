import styles from './cs.module.css';

export function CheckoutSummary({ items }: any) {
  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className={styles.summary}>
      <h3 className={styles.heading}>Order summary</h3>

      {items.map((item: any) => (
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