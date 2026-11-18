/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: `https://ashikur-on-web.vercel.app/`, // Enter your site URL
    generateRobotsTxt: true, // optional
    // only real pages belong in the sitemap, not the share image or icons
    exclude: ["/opengraph-image.jpg", "/icon.svg", "/apple-icon.png", "/favicon.ico"],
    // other configurations...
  }