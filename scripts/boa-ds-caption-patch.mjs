// Add an optional caption line to the design system's CategoryAmountRow.
//
// The row could only show a name, an amount and a bar, so a category's budget
// and how far past it the spending was lived one screen deeper. This adds an
// optional `caption` (plus `captionOver` for the over-budget colour) and
// leaves every existing call unchanged - without a caption the row renders
// exactly as before.
//
//   node scripts/boa-ds-caption-patch.mjs <prototype.html> <out.html>
//
// Re-run this after re-exporting the prototype from the design tool: the
// export replaces the bundle and takes this patch with it.
//
// The bundle is a gzipped, base64 asset inside the __bundler/manifest tag, so
// it is decoded, patched, re-encoded and written back in place.
import fs from "node:fs"
import zlib from "node:zlib"

const [, , inPath, outPath] = process.argv
const html = fs.readFileSync(inPath, "utf8")
const KEY = "72c7bc20-7554-4fa1-8a48-6f2e4bc00927"

const manifestRe = /(<script type="__bundler\/manifest">)([\s\S]*?)(<\/script>)/
const match = html.match(manifestRe)
if (!match) throw new Error("manifest tag not found")
const manifest = JSON.parse(match[2].trim())
const asset = manifest[KEY]
if (!asset) throw new Error("design system asset not found")

const source = zlib.gunzipSync(Buffer.from(asset.data, "base64")).toString("utf8")

const signature = `function CategoryAmountRow({
  category = 'home',
  label,
  amount,
  progress,
  divider = true,
  onClick,
  style
}) {`
if (!source.includes(signature)) throw new Error("CategoryAmountRow signature not found")

const patchedSignature = `function CategoryAmountRow({
  category = 'home',
  label,
  amount,
  progress,
  caption,
  captionOver,
  divider = true,
  onClick,
  style
}) {`

/* The caption goes under the bar, so the row reads name, amount, bar, then
   the sentence that says what the bar is measured against. */
const anchor = `progress && /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    percent: progress.percent,
    over: progress.over,
    style: {
      marginTop: 2
    }
  })`
if (!source.includes(anchor)) throw new Error("ProgressBar anchor not found")

const patchedAnchor = `${anchor}, caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-caption)',
      color: captionOver ? 'var(--over-budget)' : 'var(--warm-grey)',
      marginTop: 2
    }
  }, caption)`

const patched = source.replace(signature, patchedSignature).replace(anchor, patchedAnchor)
if (patched === source) throw new Error("nothing was replaced")

asset.data = zlib.gzipSync(Buffer.from(patched, "utf8"), { level: 9 }).toString("base64")

/* Same escaping the bundler itself uses: every forward slash is written \/ so
   no </script sequence can appear literally inside the outer script tag. */
const encoded = JSON.stringify(manifest).replace(/\//g, "\\/")
fs.writeFileSync(outPath, html.replace(manifestRe, (_, open, __, close) => open + "\n" + encoded + "\n" + close))

// Round-trip check.
const verify = JSON.parse(fs.readFileSync(outPath, "utf8").match(manifestRe)[2].trim())
const back = zlib.gunzipSync(Buffer.from(verify[KEY].data, "base64")).toString("utf8")
console.log("asset keys", Object.keys(verify).length)
console.log("caption prop present:", back.includes("captionOver"))
console.log("round-trip identical:", back === patched)
