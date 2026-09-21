/*
 * Carries one thing across a client-side navigation into the home page:
 * "the reader followed a Work link from elsewhere, so open straight on
 * Selected Work instead of the print." A plain module-level flag rather
 * than sessionStorage, so it only survives the SPA transition it was set
 * for - a real reload or a back/forward re-executes this module fresh,
 * which keeps the print as the front door in every other case.
 *
 * Reading and clearing are kept separate on purpose. Strict Mode (on by
 * default for the app router - see reactStrictMode.md) mounts, cleans up
 * and remounts every effect once in development before anything paints;
 * a read-and-clear inside that effect would consume the flag on the
 * throwaway first pass and leave the real, surviving pass with nothing.
 * Peeking is safe for both passes to repeat; clearing is deferred to a
 * timeout, which the throwaway pass's synchronous cleanup cancels before
 * it ever fires, leaving exactly one clear from the pass that sticks.
 */
let pendingWork = false

export function requestScrollToWork() {
  pendingWork = true
}

export function peekScrollToWork() {
  return pendingWork
}

export function clearScrollToWork() {
  pendingWork = false
}
