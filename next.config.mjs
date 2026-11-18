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
    // nasheeds download only when someone presses play, then the browser keeps them for a year.
    // Replacing a track? Give the new file a new name, or old visitors keep hearing the old one.
    async headers() {
        return [
            {
                source: "/desk/audio/:file*",
                headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
        ];
    },
};

export default nextConfig;
