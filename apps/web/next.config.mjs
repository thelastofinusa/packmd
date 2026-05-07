/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.producthunt.com",
      },
    ],
    qualities: [100],
  },
}

export default nextConfig
