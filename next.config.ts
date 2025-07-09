import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // disables PWA in dev
});

const nextConfig: NextConfig = {
  devIndicators: false,
};

module.exports = withPWA(nextConfig);

export default nextConfig;
