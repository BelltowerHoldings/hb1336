/* ============================================================
   HB 1336 — Site behavior (v6)
   - Active-nav highlighter, reading-progress bar
   - Scroll-reveal animations
   - Nested TOC scrollspy
   - Document search: overlay panel of tiled, clickable previews
   - Examples carousel (buttons, keyboard, swipe)
   - Statute Reader v4:
       · Auto-scroll / Manual segmented switch (the toggle is the
         ONLY thing that makes Manual stick)
       · clicking a citation shows it without changing the mode
       · a Pin button on the statute card pauses Auto-scroll with
         a notice; clicking any citation releases the pin and
         resumes Auto-scroll
       · "On screen" citation pills with hover-linking
       · the active citation is strongly marked in the text and
         flashes when the reader auto-advances
   ============================================================ */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- Active-page nav ----------------------------------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* -------- Reading progress bar ------------------------------- */
  if (document.body.dataset.progress !== 'off') {
    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    document.body.appendChild(bar);
    var onProg = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    document.addEventListener('scroll', onProg, { passive: true });
    onProg();
  }

  /* -------- Scroll-reveal -------------------------------------- */
  document.querySelectorAll('.article').forEach(function (art) {
    art.querySelectorAll('h2, .topic-block, .objection-block, .divider-head, figure, .table-wrap, .upfront-visual, blockquote').forEach(function (el) {
      if (!el.closest('.topic-block, .objection-block') || el.classList.contains('topic-block') || el.classList.contains('objection-block')) {
        el.classList.add('reveal');
      }
    });
    art.querySelectorAll('h3, h4').forEach(function (el) {
      if (!el.closest('.topic-block, .objection-block')) el.classList.add('reveal');
    });
  });

  var revealTargets = document.querySelectorAll('.reveal, .figure-card');
  if ('IntersectionObserver' in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* -------- Nested TOC scrollspy -------------------------------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (tocLinks.length) {
    var targets = tocLinks
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var onScroll = function () {
      var y = window.scrollY + 120;
      var activeId = null;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].offsetTop <= y) activeId = targets[i].id; else break;
      }
      tocLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
      });
      document.querySelectorAll('.toc li.toc-section').forEach(function (li) {
        li.classList.toggle('open', !!li.querySelector('a.active'));
      });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==============================================================
     Document search — overlay panel with tiled previews
     ============================================================== */
  var openSearchPanels = [];
  document.querySelectorAll('input[data-doc-search]').forEach(function (input) {
    var scope = document.querySelector(input.dataset.docSearch) || document;
    var countEl = input.dataset.count ? document.querySelector(input.dataset.count) : null;
    var host = input.closest('.search-bar') || input.parentNode;
    var results = document.createElement('div');
    results.className = 'search-results';
    host.appendChild(results);
    openSearchPanels.push({ host: host, results: results, input: input });

    var index = null;
    function buildIndex() {
      index = [];
      var label = '';
      var sub = '';
      scope.querySelectorAll('h2, h3, h4, p, li, figcaption').forEach(function (el) {
        var tag = el.tagName;
        if (tag === 'H2') { label = el.textContent.trim(); sub = ''; return; }
        if (tag === 'H3' || tag === 'H4') { sub = el.textContent.trim(); return; }
        var text = el.textContent.replace(/\s+/g, ' ').trim();
        if (text.length < 3) return;
        index.push({ el: el, text: text, low: text.toLowerCase(), label: label, sub: sub });
      });
    }

    function snippet(text, q, pos) {
      var R = 90;
      var start = Math.max(0, pos - 36);
      var s = (start > 0 ? '…' : '') + text.slice(start, start + R) + (start + R < text.length ? '…' : '');
      var esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      var re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
      return esc.replace(re, function (m) { return '<mark>' + m + '</mark>'; });
    }

    function close() { results.classList.remove('open'); }
    function runSearch() {
      var q = input.value.trim();
      results.innerHTML = '';
      if (q.length < 2) { close(); if (countEl) countEl.textContent = ''; return; }
      if (!index) buildIndex();
      var lq = q.toLowerCase();
      var hits = [];
      for (var i = 0; i < index.length && hits.length < 40; i++) {
        var pos = index[i].low.indexOf(lq);
        if (pos !== -1) hits.push({ item: index[i], pos: pos });
      }
      if (countEl) countEl.textContent = hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + (hits.length === 40 ? '+' : '') : 'No results';
      if (!hits.length) {
        results.innerHTML = '<div style="font-family:var(--sans);font-size:12.5px;color:var(--muted);padding:6px 4px;">No matches in this document.</div>';
        results.classList.add('open');
        return;
      }
      hits.forEach(function (h) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'search-result';
        var where = h.item.label + (h.item.sub ? ' › ' + h.item.sub : '');
        b.innerHTML = '<span class="sr-sec">' + where.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>' +
                      '<span class="sr-snippet">' + snippet(h.item.text, q, h.pos) + '</span>';
        b.addEventListener('click', function () {
          close();
          h.item.el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
          h.item.el.classList.remove('flash');
          void h.item.el.offsetWidth;
          h.item.el.classList.add('flash');
          setTimeout(function () { h.item.el.classList.remove('flash'); }, 2000);
        });
        results.appendChild(b);
      });
      results.classList.add('open');
    }

    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(runSearch, 160);
    });
    input.addEventListener('focus', function () {
      if (results.children.length && input.value.trim().length >= 2) results.classList.add('open');
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; results.innerHTML = ''; close(); if (countEl) countEl.textContent = ''; }
    });
  });
  document.addEventListener('click', function (e) {
    openSearchPanels.forEach(function (p) {
      if (!p.host.contains(e.target)) p.results.classList.remove('open');
    });
  });

  /* -------- Examples carousel ----------------------------------- */
  document.querySelectorAll('.carousel').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = root.querySelectorAll('.carousel-slide');
    if (!track || !slides.length) return;
    var dotsWrap = root.querySelector('.carousel-dots');
    var i = 0, timer = null;

    slides.forEach(function (_, idx) {
      var d = document.createElement('button');
      d.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Example ' + (idx + 1));
      d.addEventListener('click', function () { go(idx, true); });
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll('.carousel-dot');

    function go(n, user) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
      if (user) stop();
    }
    function next() { go(i + 1); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    root.querySelector('[data-prev]').addEventListener('click', function () { go(i - 1, true); });
    root.querySelector('[data-next]').addEventListener('click', function () { go(i + 1, true); });
    root.addEventListener('mouseenter', stop);
    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(i - 1, true);
      if (e.key === 'ArrowRight') go(i + 1, true);
    });
    var x0 = null;
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 42) go(i + (dx < 0 ? 1 : -1), true);
      x0 = null;
    }, { passive: true });
    if (!REDUCED) timer = setInterval(next, 9000);
  });

  /* ==============================================================
     Statute Reader v4
     ============================================================== */
  var S = window.STATUTES || {};
  var ORDER = window.STATUTE_ORDER || Object.keys(S);
  var rail = document.getElementById('statuteRail');
  var openPopover = null, openScrim = null, popoverCite = null;

  var reader = {
    mode: 'auto',           // 'auto' | 'manual' — set ONLY by the toggle
    pinned: false,          // set by the Pin button (or the browse menu)
    list: [],
    currentKey: '', currentPara: '',
    activeTextEl: null,
    body: null, hint: null, select: null,
    autoBtn: null, manualBtn: null,
    pillsWrap: null, pillsEl: null, toastEl: null
  };

  function railVisible() {
    return rail && window.getComputedStyle(rail).display !== 'none';
  }
  function following() {
    return reader.mode === 'auto' && !reader.pinned;
  }

  function statusBadge(status) {
    if (status === 'new') return '<span class="badge new">New — HB 1336-FN</span>';
    if (status === 'amended') return '<span class="badge amended">Amended by HB 1336-FN</span>';
    if (status === 'chapter') return '<span class="badge">Chapter overview</span>';
    return '<span class="badge">Current law</span>';
  }

  function buildCard(key, para, opts) {
    opts = opts || {};
    var st = S[key];
    if (!st) return null;
    var card = document.createElement('div');
    card.className = 'statute-card';
    var paras = st.paras.map(function (p) {
      return '<div class="statute-para" data-para="' + p.id + '">' + p.html + '</div>';
    }).join('');
    var corner = '';
    if (opts.close) corner = '<button class="statute-close" aria-label="Close">✕</button>';
    else if (opts.pin) corner = '<button class="statute-pin' + (reader.pinned ? ' pinned' : '') + '" type="button" title="' +
      (reader.pinned ? 'Unpin and resume Auto-scroll' : 'Pin this statute: pause Auto-scroll until you click another citation') + '">' +
      (reader.pinned ? '✓ Pinned' : 'Pin') + '</button>';
    card.innerHTML =
      '<div class="statute-card-head">' +
        '<div class="chapter">' + st.chapter + '</div>' +
        '<h4>' + st.title + '</h4>' +
        '<div class="badges">' + statusBadge(st.status) + '</div>' +
        corner +
      '</div>' +
      '<div class="statute-card-body">' +
        '<p class="status-note">' + st.statusNote + '</p>' + paras +
      '</div>' +
      '<div class="statute-card-foot"><a href="' + st.source + '" target="_blank" rel="noopener">View official source ↗</a></div>';

    if (para) {
      var body = card.querySelector('.statute-card-body');
      var el = body.querySelector('[data-para="' + para + '"]');
      if (!el) el = body.querySelector('[data-para^="' + para + '("]');
      if (!el && para.indexOf('(') !== -1) {
        el = body.querySelector('[data-para="' + para.replace(/\(.*$/, '') + '"]');
      }
      if (el) {
        el.classList.add('focus');
        setTimeout(function () {
          var sc = card.querySelector('.statute-card-body');
          var delta = el.getBoundingClientRect().top - sc.getBoundingClientRect().top;
          sc.scrollTop = sc.scrollTop + delta - 52;
        }, 50);
      }
    }
    var closeBtn = card.querySelector('.statute-close');
    if (closeBtn) closeBtn.addEventListener('click', closePopover);
    var pinBtn = card.querySelector('.statute-pin');
    if (pinBtn) pinBtn.addEventListener('click', function () { togglePin(); });
    return card;
  }

  /* ----- Pin & toast --------------------------------------------- */
  function showToast(html) {
    if (!reader.toastEl) return;
    reader.toastEl.innerHTML = html;
    reader.toastEl.style.display = '';
  }
  function hideToast() {
    if (reader.toastEl) reader.toastEl.style.display = 'none';
  }
  function syncPinButton() {
    var btn = reader.body && reader.body.querySelector('.statute-pin');
    if (!btn) return;
    btn.classList.toggle('pinned', reader.pinned);
    btn.textContent = reader.pinned ? '✓ Pinned' : 'Pin';
    btn.title = reader.pinned
      ? 'Unpin and resume Auto-scroll'
      : 'Pin this statute: pause Auto-scroll until you click another citation';
  }
  function setPinned(on, opts) {
    opts = opts || {};
    reader.pinned = on;
    syncPinButton();
    if (on) {
      if (reader.mode === 'auto') {
        showToast('<strong>Auto-scroll paused.</strong> The reader is pinned to this statute — click any citation in the text (or unpin) to resume.');
      }
    } else {
      hideToast();
      if (reader.mode === 'auto' && !opts.noScan) liveScan(true);
    }
  }
  function togglePin() { setPinned(!reader.pinned); }

  /* ----- Active-cite emphasis in the article ----------------------- */
  function setActiveTextCite(el, flash) {
    if (reader.activeTextEl) {
      reader.activeTextEl.classList.remove('active-cite', 'cite-flash');
    }
    reader.activeTextEl = el || null;
    if (el) {
      el.classList.add('active-cite');
      if (flash && !REDUCED) {
        void el.offsetWidth;
        el.classList.add('cite-flash');
        setTimeout(function () { el.classList.remove('cite-flash'); }, 1300);
      }
    }
  }

  /* ----- Rail UI ----------------------------------------------------- */
  function pillLabel(c) {
    if (c.key === 'HB1336') return 'Bill text';
    return 'RSA ' + c.key + (c.para ? ' · ' + c.para : '');
  }

  function buildRailUI() {
    if (!rail) return;
    reader.hint = rail.querySelector('.statute-hint');

    var barEl = document.createElement('div');
    barEl.className = 'reader-bar';

    var select = document.createElement('select');
    select.setAttribute('aria-label', 'Open a statute');
    var opt0 = document.createElement('option');
    opt0.value = '';
    opt0.textContent = 'Browse statutes & bill text…';
    select.appendChild(opt0);
    ORDER.forEach(function (k) {
      if (!S[k]) return;
      var o = document.createElement('option');
      o.value = k;
      o.textContent = (k === 'HB1336' ? '★ ' : '') + S[k].title;
      select.appendChild(o);
    });
    select.addEventListener('change', function () {
      if (!select.value) return;
      setActiveTextCite(null);
      renderRail(select.value, '');
      // browsing pins the reader (but does not flip the Manual toggle)
      if (reader.mode === 'auto') setPinned(true);
      syncPills();
    });

    var sw = document.createElement('div');
    sw.className = 'reader-switch';
    sw.setAttribute('role', 'group');
    sw.setAttribute('aria-label', 'Reader mode');
    var autoBtn = document.createElement('button');
    autoBtn.type = 'button';
    autoBtn.innerHTML = '<span class="live-dot"></span>Auto-scroll';
    autoBtn.title = 'The reader follows the citations on screen as you scroll.';
    var manualBtn = document.createElement('button');
    manualBtn.type = 'button';
    manualBtn.textContent = 'Manual';
    manualBtn.title = 'The reader changes only when you click a citation or browse the menu.';
    autoBtn.addEventListener('click', function () {
      reader.mode = 'auto';
      setPinned(false, { noScan: true });
      syncSwitch();
      liveScan(true);
    });
    manualBtn.addEventListener('click', function () {
      reader.mode = 'manual';
      setPinned(false, { noScan: true });
      hideToast();
      syncSwitch();
    });
    sw.appendChild(autoBtn);
    sw.appendChild(manualBtn);

    barEl.appendChild(select);
    barEl.appendChild(sw);

    var toast = document.createElement('div');
    toast.className = 'reader-toast';
    toast.style.display = 'none';

    var pillsWrap = document.createElement('div');
    pillsWrap.className = 'cite-pills-wrap';
    pillsWrap.innerHTML = '<div class="cite-pills-label">On screen</div><div class="cite-pills"></div>';

    var body = document.createElement('div');
    body.className = 'reader-body';
    if (reader.hint) body.appendChild(reader.hint);

    rail.appendChild(barEl);
    rail.appendChild(toast);
    rail.appendChild(pillsWrap);
    rail.appendChild(body);

    reader.body = body;
    reader.select = select;
    reader.autoBtn = autoBtn;
    reader.manualBtn = manualBtn;
    reader.toastEl = toast;
    reader.pillsWrap = pillsWrap;
    reader.pillsEl = pillsWrap.querySelector('.cite-pills');
    syncSwitch();
    renderPills();
  }

  function syncSwitch() {
    if (!reader.autoBtn) return;
    reader.autoBtn.classList.toggle('on', reader.mode === 'auto');
    reader.manualBtn.classList.toggle('on', reader.mode === 'manual');
    if (reader.mode === 'auto' && !reader.pinned && reader.select) reader.select.value = '';
  }

  /* ----- Pills -------------------------------------------------------- */
  function renderPills() {
    if (!reader.pillsEl) return;
    reader.pillsEl.innerHTML = '';
    if (!reader.list.length) {
      reader.pillsEl.innerHTML = '<span class="pills-empty">No citations in view — keep scrolling, or browse above.</span>';
      return;
    }
    reader.list.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cite-pill';
      b.textContent = pillLabel(c);
      b.addEventListener('mouseenter', function () { c.el.classList.add('cite-hover'); });
      b.addEventListener('mouseleave', function () { c.el.classList.remove('cite-hover'); });
      b.addEventListener('click', function () {
        c.el.classList.remove('cite-hover');
        citeActivated(c.key, c.para, c.el);
      });
      c.pill = b;
      reader.pillsEl.appendChild(b);
    });
    syncPills();
  }

  function syncPills() {
    reader.list.forEach(function (c) {
      if (!c.pill) return;
      var active = (c.el === reader.activeTextEl) ||
        (!reader.activeTextEl && c.key === reader.currentKey && (c.para || '') === (reader.currentPara || ''));
      c.pill.classList.toggle('active', active);
    });
  }

  /* ----- Render ------------------------------------------------------- */
  function renderRail(key, para) {
    if (!reader.body) return;
    reader.currentKey = key; reader.currentPara = para || '';
    var old = reader.body.querySelector('.statute-card');
    if (old) old.remove();
    var card = buildCard(key, para, { pin: true });
    if (!card) return;
    if (reader.hint) reader.hint.style.display = 'none';
    reader.body.appendChild(card);
  }

  /* Shared handler for clicking a citation or a pill (rail mode). */
  function citeActivated(key, para, el) {
    var wasPinned = reader.pinned;
    if (wasPinned) {
      // a citation click releases the pin and resumes Auto-scroll
      setPinned(false, { noScan: true });
      if (reader.mode === 'auto') {
        showToast('<strong>Auto-scroll resumed.</strong>');
        setTimeout(hideToast, 2600);
      }
    }
    renderRail(key, para);
    setActiveTextCite(el, true);
    syncPills();
    syncPinButton();
  }

  /* ----- Live scanning -------------------------------------------------- */
  var allCites = [];
  function collectCites() {
    // The "Relevant provisions" footer pills are excluded from the
    // auto-scroll updater — only in-text citations drive the reader.
    allCites = Array.prototype.slice.call(document.querySelectorAll('.article .cite[data-statute]'))
      .filter(function (el) { return !el.closest('.ex-cites'); });
  }

  function liveScan(force) {
    if (!railVisible()) return;
    var vh = window.innerHeight;
    var top = 90, bottom = vh * 0.88;
    var visible = [];
    for (var i = 0; i < allCites.length; i++) {
      var r = allCites[i].getBoundingClientRect();
      if (r.bottom >= top && r.top <= bottom) {
        visible.push(allCites[i]);
      } else if (visible.length && r.top > bottom) {
        break;
      }
    }
    var list = [], seen = {};
    visible.forEach(function (el) {
      var key = el.dataset.statute, para = el.dataset.para || '';
      var id = key + '|' + para;
      if (seen[id]) return;
      seen[id] = true;
      list.push({ key: key, para: para, el: el });
    });
    var sig = list.map(function (c) { return c.key + '|' + c.para; }).join(';');
    if (!force && sig === reader._sig) return;
    reader._sig = sig;
    reader.list = list;
    renderPills();
    if (following() && list.length) {
      var first = list[0];
      var changed = !(reader.currentKey === first.key && reader.currentPara === first.para);
      if (changed || force) {
        renderRail(first.key, first.para);
        setActiveTextCite(first.el, changed);
        syncPills();
      }
    }
  }

  var scanScheduled = false;
  function scheduleScan() {
    if (scanScheduled) return;
    scanScheduled = true;
    setTimeout(function () {
      scanScheduled = false;
      liveScan(false);
    }, 200);
  }

  /* ----- Popover (narrow screens) ---------------------------------- */
  function closePopover() {
    if (openPopover) { openPopover.remove(); openPopover = null; }
    if (openScrim) { openScrim.remove(); openScrim = null; }
    if (popoverCite) { popoverCite.classList.remove('active-cite'); popoverCite = null; }
  }

  function showPopover(key, para, citeEl) {
    closePopover();
    var card = buildCard(key, para, { close: true });
    if (!card) return;
    if (citeEl) { citeEl.classList.add('active-cite'); popoverCite = citeEl; }
    openScrim = document.createElement('div');
    openScrim.className = 'statute-scrim';
    openScrim.addEventListener('click', closePopover);
    document.body.appendChild(openScrim);
    openPopover = document.createElement('div');
    openPopover.className = 'statute-popover';
    openPopover.appendChild(card);
    document.body.appendChild(openPopover);
  }

  /* ----- Citation clicks -------------------------------------------- */
  document.addEventListener('click', function (e) {
    var cite = e.target.closest && e.target.closest('.cite[data-statute]');
    if (!cite) return;
    e.preventDefault();
    var key = cite.dataset.statute, para = cite.dataset.para || '';
    if (railVisible() && reader.body) {
      citeActivated(key, para, cite);
    } else {
      if (popoverCite === cite) { closePopover(); return; }
      showPopover(key, para, cite);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopover();
      if (railVisible() && reader.pinned) setPinned(false);
    }
  });

  /* ----- Init -------------------------------------------------------- */
  if (rail) {
    buildRailUI();
    collectCites();
    if (railVisible()) {
      document.addEventListener('scroll', scheduleScan, { passive: true });
      window.addEventListener('resize', scheduleScan);
      liveScan(true);
    }
  }

  /* -------- Deep links ------------------------------------------ */
  function openHashTarget() {
    var id = location.hash.slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    setTimeout(function () {
      el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    }, 80);
  }
  window.addEventListener('hashchange', openHashTarget);
  openHashTarget();
})();
