import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { CheckoutView } from '@/src/components/CheckoutView';
import styles from './page.module.css';

export default function CheckoutPage() {

  return (
    <>
      <div className={styles.checkout}>
        <Header />
        <CheckoutView />
        <Footer mode='light' />
      </div>
    </>
  );
}