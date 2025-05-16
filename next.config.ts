import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'export',
  assetPrefix: process.env.DEPLOY_BASE_PATH,
  basePath: process.env.DEPLOY_BASE_PATH,
};

export default nextConfig;
