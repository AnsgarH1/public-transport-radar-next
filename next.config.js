/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["hafas-client"],
  },
};

module.exports = nextConfig;
