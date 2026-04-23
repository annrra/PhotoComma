import type { Metadata } from "next";
import { PrintsView } from '@/src/components/PrintsView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Prints | PhotoComma - Photography by Andrey Raychev',
  description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',

  alternates: {
    canonical: '/prints',
  },

  openGraph: {
    title: 'Prints | PhotoComma',
    description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',
    url: 'https://photocomma.com/apropos',
    siteName: 'PhotoComma',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'PhotoComma - Prints Page',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Prints | PhotoComma',
    description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',
    images: ['/og-default.jpg'],
  },
};

export default async function Prints() {

  return (
    <div className={styles.print}>
      <Header />
      <div className={styles.pane}>
        <PrintsView />
      </div>
      <Footer mode='light' />
    </div>
  );
}
