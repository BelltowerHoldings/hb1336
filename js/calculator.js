/* HB 1336 Capital Calculator — math + render
   Each function is small and self-contained so individual writes stay
   well below the OneDrive ~32KB single-write limit. */

const H = 10;
let chart = null;
let chartAnnual = null;

const fmtUSD = n => '$' + Math.round(n).toLocaleString();
const fmtNum = n => Math.round(n).toLocaleString();
const fmtMult = n => n.toFixed(2) + '×';
const fmtPct1 = n => (n * 100).toFixed(1) + '%';
const fmtPct2 = n => (n * 100).toFixed(2) + '%';
const fmtSigned = n => (n >= 0 ? '+' : '') + Math.round(n).toLocaleString();
const fmtSignedPct = n => (n >= 0 ? '+' : '') + (n * 100).toFixed(0) + '%';

const TIER_EVIC = [0.123, 0.094, 0.058, 0.013, 0.003];

function readInputs() {
  const tierMix = Array.from(document.querySelectorAll('.tierMix'))
    .map(el => (parseFloat(el.value) || 0) / 100);
  return {
    inflow:    parseFloat(document.getElementById('inflow').value) || 0,
    overhead:  (parseFloat(document.getElementById('overhead').value) || 0) / 100,
    deposit:   parseFloat(document.getElementById('deposit').value) || 0,
    rcdMult:   parseFloat(document.getElementById('rcdMult').value) || 0,
    bundle:    (parseFloat(document.getElementById('bundlePct').value) || 0) / 100,
    L:         Math.max(1, Math.round(parseFloat(document.getElementById('tenancy').value) || 1)),
    recycleOh: document.getElementById('recycleOh').value === 'yes',
    recMethod: document.getElementById('recoveryMethod').value,
    manualR:   (parseFloat(document.getElementById('manualR').value) || 0) / 100,
    lge:       (parseFloat(document.getElementById('lge').value) || 0) / 100,
    baseNR:    (parseFloat(document.getElementById('baseNR').value) || 0) / 100,
    tierMix:   tierMix
  };
}

function weightedEviction(inp) {
  let wEv = 0;
  for (let i = 0; i < 5; i++) wEv += TIER_EVIC[i] * inp.tierMix[i];
  return wEv;
}

function effectiveR(inp) {
  if (inp.recMethod === 'manual') return inp.manualR;
  return Math.max(0, 1 - weightedEviction(inp) * inp.lge - inp.baseNR);
}

function buildCapital(inp) {
  const net = inp.inflow * (1 - inp.overhead);
  const recycleFactor = inp.recycleOh ? (1 - inp.overhead) : 1;
  const r = effectiveR(inp);
  const cap = [0];
  for (let t = 1; t <= H; t++) {
    let c = net;
    if (t > inp.L) c += recycleFactor * r * cap[t - inp.L];
    cap.push(c);
  }
  return cap;
}

function totalCap(net, r, L, recycleFactor, horizon) {
  const rEff = recycleFactor * r;
  if (Math.abs(1 - rEff) < 1e-9) {
    const cap = [0];
    for (let t = 1; t <= horizon; t++) {
      let c = net;
      if (t > L) c += rEff * cap[t - L];
      cap.push(c);
    }
    return cap.slice(1).reduce((a, b) => a + b, 0);
  }
  let s = 0;
  for (let t = 1; t <= horizon; t++) {
    s += Math.pow(rEff, Math.floor((t - 1) / L) + 1);
  }
  return net / (1 - rEff) * (horizon - s);
}

function compute(inp) {
  const net = inp.inflow * (1 - inp.overhead);
  const capPerHH = inp.deposit * (1 + inp.bundle * inp.rcdMult);
  const r = effectiveR(inp);
  const wEv = weightedEviction(inp);
  const recycleFactor = inp.recycleOh ? (1 - inp.overhead) : 1;
  const cap = buildCapital(inp);
  const hbHH = cap.slice(1).map(c => c / capPerHH);
  const grantHHPerYr = net / inp.deposit;
  const hbCum = [];
  let acc = 0;
  for (const h of hbHH) { acc += h; hbCum.push(acc); }
  const grantCum = [];
  acc = 0;
  for (let i = 0; i < H; i++) { acc += grantHHPerYr; grantCum.push(acc); }
  return {
    inp, net, capPerHH, r, wEv, recycleFactor,
    cap, hbHH, hbCum, grantHHPerYr, grantCum,
    hbTotal: hbCum[H - 1],
    grantTotal: grantCum[H - 1],
    incremental: hbCum[H - 1] - grantCum[H - 1],
    incrementalPct: hbCum[H - 1] / grantCum[H - 1] - 1,
    reachMult: hbCum[H - 1] / grantCum[H - 1]
  };
}

