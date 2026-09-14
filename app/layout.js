import "./globals.css"
import { BackToTop } from "../components/BackToTop"
import { getSiteOrigin } from "../lib/site"

export const metadata = {
  metadataBase: getSiteOrigin(),
  title: "Lele Yang",
  description: "Interactive designer portfolio"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Every route is a long scroll, so the way back up lives here rather
            than being re-mounted page by page. It shows itself only once there
            is a screen of scrolling behind it. */}
        <BackToTop />
      </body>
    </html>
  )
}
