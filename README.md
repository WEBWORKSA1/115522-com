# 115522.com — Number intelligence

Type any number. See what it means, what it’s worth, and where it’s lucky.

A static, GitHub Pages–ready site combining angel-number and numerology meaning, math facts, cultural luck (Chinese, Japanese, Korean, Vedic, Arabic, Western) and premium-number value — with a number concierge for buying and selling VIP phone numbers, plates and numeric domains.

## What’s inside

| Area | Files |
|---|---|
| Home, story, explorer, angel numbers, numerology, cultures, records, videos | `index.html`, `the-115522-story.html`, `number/index.html`, `angel-numbers.html`, `numerology.html`, `lucky-numbers.html`, `records.html`, `videos.html` |
| 1,359 permanent number pages | `_n/{n}.html` stubs → `/number/{n}/` via the `number` layout |
| 8 tools | `tools/*.html` |
| 8 sourced guides | `guides/*.html` |
| Lead generation | `concierge.html` (3-step), quick forms, exit modal, newsletter |
| Monetisation & community | `donate.html`, `contests.html`, `advertise.html`, `careers.html` |
| Legal | `legal.html` (trademark & copyright), `privacy.html`, `terms.html` |
| Engine & UI | `assets/js/engine.js`, `assets/js/tools.js`, `assets/js/app.js`, `assets/css/style.css` |
| Settings | `assets/js/config.js` — AdSense slots, YouTube IDs, donation links, GA4 |
| Layouts & config | `_layouts/default.html` (header, partner bar, footer, modal), `_layouts/number.html`, `_config.yml`, `_data/digits.yml` |
| Docs | `project-docs/RESEARCH.md`, `project-docs/BUILD-PROMPTS.md` |

## How it builds

Plain Jekyll, built natively by GitHub Pages on the free plan — no Actions, no plugins beyond `jekyll-sitemap`.

- Every page shares `_layouts/default.html`, so the partner bar, navigation, footer, disclosure and lead modal are edited in one place.
- Page bodies are wrapped in `{% raw %}` so Liquid never touches them.
- To add a permanent number page, add an empty-front-matter file `_n/<number>.html` (`---` newline `---`).
- Edit `assets/js/config.js` for AdSense slot IDs, YouTube videos, donation links and GA4.

## Hosting

GitHub Pages (free): Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` (or `main`) / root. For the custom domain, add a `CNAME` file containing `115522.com` after DNS points to GitHub Pages.

## Notes

- Forms use FormSubmit; the destination is stored obfuscated in `config.js`. The first submission triggers a one-time activation email to the owner’s inbox.
- Website, domain, sponsorship, advertising and partnership enquiries: https://web.works/contact
- “115522” is used as a descriptive numeral; see `legal.html`.
