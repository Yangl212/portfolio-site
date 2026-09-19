// Current portfolio refinement. This mock-data view is not a record of the
// shipped UI or an outcome of the original user test.
const snapshot = {
  date: '15 Oct 2025', time: '12:00', currency: 'CNY',
  hours: [6, 7, 8, 9, 10, 11, 12],
  collections: [52000, 124500, 268400, 416750, 602300, 760900, 880102],
  payouts: [36000, 91500, 185200, 284800, 402600, 528700, 604880],
  batches: [
    { id: 'STL-1025', channel: 'Bank transfer', amount: 48200, due: '14:00' },
    { id: 'STL-1026', channel: 'Card settlement', amount: 77000, due: '15:00' },
    { id: 'STL-1027', channel: 'Wallet settlement', amount: 67200, due: '16:00' }
  ],
  settledBatches: 4,
  queues: [
    { kind: 'failures', title: 'Failed transfers', count: '41 transfers', detail: '18 eligible for retry', priority: 'Review now', owner: 'Payments', initials: 'JL', action: 'Review failures' },
    { kind: 'reconciliation', title: 'Unmatched records', count: '12 records', detail: 'Statement matching needed', priority: 'Before 16:00', owner: 'Finance ops', initials: 'AW', action: 'Reconcile' },
    { kind: 'approval', title: 'Payout approvals', count: '5 requests', detail: 'Awaiting a second approver', priority: 'Before 15:00', owner: 'Treasury', initials: 'MC', action: 'Review payouts' }
  ]
}

const amount = value => value.toLocaleString('en-US')
const totals = {
  collections: snapshot.collections.at(-1), payouts: snapshot.payouts.at(-1),
  pending: snapshot.batches.reduce((sum, batch) => sum + batch.amount, 0)
}
totals.net = totals.collections - totals.payouts

const icons = {
  grid: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="13" y="3" width="6" height="6" rx="1"/><rect x="3" y="13" width="6" height="6" rx="1"/><rect x="13" y="13" width="6" height="6" rx="1"/>',
  flag: '<path d="M5 20V3h13l-3 4 3 4H5"/>',
  clock: '<circle cx="11" cy="11" r="8"/><path d="M11 6v5l3 2"/>',
  check: '<rect x="3" y="3" width="16" height="16" rx="3"/><path d="m7 11 3 3 6-6"/>',
  list: '<path d="M8 5h11M8 11h11M8 17h11M3 5h1M3 11h1M3 17h1"/>',
  export: '<path d="M11 3v11m-4-4 4 4 4-4M4 15v4h14v-4"/>',
  report: '<path d="M5 2h9l4 4v14H5zM14 2v5h4M8 11h7M8 15h7"/>',
  trend: '<path d="M3 18V4m0 14h17M6 13l4-4 4 2 5-6"/>',
  settings: '<circle cx="11" cy="11" r="3"/><path d="M9 2h4l1 3 3 1 3 3v4l-3 1-1 3-3 3H9l-1-3-3-1-3-3V9l3-1 1-3z"/>',
  chevron: '<path d="m8 5 6 6-6 6"/>',
  search: '<circle cx="9" cy="9" r="5"/><path d="m13 13 6 6"/>',
  calendar: '<rect x="3" y="5" width="16" height="15" rx="2"/><path d="M3 10h16M7 2v6M15 2v6"/>',
  arrow: '<path d="M3 11h16m-5-5 6 5-6 5"/>'
}
const icon = name => `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.grid}</svg>`
const item = (name, symbol, active = false, badge = '') => `<div class="vn-nav-item${active ? ' vn-active' : ''}">${icon(symbol)}<span>${name}</span>${badge ? `<b>${badge}</b>` : ''}</div>`

