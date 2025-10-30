import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.writingbeginner.com',       // external images for blog feed
      'your-project-id.supabase.co',   // Supabase storage domain
    ],
  },
};

export default nextConfig;
