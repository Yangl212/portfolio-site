"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/*
 * Keeps <html lang> honest under a /zh URL. The root layout can't see the
 * current segment (it's a Server Component with no access to the request
 * path without middleware), so this tiny client component - mounted once in
 * app/layout.js - reads the pathname on the client and writes the attribute
 * directly. Renders nothing; it only ever touches the one attribute.
 */
export function LocaleHtmlLang() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/zh") && (pathname.length === 3 || pathname[3] === "/") ? "zh" : "en"
  }, [pathname])

  return null
}
