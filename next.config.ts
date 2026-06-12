/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Indispensable pour GitHub Pages
  images: {
    unoptimized: true, // Recommandé pour l'export statique
  },
  // Si votre dépôt GitHub s'appelle "mon-blog", désactivez le commentaire ci-dessous :
  // basePath: '/mon-blog',
};

export default nextConfig;