function renderResults(out) {
  document.getElementById('netCapital').textContent  = fmtUSD(out.net);
  document.getElementById('capPerHH').textContent    = fmtUSD(out.capPerHH);
  document.getElementById('weightedEv').textContent  = fmtPct2(out.wEv);
  document.getElementById('effectiveR').textContent  = fmtPct1(out.r);
  document.getElementById('doNothingHH').textContent = fmtNum(out.grantTotal);
  document.getElementById('hb1336HH').textContent    = fmtNum(out.hbTotal);
  document.getElementById('incremental').textContent = fmtSigned(out.incremental);
  document.getElementById('incrementalPct').textContent = fmtSignedPct(out.incrementalPct) + ' vs. do nothing';
  document.getElementById('reachMult').textContent   = fmtMult(out.reachMult);
  document.getElementById('yr10Grant').textContent   = fmtNum(out.grantHHPerYr);
  document.getElementById('yr10HB').textContent      = fmtNum(out.hbHH[H - 1]);
  document.getElementById('incremental').style.color =
    out.incremental >= 0 ? 'var(--c-good)' : 'var(--c-bad)';
}

function renderTierTotal(inp) {
  const total = inp.tierMix.reduce((a, b) => a + b, 0);
  const totalEl = document.getElementById('tierTotal');
  totalEl.textContent = (total * 100).toFixed(0) + '%';
  totalEl.className = Math.abs(total - 1) < 0.005 ? 'tier-ok' : 'tier-warning';
}

function renderYearByYear(out) {
  const tbody = document.getElementById('yearByYearBody');
  let html = '';
  for (let t = 0; t < H; t++) {
    const yearDelta = out.hbHH[t] - out.grantHHPerYr;
    const cumDelta  = out.hbCum[t] - out.grantCum[t];
    const yearPct   = out.grantHHPerYr > 0 ? yearDelta / out.grantHHPerYr : 0;
    const cumPct    = out.grantCum[t] > 0 ? cumDelta / out.grantCum[t] : 0;
    const yCls = yearDelta >= 0 ? 'pos' : 'neg';
    const cCls = cumDelta  >= 0 ? 'pos' : 'neg';
    html += '<tr>'
      + '<td>' + (t + 1) + '</td>'
      + '<td>' + fmtUSD(out.cap[t + 1]) + '</td>'
      + '<td>' + fmtNum(out.hbHH[t]) + '</td>'
      + '<td>' + fmtNum(out.hbCum[t]) + '</td>'
      + '<td>' + fmtNum(out.grantHHPerYr) + '</td>'
      + '<td>' + fmtNum(out.grantCum[t]) + '</td>'
      + '<td class="' + yCls + '">' + fmtSigned(yearDelta) + '</td>'
      + '<td class="' + yCls + '">' + fmtSignedPct(yearPct) + '</td>'
      + '<td class="' + cCls + '">' + fmtSigned(cumDelta) + '</td>'
      + '<td class="' + cCls + '">' + fmtSignedPct(cumPct) + '</td>'
      + '</tr>';
  }
  tbody.innerHTML = html;
}

function renderScenarios(inp, out) {
  const baseline = out.grantTotal;
  const tbody = document.getElementById('scenarioBody');

  function row(label, rValue, bValue, cls) {
    cls = cls || '';
    if (rValue === null) {
      return '<tr class="baseline-row">'
        + '<td>' + label + '</td>'
        + '<td>' + fmtNum(baseline) + '</td>'
        + '<td>baseline</td><td>—</td></tr>';
    }
    const r = rValue === 'live' ? out.r : rValue;
    const b = bValue === 'live' ? inp.bundle : bValue;
    const tc = totalCap(out.net, r, inp.L, out.recycleFactor, H);
    const cph = inp.deposit * (1 + b * inp.rcdMult);
    const hh = tc / cph;
    const delta = hh - baseline;
    const pct = hh / baseline - 1;
    const dCls = delta >= 0 ? 'pos' : 'neg';
    return '<tr class="' + cls + '">'
      + '<td>' + label + '</td>'
      + '<td>' + fmtNum(hh) + '</td>'
      + '<td class="' + dCls + '">' + fmtSigned(delta) + '</td>'
      + '<td class="' + dCls + '">' + fmtSignedPct(pct) + '</td>'
      + '</tr>';
  }

  const liveLabel = 'HB 1336 at your current inputs ('
    + (inp.bundle * 100).toFixed(0) + '% need RCD, r ≈ '
    + (out.r * 100).toFixed(1) + '%, L = ' + inp.L
    + ')  ←  central case';

  tbody.innerHTML =
    row('DO NOTHING (baseline) — grant, deposit-only at current deposit size', null, null) +
    row(liveLabel, 'live', 'live', 'central-row') +
    row('HB 1336 at current r, 50% need RCD', 'live', 0.50) +
    row('HB 1336 at current r, 100% need RCD (worst-case RCD demand)', 'live', 1.00) +
    row('HB 1336 at 70% r, 100% need RCD (very conservative)', 0.70, 1.00) +
    row('HB 1336 at 50% r, 50% need RCD (deep stress test)', 0.50, 0.50);
}

