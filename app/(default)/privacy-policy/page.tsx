import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { getPrivacyPolicy } from '@/lib/woocommerce/wooapi';
import type { PrivacyPolicyPage } from '@/src/components/PrivacyPolicy/types';
import { PrivacyPolicy } from '@/src/components/PrivacyPolicy';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | PhotoComma',
  description: 'Information about how PhotoComma collects, uses, and protects personal data when you use this website.',

  alternates: {
    canonical: '/privacy-policy',
  },

  openGraph: {
    title: 'Privacy Policy | PhotoComma',
    description: 'Information about how PhotoComma collects, uses, and protects personal data when you use this website.',
    url: 'https://photocomma.com/privacy-policy',
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
    title: 'Privacy Policy | PhotoComma',
    description: 'Information about how PhotoComma handles personal data and privacy.',
    images: ['/og-default.jpg'],
  },
};

export type GetPrivacyPolicyResponse = {
  page: PrivacyPolicyPage | null;
};

export default async function PrivacyPolicyPage() {

  const rawData: GetPrivacyPolicyResponse = await getPrivacyPolicy();
  const pp = rawData?.page ?? null;

  if (!pp) {
    notFound();
  }

  return (
    <>
      <Header customClassName={styles['header-alt']} />
      <PrivacyPolicy page={pp} />
      <Footer mode='light' />
    </>
  );
}
