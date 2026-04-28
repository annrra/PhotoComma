import type { Metadata } from "next";
import { PrintsView } from '@/src/components/PrintsView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Photography Prints',
  description: 'Fine art photography prints by Andrey Raychev, available worldwide. Carefully produced prints from selected photographic projects.',

  alternates: {
    canonical: '/prints',
  },

  openGraph: {
    title: 'Photography Prints | PhotoComma',
    description: 'Fine art photography prints by Andrey Raychev, available worldwide. Carefully produced prints from selected photographic projects.',
    url: 'https://photocomma.com/prints',
    siteName: 'PhotoComma',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Black and white photograph of a bent tree and a curving road',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Photography Prints | PhotoComma',
    description: 'Fine art photography prints by Andrey Raychev, available worldwide. Carefully produced prints from selected photographic projects.',
    images: ['/og-default.jpg'],
  },
};

export default async function Prints() {

  return (
    <div className={styles.print}>
      <Header />
      <PrintsView />
      <Footer mode='light' />
    </div>
  );
}