const styles = `
.vn{--ink:#172d31;--muted:#65767a;--line:#dfe7e7;--teal:#187d75;--violet:#7771a3;--amber:#995a23;background:#f5f7f7;color:var(--ink);font:13px/1.4 Arial,Helvetica,sans-serif;border:1px solid #d3dcdd;overflow:hidden;text-align:left}
.vn *{box-sizing:border-box}.vn h1,.vn h2,.vn h3,.vn p{margin:0}.vn svg{display:block}.vn .vn-top{height:52px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 22px;gap:12px}.vn-logo{height:26px;width:26px;background:var(--ink);border-radius:7px;color:#fff;display:grid;place-items:center;font-size:18px;font-weight:700}.vn-brand{font-size:15px;font-weight:700;letter-spacing:-.4px}.vn-workspace{border-left:1px solid var(--line);margin-left:9px;padding-left:19px;color:var(--muted);font-size:12px}.vn-search{margin-left:auto;width:215px;border:1px solid var(--line);border-radius:6px;padding:6px 9px;display:flex;align-items:center;gap:8px;color:#748487;font-size:11px}.vn-search svg{width:15px;height:15px}.vn-profile{border-left:1px solid var(--line);padding-left:16px;display:flex;align-items:center;gap:8px}.vn-avatar{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:#e9eded;color:#546669;font-size:10px;font-weight:600}
.vn-body{display:flex}.vn-sidebar{width:181px;flex:none;border-right:1px solid var(--line);background:#fbfcfc;display:flex;flex-direction:column;padding:26px 10px 16px}.vn-group{padding:0 10px;margin-bottom:9px;font-size:9px;letter-spacing:1.1px;font-weight:700;color:#728386}.vn-group:not(:first-child){margin-top:26px}.vn-nav-item{display:flex;align-items:center;gap:9px;padding:10px 10px;color:#53666a;border-radius:6px;font-size:11px;white-space:nowrap}.vn-nav-item svg{width:15px;height:15px;flex:none;color:#738689}.vn-nav-item b{margin-left:auto;min-width:20px;text-align:center;padding:1px 5px;background:#f5e9df;color:#955523;border-radius:4px;font-size:9px;font-weight:600}.vn-nav-item.vn-active{background:#e3eeec;color:#12645e;font-weight:600}.vn-nav-item.vn-active svg{color:#12645e}.vn-admin{margin-top:auto;padding-top:22px}.vn-admin .vn-nav-item{border-top:1px solid var(--line);border-radius:0}.vn-team{margin:15px 10px 0;display:flex;align-items:center;gap:8px;color:#7e8b8e;font-size:10px}.vn-team i,.vn-live i{width:5px;height:5px;background:#238578;border-radius:50%;display:inline-block}
.vn-main{padding:24px;min-width:0;flex:1}.vn-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:21px}.vn h1{font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.8px}.vn-heading p{font-size:11px;color:var(--muted);margin-top:6px}.vn-filters{display:flex;align-items:center;gap:8px}.vn-filter{display:flex;gap:7px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:6px;padding:8px 10px;font-size:11px;color:#40595e}.vn-filter svg{width:14px;height:14px}.vn-filter.vn-solid{color:#fff;background:#203c40;border-color:#203c40}.vn-filter.vn-solid svg{width:13px}
.vn-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}.vn-kpi{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px 17px;min-height:115px}.vn-kpi.vn-primary{background:#eaf3f0;border-color:var(--line)}.vn-kpi-label{color:#4e676a;font-size:11px;margin-bottom:11px;font-weight:500}.vn-kpi-label small{margin-left:5px;font-size:9px;color:#7b8d8f}.vn-kpi-value{display:flex;align-items:baseline;gap:4px;font-size:27px;line-height:1;letter-spacing:-1px;font-weight:600;font-variant-numeric:tabular-nums}.vn-kpi-value small{font-size:17px;letter-spacing:-.5px;font-weight:400}.vn-kpi-note{margin-top:11px;font-size:10px;color:#697d80}.vn-kpi-note span{color:#1e7164}
.vn-charts{display:grid;grid-template-columns:minmax(0,1.78fr) minmax(0,1fr);gap:16px;margin-bottom:18px}.vn-panel{background:#fff;border:1px solid var(--line);border-radius:8px;overflow:hidden}.vn-panel-heading{padding:18px 18px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.vn h2{font-size:14px;font-weight:600;letter-spacing:-.2px}.vn-sub{font-size:10px;color:var(--muted);margin-top:4px}.vn-legend{display:flex;gap:12px;align-items:center;font-size:9px;color:#526b6f;padding-top:3px}.vn-legend span{display:flex;align-items:center;gap:5px}.vn-legend i{display:block;width:14px;height:2px;background:var(--teal)}.vn-legend i.vn-payout{height:0;background:transparent;border-top:2px dashed var(--violet)}.vn-chart{width:100%;height:184px;margin-top:16px}.vn-chart text{font-family:Arial,Helvetica,sans-serif;font-size:10px;fill:#738689}.vn-chart-note{border-top:1px solid #eef2f2;padding:11px 18px;color:#607679;font-size:10px;display:flex;justify-content:space-between;gap:10px}.vn-chart-note strong{font-weight:600;color:#28564f}.vn-settlement .vn-panel-heading{padding-bottom:15px}.vn-pill{border-radius:4px;padding:3px 6px;white-space:nowrap;font-size:9px;color:#4a666a;background:#f0f4f4}.vn-progress-copy{padding:0 18px;display:flex;align-items:baseline;justify-content:space-between;font-size:10px;color:#71868a}.vn-progress-copy strong{font-size:18px;letter-spacing:-.4px;color:#24474a;font-weight:600}.vn-progress-copy strong span{font-size:11px;font-weight:400;color:#71868a;letter-spacing:0}.vn-progress{display:flex;gap:4px;margin:10px 18px 15px}.vn-progress span{height:6px;flex:1;border-radius:2px;background:#e6ecec}.vn-progress span.vn-done{background:#3b8d80}.vn-batch-head{display:flex;justify-content:space-between;color:#77898c;font-size:9px;padding:0 18px 5px}.vn-batch{display:grid;grid-template-columns:1fr auto;gap:3px 12px;padding:9px 18px;border-top:1px solid #eef2f2;font-size:10px;align-items:baseline}.vn-batch small{display:block;font-size:9px;color:#8a989a;margin-top:2px}.vn-batch strong{font-size:11px;font-weight:500;font-variant-numeric:tabular-nums}.vn-batch>div:last-child{text-align:right}.vn-batch>div:first-child{color:#496266}.vn-next{color:#966125!important}
.vn-metric-study{padding:14px;border-radius:0}.vn-metric-study .vn-kpis{grid-template-columns:repeat(2,minmax(0,1fr));margin:0}.vn-metric-study .vn-kpi{min-height:115px}
.vn-attention .vn-panel-heading{padding:17px 18px 14px;align-items:center}.vn-text-action{color:#286d65;display:flex;align-items:center;gap:5px;font-size:10px;font-weight:600}.vn-text-action svg{width:13px;height:13px}.vn-table{width:100%;border-collapse:collapse}.vn-table th{background:#f8fafa;padding:8px 18px;font-size:9px;font-weight:500;text-align:left;color:#788c8f;border-top:1px solid #eef2f2;border-bottom:1px solid #eef2f2}.vn-table td{padding:12px 18px;border-bottom:1px solid #eef2f2;vertical-align:middle;font-size:11px;color:#496165}.vn-table tr:last-child td{border-bottom:0}.vn-table th:last-child,.vn-table td:last-child{text-align:right}.vn-issue{display:flex;gap:10px;align-items:center}.vn-issue-icon{width:29px;height:29px;border-radius:6px;background:#edf3f2;display:grid;place-items:center;color:#57817a;flex:none}.vn-issue-icon svg{width:15px;height:15px}.vn-issue-icon.vn-warning{background:#fcf1e6;color:#a4652f}.vn-issue strong{color:#263f44;font-size:11px;font-weight:600;display:block}.vn-table small{font-size:9px;color:#7d9093;display:block;margin-top:3px}.vn-urgency{display:inline-block;padding:4px 7px;font-size:9px;border-radius:4px;background:#f1f4f4;color:#5f7377;white-space:nowrap}.vn-urgency.vn-warning{background:#fcf1e6;color:#9a622c}.vn-owner{display:flex;align-items:center;gap:7px;white-space:nowrap}.vn-owner .vn-avatar{height:22px;width:22px;font-size:8px}.vn-action{display:inline-flex;gap:9px;align-items:center;border:1px solid #dbe5e3;border-radius:5px;padding:6px 8px;font-size:10px;color:#28695f;white-space:nowrap}.vn-action svg{width:12px;height:12px}.vn-foot{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:9px;color:#7c9093}.vn-live{display:flex;align-items:center;gap:5px}.vn-foot a{color:#496c6d}
`

