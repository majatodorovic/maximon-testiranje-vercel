/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    INSTAGRAM: process.env.INSTAGRAM,
    HTML_LANG: process.env.HTML_LANG,
    PAGINATION_TYPE: process.env.PAGINATION_TYPE,
    PAGINATION_LIMIT: process.env.PAGINATION_LIMIT,
    STREET_ADDRESS: process.env.STREET_ADDRESS,
    CITY: process.env.CITY,
    POSTAL_CODE: process.env.POSTAL_CODE,
    ADDRESS_COUNTRY: process.env.ADDRESS_COUNTRY,
    SHOW_CHECKOUT_SHIPPING_FORM: process.env.SHOW_CHECKOUT_SHIPPING_FORM,
    SHOW_FREE_DELIVERY_SCALE: process.env.SHOW_FREE_DELIVERY_SCALE,
    SERVER_IP: process.env.SERVER_IP,
  },
  images: {
    unoptimized: true,
    domains: [
      "scontent.cdninstagram.com",
      "192.168.1.223",
      "api.fashiondemo.croonus.com",
      "video.cdninstagram.com",
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

module.exports = nextConfig;
