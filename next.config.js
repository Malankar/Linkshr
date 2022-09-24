/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig,{
  webpack: (config, { isServer }) => {
      if (!isServer) {
          config.node = {
              net: 'empty'
          };
      }

      return config;
  }
}