# 115522.com — phase-wise build prompts

Copy each phase into an AI builder (or hand it to a developer) in order. Each phase is self-contained, states its inputs and its definition of done. Phases 1–8 are already built in this repository; use them to rebuild, extend or audit. Phases 9–12 are the growth roadmap.

**Global constraints (paste at the top of every phase):**
- Static site, vanilla HTML/CSS/JS, hostable on the GitHub Pages free plan. No server, no database, no build step required at runtime (a Node generator in `/build` is allowed).
- Every page shows a top bar: “Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership: web.works/contact”, linked to https://web.works/contact.
- All forms post via `fetch` to the FormSubmit AJAX endpoint. The destination address is the owner’s single inbox; it must **never** appear in HTML, JS, docs or commits in plain text — store it XOR-obfuscated in `assets/js/config.js` and assemble it only at submit time.
- Google AdSense publisher `ca-pub-6620975821265271`: loader in every `<head>`, `ads.txt` at the root, labelled ad slots in content.
- “115522” is used only as a descriptive numeral; include the trademark/copyright disclosure in the footer and on `legal.html`.
- Accessible (WCAG AA contrast, keyboard focus, reduced motion), responsive to 360px, fast (no frameworks).

---

## Phase 1 — Research and positioning
> Research the number 115522 (11·55·22) across numerology (Pythagorean, Chaldean, Vedic), angel-number tradition, Chinese/Japanese/Korean/Arabic number culture, and the economy of premium numbers (vehicle plates in Dubai, Hong Kong and India; VIP phone numbers; numeric .com domains). Visit at least 25 leading sites in numerology, angel numbers, lucky numbers, number facts, fancy-number sales and numeric-domain trading. Output: a sourced brief, a feature matrix, competitor gaps, and one recommended concept with a revenue stack. Save as `project-docs/RESEARCH.md`.
**Done when:** every hard number has a source link; the concept is chosen with reasons.

