import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/context/ThemeContext/ThemeContext';
import { CartProvider } from '@/src/context/CartContext/CartContext';
import { AnalyticsGate } from '@/src/components/AnalyticsGate';
import { getValidRoutes } from '@/lib/validRoutes';
import { Geist } from 'next/font/google';
import './globals.css';

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

const UMAMI_WEBSITE_ID = 'dffb56f9-9e92-4be9-8a3b-fc5433a4274d';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const validRoutes = await getValidRoutes();

  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
        <AnalyticsGate validRoutes={validRoutes} websiteId={UMAMI_WEBSITE_ID} />
      </body>
    </html>
  );
}