function kpis() {
  return `<div class="vn-kpis" data-vn="metrics">
    <div class="vn-kpi vn-primary"><div class="vn-kpi-label">Net cash flow <small>CNY</small></div><div class="vn-kpi-value"><small>+¥</small>${amount(totals.net)}</div><div class="vn-kpi-note">Collections less payouts · today</div></div>
    <div class="vn-kpi"><div class="vn-kpi-label">Collections <small>CNY</small></div><div class="vn-kpi-value"><small>¥</small>${amount(totals.collections)}</div><div class="vn-kpi-note">Received today · as of 12:00</div></div>
    <div class="vn-kpi"><div class="vn-kpi-label">Payouts <small>CNY</small></div><div class="vn-kpi-value"><small>¥</small>${amount(totals.payouts)}</div><div class="vn-kpi-note">Sent today · as of 12:00</div></div>
    <div class="vn-kpi"><div class="vn-kpi-label">Pending settlement <small>CNY</small></div><div class="vn-kpi-value"><small>¥</small>${amount(totals.pending)}</div><div class="vn-kpi-note">3 incoming batches · next at <span>14:00</span></div></div>
  </div>`
}

function cashChart() {
  const x = i => 53 + i * 80.4
  const y = value => 147 - value / 1000000 * 128
  const points = values => values.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ')
  return `<div class="vn-panel vn-cash" data-vn="cash">
    <div class="vn-panel-heading"><div><h2>Cash movement</h2><div class="vn-sub">Cumulative since 00:00 · CNY</div></div><div class="vn-legend"><span><i></i>Collections</span><span><i class="vn-payout"></i>Payouts</span></div></div>
    <svg class="vn-chart" viewBox="0 0 574 184" role="img" aria-label="Cumulative collections and payouts from 06:00 to 12:00 in CNY. Collections end at 880,102 and payouts at 604,880.">
      ${[0,250000,500000,750000,1000000].map(value => `<line x1="53" x2="541" y1="${y(value)}" y2="${y(value)}" stroke="#eaf0ef" ${value ? 'stroke-dasharray="3 4"' : ''}/><text x="40" y="${y(value)+3}" text-anchor="end">${value === 1000000 ? '1m' : value ? value/1000+'k' : '0'}</text>`).join('')}
      ${snapshot.hours.map((hour,i)=>`<text x="${x(i)}" y="170" text-anchor="middle">${String(hour).padStart(2,'0')}:00</text>`).join('')}
      <polygon points="53,147 ${points(snapshot.collections)} ${x(6)},147" fill="#edf5f2" opacity=".65"/>
      <polyline points="${points(snapshot.collections)}" fill="none" stroke="#187d75" stroke-width="2.8" stroke-linejoin="round"/>
      <polyline points="${points(snapshot.payouts)}" fill="none" stroke="#7771a3" stroke-width="2.4" stroke-dasharray="6 4" stroke-linejoin="round"/>
      <circle cx="${x(6)}" cy="${y(totals.collections)}" r="4" fill="#187d75" stroke="#fff" stroke-width="2"/>
      <circle cx="${x(6)}" cy="${y(totals.payouts)}" r="4" fill="#7771a3" stroke="#fff" stroke-width="2"/>
    </svg>
    <div class="vn-chart-note"><span>Same-day cash movement through 12:00</span><strong>Net inflow +¥${amount(totals.net)}</strong></div>
  </div>`
}

