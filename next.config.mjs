/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos',
      'jsonplaceholder.typicode.com',
    ],
  },
};

export default nextConfig;
