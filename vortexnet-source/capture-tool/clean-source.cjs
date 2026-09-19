const { readTemplate, writeTemplate } = require('./source-template.cjs')

let template = readTemplate()

const browserChrome = /\n\s*<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:#e4e8ec;border-bottom:1px solid #cdd5dc">[\s\S]*?<\/div>\s*(?=\n\s*<div style="display:flex;align-items:center;gap:12px;padding:8px 14px;background:#14181d)/g
const browserBars = template.match(browserChrome)?.length || 0
if (browserBars !== 0 && browserBars !== 2) throw new Error(`Expected zero or two mock browser bars, found ${browserBars}`)
template = template.replace(browserChrome, '\n')

const replacements = [
  [
    'border:1px solid #c9d1d9;background:#fff;box-shadow:0 1px 2px rgba(20,24,29,.04),0 22px 48px -28px rgba(20,24,29,.4);overflow:hidden',
    'border:1px solid #c9d1d9;background:#fff;overflow:hidden'
  ],
  [
    'border:1px solid #0f766e;background:#fff;box-shadow:0 1px 2px rgba(20,24,29,.04),0 22px 48px -28px rgba(15,118,110,.45);overflow:hidden',
    'border:1px solid #c9d1d9;background:#fff;overflow:hidden'
  ],
  [
    'border:1px solid #0f766e;background:#fff;min-height:210px;',
    'border:1px solid #d3dae1;background:#fff;min-height:210px;'
  ],
  [
    'border:1px solid #0f766e;background:#fff;padding:18px;',
    'border:1px solid #d3dae1;background:#fff;padding:18px;'
  ],
  [
    'border:1px solid #0f766e;background:#f8fafb;',
    'border:1px solid #d3dae1;background:#f8fafb;'
  ],
  [
    'border:1px solid #0f766e;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));',
    'border:1px solid #d3dae1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));'
  ]
]

for (const [before, after] of replacements) {
  if (template.includes(before)) template = template.replace(before, after)
  else if (!template.includes(after)) throw new Error(`Expected source style was not found: ${before}`)
}

writeTemplate(template)
console.log('Removed mock browser chrome and normalized comparison borders.')
