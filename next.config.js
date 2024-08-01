/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // distDir: "out",
  output: "standalone",
  rewrites: async () => [
    {
      source: "/",
      destination: "/login"
    },
    {
      source: "/panel",
      destination: "/panel"
    }
  ]
};

module.exports = nextConfig;

// export default nextConfig;