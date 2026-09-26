/*
 * The link preview, in one place.
 *
 * Next merges metadata shallowly: a page that declares `openGraph` at all
 * replaces the root layout's `openGraph` entirely, taking `type` and
 * `siteName` with it. So a page cannot just add an image - it has to
 * restate the block, and that is what this builds.
 *
 * The cards themselves are pre-rendered into /public/og at 1200x630, the
 * shape LinkedIn, Slack, iMessage and the rest crop to. A case study's
 * card is its own cover; every other page has one built from its title.
 * They are rendered rather than generated at request time because they
 * only change when the work does.
 */
const SITE_NAME = "Lele Yang"

export function shareCard({ title, description, image, alt }) {
  const card = { url: image, width: 1200, height: 630, alt: alt || title }

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      images: [card]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  }
}

/* A case study's card, by slug: /og/project-taroo.jpg and so on. Both
   tracks and both languages share one, since a cover reads the same in
   either and the title beside it comes from the page. */
export function projectShareCard(slug, { title, description, alt }) {
  return shareCard({ title, description, image: `/og/project-${slug}.jpg`, alt })
}

/* A mirror route - /visual/..., /zh/... - inherits the base page's whole
   metadata, card included. That is right for the visual track, which is
   the same words, and wrong for a Chinese one, whose own description
   would otherwise be dropped from the preview while the page kept it. So
   a translated route restates the description everywhere it is read, and
   swaps in its own card where one was made for it. */
export function translateCard(metadata, { title, description, image, alt }) {
  const card = image
    ? [{ url: image, width: 1200, height: 630, alt: alt || metadata.openGraph?.title }]
    : metadata.openGraph?.images

  return {
    ...(title ? { title } : null),
    description,
    openGraph: { ...metadata.openGraph, ...(title ? { title } : null), description, images: card },
    twitter: { ...metadata.twitter, description, images: image ? [image] : metadata.twitter?.images }
  }
}
