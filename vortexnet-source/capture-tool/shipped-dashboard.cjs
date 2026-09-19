// The build as it was delivered and tested during the internship, drawn from
// recollection: the internal tool itself cannot be shown, so this is a
// reconstruction of the delivered scope rather than a screenshot of it.
//
// It is deliberately the *same* structure as dashboard.cjs - the task-grouped
// sidebar and Today's overview are what shipped and what the 10 colleagues
// tested - with exactly the four things the case study says were refined
// afterwards taken back out:
//
//   1. metric definitions  - no currency tag, no supporting context line
//   2. cash chart          - collections only, no payouts comparison or net note
//   3. settlement schedule - a plain list, no progress bar or cutoff emphasis
//   4. owners, next actions - queue table without those two columns
//
// Everything the test results depend on stays in: the nine regrouped nav
// entries, the four named totals and a cash chart on the landing screen.
const { snapshot, totals, amount, icon, item, styles } = require('./dashboard.cjs')

/* Layered over the refined stylesheet rather than replacing it, so the two
   screens share a visual system and only differ where the work differed. */
const shippedStyles = `${styles}
.vn-shipped .vn-kpi{min-height:0;padding:15px 17px}
.vn-shipped .vn-kpi-label{margin-bottom:9px}
.vn-shipped .vn-chart{height:198px}
.vn-shipped .vn-batch{grid-template-columns:1fr auto}
.vn-shipped .vn-batch-head{padding-top:4px}
.vn-shipped .vn-settlement .vn-panel-heading{padding-bottom:13px}
`

function shippedKpis() {
  const card = (label, value, primary = false) =>
    `<div class="vn-kpi${primary ? ' vn-primary' : ''}"><div class="vn-kpi-label">${label}</div><div class="vn-kpi-value">${value}</div></div>`

  return `<div class="vn-kpis">
    ${card('Net cash flow', `<small>+¥</small>${amount(totals.net)}`, true)}
    ${card('Collections', `<small>¥</small>${amount(totals.collections)}`)}
    ${card('Payouts', `<small>¥</small>${amount(totals.payouts)}`)}
    ${card('Pending settlement', `<small>¥</small>${amount(totals.pending)}`)}
  </div>`
}

function shippedChart() {
  const x = (i) => 53 + i * 80.4
  const y = (value) => 158 - (value / 1000000) * 138
  const points = snapshot.collections.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ')

  return `<div class="vn-panel vn-cash">
    <div class="vn-panel-heading"><div><h2>Cash movement</h2></div></div>
    <svg class="vn-chart" viewBox="0 0 574 198" role="img" aria-label="Collections from 06:00 to 12:00, ending at 880,102.">
      ${[0, 250000, 500000, 750000, 1000000].map((value) => `<line x1="53" x2="541" y1="${y(value)}" y2="${y(value)}" stroke="#eaf0ef"/><text x="40" y="${y(value) + 3}" text-anchor="end">${value === 1000000 ? '1m' : value ? value / 1000 + 'k' : '0'}</text>`).join('')}
      ${snapshot.hours.map((hour, i) => `<text x="${x(i)}" y="182" text-anchor="middle">${String(hour).padStart(2, '0')}:00</text>`).join('')}
      <polyline points="${points}" fill="none" stroke="#187d75" stroke-width="2.6" stroke-linejoin="round"/>
    </svg>
  </div>`
}

function shippedSettlement() {
  return `<div class="vn-panel vn-settlement">
    <div class="vn-panel-heading"><div><h2>Settlement schedule</h2><div class="vn-sub">Incoming batches due today</div></div></div>
    <div class="vn-batch-head"><span>Batch</span><span>Amount · due</span></div>
    ${snapshot.batches.map((batch) => `<div class="vn-batch"><div>${batch.channel}<small>${batch.id}</small></div><div><strong>¥${amount(batch.amount)}</strong><small>${batch.due}</small></div></div>`).join('')}
  </div>`
}

function shippedAttention() {
  return `<div class="vn-panel vn-attention">
    <div class="vn-panel-heading"><div><h2>Needs attention</h2><div class="vn-sub">Open work by queue</div></div><span class="vn-text-action">View all queues ${icon('arrow')}</span></div>
    <table class="vn-table"><thead><tr><th>Queue</th><th>Open items</th><th>Priority</th></tr></thead><tbody>
      ${snapshot.queues.map((queue, i) => `<tr><td><div class="vn-issue"><span class="vn-issue-icon${i === 0 ? ' vn-warning' : ''}">${icon(['flag', 'check', 'clock'][i])}</span><div><strong>${queue.title}</strong><small>${queue.detail}</small></div></div></td><td>${queue.count}</td><td><span class="vn-urgency${i === 0 ? ' vn-warning' : ''}">${queue.priority}</span></td></tr>`).join('')}
    </tbody></table>
  </div>`
}

function renderShippedDashboard() {
  return `<div class="vn vn-shipped" data-vn="shipped">
    <div class="vn-top"><span class="vn-logo">V</span><span class="vn-brand">VortexNet</span><span class="vn-workspace">Finance workspace</span><span class="vn-search">${icon('search')}Search transactions, batches…</span><span class="vn-profile"><span class="vn-avatar">WC</span><span style="font-size:11px">W. Chen</span></span></div>
    <div class="vn-body"><aside class="vn-sidebar"><div class="vn-group">MONITOR TODAY</div>${item("Today's position", 'grid', true)}${item('Failed items', 'flag', false, '41')}${item('Settlement status', 'clock')}<div class="vn-group">RECONCILE</div>${item('Reconciliation queue', 'check')}${item('Transactions', 'list')}${item('Exports', 'export')}<div class="vn-group">REVIEW OVER TIME</div>${item('Daily report', 'report')}${item('Monthly report', 'calendar')}${item('Trend', 'trend')}<div class="vn-admin">${item('Admin', 'settings')}<div class="vn-team"><i></i>Finance operations</div></div></aside>
    <div class="vn-main"><div class="vn-heading"><div><h1>Today's overview</h1><p>Wed, ${snapshot.date} · As of ${snapshot.time}</p></div><div class="vn-filters"><span class="vn-filter">${icon('calendar')}Today · 15 Oct</span><span class="vn-filter vn-solid">${icon('export')}Export</span></div></div>
      ${shippedKpis()}<div class="vn-charts">${shippedChart()}${shippedSettlement()}</div>${shippedAttention()}
    </div></div>
  </div>`
}

module.exports = { shippedStyles, renderShippedDashboard }