function settlement() {
  return `<div class="vn-panel vn-settlement" data-vn="settlement">
    <div class="vn-panel-heading"><div><h2>Settlement schedule</h2><div class="vn-sub">Incoming batches due today</div></div><span class="vn-pill">3 upcoming</span></div>
    <div class="vn-progress-copy"><strong>4 <span>of 7 settled</span></strong><span>¥${amount(totals.pending)} pending</span></div>
    <div class="vn-progress" aria-label="4 of 7 batches settled">${Array.from({length:7},(_,i)=>`<span${i<4?' class="vn-done"':''}></span>`).join('')}</div>
    <div class="vn-batch-head"><span>Upcoming batch</span><span>CNY · cutoff (UTC+8)</span></div>
    ${snapshot.batches.map((batch,i)=>`<div class="vn-batch"><div>${batch.channel}<small>${batch.id}</small></div><div><strong>¥${amount(batch.amount)}</strong><small${i===0?' class="vn-next"':''}>${batch.due}${i===0?' · next cutoff':''}</small></div></div>`).join('')}
  </div>`
}

function attention() {
  return `<div class="vn-panel vn-attention" data-vn="attention">
    <div class="vn-panel-heading"><div><h2>Needs attention</h2><div class="vn-sub">Open work by queue · counts may overlap</div></div><span class="vn-text-action">View all queues ${icon('arrow')}</span></div>
    <table class="vn-table"><thead><tr><th>Queue</th><th>Open items</th><th>Priority</th><th>Owner</th><th>Next action</th></tr></thead><tbody>
      ${snapshot.queues.map((queue,i)=>`<tr><td><div class="vn-issue"><span class="vn-issue-icon${i===0?' vn-warning':''}">${icon(['flag','check','clock'][i])}</span><div><strong>${queue.title}</strong><small>${queue.detail}</small></div></div></td><td>${queue.count}</td><td><span class="vn-urgency${i===0?' vn-warning':''}">${queue.priority}</span></td><td><span class="vn-owner"><span class="vn-avatar">${queue.initials}</span>${queue.owner}</span></td><td><span class="vn-action">${queue.action}${icon('arrow')}</span></td></tr>`).join('')}
    </tbody></table>
  </div>`
}

