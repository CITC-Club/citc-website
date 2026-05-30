import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Note: Next.js 16 defaults to Turbopack for `next build`, which currently hangs.
  // Webpack is used via the `--webpack` flag in the `build` script in `package.json`.
  serverExternalPackages: ['postgres', 'sharp', '@jsquash/avif'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-markdown'],
  },
};

export default nextConfig;
