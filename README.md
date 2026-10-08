# 115522.com — Number intelligence

Type any number. See what it means, what it’s worth, and where it’s lucky.

A static, GitHub Pages–ready site combining angel-number and numerology meaning, math facts, cultural luck (Chinese, Japanese, Korean, Vedic, Arabic, Western) and premium-number value — with a number concierge for buying and selling VIP phone numbers, plates and numeric domains.

## What’s inside

| Area | Files |
|---|---|
| Home, story, explorer, angel numbers, numerology, cultures, records, videos | `index.html`, `the-115522-story.html`, `number/index.html`, `angel-numbers.html`, `numerology.html`, `lucky-numbers.html`, `records.html`, `videos.html` |
| 1,359 permanent number pages | `number/{n}/index.html` |
| 8 tools | `tools/*.html` |
| 8 sourced guides | `guides/*.html` |
| Lead generation | `concierge.html` (3-step), quick forms, exit modal, newsletter |
| Monetisation & community | `donate.html`, `contests.html`, `advertise.html`, `careers.html` |
| Legal | `legal.html` (trademark & copyright), `privacy.html`, `terms.html` |
| Engine & UI | `assets/js/engine.js`, `assets/js/tools.js`, `assets/js/app.js`, `assets/css/style.css` |
| Settings | `assets/js/config.js` — AdSense slots, YouTube IDs, donation links, GA4 |
| Generator | `build/` — run `node build/build.mjs` after editing content |
| Docs | `project-docs/RESEARCH.md`, `project-docs/BUILD-PROMPTS.md` |

## Edit and rebuild

```bash
node build/build.mjs   # regenerates every page, sitemap.xml, robots.txt, ads.txt
```

Only edit `assets/js/config.js` for ads, videos, donations and analytics — no rebuild needed for those.

## Hosting

GitHub Pages (free): Settings → Pages → Deploy from branch → `main` / root. For the custom domain, add a `CNAME` file containing `115522.com` after DNS points to GitHub Pages.

## Notes

- Forms use FormSubmit; the destination is stored obfuscated in `config.js`. The first submission triggers a one-time activation email to the owner’s inbox.
- Website, domain, sponsorship, advertising and partnership enquiries: https://web.works/contact
- “115522” is used as a descriptive numeral; see `legal.html`.
