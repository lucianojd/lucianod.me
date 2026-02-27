import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    includePaths: ['./styles'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['lucianod.me']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com'
      }
    ]
  }
}
 
export default nextConfig