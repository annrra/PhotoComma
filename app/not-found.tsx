import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

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
        <svg
          width={84}
          height={84}
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M41.9992 0C65.2254 2.78476e-06 84 18.7746 84 42.0008C84 65.2253 65.2254 84 41.9992 84C18.7747 84 0 65.2253 0 42.0008C1.39238e-06 18.7746 18.7747 0 41.9992 0ZM39.8471 16.0823C39.8471 16.0823 27.1437 16.4253 23.3743 26.2482C17.9541 30.8513 13.6819 36.6352 15.3391 42.778C18.8153 55.6653 31.7196 67.2336 45.7989 66.0416C58.168 64.9934 71.2178 51.0444 68.8202 40.1518C66.8103 31.0269 50.1403 19.12 42.3598 20.9707C33.7819 23.0094 29.8823 29.8366 31.6314 40.3092C32.1326 43.3029 33.0928 49.3664 37.4545 49.8812C41.8163 50.3959 49.5528 44.2325 49.5528 44.2325C49.5528 44.2325 38.7888 45.9731 36.3404 39.9147C34.6743 35.7917 38.1284 31.159 43.4892 29.7875C48.8517 28.4143 53.708 28.377 56.2851 38.4958C58.8622 48.6146 53.4184 55.2166 44.6812 57.1909C36.2811 59.089 27.8827 54.1633 23.8291 41.1068C21.8155 34.6174 22.0077 29.8097 23.3743 26.2482C30.5926 20.1182 39.8471 16.0823 39.8471 16.0823Z"
            className={styles.fillaccent}
          />
        </svg>
      </Link>
			<div className={styles.notice}>
				<h1>Page not found</h1>
				<div>Sorry, this page does not exist. Go back to the <Link href="/">homepage</Link>.</div>
			</div>
		</div>
	)
}