/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    ...(process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && { removeConsole: { exclude: ['error'] } }),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
  },
  poweredByHeader: false,
}

module.exports = nextConfig
