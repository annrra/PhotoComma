'use client';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <>
      <div className={styles.success}>
      <Header />
        <div className={styles.panel}>
          <h1>Thank you for your order</h1>
          <div className={styles.tx}>Your order <span className={styles['order-num']}>#{orderNumber}</span> has been received.<br />We will contact you once your prints are shipped.
          </div>
        </div>
        <Footer mode='light' />
      </div>
    </>
  );
}