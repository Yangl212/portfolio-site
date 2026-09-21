import { DM_Mono } from "next/font/google"

import "./globals.css"
import { BackToTop } from "../components/BackToTop"
import { getSiteOrigin } from "../lib/site"

const SITE_NAME = "Lele Yang"

/* The site's small print - the header's links, the eyebrows, the cursor
   labels - is set in this mono on every page, so it is loaded once here
   rather than page by page. */
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" })

/*
 * Every page below sets its own `title` and `description`. The template here
 * appends the site name to whichever title a page provides, so a page only
 * has to say what it is ("BOA: Budgeting Redesign"), not repeat the brand.
 *
 * `openGraph.images` is the fallback link-preview image for every page that
 * does not set its own - currently every page, so this is the image LinkedIn,
 * Slack and email clients pull when any URL on the site is shared. BOA leads
 * the home page, so its cover doubles as the site's face.
 */
export const metadata = {
  metadataBase: getSiteOrigin(),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`
  },
  description:
    "Product design case studies in UX, AI, and interactive experiences by Lele Yang, based in New York.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: "/covers/boa-budgeting.webp",
        width: 1600,
        height: 1000,
        alt: "BOA: Budgeting Redesign - a redesigned budget screen on a phone"
      }
    ]
  },
  twitter: {
    card: "summary_large_image"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mono.variable}>
        {children}
        {/* Every route is a long scroll, so the way back up lives here rather
            than being re-mounted page by page. It shows itself only once there
            is a screen of scrolling behind it. */}
        <BackToTop />
      </body>
    </html>
  )
}
