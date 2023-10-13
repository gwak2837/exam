/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: { exclude: ['error'] },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
