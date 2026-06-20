'use client';
import styles from './ct.module.css';
import { LogoSvg } from '@/src/components/ui/LogoSvg';

const CheckoutTransition = ({
  open,
  status,
}: {
  open: boolean;
  status: string;
}) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <LogoSvg spin customClassName={styles['filler-static']} />
        <div>Preparing secure checkout...</div>
        <div>{status}</div>
      </div>
    </div>
  );
}

export default CheckoutTransition;