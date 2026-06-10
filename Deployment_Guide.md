# Deploying the HB 1336 Site to Cloudflare
Goal: host the `Website` folder on Cloudflare Pages and serve it at **hb1336.belltowerpm.com**. No build step is needed — the site is plain HTML/CSS/JS and all paths are relative, so it works as-is. Total time: ~10 minutes plus DNS/SSL propagation.

## Part 1 — Upload the site (Cloudflare Pages, drag and drop)

1. Log in at **dash.cloudflare.com**.
2. In the left sidebar, go to **Workers & Pages**.
3. Click **Create application** → switch to the **Pages** tab → choose **Upload assets** (the drag-and-drop option, sometimes labeled "Get started" under Direct Upload).
4. **Project name:** enter `hb1336` (this becomes your free preview URL, `hb1336.pages.dev`; if the name is taken globally, use `hb1336-belltower`).
5. Drag the **`Website` folder itself** (from `...\HB 1336\Website`) into the upload box. Cloudflare uses the folder's *contents* as the site root.
   - Do NOT drag the parent "HB 1336" folder — that would nest everything under /site/ and break the URLs.
6. Click **Deploy site**. Upload takes a minute or two (the whole site is only a few MB; well under the 25 MB-per-file limit).

## Part 2 — Test on the preview URL

7. Open `https://hb1336.pages.dev` (or whatever project name you chose). The Overview page should load immediately — if you get a 404 or a bare file listing, the folder nesting in step 5 was off; redeploy.
8. Quick click-through: each nav item, one statutory citation (Statute Reader), the capital model (sliders recompute), and one download from Resources.

## Part 3 — Point hb1336.belltowerpm.com at it

9. In **Workers & Pages**, open your new project → **Custom domains** tab → **Set up a custom domain**.
10. Enter `hb1336.belltowerpm.com` and continue.
11. What happens next depends on where belltowerpm.com's DNS lives:
    - **If belltowerpm.com is already a zone in this Cloudflare account** (i.e., it appears on your dashboard home and its nameservers point to Cloudflare): Cloudflare creates the CNAME record for you automatically — just confirm/Activate. Live within minutes.
    - **If its DNS is hosted elsewhere** (registrar, another provider): subdomains don't require moving the domain to Cloudflare. Add this record at your DNS provider, then return to the Custom domains tab and let it validate:
      - Type: **CNAME**
      - Name: **hb1336**
      - Target: **hb1336.pages.dev** (your project's pages.dev hostname)
12. SSL/HTTPS is automatic. Certificate issuance is usually minutes, occasionally up to an hour. The site will serve at `https://hb1336.belltowerpm.com`.

## Part 4 — Updating the site later

- **Workers & Pages** → your project → **Create new deployment** → drag the `site` folder again → Deploy. Each deployment is versioned; the **Deployments** tab lets you roll back instantly to any previous version.

## Notes

- The `hb1336.pages.dev` preview URL stays live alongside the custom domain. That's normal and harmless; share the belltowerpm.com address.
- DNS propagation for the new CNAME is typically fast (minutes) but can take a few hours in the worst case — don't promise the link in an email until you've loaded it yourself.
- If you later want the bill-text PDFs or analysis updated, just edit the files in the `site` folder locally and re-deploy (Part 4) — there's no syncing; Cloudflare serves whatever you last uploaded.
