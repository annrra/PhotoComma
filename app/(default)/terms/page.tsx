import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getTermsAndConditions } from '@/lib/woocommerce/wooapi';
import type { TermsConditionsPage } from '@/src/components/TermsConditions/types';
import { TermsConditions } from '@/src/components/TermsConditions';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions | PhotoComma',
  description: 'Terms and conditions for purchasing photographic prints and publications from PhotoComma.',

  alternates: {
    canonical: '/terms',
  },

  openGraph: {
    title: 'Terms & Conditions | PhotoComma',
    description: 'Terms and conditions for purchasing photographic prints and publications from PhotoComma.',
    url: 'https://photocomma.com/terms',
    siteName: 'PhotoComma',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'PhotoComma abstract visual identity image',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | PhotoComma',
    description: 'Terms and conditions for purchases and usage of content from PhotoComma.',
    images: ['/og-default.jpg'],
  },
};

export type GetTermsConditionsResponse = {
  page: TermsConditionsPage | null;
};

export default async function PrivacyPolicyPage() {

  const rawData: GetTermsConditionsResponse = await getTermsAndConditions();
  const terms = rawData?.page ?? null;

  if (!terms) {
    notFound();
  }

  return (
    <>
      <Header customClassName={styles['header-alt']} />
      <TermsConditions page={terms} />
      <Footer mode='light' />
    </>
  );
}
