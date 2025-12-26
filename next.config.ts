import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
  logging: {
    fetches: {
      fullUrl: true,
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