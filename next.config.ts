import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: process.env.NEXTAUTH_URL + "/api/:path*"
  //     }
  //   ]
  // }
};

export default nextConfig;
