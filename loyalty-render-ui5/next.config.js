// next.config.js — patch: remove `output: "standalone"` to allow custom Express server
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // IMPORTANT: do NOT set output: "standalone" when using a custom Express server
  // output: "standalone",
};

module.exports = nextConfig;