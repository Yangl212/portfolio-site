# Framer Migration — Status

Migration complete. All 13 real routes are now hand-written Next.js/React pages; the site no longer depends on Framer in any way at runtime.

## Routes (all native Next.js pages under `app/`)

- `/` — `app/page.jsx`
- `/project` — `app/project/page.jsx`
- `/interest` — `app/interest/page.jsx`
- `/contact` — `app/contact/page.jsx`
- `/xiangmuxiangqing/alcohal`
- `/xiangmuxiangqing/backstage`
- `/xiangmuxiangqing/graveyard`
- `/xiangmuxiangqing/inflankland`
- `/xiangmuxiangqing/lastmessage`
- `/xiangmuxiangqing/suglar`
- `/xiangmuxiangqing/taroo`
- `/xiangmuxiangqing/totnurture`
- `/xiangmuxiangqing/uxcasestudy`

`/page` was the original Framer template's empty placeholder route (no real content in its `#main`) and was intentionally not migrated.

## What changed from the Framer export

- Every page is a plain React component (`page.jsx` + CSS Module) reusing the shared `.page/.frame/.content` shell, `SiteHeader`/`SiteFooter` components, and a pure-CSS `.reveal`/`rise` entrance animation — no Framer runtime, no `framer-*` classes, no `data-framer-*` attributes.
- Fonts are loaded via real `@font-face` rules in `app/globals.css`, pointing at local files in `public/framer-assets/fonts/` (no `framerusercontent.com`).
- Images use plain `<img src="/framer-assets/images/<hash>.<ext>">`, served from `public/framer-assets/images/` (localized during the original scrape).
- The catch-all fallback route (`app/[...slug]/route.js`) and its raw-HTML loader (`lib/legacy-page.js`) have been removed — every route above now renders from real React source.
- The original Framer-exported HTML files (`index.html`, `project/`, `interest/`, `contact/`, `page/`, `xiangmuxiangqing/`) and the raw scraped asset bundle have been moved to `legacy-reference/` — kept only as an offline visual reference for spot-checking fidelity, not served or built by the app.
- Unused Framer runtime script bundles and search-index JSON (previously under `public/framer-assets/scripts/` and `public/framer-assets/data/`, never referenced by any migrated page) were deleted.

## Verifying fidelity

To compare a migrated page against its original export, open the corresponding file under `legacy-reference/` directly in a browser (or serve `legacy-reference/` with any static file server) side by side with `npm run dev`.
