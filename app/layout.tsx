import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/context/ThemeContext/ThemeContext';
import { Geist } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SchemaOrg } from '@/src/components/seo/SchemaOrg';

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
        <Analytics />
      </body>
    </html>
  );
}
