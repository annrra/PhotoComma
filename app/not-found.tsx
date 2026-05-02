import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { LogoSvg } from '@/src/components/ui/LogoSvg';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist. Explore photography projects and images on PhotoComma.',

  openGraph: {
    title: 'Page Not Found - PhotoComma',
    description: 'This page does not exist. Explore photography projects and images on PhotoComma.',
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
    title: 'Page Not Found - PhotoComma',
    description: 'This page does not exist. Explore photography projects and images on PhotoComma.',
    images: ['/og-default.jpg'],
  },
};

export default function NotFound() {

	return (
		<div className={styles.notfound}>
      <Link href="/" className={styles.logo}>
        <LogoSvg spin />
      </Link>
			<div className={styles.notice}>
				<h1>Page not found</h1>
				<div>Sorry, this page does not exist. Go back to the <Link href="/">homepage</Link>.</div>
			</div>
		</div>
	)
}