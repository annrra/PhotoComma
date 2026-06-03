'use client';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

type AnalyticsGateProps = {
  validRoutes: string[];
  websiteId: string;
};

export function AnalyticsGate({ validRoutes, websiteId }: AnalyticsGateProps) {
  const pathname = usePathname();

  if (!validRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
