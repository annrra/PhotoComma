import styles from './page.module.css';
import { ViewProvider } from '@/src/context/ViewContext/ViewContext';

export default function DefualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.stage}>
      <ViewProvider>
        {children}
      </ViewProvider>
    </div>
  );
}
