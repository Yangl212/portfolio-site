/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      /* The product track was at /product before it became the root.
         Temporary rather than permanent, so a browser does not remember it
         if the arrangement changes again. */
      { source: "/product", destination: "/", permanent: false },
      { source: "/product/:path*", destination: "/:path*", permanent: false },
      { source: "/zh/product", destination: "/zh", permanent: false },
      { source: "/zh/product/:path*", destination: "/zh/:path*", permanent: false },
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
      },
      /* BOA's route segment carried the working name "uxcasestudy" from before
         the project had a title. Permanent, on both tracks, so anything
         already sent out - or already indexed - still lands. */
      {
        source: "/project/uxcasestudy",
        destination: "/project/boa-budgeting",
        permanent: true
      },
      {
        source: "/visual/project/uxcasestudy",
        destination: "/visual/project/boa-budgeting",
        permanent: true
      }
    ]
  }
}

export default nextConfig
