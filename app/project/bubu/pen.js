/*
 * The pen the page's two figures are drawn with - the matching model's
 * rings and the map's pills and lines. Kept in one place so the two
 * cannot drift into different hands.
 */

/* Seeded, so a stroke wobbles the same way on the server and in the
   browser and the two agree. */
export function seeded(seed) {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* One decimal: finer than either drawing can show. */
export const f = (n) => Math.round(n * 10) / 10
