const fs = require('node:fs')
const path = require('node:path')
const source = path.resolve(__dirname, '../VortexNet Case Study.html')
const pattern = /(<script type="__bundler\/template">)([\s\S]*?)(<\/script>)/

function readTemplate() {
  const html = fs.readFileSync(source, 'utf8')
  const match = html.match(pattern)
  if (!match) throw new Error('Bundled source template not found')
  return JSON.parse(match[2])
}

function writeTemplate(template) {
  const html = fs.readFileSync(source, 'utf8')
  if (!pattern.test(html)) throw new Error('Bundled source template not found')
  const encoded = JSON.stringify(template).replace(/\//g, '\\u002F')
  fs.writeFileSync(source, html.replace(pattern, (_, open, body, close) => open + '\n' + encoded + '\n  ' + close))
}

module.exports = { source, readTemplate, writeTemplate }

if (require.main === module) process.stdout.write(readTemplate())
