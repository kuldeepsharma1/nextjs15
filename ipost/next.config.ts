import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows all paths under the images domain
      },
      {
        protocol: 'https',
        hostname: 'images.app.goo.gl',
        port: '',
        pathname: '/**', // Allows all paths under the images domain
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**', // Allows all Pixabay images
      },
    ],
  },
};

export default nextConfig;
