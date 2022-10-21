/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/betting',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
