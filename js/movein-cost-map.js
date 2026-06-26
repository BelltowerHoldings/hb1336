/* ==========================================================================
   HB 1336-FN — Move-in cost map renderer
   --------------------------------------------------------------------------
   Renders an interactive, schematic U.S. tile-grid map of how each state
   compares to New Hampshire. A toggle switches the metric the map measures:

     • "total"   — TOTAL legally-collectible move-in funds (first month, last
                   month, prepaid/advance rent, and security deposit combined).
                   Uses each record's classification_relative_to_NH verbatim.
     • "deposit" — the nominal SECURITY-DEPOSIT cap only, derived by comparing
                   each record's security_deposit_cap_months to NH's. This is a
                   transparent numeric comparison of a supplied field, NOT a
                   reinterpretation of the legal research.

   Color scale is a green→red heat scale: GREEN = no cap (most permissive),
   RED = more restrictive than NH. New Hampshire is the baseline, highlighted
   with a dark ring + star regardless of fill.

   Reads window.MOVEIN_COST_DATA (see js/movein-cost-data.js). It does NOT
   modify or "correct" any legal field. If a state is missing, or (in total
   mode) its classification is unknown / "unclear_needs_review", it renders as
   "Needs review" and a console warning is emitted.

   Hosts (all optional; renderer no-ops if #moveinMapHost is absent):
     #moveinMapHost   #moveinTooltip   #moveinLegend
     #moveinTableBody #moveinModeNote  .mc-toggle-btn[data-mode]
   ========================================================================== */
