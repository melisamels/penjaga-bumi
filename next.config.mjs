/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT_STATIC === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  basePath: process.env.BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
