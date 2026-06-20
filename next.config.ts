import type { NextConfig } from "next";
const SHOP_URL = "https://shop.photocomma.com";
const API_URL = "https://api.photocomma.com";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cloud.umami.is;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      font-src 'self' data: https:;
      connect-src 'self' ${API_URL} ${SHOP_URL} https://va.vercel-scripts.com https://vitals.vercel-insights.com https://cloud.umami.is https://api-gateway.umami.dev;
      media-src 'self' ${API_URL};
      frame-ancestors 'none';
    `.replace(/\n/g, ""),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
		remotePatterns: [
			{
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photocomma.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.photocomma.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    if (isDev) {
      return [];
    }

    return [
      {
        source: "/(.*)", // applies to ALL routes
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;