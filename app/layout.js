import "./globals.css"
import { getSiteOrigin } from "../lib/site"

export const metadata = {
  metadataBase: getSiteOrigin(),
  title: "Lele Yang",
  description: "Interactive designer portfolio"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