function renderDashboard() {
  return `<div class="vn" data-vn="dashboard">
    <div class="vn-top"><span class="vn-logo">V</span><span class="vn-brand">VortexNet</span><span class="vn-workspace">Finance workspace</span><span class="vn-search">${icon('search')}Search transactions, batches…</span><span class="vn-profile"><span class="vn-avatar">WC</span><span style="font-size:11px">W. Chen</span></span></div>
    <div class="vn-body"><aside class="vn-sidebar"><div class="vn-group">MONITOR TODAY</div>${item("Today's position",'grid',true)}${item('Failed items','flag',false,'41')}${item('Settlement status','clock')}<div class="vn-group">RECONCILE</div>${item('Reconciliation queue','check')}${item('Transactions','list')}${item('Exports','export')}<div class="vn-group">REVIEW OVER TIME</div>${item('Daily report','report')}${item('Monthly report','calendar')}${item('Trend','trend')}<div class="vn-admin">${item('Admin','settings')}<div class="vn-team"><i></i>Finance operations</div></div></aside>
    <div class="vn-main" data-vn="detail"><div class="vn-heading"><div><h1>Today's overview</h1><p>Wed, ${snapshot.date} · As of ${snapshot.time} (UTC+8)</p></div><div class="vn-filters"><span class="vn-filter">${icon('calendar')}Today · 15 Oct</span><span class="vn-filter">All channels ⌄</span><span class="vn-filter vn-solid">${icon('export')}Export</span></div></div>
      ${kpis()}<div class="vn-charts">${cashChart()}${settlement()}</div>${attention()}
      <div class="vn-foot"><span class="vn-live"><i></i>Updated 12:00 (UTC+8) · All amounts in CNY</span><span>Pending settlements excluded from net cash flow</span></div>
    </div></div>
  </div>`
}

module.exports = { snapshot, totals, amount, icon, item, styles, renderDashboard, kpis }
