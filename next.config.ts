
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Configure font optimization
  optimizeFonts: true,
  
  // Configure headers to allow font loading
  async headers() {
    return [
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}

export default nextConfig