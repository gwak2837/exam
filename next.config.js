/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
