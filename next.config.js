/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    ...(process.env.NODE_ENV === 'production' && { removeConsole: { exclude: ['error'] } }),
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