(function () {
  "use strict";

  var host = document.getElementById("moveinMapHost");
  if (!host) return;

  var DATA = window.MOVEIN_COST_DATA;
  if (!Array.isArray(DATA)) {
    console.warn("[movein-cost-map] window.MOVEIN_COST_DATA missing or not an array; map not rendered.");
    return;
  }

  /* ---- Classification config -------------------------------------------
     Green (good / most permissive) → red (more restrictive than NH). */
  var BASELINE = "NH";
  var CLASS = {
    no_cap_or_effectively_uncapped: { color: "#2e7d4f" }, // green
    less_restrictive_than_NH:       { color: "#d8a93a" }, // amber
    same_as_NH:                     { color: "#9c5a2b" }, // burnt orange
    more_restrictive_than_NH:       { color: "#9e3324" }, // red
    unclear_needs_review:           { color: "#cdc9bf" }  // light gray
  };
  var CLASS_ORDER = [
    "no_cap_or_effectively_uncapped",
    "less_restrictive_than_NH",
    "same_as_NH",
    "more_restrictive_than_NH",
    "unclear_needs_review"
  ];

  /* Per-mode labels and explanatory note. */
  var MODES = {
    total: {
      labels: {
        no_cap_or_effectively_uncapped: "No cap / effectively uncapped",
        less_restrictive_than_NH: "Allows more upfront than NH",
        same_as_NH: "Same as NH",
        more_restrictive_than_NH: "More restrictive than NH",
        unclear_needs_review: "Needs review"
      },
      note: "Showing the <strong>total move-in cash</strong> a landlord may legally collect upfront — " +
            "first month, last month, prepaid rent, and the security deposit, combined."
    },
    deposit: {
      labels: {
        no_cap_or_effectively_uncapped: "No deposit cap",
        less_restrictive_than_NH: "Larger deposit than NH",
        same_as_NH: "Same deposit cap as NH",
        more_restrictive_than_NH: "Smaller deposit than NH",
        unclear_needs_review: "Needs review"
      },
      note: "Showing the <strong>nominal security-deposit cap only</strong> — the figure most state " +
            "guides quote. It can understate true move-in cost where last month or prepaid rent stack on top."
    }
  };

  /* ---- Schematic tile grid: [abbr, row, col] (1-indexed). Geometry only. */
  var GRID = [
    ["AK",1,1], ["ME",1,11],
    ["VT",2,10], ["NH",2,11],
    ["WA",3,1],["ID",3,2],["MT",3,3],["ND",3,4],["MN",3,5],["IL",3,6],["WI",3,7],["MI",3,8],["NY",3,9],["RI",3,10],["MA",3,11],
    ["OR",4,1],["NV",4,2],["WY",4,3],["SD",4,4],["IA",4,5],["IN",4,6],["OH",4,7],["PA",4,8],["NJ",4,9],["CT",4,10],
    ["CA",5,1],["UT",5,2],["CO",5,3],["NE",5,4],["MO",5,5],["KY",5,6],["WV",5,7],["VA",5,8],["MD",5,9],["DE",5,10],
    ["AZ",6,2],["NM",6,3],["KS",6,4],["AR",6,5],["TN",6,6],["NC",6,7],["SC",6,8],
    ["TX",7,3],["OK",7,4],["LA",7,5],["MS",7,6],["AL",7,7],["GA",7,8],
    ["HI",8,1],["FL",8,8]
  ];

  /* ---- Index the legal data by postal abbreviation ---------------------- */
  var byAbbr = {};
  DATA.forEach(function (d) { if (d && d.postal_abbreviation) byAbbr[d.postal_abbreviation] = d; });
  var NH_DEPOSIT_CAP = byAbbr[BASELINE] ? byAbbr[BASELINE].security_deposit_cap_months : 1.0;

  /* ---- Classify a record under the active mode -------------------------- */
  function classify(rec, mode) {
    if (!rec) return "unclear_needs_review";
    if (mode === "deposit") {
      var c = rec.security_deposit_cap_months;
      if (c == null) return "no_cap_or_effectively_uncapped"; // no statutory cap
      var nh = NH_DEPOSIT_CAP == null ? 1.0 : NH_DEPOSIT_CAP;
      if (c > nh) return "less_restrictive_than_NH";
      if (c < nh) return "more_restrictive_than_NH";
      return "same_as_NH";
    }
    var key = rec.classification_relative_to_NH;
    return key && CLASS[key] ? key : "unclear_needs_review";
  }

  /* ---- Helpers ---------------------------------------------------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function cap(s) { s = String(s == null ? "" : s); return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function monthsLabel(rec) {
    var n = rec && rec.ordinary_total_upfront_months_numeric;
    if (n === 0) return "0 months";
    if (n == null || isNaN(n)) return "Not clearly capped";
    var s = (Math.round(n * 10) / 10).toString();
    return s + (n === 1 ? " month" : " months");
  }
  function depositLabel(rec) {
    var c = rec && rec.security_deposit_cap_months;
    if (c == null) return "No statutory cap";
    var s = (Math.round(c * 10) / 10).toString();
    return s + (c === 1 ? " month" : " months");
  }
  /* Relative luminance → pick legible label color for a given fill. */
  function relLum(hex) {
    var c = hex.replace("#", "");
    function ch(i) { var v = parseInt(c.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(0) + 0.7152 * ch(2) + 0.0722 * ch(4);
  }
  function textOn(hex) { return relLum(hex) > 0.35 ? "#191919" : "#ffffff"; }

  /* ---- One-time QA / data-integrity audit (total-mode reference) -------- */
  (function audit() {
    var counts = {}; CLASS_ORDER.forEach(function (k) { counts[k] = 0; });
    var missing = [], noSource = [];
    GRID.forEach(function (g) {
      var rec = byAbbr[g[0]];
      if (!rec) { missing.push(g[0]); counts.unclear_needs_review++; return; }
      counts[classify(rec, "total")]++;
      if (!rec.source_url && !rec.primary_statute_or_source) noSource.push(g[0]);
    });
    var sum = CLASS_ORDER.reduce(function (a, k) { return a + counts[k]; }, 0);
    console.info("[movein-cost-map] " + GRID.length + " states rendered; total-mode counts:", counts, "(sum " + sum + ")");
    if (sum !== GRID.length) console.warn("[movein-cost-map] category counts do not sum to state total.");
    if (GRID.length !== 50) console.warn("[movein-cost-map] expected 50 states, got " + GRID.length + ".");
    if (missing.length) console.warn("[movein-cost-map] no dataset entry for: " + missing.join(", ") + ".");
    if (noSource.length) console.warn("[movein-cost-map] no source citation for: " + noSource.join(", ") + ".");
    if (!byAbbr[BASELINE]) console.warn("[movein-cost-map] baseline state " + BASELINE + " not found in dataset.");
  })();

  /* ---- Build the SVG tile grid once; recolor on mode change ------------- */
  var COLS = 11, ROWS = 8, W = 58, H = 42, GAP = 6, M = 6;
  var svgNS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 " + (COLS * W + M * 2) + " " + (ROWS * H + M * 2));
  svg.setAttribute("class", "mc-svg");
  svg.setAttribute("role", "group");

  var cells = {}; // abbr -> { g, rect, label }
  GRID.forEach(function (g) {
    var ab = g[0], row = g[1], col = g[2];
    var isNH = ab === BASELINE;
    var x = (col - 1) * W + M, y = (row - 1) * H + M;

    var cell = document.createElementNS(svgNS, "g");
    cell.setAttribute("class", "mc-cell" + (isNH ? " mc-nh" : ""));
    cell.setAttribute("tabindex", "0");
    cell.setAttribute("role", "button");
    cell.setAttribute("data-abbr", ab);

    var rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x); rect.setAttribute("y", y);
    rect.setAttribute("width", W - GAP); rect.setAttribute("height", H - GAP);
    rect.setAttribute("rx", 6); rect.setAttribute("class", "mc-rect");
    cell.appendChild(rect);

    if (isNH) {
      var ring = document.createElementNS(svgNS, "rect");
      ring.setAttribute("x", x - 2.5); ring.setAttribute("y", y - 2.5);
      ring.setAttribute("width", W - GAP + 5); ring.setAttribute("height", H - GAP + 5);
      ring.setAttribute("rx", 8); ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", "#191919"); ring.setAttribute("stroke-width", "3");
      ring.setAttribute("class", "mc-ring");
      cell.appendChild(ring);
    }

    var label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", x + (W - GAP) / 2);
    label.setAttribute("y", y + (H - GAP) / 2 + 4);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "mc-label");
    label.textContent = ab;
    cell.appendChild(label);

    if (isNH) {
      var star = document.createElementNS(svgNS, "text");
      star.setAttribute("x", x + (W - GAP) / 2);
      star.setAttribute("y", y + 11);
      star.setAttribute("text-anchor", "middle");
      star.setAttribute("class", "mc-star");
      star.style.fill = "#ffffff";
      star.textContent = "★";
      cell.appendChild(star);
    }

    svg.appendChild(cell);
    cells[ab] = { g: cell, rect: rect, label: label };
  });
  host.innerHTML = "";
  host.appendChild(svg);

  /* ---- Recolor + relabel all tiles for a mode --------------------------- */
  function paint(mode) {
    var L = MODES[mode].labels;
    svg.setAttribute("aria-label",
      "Schematic tile-grid map of the 50 U.S. states, colored from green (no cap) to red (more " +
      "restrictive than New Hampshire), measuring " +
      (mode === "deposit" ? "the security-deposit cap only" : "total legally collectible move-in funds") +
      ". New Hampshire is highlighted as the baseline. Use Tab to move between states and Enter to open details.");

    GRID.forEach(function (g) {
      var ab = g[0], rec = byAbbr[ab] || null;
      var key = classify(rec, mode), cfg = CLASS[key];
      var c = cells[ab];
      c.g.setAttribute("data-class", key);
      c.rect.setAttribute("fill", cfg.color);
      c.label.style.fill = textOn(cfg.color);
      var name = rec ? rec.state : ab;
      var metric = mode === "deposit" ? ("Deposit cap: " + depositLabel(rec)) : ("Total move-in: " + monthsLabel(rec));
      c.g.setAttribute("aria-label",
        name + " (" + ab + "). " + L[key] + ". " + metric + "." +
        (ab === BASELINE ? " New Hampshire baseline." : "") + " Press Enter for full details.");
    });
  }

  /* ---- Tooltip / popover ------------------------------------------------ */
  var tip = document.getElementById("moveinTooltip");
  function tipRow(lbl, val) {
    if (val == null || val === "") return "";
    return '<div class="mc-tip-row"><dt>' + esc(lbl) + '</dt><dd>' + val + '</dd></div>';
  }
  function tipHTML(ab, mode) {
    var rec = byAbbr[ab];
    var key = classify(rec, mode), cfg = CLASS[key], L = MODES[mode].labels;
    var name = rec ? rec.state : ab;

    var srcVal;
    if (rec && rec.source_url) {
      srcVal = '<a href="' + esc(rec.source_url) + '" target="_blank" rel="noopener">' +
        esc(rec.primary_statute_or_source || "Source") + ' ↗</a>';
    } else if (rec && rec.primary_statute_or_source) {
      srcVal = esc(rec.primary_statute_or_source) + ' <span class="mc-nolink">(citation; link pending)</span>';
    } else {
      srcVal = '<span class="mc-nolink">No source on file</span>';
    }

    var head =
      '<div class="mc-tip-head">' +
        '<div class="mc-tip-title">' + esc(name) + ' <span class="mc-tip-abbr">' + esc(ab) + '</span></div>' +
        '<button type="button" class="mc-tip-close" aria-label="Close details">×</button>' +
      '</div>' +
      '<div class="mc-tip-class"><span class="mc-dot" style="background:' + cfg.color + '"></span>' +
        esc(L[key]) + (ab === BASELINE ? ' · baseline' : '') + '</div>';

    if (!rec) {
      return head + '<p class="mc-tip-summary">No dataset entry for this state.</p>' +
        '<dl class="mc-tip-dl">' + tipRow("Source", srcVal) + '</dl>';
    }

    /* Highlight the metric matching the active mode. */
    var headline = mode === "deposit"
      ? tipRow("Security-deposit cap", '<strong>' + esc(depositLabel(rec)) + '</strong>')
      : tipRow("Total ordinary upfront", '<strong>' + esc(monthsLabel(rec)) + '</strong>');

    var body = '<dl class="mc-tip-dl">' +
      headline +
      tipRow("Formula", esc(rec.ordinary_total_upfront_months_formula)) +
      tipRow("First month’s rent", esc(cap(rec.first_month_rent_collectible_upfront))) +
      tipRow("Last month’s rent", esc(cap(rec.last_month_rent_collectible_upfront))) +
      tipRow("Security deposit", esc(rec.security_deposit_cap_text)) +
      tipRow("Advance / prepaid rent", esc(rec.prepaid_or_advance_rent_limit_text)) +
      tipRow("Important exceptions", esc(rec.important_exceptions)) +
      tipRow("Source", srcVal) +
      tipRow("Confidence", esc(cap(rec.confidence))) +
    '</dl>';

    var summary = rec.tooltip_summary ? '<p class="mc-tip-summary">' + esc(rec.tooltip_summary) + '</p>' : '';
    return head + summary + body;
  }

  var pinned = false, activeCell = null;

  function placeTip(cell) {
    if (!tip) return;
    if (window.matchMedia("(max-width: 640px)").matches) {
      tip.classList.add("mc-sheet"); tip.style.left = ""; tip.style.top = ""; return;
    }
    tip.classList.remove("mc-sheet");
    var wrap = host.getBoundingClientRect(), r = cell.getBoundingClientRect();
    var left = r.left - wrap.left + r.width / 2;
    var top = r.bottom - wrap.top + 10;
    tip.style.left = "0px"; tip.style.top = "0px";
    var tw = tip.offsetWidth || 300, th = tip.offsetHeight || 200;
    left = Math.max(8, Math.min(left - tw / 2, host.clientWidth - tw - 8));
    if (top + th > host.clientHeight && (r.top - wrap.top) > th + 12) top = r.top - wrap.top - th - 10;
    tip.style.left = left + "px"; tip.style.top = top + "px";
  }
  function showTip(cell, doPin) {
    if (!tip) return;
    activeCell = cell;
    tip.innerHTML = tipHTML(cell.getAttribute("data-abbr"), MODE);
    tip.hidden = false; tip.classList.add("mc-show");
    if (doPin) { pinned = true; tip.setAttribute("role", "dialog"); tip.setAttribute("aria-modal", "false"); }
    placeTip(cell);
    var closeBtn = tip.querySelector(".mc-tip-close");
    if (closeBtn) closeBtn.addEventListener("click", function (e) { e.stopPropagation(); hideTip(true); });
  }
  function hideTip(force) {
    if (!tip || (pinned && !force)) return;
    pinned = false;
    tip.classList.remove("mc-show", "mc-sheet"); tip.removeAttribute("role"); tip.hidden = true;
    activeCell = null;
  }

  host.addEventListener("pointerover", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell");
    if (cell && !pinned && e.pointerType !== "touch") showTip(cell, false);
  });
  host.addEventListener("pointerout", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell"), to = e.relatedTarget;
    if (cell && !pinned && !(to && tip && tip.contains(to))) hideTip(false);
  });
  host.addEventListener("focusin", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell");
    if (cell && !pinned) showTip(cell, false);
  });
  host.addEventListener("focusout", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell"), to = e.relatedTarget;
    if (cell && !pinned && !(to && tip && tip.contains(to))) hideTip(false);
  });
  host.addEventListener("click", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell");
    if (!cell) return;
    if (pinned && activeCell === cell) { hideTip(true); return; }
    pinned = false; showTip(cell, true);
  });
  host.addEventListener("keydown", function (e) {
    var cell = e.target.closest && e.target.closest(".mc-cell");
    if (!cell) return;
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      if (pinned && activeCell === cell) { hideTip(true); cell.focus(); }
      else { pinned = false; showTip(cell, true); }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pinned) { var c = activeCell; hideTip(true); if (c && c.focus) c.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!pinned) return;
    if (tip && tip.contains(e.target)) return;
    if (host.contains(e.target)) return;
    hideTip(true);
  });
  window.addEventListener("resize", function () {
    if ((pinned || (tip && tip.classList.contains("mc-show"))) && activeCell) placeTip(activeCell);
  });

  /* ---- Legend with live counts ------------------------------------------ */
  var legend = document.getElementById("moveinLegend");
  function renderLegend(mode) {
    if (!legend) return;
    var L = MODES[mode].labels;
    var counts = {}; CLASS_ORDER.forEach(function (k) { counts[k] = 0; });
    GRID.forEach(function (g) { counts[classify(byAbbr[g[0]], mode)]++; });
    var lh = "";
    CLASS_ORDER.forEach(function (k) {
      lh += '<span class="mc-lg"><span class="mc-sw" style="background:' + CLASS[k].color + '"></span>' +
        esc(L[k]) + ' <b>(' + counts[k] + ')</b></span>';
    });
    lh += '<span class="mc-lg mc-lg-nh"><span class="mc-sw mc-sw-nh" style="background:' +
      CLASS.same_as_NH.color + '"></span>New Hampshire (baseline)</span>';
    legend.innerHTML = lh;
  }

  /* ---- Fallback data table ---------------------------------------------- */
  var tbody = document.getElementById("moveinTableBody");
  function renderTable(mode) {
    if (!tbody) return;
    var L = MODES[mode].labels;
    var rows = DATA.slice().sort(function (a, b) {
      var ca = CLASS_ORDER.indexOf(classify(a, mode)), cb = CLASS_ORDER.indexOf(classify(b, mode));
      if (ca !== cb) return ca - cb;
      return String(a.state).localeCompare(String(b.state));
    });
    var html = "";
    rows.forEach(function (rec) {
      var key = classify(rec, mode), cfg = CLASS[key];
      var src = rec.source_url
        ? '<a href="' + esc(rec.source_url) + '" target="_blank" rel="noopener">' + esc(rec.primary_statute_or_source || "Source") + ' ↗</a>'
        : esc(rec.primary_statute_or_source || "—");
      html += "<tr" + (rec.postal_abbreviation === BASELINE ? ' class="mc-tr-nh"' : "") + ">" +
        '<th scope="row">' + esc(rec.state) + ' <span class="mc-td-abbr">' + esc(rec.postal_abbreviation) + '</span></th>' +
        '<td><span class="mc-dot" style="background:' + cfg.color + '"></span>' + esc(L[key]) + '</td>' +
        "<td>" + esc(depositLabel(rec)) + "</td>" +
        "<td>" + esc(monthsLabel(rec)) + "</td>" +
        "<td>" + esc(rec.security_deposit_cap_text || "—") + "</td>" +
        "<td>" + esc(rec.prepaid_or_advance_rent_limit_text || "—") + "</td>" +
        "<td>" + esc(cap(rec.confidence)) + "</td>" +
        "<td>" + src + "</td>" +
      "</tr>";
    });
    tbody.innerHTML = html;
  }

  /* ---- Mode wiring ------------------------------------------------------- */
  var MODE = "total";
  var noteEl = document.getElementById("moveinModeNote");
  var toggleBtns = Array.prototype.slice.call(document.querySelectorAll(".mc-toggle-btn[data-mode]"));

  function render(mode) {
    MODE = MODES[mode] ? mode : "total";
    paint(MODE);
    renderLegend(MODE);
    renderTable(MODE);
    if (noteEl) noteEl.innerHTML = MODES[MODE].note;
    toggleBtns.forEach(function (b) {
      var on = b.getAttribute("data-mode") === MODE;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (pinned && activeCell) { tip.innerHTML = tipHTML(activeCell.getAttribute("data-abbr"), MODE); placeTip(activeCell); }
  }

  toggleBtns.forEach(function (b) {
    b.addEventListener("click", function () { render(b.getAttribute("data-mode")); });
  });

  render("total");
})();
