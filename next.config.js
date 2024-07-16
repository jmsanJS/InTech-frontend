/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    domains: [
      "media.wired.com",
      "cdn.vox-cdn.com",
      "dwgyu36up6iuz.cloudfront.net",
      "images.newscientist.com",
      "s.yimg.com",
      "cdn.arstechnica.net",
      "img-cdn.tnwcdn.com",
      "techcrunch.com",
      "media.zenfs.com",
      "s.aolcdn.com"
    ],
  },
};

module.exports = nextConfig;
