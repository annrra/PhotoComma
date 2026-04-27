import styles from './page.module.css';
import { ViewProvider } from '@/src/context/ViewContext/ViewContext';
import { ThemeProvider } from '@/src/context/ThemeContext/ThemeContext';

export default function DefualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <div className={styles.stage}>
        <ViewProvider>
          {children}
        </ViewProvider>
      </div>
    </ThemeProvider>
  );
}