function renderHeatmap(inp, out) {
  const rs = [0.50, 0.60, 0.70, 0.80, 0.90];
  const bs = [0.00, 0.25, 0.50, 0.75, 1.00];
  const baseline = out.grantTotal;
  let html = '<thead><tr><th>% needing RCD &nbsp;\\&nbsp; Recovery rate r</th>';
  for (const r of rs) html += '<th>r = ' + (r * 100).toFixed(0) + '%</th>';
  html += '</tr></thead><tbody>';
  for (const b of bs) {
    html += '<tr><td><strong>' + (b * 100).toFixed(0) + '%</strong></td>';
    for (const r of rs) {
      const tc = totalCap(out.net, r, inp.L, out.recycleFactor, H);
      const cph = inp.deposit * (1 + b * inp.rcdMult);
      const hh = tc / cph;
      const ratio = hh / baseline;
      let bg;
      if (ratio >= 1) {
        const t = Math.min(1, (ratio - 1) / 2);
        const lum = 240 - Math.round(t * 130);
        bg = 'rgb(' + lum + ',255,' + lum + ')';
      } else {
        const t = Math.min(1, (1 - ratio));
        const lum = 240 - Math.round(t * 80);
        bg = 'rgb(255,' + lum + ',' + lum + ')';
      }
      html += '<td class="cell" style="background:' + bg + '">' + fmtNum(hh) + '</td>';
    }
    html += '</tr>';
  }
  html += '</tbody>';
  document.getElementById('heatmap').innerHTML = html;
}

function renderChart(out) {
  if (typeof Chart === 'undefined') return;
  const labels = Array.from({length: H}, (_, i) => 'Yr ' + (i + 1));
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'HB 1336 — cumulative households',
        data: out.hbCum,
        borderColor: '#1F4E79',
        backgroundColor: 'rgba(31,78,121,0.10)',
        borderWidth: 2.5, tension: 0.2, fill: false, pointRadius: 3
      },
      {
        label: 'Do nothing — cumulative households',
        data: out.grantCum,
        borderColor: '#b91c1c',
        backgroundColor: 'rgba(185,28,28,0.10)',
        borderWidth: 2.5, tension: 0, fill: false, pointRadius: 3,
        borderDash: [6, 4]
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: function(ctx) {
        return ctx.dataset.label + ': ' + Math.round(ctx.parsed.y).toLocaleString();
      } } }
    },
    scales: {
      x: { title: { display: true, text: 'Year' } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cumulative households' },
        ticks: { callback: function(v) { return v.toLocaleString(); } }
      }
    }
  };
  if (chart) {
    chart.data = data;
    chart.options = options;
    chart.update();
  } else {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, { type: 'line', data: data, options: options });
  }
}

function renderAnnualChart(out) {
  if (typeof Chart === 'undefined') return;
  const el = document.getElementById('chartAnnual');
  if (!el) return;
  const labels = Array.from({length: H}, (_, i) => 'Yr ' + (i + 1));
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'HB 1336 — households placed that year',
        data: out.hbHH,
        backgroundColor: 'rgba(31,78,121,0.75)',
        borderColor: '#1F4E79',
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Do nothing — households placed that year',
        data: Array.from({length: H}, () => out.grantHHPerYr),
        borderColor: '#b91c1c',
        borderWidth: 2.5, tension: 0, fill: false, pointRadius: 3,
        borderDash: [6, 4]
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: function(ctx) {
        return ctx.dataset.label + ': ' + Math.round(ctx.parsed.y).toLocaleString();
      } } }
    },
    scales: {
      x: { title: { display: true, text: 'Year' } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Households placed per year' },
        ticks: { callback: function(v) { return v.toLocaleString(); } }
      }
    }
  };
  if (chartAnnual) {
    chartAnnual.data = data;
    chartAnnual.options = options;
    chartAnnual.update();
  } else {
    chartAnnual = new Chart(el.getContext('2d'), { data: data, options: options });
  }
}

function render() {
  const inp = readInputs();
  const out = compute(inp);
  renderTierTotal(inp);
  renderResults(out);
  renderYearByYear(out);
  renderScenarios(inp, out);
  renderHeatmap(inp, out);
  renderChart(out);
  renderAnnualChart(out);
}

document.querySelectorAll('.calc-wrap input, .calc-wrap select').forEach(function(el) {
  el.addEventListener('input', render);
  el.addEventListener('change', render);
});

render();
