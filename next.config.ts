import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next.js 16 defaults to Turbopack for `next build`; it can hang on this project.
  // Production builds use webpack via `npm run build` and vercel.json buildCommand.
};

export default nextConfig;
