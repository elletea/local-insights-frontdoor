import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/sites/local-insights-frontdoor',
  assetPrefix: '/sites/local-insights-frontdoor',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
