/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/",
        permanent: false
      }
    ]
  }
}

export default nextConfig
