import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const localhost = isDev ? " http://localhost" : "";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cloud.umami.is;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:${localhost};
      font-src 'self' data: https:;
      connect-src 'self' https://api.photocomma.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://cloud.umami.is https://api-gateway.umami.dev${localhost};
      media-src 'self' https://api.photocomma.com;
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
    dangerouslyAllowLocalIP: true, //dev only - not for production
  },

  async headers() {
    return [
      {
        source: "/(.*)", // applies to ALL routes
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
