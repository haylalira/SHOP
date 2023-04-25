/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,

  images: {
    domains: ["files.stripe.com"],
  },

  experimental:{
    images: {
      unoptimized: true,
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      formats: ['image/webp'],
    },
  
  }

}

module.exports = nextConfig
