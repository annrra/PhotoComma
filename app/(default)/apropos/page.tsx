import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getAboutPage } from '@/lib/api';
import type { AboutPage } from '@/src/components/AboutView/types';
import { AboutView } from '@/src/components/AboutView';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'PhotoComma is a photography portfolio by Andrey Raychev featuring documentary and thematic image series.',

  alternates: {
    canonical: '/apropos',
  },

  openGraph: {
    title: 'About | PhotoComma',
    description: 'PhotoComma is a photography portfolio by Andrey Raychev featuring documentary and thematic image series.',
    url: 'https://photocomma.com/apropos',
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
    title: 'About | PhotoComma',
    description: 'PhotoComma is a photography portfolio by Andrey Raychev featuring documentary and thematic image series.',
    images: ['/og-default.jpg'],
  },
};

export type GetAboutResponse = {
  page: {
    nextAbout: AboutPage | null;
  };
};

export default async function About() {

  const rawData: GetAboutResponse = await getAboutPage();
  const about = rawData?.page?.nextAbout ?? null;

  if (!about) {
    notFound();
  }

  return (
    <>
      <Header customClassName={styles['header-alt']} />
      <div className={styles.pane}>
        <AboutView page={about} />
      </div>
      <Footer mode='light' />
    </>
  );
}
