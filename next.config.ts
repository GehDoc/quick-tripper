/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Indispensable pour GitHub Pages
  basePath: '/quick-tripper',
  assetPrefix: '/quick-tripper',
  images: {
    unoptimized: true, // Recommandé pour l'export statique
  },
};

export default nextConfig;
