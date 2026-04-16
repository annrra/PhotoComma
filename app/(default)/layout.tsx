import styles from './page.module.css';
import { Header } from '@/src/components/Header';

export default function DefualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.stage}>
      <Header />
      <div className={styles.screen}>
        {children}
      </div>
    </div>
  );
}
