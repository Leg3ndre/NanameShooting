import type { NextConfig } from "next";

let nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

if (process.env.NODE_ENV !== 'development') {
  nextConfig = {
    ...nextConfig,
    output: 'export',
    assetPrefix: process.env?.DEPLOY_BASE_PATH,
    basePath: process.env?.DEPLOY_BASE_PATH,
  };
}

export default nextConfig;
