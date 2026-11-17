/** @type {import('next').NextConfig} */
const nextConfig = {
    // test builds use their own folder so they never clash with a running `next dev`
    distDir: process.env.NEXT_DIST_DIR || ".next",
    images: {
        domains: ['github-profile-summary-cards.vercel.app','github-readme-stats.vercel.app'],
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
