/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rb.gy",
      },
    ],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig;
