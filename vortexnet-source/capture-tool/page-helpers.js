window.__find = (t) => {
  const all = [...document.body.querySelectorAll("*")].filter(e => e.children.length === 0 && e.textContent.trim() === t)
  let el = all.find(e => e.tagName === "H2") || all[all.length - 1]
  if (!el) return null
  let row = el
  while (row.parentElement && row.getBoundingClientRect().width < 1000) row = row.parentElement
  return row.parentElement
}
window.__inspect = (titles) => {
  const out = []
  for (const t of titles) {
    const sec = window.__find(t)
    if (!sec) { out.push("MISS " + t); continue }
    out.push("## " + t + "  sec=" + sec.tagName + " kids=" + sec.children.length + " w=" + Math.round(sec.getBoundingClientRect().width))
    ;[...sec.children].forEach((c, i) => {
      const r = c.getBoundingClientRect()
      out.push("   [" + i + "] " + c.tagName + " kids=" + c.children.length + " " + Math.round(r.x) + "," + Math.round(r.y + scrollY) + " " + Math.round(r.width) + "x" + Math.round(r.height) + " | " + c.innerText.replace(/\s+/g, " ").slice(0, 90))
    })
  }
  return out.join("\n")
}
window.__rect = (title, pickSource) => {
  const sec = window.__find(title)
  if (!sec) return null
  const kids = [...sec.children]
  const el = new Function("sec", "kids", "return (" + pickSource + ")")(sec, kids)
  if (!el) return null
  el.scrollIntoView({ block: "start" })
  const r = el.getBoundingClientRect()
  return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }
}