## Phase 2 — Design system
> Create `assets/css/style.css` for a “departure-board numerals on registry paper” identity: split-flap number tiles as the signature element (dark tiles #23272E/#30353D, warm-white digits #F4F0E2), page background #F2F3EF, ink #1A1D22, signal amber #F2B705 for actions, link blue #2346A0, good/bad tags in green/red. Type: Big Shoulders Display (numerals, headings), Big Shoulders Text (UI), Source Serif 4 (body). Components: header with mini flap logo, sticky nav with mobile menu, hero, page header, tables (`.tbl`), callout (`.note`), perforated “ticket” CTA, score dial (conic gradient), FAQ accordions, ad box, forms with error state, multi-step progress bar, intent cards, donation meter, video cards, footer, mobile sticky CTA, exit modal, toast. No all-caps labels, no generic card grids, one orchestrated motion (the flap flip on load), reduced-motion respected.
**Done when:** a sample page renders correctly at 1366px and 390px.

## Phase 3 — Number engine
> Write `assets/js/engine.js` as a UMD module usable in Node and the browser. `analyze(input)` returns: digits, digit sum, reduction keeping 11/22/33, master numbers present, runs, dominant digits, patterns (repdigit, round, triples, sequence, double pairs AABBCC, repeating block, palindrome, runs, contains 786/520/1314), a 0–100 premium score with an itemised breakdown and grade/tier, an indicative numeric-.com value band by length, Chinese and Japanese luck ratings from homophone tables, Chaldean compound name, Vedic planet, curated facts for notable numbers, and math (prime test, factorisation, divisor count/sum, totient, square/cube/triangular/Fibonacci/perfect/abundant, Roman numeral, binary/hex/octal, number in words). `render(A, opts)` returns the full number-profile HTML (hero tiles, quick facts, meaning, love/career/spiritual table, numerology breakdown, culture table, math table, value scorecard with “how it’s calculated”, concierge ticket, video cards, FAQ, TOC sidebar, ad slots) plus the FAQ array for schema.
**Done when:** `node -e` smoke tests give 115522 → core 7, factors 2·11·59·89, score ≈48, AABBCC.

## Phase 4 — Page shell (Jekyll, native GitHub Pages build)
> Create `_layouts/default.html` (head with canonical, OG/Twitter, JSON-LD from front matter, AdSense loader, fonts; the partner top bar; header/nav; footer with newsletter, link columns and disclosure; mobile CTA; exit-intent lead modal) driven by front matter `title`, `description`, `root` (relative path to site root), `canon`, `ld`, and flags `tools`, `engine`, `noexit`, `noindex`, `ogtype`. Use relative links everywhere so the site works at `/<repo>/` on GitHub Pages and at the custom-domain root. Wrap page bodies in `{% raw %}`. `_config.yml` enables `jekyll-sitemap`; add `robots.txt`, `ads.txt`, `site.webmanifest`.
**Done when:** GitHub Pages builds the repo with no Liquid errors and zero broken internal links.

## Phase 5 — Core content pages
> Home (flap hero + lookup + live “most looked-up” board, four-readings explainer, tools list, concierge quick form, culture matrix, records strip, popular numbers, videos, contest/advertise/donate trio, FAQ), The 115522 story, Number explorer (`number/index.html?n=` renders any number client-side; index of all permanent pages), Angel numbers hub, Numerology systems comparison, Lucky numbers in 7 cultures, Records (plates, phones, domains — each row with a source link), Videos.
**Done when:** each page has a unique title ≤60 chars, meta description ≤158 chars, breadcrumbs and schema.

## Phase 6 — Programmatic number pages
> Use a Jekyll collection `n` (`_n/{n}.html`, empty front matter, permalink `/number/:name/`, default layout `number`). The `number` layout prints a Liquid-computed summary (digit sum, reduction, theme from `_data/digits.yml`) that the engine upgrades to the full profile on load. Create pages for 0–999, 4-digit AABB/ABAB/ABBA and repdigits, 5–6 digit repdigits, sequences, years 2000–2040, AABBCC sequences, the 115522 family and cultural codes (520, 1314, 5201314, 1004, 108, 786…). Each page: engine render + related numbers (family, reversal, reductions), previous/next/random, share button, side lookup, FAQPage + Article + BreadcrumbList JSON-LD.
**Done when:** ~1,350 number URLs are live and listed in `sitemap.xml`.

## Phase 7 — Tools
> `tools/` pages with forms bound in `assets/js/tools.js`: life path (with working, birthday number, personal year), name numerology (Pythagorean expression/soul urge/personality + Chaldean), lucky mobile number (digit total, planet, birth-number and life-path compatibility, Chinese/Japanese luck, VIP tier), vehicle plate (registration digits, all digits, letters+digits Chaldean), premium score (asset type, breakdown, .com band), compatibility (triad method), business names (rank up to 3), clock time (mirror/reversed/repeat/sequence, “use the time now”). Each tool page: explanation, FAQ, WebApplication schema, and a concierge CTA matched to the tool.
**Done when:** every tool returns a result in an automated browser test.

## Phase 8 — Monetisation, lead generation, community, legal
> - **Concierge** (`concierge.html`): 3-step form — intent cards (find VIP number / fancy plate / sell or value / personal reading / business name), intent-specific fields, contact step with WhatsApp and reply preference, consent; URL prefill (`?intent=&n=`); UTM, landing page and referrer captured.
> - **Lead capture everywhere:** quick concierge form on home, inline CTAs and tickets on number/guide/tool pages, exit-intent modal (desktop) / 60-second modal (mobile), newsletter in footer, mobile sticky CTA.
> - **Ads:** AdSense loader + labelled in-content and sidebar slots; house ads fill slots until slot IDs are added in `config.js`.
> - **YouTube:** lite embeds from `config.js` video IDs; curated topic cards otherwise.
> - **Donations** (`donate.html`): goal meter, preset amounts, allocation table (ops / talent / prizes / marketing), supporter levels, pledge form; payment buttons appear when links are added to `config.js`.
> - **Contests** (`contests.html`): Guess the Hammer, My Number Story, Creator Challenge, prizes, entry form, sponsor packages, rules.
> - **Advertise**, **Careers** (7 roles + application form), **About**, **Contact**, **Trademark & copyright**, **Privacy** (AdSense cookie disclosure), **Terms**, **404** (works at any depth).
> - **Guides:** 8 sourced long-form guides (lucky mobile numbers, India fancy plates, UAE plate auctions, Hong Kong marks, numeric domains, why you see repeating numbers, lucky gift amounts, mirror hours) with FAQ + sources.
**Done when:** form submissions reach the inbox (first submission triggers a one-time FormSubmit activation email), no plain-text address exists anywhere in the repo.

---

## Phase 9 — Launch checklist (owner)
> 1. Point 115522.com DNS to GitHub Pages (A records 185.199.108–111.153, `www` CNAME to `webworksa1.github.io`), then add `CNAME` file containing `115522.com` and enable “Enforce HTTPS”.
> 2. Submit the first form yourself and click FormSubmit’s activation link.
> 3. Add the site in AdSense → Sites, wait for review; once approved, create in-content and sidebar units and paste slot IDs into `config.js`.
> 4. Add GA4 ID, YouTube channel, donation links (PayPal/Stripe/Ko-fi/UPI) in `config.js`.
> 5. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Phase 10 — Scale content (months 1–3)
> Expand permanent number pages to all 4-digit numbers that people search (use Search Console queries), add year pages to 2100, add `/lucky-numbers/zodiac/{sign}` and Chinese zodiac pages, add a monthly “auction results” post that updates `records.html`. Add Hindi and Arabic versions of the top 50 pages with `hreflang`.

## Phase 11 — Conversion upgrades
> Shareable result cards (generate an OG image per tool result client-side with canvas), saved birth date (localStorage) to prefill tools, WhatsApp click-to-chat button for India/UAE visitors (configurable number in `config.js`), A/B test concierge headline and intent order, a “daily number” email (birth date + email).

## Phase 12 — Revenue expansion
> Paid PDF numerology report (free summary → paid full report via Stripe/Gumroad link), concierge partner programme for dealers/brokers (lead fee per qualified introduction), sponsored “presented by” slots on top number families, YouTube channel with weekly 60-second explainers embedded on matching number pages, embeddable calculator widget for backlinks.
