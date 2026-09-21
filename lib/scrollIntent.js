/*
 * Carries one thing across a client-side navigation into the home page:
 * "the reader followed a Work link from elsewhere, so open straight on
 * Selected Work instead of the print." A plain module-level flag rather
 * than sessionStorage, so it only survives the SPA transition it was set
 * for - a real reload or a back/forward re-executes this module fresh,
 * which keeps the print as the front door in every other case.
 */
let pendingWork = false

export function requestScrollToWork() {
  pendingWork = true
}

export function consumeScrollToWork() {
  const value = pendingWork
  pendingWork = false
  return value
}
