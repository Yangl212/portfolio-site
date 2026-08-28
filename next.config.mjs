/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/project",
        permanent: false
      }
    ]
  }
}

export default nextConfig
