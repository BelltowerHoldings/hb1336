# HB 1336-FN website

Static site for HB 1336-FN (Regulated Conditional Deposits, New Hampshire).
Plain HTML/CSS/JS, no build framework. This repository's history lives in
**HB1336_website.bundle** (in the parent "HB 1336" folder); work sessions
clone the bundle, commit, and write it back.

## Rules for Claude work sessions
1. Only ONE chat session edits the website at a time.
2. analysis.html is the single source of truth for analysis content.
   After ANY edit to it, regenerate the Bill Text drill-through cards:
       python3 tools/build_cards.py
3. End every session with: "commit the website changes to the bundle."
4. If a file ever looks truncated, restore from the bundle - never
   rewrite from memory.

## Deployment
See Deployment_Guide.md (Cloudflare Pages). If connecting Cloudflare to a
GitHub copy of this repo instead of drag-and-drop, set the build root to /
with no build command. README.md and tools/ deploying alongside the site
is harmless.

## Restore / inspect
    git clone HB1336_website.bundle hb1336-site
