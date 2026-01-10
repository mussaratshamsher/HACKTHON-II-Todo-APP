import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  trailingSlash: true, // Generate /about/index.html instead of /about.html
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

export default nextConfig;
