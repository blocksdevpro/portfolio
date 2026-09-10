import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/portrait.webp", search: "" }],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
