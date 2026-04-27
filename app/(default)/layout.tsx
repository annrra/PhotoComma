import styles from './page.module.css';

export default function DefualtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.stage}>
      {children}
    </div>
  );
}
