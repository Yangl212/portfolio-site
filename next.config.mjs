/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/",
        permanent: false
      },
      /* The zine's slug was misspelled "alcohal" until the URL went onto a
         resume. Permanent, on both tracks, so anything already sent out - or
         already indexed - still lands. */
      {
        source: "/project/alcohal",
        destination: "/project/alcohol",
        permanent: true
      },
      {
        source: "/visual/project/alcohal",
        destination: "/visual/project/alcohol",
        permanent: true
      }
    ]
  }
}

export default nextConfig
