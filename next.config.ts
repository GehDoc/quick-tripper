/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Indispensable pour GitHub Pages
  basePath: isProd ? '/quick-tripper' : '',
  assetPrefix: isProd ? '/quick-tripper/' : '',
  images: {
    unoptimized: true, // Recommandé pour l'export statique
  },
};

export default nextConfig;
