/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isPlaywrightTest = process.env.PLAYWRIGHT_TEST === 'true';

const nextConfig = {
  output: 'export', // Indispensable pour GitHub Pages
  basePath: isPlaywrightTest ? '' : isProd ? '/quick-tripper' : '',
  assetPrefix: isPlaywrightTest ? '' : isProd ? '/quick-tripper/' : '',
  images: {
    unoptimized: true, // Recommandé pour l'export statique
  },
};

export default nextConfig;
