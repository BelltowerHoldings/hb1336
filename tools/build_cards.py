#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regenerate js/cards.js from analysis.html.

analysis.html is the single source of truth for the analysis content.
The Bill Text page's drill-through cards are generated snapshots of its
sections; run this after ANY edit to analysis.html:

    python3 tools/build_cards.py
"""
import io, re, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ANALYSIS = os.path.join(ROOT, "analysis.html")
CARDS = os.path.join(ROOT, "js", "cards.js")

def extract_card(html, sec_id):
    marker = None
    for cls in ("topic-block", "objection-block"):
        m = '<div class="%s" id="%s">' % (cls, sec_id)
        if m in html:
            marker = m
            break
    if not marker:
        raise SystemExit("section %s not found in analysis.html" % sec_id)
    i = html.find(marker)
    depth = 0
    pos = i
    for mt in re.finditer(r'<div\b|</div>', html[i:]):
        depth += 1 if mt.group(0).startswith('<div') else -1
        if depth == 0:
            pos = i + mt.end()
            break
    inner = html[i + len(marker):pos - len('</div>')]
    inner = re.sub(r'^\s*<h[2-6][^>]*>.*?</h[2-6]>\s*', '', inner, count=1, flags=re.S)
    inner = re.sub(r'<div class="ex-cites">.*?</div>\s*$', '', inner, flags=re.S)
    inner = re.sub(r'<a\b[^>]*>(.*?)</a>', r'\1', inner, flags=re.S)
    return inner.strip()

def main():
    analysis = io.open(ANALYSIS, encoding="utf-8").read()
    cards_src = io.open(CARDS, encoding="utf-8").read()
    old = json.loads(re.search(r'window\.ANALYSIS_CARDS\s*=\s*(\{.*\});?\s*$', cards_src, re.S).group(1))
    new = {k: extract_card(analysis, k) for k in old}
    changed = sorted(k for k in old if new[k] != old[k].strip())
    hdr = ("/* Generated - analysis card contents for the drill-through popup on the Bill Text page.\n"
           "   Regenerate with tools/build_cards.py after editing analysis.html (single source of truth). */\n")
    io.open(CARDS, "w", encoding="utf-8").write(hdr + "window.ANALYSIS_CARDS = " + json.dumps(new, ensure_ascii=False) + ";\n")
    print("cards.js regenerated; %d cards, changed: %s" % (len(new), ", ".join(changed) or "none"))

if __name__ == "__main__":
    main()
