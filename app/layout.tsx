import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/context/ThemeContext/ThemeContext';
import { Geist } from 'next/font/google';
import './globals.css';
import { SchemaOrg } from '@/src/components/seo/SchemaOrg';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | PhotoComma',
    default: 'PhotoComma - Photography by Andrey Raychev',
  },
  description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',
  metadataBase: new URL('https://photocomma.com/'),

  openGraph: {
    title: 'PhotoComma - Photography by Andrey Raychev',
    description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',
    url: 'https://photocomma.com/',
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
    title: 'PhotoComma - Photography by Andrey Raychev',
    description: 'Photography portfolio of Andrey Raychev featuring documentary and thematic image series.',
    images: ['/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <SchemaOrg />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Script src="https://cloud.umami.is/script.js" data-website-id="dffb56f9-9e92-4be9-8a3b-fc5433a4274d" strategy="afterInteractive"></Script>
      </body>
    </html>
  );
}
