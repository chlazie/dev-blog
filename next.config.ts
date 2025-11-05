/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: true,
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wxjryeqnkgauealxqgte.supabase.co', // your Supabase storage
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google avatar
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.writingbeginner.com', // example blog image host
        pathname: '/**',
      },
      // Add more hosts as needed
    ],
  },

  optimizeFonts: true,
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
