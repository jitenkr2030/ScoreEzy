let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'ws'];
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/notifications/ws',
        destination: '/api/notifications/ws'
      }
    ];
  }
};

export default nextConfig
