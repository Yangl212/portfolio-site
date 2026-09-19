// Update the code-native source, then run capture.mjs and the media builder.
const { readTemplate, writeTemplate } = require('./source-template.cjs')
const { styles, renderDashboard, kpis } = require('./dashboard.cjs')

function replaceElement(source, start, replacement) {
  const tags = /<\/?div\b[^>]*>/g
  tags.lastIndex = start
  let depth = 0, match
  while ((match = tags.exec(source))) {
    depth += match[0].startsWith('</') ? -1 : 1
    if (depth === 0) return source.slice(0, start) + replacement + source.slice(tags.lastIndex)
  }
  throw new Error('Could not locate the end of the source dashboard')
}

let template = readTemplate()
const marker = '<div class="vn" data-vn="dashboard">'
const oldMarker = '<div style="border:1px solid #c9d1d9;background:#fff;overflow:hidden">'
const section = template.indexOf('>The rebuilt screen</h2>')
if (section < 0) throw new Error('Rebuilt screen section not found')
let start = template.indexOf(marker, section)
if (start < 0) start = template.indexOf(oldMarker, section)
if (start < 0) throw new Error('Dashboard source not found')
template = replaceElement(template, start, renderDashboard())

// Keep the source's close-up consistent with the refined dashboard too.
const studyHeading = template.indexOf('>AFTER · FOUR NAMED NUMBERS</span>')
if (studyHeading < 0) throw new Error('Metric study not found')
const studyStart = template.indexOf('<div', studyHeading)
template = replaceElement(template, studyStart, `<div class="vn vn-metric-study" data-vn="metric-study">${kpis()}</div>`)
template = template.replace('Plain-language labels, one comparison each, and the buried number promoted into the set.', 'Named totals with explicit currency, time scope and settlement context.')
template = template.replace('Same window, same day, same data.', 'Portfolio refinement · Illustrative data')
template = template.replaceAll('2024-03-14', '2025-10-15').replaceAll('10:04:12', '12:00:00')

const css = `/* VORTEXNET REFINEMENT START */\n${styles}\n/* VORTEXNET REFINEMENT END */`
const cssPattern = /\/\* VORTEXNET REFINEMENT START \*\/[\s\S]*?\/\* VORTEXNET REFINEMENT END \*\//
template = cssPattern.test(template) ? template.replace(cssPattern, css) : template.replace('</style>', `${css}\n</style>`)
writeTemplate(template)
console.log('Updated portfolio dashboard refinement in source HTML.')
