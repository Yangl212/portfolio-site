import LabPage, { metadata as pageMetadata } from "../../lab/page"

export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/lab" }
}

export default function VisualLabPage() {
  return <LabPage track="visual" />
}
