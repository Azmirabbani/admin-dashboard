import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ini yang mematikan error ESLint saat build
  },
};

export default nextConfig;
