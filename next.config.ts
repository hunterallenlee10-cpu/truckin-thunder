import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [360, 480, 640, 768, 960, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 128, 200, 256, 320, 420],
  },
  poweredByHeader: false,
};

export default nextConfig;
