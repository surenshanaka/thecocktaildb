import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thecocktaildb.com",
        port: '',
        pathname: "/images/media/drink/**",
        search: '',
      },
    ],
  },
};

export default nextConfig;
