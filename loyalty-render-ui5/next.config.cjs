// next.config.cjs — CommonJS config (works even if package.json has "type":"module")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // DO NOT set output: "standalone" when using a custom Express server
  // output: "standalone",
};

module.exports = nextConfig;