import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/sites/local-insights-frontdoor' : '',
  assetPrefix: isProd ? '/sites/local-insights-frontdoor' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
