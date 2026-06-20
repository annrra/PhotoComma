'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/src/context/CartContext/CartContext';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ViewControls } from '@/src/components/ViewControls';
import { SeparatorDecorator } from '@/src/components/ui/SeparatorDecorator';
import styles from './cs.module.css';

const CheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderId) return;

    const clearedKey = `order-cleared-${orderId}`;
    const alreadyCleared = localStorage.getItem(clearedKey);

    if (alreadyCleared) return;

    clearCart?.();
    localStorage.removeItem('photocomma-cart');

    localStorage.setItem(clearedKey, 'true');
  }, [orderId, clearCart]);

  return (
    <>
      <div className={styles.print}>
        <Header />
        <>
          <ViewControls hasCartDrawer={false} />
          <div className={styles.pane}>
            <div className={styles.panel}>
              <div className={styles.segment}>
                <SeparatorDecorator />
                <h1>Thank you for your order</h1>
                {orderId && (
                  <div>
                    Order reference: <strong>#{orderId}</strong>
                  </div>
                )}

                <div>You will receive a confirmation email shortly.</div>

                <Link href="/prints">Return to shop</Link>
              </div>
            </div>
          </div>
        </>
        <Footer mode='light' />
      </div>
    </>
  );
}

export default CheckoutSuccess;