/* 115522 — interactive tools (all calculations run in the browser; nothing is stored) */
(function () {
  "use strict";
  var N = window.N115; if (!N) return;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ROOT = document.body.getAttribute("data-root") || "";
  function toast(m) { (window.toast115 || alert)(m); }
  function track(ev, p) { if (window.gtag) gtag("event", ev, p || {}); }

  var LIFE = {
    1: "The independent starter. You lead, initiate and do best when you own the direction. Watch for impatience and going it alone.",
    2: "The diplomat. Sensitive, cooperative and intuitive — strongest in partnership. Guard against people-pleasing.",
    3: "The communicator. Creative, expressive and social; you grow by making and sharing. Scattered focus is the trap.",
    4: "The builder. Practical, disciplined and loyal; you create lasting systems. Rigidity is the risk.",
    5: "The free spirit. Adaptable, curious and restless; change is your teacher. Commit long enough to see results.",
    6: "The nurturer. Responsible, caring and home-centred; others lean on you. Avoid carrying everyone’s load.",
    7: "The seeker. Analytical, private and spiritual; you need depth and time alone. Isolation and distrust are the shadow.",
    8: "The executive. Ambitious, strategic and money-aware; built for authority. Balance power with integrity and rest.",
    9: "The humanitarian. Compassionate, idealistic and wise; you finish what others start. Learn to let go cleanly.",
    11: "Master number 11 — the intuitive. Inspired, perceptive and often ahead of the room; nerves and self-doubt are the price of the antenna.",
    22: "Master number 22 — the master builder. Big vision with practical follow-through; the pressure to achieve can feel heavy.",
    33: "Master number 33 — the master teacher. Compassion and guidance on a large scale; avoid martyrdom."
  };
  var PY = {}; "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (c, i) { PY[c] = (i % 9) + 1; });
  var VOW = { A: 1, E: 1, I: 1, O: 1, U: 1 };
  var TRIAD = { 1: { g: [1, 5, 7], o: [2, 3, 9] }, 2: { g: [2, 4, 8], o: [3, 6, 9] }, 3: { g: [3, 6, 9], o: [1, 2, 5] }, 4: { g: [2, 4, 8], o: [6, 7] }, 5: { g: [1, 5, 7], o: [3, 9] }, 6: { g: [3, 6, 9], o: [2, 4, 8] }, 7: { g: [1, 5, 7], o: [4] }, 8: { g: [2, 4, 8], o: [6] }, 9: { g: [3, 6, 9], o: [1, 2, 5] } };
  function base(n) { return n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n; }
  function compat(a, b) {
    a = base(a); b = base(b); var t = TRIAD[a];
    if (t.g.indexOf(b) > -1) return ["Natural match", 1];
    if (t.o.indexOf(b) > -1) return ["Workable", 0];
    return ["Growth pairing", -1];
  }
  function tag(r) { return '<span class="tag ' + (r[1] > 0 ? "good" : r[1] < 0 ? "bad" : "mid") + '">' + r[0] + "</span>"; }
  function red(n) { return N.reduce(n, [n]); }
  function steps(r) { return r.steps.join(" → "); }
  function dobParts(v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ""); return m ? { y: +m[1], m: +m[2], d: +m[3] } : null; }
  function lifePath(p) {
    var rm = red(p.m).value, rd = red(p.d).value, ry = red(N.digitSum(String(p.y))).value;
    var t = red(rm + rd + ry);
    return { value: t.value, txt: "Month " + p.m + " → " + rm + ", day " + p.d + " → " + rd + ", year " + p.y + " → " + ry + "; " + rm + " + " + rd + " + " + ry + " = " + steps(t) };
  }
  function birthNum(p) { return N.reducePlain(p.d) || 9; }
  function row(k, v) { return "<tr><th scope=\"row\">" + k + "</th><td>" + v + "</td></tr>"; }
  function table(rows) { return '<div class="tbl"><table><tbody>' + rows.join("") + "</tbody></table></div>"; }
  function show(box, html) { box.innerHTML = html; box.hidden = false; box.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function cta(intent, n, text) { return '<p style="margin-top:14px"><a class="btn" href="' + ROOT + "concierge.html?intent=" + intent + (n ? "&n=" + n : "") + '">' + text + "</a></p>"; }
  function planet(n) { var d = N.reducePlain(n) || 9; return N.VEDIC[d] + " — " + N.VEDIC_KW[d]; }
  function lettersSum(name, map, filter) {
    var t = 0; name.toUpperCase().replace(/[^A-Z]/g, "").split("").forEach(function (c) { if (!filter || filter(c)) t += map[c] || 0; }); return t;
  }
  function bind(id, fn) {
    var f = document.getElementById(id); if (!f) return;
    f.addEventListener("submit", function (e) { e.preventDefault(); if (window.validate115 && !window.validate115(f)) return; fn(f); track("tool_use", { tool: id }); });
  }

  /* life path */
  bind("t-life", function (f) {
    var p = dobParts(f.dob.value); if (!p) return toast("Choose your full date of birth.");
    var lp = lifePath(p), yr = new Date().getFullYear();
    var py = red(red(p.m).value + red(p.d).value + red(N.digitSum(String(yr))).value).value;
    py = N.reducePlain(py) || py;
    show($("#r-life"), '<p class="kicker">Your life path number</p><div class="big">' + lp.value + "</div><p>" + LIFE[lp.value] + "</p>" +
      table([row("How it was calculated", lp.txt), row("Birthday number", birthNum(p) + " — " + N.DIGIT[birthNum(p)].k), row("Personal year " + yr, py + " — " + N.DIGIT[py].k + ": " + N.DIGIT[py].msg), row("Ruling planet (Vedic)", planet(lp.value)), row("Natural matches", TRIAD[base(lp.value)].g.join(", "))]) +
      '<p class="small mute">Numerology is a tradition for reflection, not a scientific prediction.</p>' + cta("reading", "", "Get a full personal reading"));
  });

  /* name numbers */
  bind("t-name", function (f) {
    var nm = f.fullname.value.trim(); if (!/[A-Za-z]/.test(nm)) return toast("Enter a name using Latin letters.");
    var ex = lettersSum(nm, PY), su = lettersSum(nm, PY, function (c) { return VOW[c]; }), pe = lettersSum(nm, PY, function (c) { return !VOW[c]; });
    var ch = lettersSum(nm, N.CHALDEAN_LETTERS), rex = red(ex), rsu = red(su), rpe = red(pe), rch = red(ch);
    show($("#r-name-number"), '<p class="kicker">Expression number</p><div class="big">' + rex.value + "</div><p>" + LIFE[rex.value] + "</p>" +
      table([row("Expression (all letters)", ex + " → " + steps(rex)), row("Soul urge (vowels)", su + " → " + steps(rsu) + " — " + LIFE[rsu.value].split(".")[0]), row("Personality (consonants)", pe + " → " + steps(rpe) + " — " + LIFE[rpe.value].split(".")[0]), row("Chaldean total", ch + " → " + steps(rch) + (N.CHALDEAN[ch] ? " (“" + N.CHALDEAN[ch] + "”)" : ""))]) +
      cta("reading", "", "Ask a numerologist about a name change"));
  });

  /* phone number */
  bind("t-phone", function (f) {
    var s = N.clean(f.phone.value); if (s.length < 4) return toast("Enter at least 4 digits.");
    var A = N.analyze(s), rows = [], p = dobParts(f.dob && f.dob.value);
    rows.push(row("Digit total", A.digits.join(" + ") + " = " + A.digitSum + " → " + A.core));
    rows.push(row("Ruling planet (Vedic)", planet(A.core)));
    rows.push(row("Meaning of " + A.core, N.DIGIT[N.reducePlain(A.core) || 9].k + " — " + N.DIGIT[N.reducePlain(A.core) || 9].msg));
    if (p) { var b = birthNum(p), lp = lifePath(p).value; rows.push(row("Your birth number " + b, tag(compat(b, A.core)))); rows.push(row("Your life path " + lp, tag(compat(lp, A.core)))); }
    rows.push(row("Chinese reading", tag(A.zh) + (A.count[4] ? " — contains " + A.count[4] + "× 4" : "") + (A.count[8] ? " — contains " + A.count[8] + "× 8" : "")));
    rows.push(row("Japanese reading", tag(A.ja)));
    rows.push(row("Pattern", A.patterns.list.join("; ") || "No collectible pattern"));
    rows.push(row("VIP tier", A.premium.tier + " (score " + A.premium.score + "/100)"));
    show($("#r-phone-number"), '<p class="kicker">Your number reduces to</p><div class="big">' + A.core + "</div>" + table(rows) +
      '<p class="small mute">Compatibility uses a common numerology triad method; published charts differ. Treat it as a guide, not a rule.</p>' +
      '<div class="tk-a"><a class="btn" href="' + ROOT + "concierge.html?intent=find&n=" + s + '">Find me a luckier number</a><a class="btn ghost" href="' + ROOT + "concierge.html?intent=sell&n=" + s + '">Sell this number</a></div>');
  });

  /* vehicle number */
  bind("t-plate", function (f) {
    var raw = f.plate.value.toUpperCase().trim(); if (!/\d/.test(raw)) return toast("Enter a plate that contains digits.");
    var groups = raw.match(/\d+/g), last = groups[groups.length - 1], all = groups.join("");
    var A = N.analyze(last), lastSum = N.digitSum(last), allSum = N.digitSum(all);
    var letters = raw.replace(/[^A-Z]/g, ""), chal = lettersSum(letters, N.CHALDEAN_LETTERS) + allSum;
    var p = dobParts(f.dob && f.dob.value), rows = [];
    rows.push(row("Registration number (" + last + ")", last.split("").join(" + ") + " = " + lastSum + " → " + red(lastSum).value));
    rows.push(row("All digits on the plate", all.split("").join(" + ") + " = " + allSum + " → " + red(allSum).value));
    if (letters) rows.push(row("Letters + digits (Chaldean)", chal + " → " + red(chal).value));
    rows.push(row("Ruling planet", planet(red(lastSum).value)));
    if (p) { var lp = lifePath(p).value, b = birthNum(p); rows.push(row("With your birth number " + b, tag(compat(b, red(lastSum).value)))); rows.push(row("With your life path " + lp, tag(compat(lp, red(lastSum).value)))); }
    rows.push(row("Chinese reading of " + last, tag(A.zh)));
    rows.push(row("Fancy-number pattern", A.patterns.list.join("; ") || "None"));
    rows.push(row("Collector score", A.premium.score + "/100 · " + A.premium.label));
    show($("#r-vehicle-number"), '<p class="kicker">Your plate number reduces to</p><div class="big">' + red(lastSum).value + "</div>" + table(rows) +
      '<p class="small mute">Most Indian numerologists use the 4-digit registration number; some include every digit or the letters. We show all three.</p>' +
      '<div class="tk-a"><a class="btn" href="' + ROOT + "concierge.html?intent=plate&n=" + last + '">Help me get a fancy plate</a><a class="btn ghost" href="' + ROOT + 'guides/fancy-vehicle-numbers-india.html">How fancy-number auctions work</a></div>');
  });

  /* premium score */
  bind("t-score", function (f) {
    var s = N.clean(f.number.value); if (!s) return toast("Enter a number.");
    var A = N.analyze(s), type = f.asset.value;
    var band = A.domain.rare ? "<p>" + A.domain.text + "</p>" : "<p>Indicative .com range: <strong>$" + N.fmt(A.domain.lo) + "–$" + N.fmt(A.domain.hi) + "</strong>.</p>";
    show($("#r-premium-score"), '<div class="scorecard"><div class="dial" style="--v:' + A.premium.score + '"><span>' + A.premium.score + '</span><small>of 100</small></div><div><p class="grade">Grade ' + A.premium.grade + " · " + A.premium.label + "</p><p>" + (type === "phone" ? "Carrier-style tier: <strong>" + A.premium.tier + "</strong>." : type === "plate" ? "As a plate: " + (A.L <= 3 ? "short numbers are the most contested at auctions." : "longer numbers sell mainly on pattern.") : "") + "</p>" + (type === "domain" ? band : "") + "</div></div>" +
      table(A.premium.parts.map(function (p) { return row(p[0], (p[1] > 0 ? "+" : "") + p[1]); }).concat([row("<strong>Total</strong>", "<strong>" + A.premium.score + "</strong>")])) +
      "<p>Patterns: " + (A.patterns.list.join("; ") || "none") + '. <a href="' + ROOT + "number/index.html?n=" + s + '#profile">Full profile of ' + s + "</a>.</p>" +
      '<div class="tk-a"><a class="btn" href="' + ROOT + "concierge.html?intent=sell&n=" + s + '">Get an expert valuation</a><a class="btn ghost" href="' + ROOT + "concierge.html?intent=find&n=" + s + '">Find numbers like this</a></div>');
  });

  /* compatibility */
  bind("t-compat", function (f) {
    var a = dobParts(f.dob1.value), b = dobParts(f.dob2.value); if (!a || !b) return toast("Enter both dates of birth.");
    var la = lifePath(a).value, lb = lifePath(b).value, c = compat(la, lb), n1 = f.n1.value || "Person 1", n2 = f.n2.value || "Person 2";
    var note = c[1] > 0 ? "You share an elemental group in the triad system, which numerologists read as easy rapport and similar pace." : c[1] < 0 ? "Different rhythms. Numerologists read this pairing as a growth relationship — friction that teaches, if both adapt." : "Compatible with effort: some shared values, some different instincts.";
    show($("#r-compatibility"), '<p class="kicker">' + N.esc(n1) + " (" + la + ") and " + N.esc(n2) + " (" + lb + ")</p><div class=\"big\">" + c[0] + "</div><p>" + note + "</p>" +
      table([row(N.esc(n1) + " — life path " + la, LIFE[la]), row(N.esc(n2) + " — life path " + lb, LIFE[lb])]) + cta("reading", "", "Book a compatibility reading"));
  });

  /* business names */
  bind("t-biz", function (f) {
    var names = $$('input[name^="biz"]', f).map(function (i) { return i.value.trim(); }).filter(function (x) { return /[A-Za-z0-9]/.test(x); });
    if (!names.length) return toast("Enter at least one business name.");
    var FAV = { 1: 3, 3: 2, 5: 3, 6: 2, 8: 3, 9: 1, 2: 0, 4: -1, 7: 0, 11: 2, 22: 3, 33: 1 };
    var res = names.map(function (nm) {
      var py = lettersSum(nm, PY) + N.digitSum(nm), ch = lettersSum(nm, N.CHALDEAN_LETTERS) + N.digitSum(nm), rp = red(py).value, rc = red(ch).value;
      return { nm: nm, py: py, ch: ch, rp: rp, rc: rc, s: (FAV[rp] || 0) + (FAV[rc] || 0) };
    }).sort(function (x, y) { return y.s - x.s; });
    show($("#r-business-name"), '<p class="kicker">Ranked for commerce</p>' + '<div class="tbl"><table><thead><tr><th>Name</th><th>Pythagorean</th><th>Chaldean</th><th>Commerce fit</th></tr></thead><tbody>' +
      res.map(function (r, i) { return "<tr><td><strong>" + N.esc(r.nm) + "</strong>" + (i === 0 && res.length > 1 ? " — top pick" : "") + "</td><td>" + r.py + " → " + r.rp + "</td><td>" + r.ch + " → " + r.rc + "</td><td>" + tag(r.s >= 4 ? ["Strong", 1] : r.s >= 2 ? ["Good", 0] : ["Weak", -1]) + "</td></tr>"; }).join("") +
      "</tbody></table></div><p class=\"small mute\">Traditional business numerology favours 1, 3, 5, 6 and 8 (and master 22) for trade, and is cautious about 4 and 7.</p>" + cta("business", "", "Get a business-name report"));
  });

  /* clock time */
  function clockRead(v) {
    var m = /^(\d{2}):(\d{2})/.exec(v || ""); if (!m) return null;
    var hh = m[1], mm = m[2], s = hh + mm, types = [];
    if (hh === mm) types.push("Mirror hour (" + hh + ":" + mm + ")");
    if (s === s.split("").reverse().join("") && hh !== mm) types.push("Reversed hour — palindrome (" + hh + ":" + mm + ")");
    if (/^(\d)\1\1\1$/.test(s)) types.push("Quadruple repeat");
    else if (/(\d)\1\1/.test(s)) types.push("Triple digit");
    if ("0123456789".indexOf(s) > -1 || "9876543210".indexOf(s) > -1) types.push("Sequence");
    return { s: s, label: hh + ":" + mm, types: types };
  }
  bind("t-clock", function (f) {
    var c = clockRead(f.time.value); if (!c) return toast("Pick a time.");
    var A = N.analyze(c.s.replace(/^0+(?=\d)/, "") || "0"), top = A.dominant[0];
    show($("#r-clock-time"), '<p class="kicker">' + (c.types.length ? c.types.join(" · ") : "An ordinary time") + "</p>" + N.tiles(c.s) +
      "<p><strong>" + c.label + "</strong> — " + N.DIGIT[top].k + ": " + N.DIGIT[top].msg + ".</p>" +
      table([row("Digits add up to", N.digitSum(c.s) + " → " + red(N.digitSum(c.s)).value), row("Why you noticed it", c.types.length ? "Repeating and mirrored times stand out to the brain; once you look for them, you see them more (the frequency illusion)." : "Not a special pattern — but if it keeps appearing, it may simply be when you check your phone.")]) +
      '<p><a href="' + ROOT + "number/index.html?n=" + c.s + '#profile">Full number profile of ' + c.s + '</a> · <a href="' + ROOT + 'guides/mirror-hours-explained.html">Mirror hours explained</a></p>');
  });
  var tn = document.getElementById("t-now"); if (tn) tn.addEventListener("click", function () { var d = new Date(), t = $("#t-clock input[name=time]"); t.value = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); $("#t-clock").requestSubmit(); });

  /* number profile: permanent pages (data-n) and the explorer (?n=) */
  var ex = document.getElementById("profile");
  if (ex) {
    var dn = ex.getAttribute("data-n");
    var qn = N.clean(dn || new URLSearchParams(location.search).get("n") || "");
    var statics = (ex.getAttribute("data-static") || "").split(",");
    function href(x) { return statics.indexOf(x) > -1 || (x.length <= 3 && (x === "0" || x[0] !== "0")) ? ROOT + "number/" + x + "/index.html" : ROOT + "number/index.html?n=" + x + "#profile"; }
    if (qn) {
      var A = N.analyze(qn), fam = [], add = function (x) { x = String(x); if (x && x !== A.s && fam.indexOf(x) < 0) fam.push(x); };
      if (A.patterns.repdigit || A.L === 1) for (var k = 1; k <= 6; k++) add(A.s[0].repeat(k));
      var rv = A.s.split("").reverse().join(""); if (rv[0] !== "0") add(rv);
      add(A.digitSum); add(A.core); A.masters.forEach(add);
      if (A.L >= 4) { add(A.s.slice(0, 2)); add(A.s.slice(-2)); }
      if (!A.leadingZero) { if (A.n > 0) add(A.n - 1); add(A.n + 1); }
      var after = "<h2>Related numbers</h2><div class=\"numlinks\">" + fam.slice(0, 14).map(function (x) { return '<a href="' + href(x) + '">' + x + "</a>"; }).join("") + "</div>" +
        '<p style="margin-top:18px"><button class="btn sm ghost" type="button" data-share>Share this page</button>' + (A.s === "115522" ? ' · <a href="' + ROOT + 'the-115522-story.html">Read the 115522 story</a>' : "") + "</p>";
      var crumbs = '<p class="crumbs"><a href="' + ROOT + 'index.html">Home</a> / <a href="' + ROOT + 'number/index.html">Numbers</a> / ' + A.s + "</p>";
      var r = N.render(A, { root: ROOT, crumbs: crumbs, after: after });
      ex.innerHTML = (!dn && statics.indexOf(A.s) > -1 ? '<p class="wrap note" style="margin-top:16px">This number has a permanent page: <a href="' + ROOT + "number/" + A.s + '/index.html">115522.com/number/' + A.s + "</a></p>" : "") + r.html;
      if (!dn) document.title = "Number " + A.s + ": meaning, math, culture and value | 115522";
      var hide = document.getElementById("explorer-index"); if (hide) hide.hidden = true;
    }
  }
})();
