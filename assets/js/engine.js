/* 115522 number engine — one source of truth for static pages (Node build) and live lookups (browser). */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.N115 = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---------------- reference data ---------------- */
  var DIGIT = {
    0: { k: "potential", msg: "every cycle can restart from zero — a nudge to choose your next direction deliberately", love: "openness to starting fresh", work: "options are open; pick one and commit", spirit: "wholeness and the space before something begins" },
    1: { k: "beginnings", msg: "your intentions are setting direction, so start the thing you keep postponing", love: "stay yourself inside the relationship", work: "initiative, launching, leading", spirit: "self-trust and new starts" },
    2: { k: "balance", msg: "patience and cooperation will do more than force right now", love: "harmony, listening, partnership", work: "collaboration, negotiation, diplomacy", spirit: "duality and trust in timing" },
    3: { k: "expression", msg: "speak, create and share — growth comes through communication", love: "playfulness and honest conversation", work: "creative work, teaching, marketing", spirit: "joy and creative flow" },
    4: { k: "foundation", msg: "build steadily; structure and discipline are what make results stick", love: "loyalty and stability", work: "systems, process, craftsmanship", spirit: "groundedness and protection" },
    5: { k: "change", msg: "change and freedom are arriving, so stay flexible and curious", love: "excitement, adjustment, room to breathe", work: "travel, sales, pivots, new markets", spirit: "liberation and adaptability" },
    6: { k: "care", msg: "home, responsibility and service need your attention", love: "nurture and commitment", work: "service, health, family business", spirit: "compassion and responsibility" },
    7: { k: "insight", msg: "slow down, study and trust what you already know inside", love: "depth over speed", work: "research, analysis, specialist knowledge", spirit: "inner wisdom and reflection" },
    8: { k: "abundance", msg: "money, power and results are in play — handle them with integrity", love: "shared ambition and fairness", work: "finance, leadership, deal-making", spirit: "cause and effect, karma, mastery" },
    9: { k: "completion", msg: "a chapter is closing; release what is done and serve something larger", love: "compassion and letting go", work: "humanitarian work, finishing projects", spirit: "endings that make room for renewal" }
  };
  var MASTER = {
    11: { k: "the intuitive", msg: "a master number of heightened intuition and inspiration — powerful, but prone to nervous overthinking" },
    22: { k: "the master builder", msg: "a master number that turns big visions into practical, lasting structures" },
    33: { k: "the master teacher", msg: "a master number of compassion, guidance and selfless service" }
  };
  /* Chinese homophones (Mandarin). Ratings: +2 very good … -2 avoided */
  var ZH = {
    0: { h: "零", p: "líng", s: "zero; sometimes linked to 灵 (spirit) — neutral", r: 0 },
    1: { h: "一 / 幺", p: "yī / yāo", s: "unity; read “yāo” in phone numbers, which can sound like 要 (want)", r: 0 },
    2: { h: "二", p: "èr", s: "pairs and harmony — “good things come in twos”; used as 爱 (love) in 520", r: 1 },
    3: { h: "三", p: "sān", s: "close to 生 (life/birth) — mildly positive", r: 0.5 },
    4: { h: "四", p: "sì", s: "sounds like 死 (death) — widely avoided in phones, floors and plates", r: -2 },
    5: { h: "五", p: "wǔ", s: "five elements and blessings; sounds like 我 (I) or 无 (not) — context-dependent", r: 0 },
    6: { h: "六", p: "liù", s: "sounds like 溜 (smooth) — things go smoothly", r: 1 },
    7: { h: "七", p: "qī", s: "can sound like 气 (vital energy) or 妻 (wife); seventh month is “ghost month” — mixed", r: -0.5 },
    8: { h: "八", p: "bā", s: "close to 发 (prosper) — the most prized digit", r: 2 },
    9: { h: "九", p: "jiǔ", s: "sounds like 久 (long-lasting) — popular for weddings", r: 1 }
  };
  /* Japanese goroawase readings */
  var JA = {
    0: { rd: "rei / maru / o", s: "neutral", r: 0 }, 1: { rd: "ichi / i / hi", s: "neutral; “ii” can mean good", r: 0.3 },
    2: { rd: "ni / fu / tsu", s: "neutral; “fu” can echo 夫婦 (couple)", r: 0 }, 3: { rd: "san / mi / sa", s: "neutral", r: 0 },
    4: { rd: "yon / shi / yo", s: "“shi” sounds like 死 (death) — avoided", r: -2 }, 5: { rd: "go / ko / itsu", s: "neutral", r: 0 },
    6: { rd: "roku / mu / ro", s: "neutral", r: 0 }, 7: { rd: "nana / shichi / na", s: "lucky in modern usage", r: 1 },
    8: { rd: "hachi / ya / ha", s: "lucky — 八 widens like a fan (suehirogari)", r: 1.5 }, 9: { rd: "kyū / ku", s: "“ku” sounds like 苦 (suffering) — avoided", r: -1.5 }
  };
  var KO = {
    0: "neutral", 1: "neutral", 2: "“i” — used in texting puns", 3: "neutral; 3 is broadly lucky", 4: "“sa” sounds like 死 (death) — floors often labelled F",
    5: "neutral", 6: "neutral", 7: "lucky, as in the West", 8: "neutral; 8282 reads as “hurry”", 9: "neutral"
  };
  var VEDIC = { 1: "Sun (Surya)", 2: "Moon (Chandra)", 3: "Jupiter (Guru)", 4: "Rahu", 5: "Mercury (Budh)", 6: "Venus (Shukra)", 7: "Ketu", 8: "Saturn (Shani)", 9: "Mars (Mangal)" };
  var VEDIC_KW = { 1: "authority, confidence", 2: "emotion, intuition", 3: "wisdom, expansion", 4: "disruption, innovation", 5: "commerce, communication", 6: "beauty, comfort", 7: "detachment, spirituality", 8: "discipline, delay, endurance", 9: "energy, courage" };
  /* Chaldean compound numbers (selected classic names) */
  var CHALDEAN = {
    10: "Wheel of Fortune", 11: "Lion Muzzled — hidden dangers, trials", 12: "The Sacrifice", 13: "Regeneration — change of plans", 14: "Movement and combination with people", 15: "The Magician — magnetism", 16: "The Shattered Citadel — sudden reversals that force a rebuild",
    17: "Star of the Magi — peace and love", 18: "Materialism versus spirit", 19: "Prince of Heaven — success", 20: "The Awakening", 21: "The Crown of the Magi — victory", 22: "The Fool — illusion, warning", 23: "Royal Star of the Lion — help from superiors",
    24: "Love and money through others", 25: "Strength through experience", 26: "Partnerships — caution", 27: "The Sceptre — authority", 28: "Trust placed in others", 29: "Grace under pressure", 30: "Thoughtful deduction", 31: "Isolation — self-contained",
    32: "Communication with the masses", 33: "Fortunate like 24", 34: "As 25", 35: "As 26", 36: "As 27", 37: "Good friendships and love", 38: "As 29", 39: "As 30", 40: "As 31", 41: "As 32", 42: "As 24", 43: "Revolution, upheaval", 44: "As 26", 45: "As 27", 46: "As 37", 47: "As 29", 48: "As 30", 49: "As 31", 50: "As 32", 51: "The warrior — sudden advancement", 52: "As 43"
  };
  var CHALDEAN_LETTERS = { A: 1, I: 1, J: 1, Q: 1, Y: 1, B: 2, K: 2, R: 2, C: 3, G: 3, L: 3, S: 3, D: 4, M: 4, T: 4, E: 5, H: 5, N: 5, X: 5, U: 6, V: 6, W: 6, O: 7, Z: 7, F: 8, P: 8 };

  var CURATED = {
    "0": "Zero as a number (not just a placeholder) was formalised by the Indian mathematician Brahmagupta in 628 CE.",
    "1": "The only positive integer that is neither prime nor composite; the multiplicative identity.",
    "3": "“The third time’s a charm” — three is a near-universal lucky number in Western and East Asian folklore.",
    "4": "Avoided across China, Japan, Korea and Vietnam because it sounds like the word for death; many buildings skip the 4th floor.",
    "7": "Repeatedly voted the world’s favourite number in public surveys; seven days, seven seas, seven wonders.",
    "8": "The luckiest digit in Chinese culture — the 2008 Beijing Olympics opened on 08-08-08 at 8:08 pm.",
    "9": "Sounds like “long-lasting” in Mandarin; in Japan it is avoided because it can sound like “suffering”.",
    "11": "A master number in numerology; 11 November is Singles’ Day in China, now the world’s largest shopping event.",
    "12": "Twelve months, twelve zodiac signs (Western and Chinese), twelve hours on a clock face.",
    "13": "Fear of 13 has a name — triskaidekaphobia; many Western buildings skip the 13th floor.",
    "17": "Considered unlucky in Italy because the Roman numeral XVII can be rearranged into VIXI, “I have lived”.",
    "22": "The master builder of numerology; also 11/22 is Good Couples Day in Japan (ii fūfu).",
    "33": "The highest of the three master numbers in numerology — the master teacher.",
    "42": "Pop-culture’s “answer to the ultimate question of life, the universe and everything”.",
    "88": "Doubly prosperous in Chinese; also used as “bye-bye” in Chinese internet slang.",
    "100": "A perfect score in many cultures; the century and the basis of percentages.",
    "101": "In India, gifts of ₹101 (not ₹100) are traditional — the extra one means the blessing never ends at zero.",
    "108": "Sacred in Hinduism, Buddhism and Jainism — mala prayer beads have 108 beads.",
    "111": "A popular angel number for alignment of thoughts; also cricket’s “Nelson”, a score superstitiously feared in England.",
    "123": "The simplest ascending sequence — read as a sign of steady, step-by-step progress.",
    "222": "One of the most searched angel numbers; tied to balance, partnership and trust.",
    "333": "Associated with encouragement and creative growth in angel-number tradition.",
    "365": "Days in a common year; 365.2422 days is the length of the tropical year.",
    "404": "The web’s “page not found” status code.",
    "444": "Read as protection and stability in angel-number tradition — but strongly avoided in Chinese and Japanese culture.",
    "501": "A standard Indian shagun gift amount — the trailing 1 symbolises continuity.",
    "520": "Chinese internet slang for “I love you” (wǔ èr líng ≈ wǒ ài nǐ); 20 May is an unofficial Valentine’s Day.",
    "555": "In Chinese online chat, 555 imitates crying (wū wū wū); in angel numbers it signals major change.",
    "666": "The “number of the beast” in Western tradition, but in Chinese 666 means “smooth” and is praise for skill.",
    "777": "Jackpot in slot machines; seen as very lucky in the West.",
    "786": "The Abjad numerical value of the Bismillah — widely revered in South Asian Muslim communities.",
    "888": "Triple prosperity in Chinese culture; also a common angel number for abundance.",
    "911": "The emergency number in the US and Canada.",
    "999": "The emergency number in the UK; in angel numbers, completion of a cycle.",
    "1000": "A millennium; the root of the prefix kilo-.",
    "1001": "A traditional Indian gift amount; also the 1,001 nights of the Arabian tales.",
    "1004": "Korean slang for “angel” (cheon-sa ≈ thousand-four).",
    "1111": "The best-known repeating number; 11:11 is the most talked-about mirror hour.",
    "1212": "A mirror-pattern number often read as a call to stay positive and focused.",
    "1234": "The classic weak PIN; in angel tradition, progress one step at a time.",
    "1314": "Chinese slang for “for a lifetime” (yī sān yī sì ≈ yīshēng yīshì); paired with 520.",
    "1155": "Combines 11 (intuition) and 55 (change) — read as following your instincts through a big transition.",
    "2026": "Reduces to 1 (2+0+2+6=10, 1+0=1) — a “universal year 1” of beginnings in numerology.",
    "7777": "Four sevens — luck in the West and “spiritual awakening” in angel-number circles.",
    "8888": "A Chinese phone number of all eights once sold to Sichuan Airlines for about US$280,000.",
    "112233": "A pure ascending pairs pattern — the textbook AABBCC number.",
    "115522": "Our namesake: two master numbers (11 and 22) bracketing 55, the number of change — intuition, then change, then building."
  };

  /* ---------------- helpers ---------------- */
  function clean(s) { return String(s == null ? "" : s).replace(/[^0-9]/g, ""); }
  function digitsOf(s) { return s.split("").map(Number); }
  function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
  function reduceKeepMaster(n, steps) {
    steps = steps || [n];
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = sum(digitsOf(String(n))); steps.push(n);
    }
    return { value: n, steps: steps };
  }
  function reducePlain(n) { while (n > 9) n = sum(digitsOf(String(n))); return n; }
  function isPrime(n) {
    if (n < 2 || !isFinite(n)) return false; if (n < 4) return true; if (n % 2 === 0 || n % 3 === 0) return false;
    for (var i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false; return true;
  }
  function factorize(n) {
    var f = [], d = 2; if (n < 2) return f;
    while (d * d <= n) { while (n % d === 0) { f.push(d); n = n / d; } d += d === 2 ? 1 : 2; }
    if (n > 1) f.push(n); return f;
  }
  function groupFactors(f) {
    var m = {}; f.forEach(function (p) { m[p] = (m[p] || 0) + 1; });
    return Object.keys(m).map(Number).sort(function (a, b) { return a - b; }).map(function (p) { return { p: p, e: m[p] }; });
  }
  function divisorStats(g) {
    var count = 1, sig = 1, phi = 1;
    g.forEach(function (x) { count *= x.e + 1; sig *= (Math.pow(x.p, x.e + 1) - 1) / (x.p - 1); phi *= Math.pow(x.p, x.e - 1) * (x.p - 1); });
    return { count: count, sigma: sig, phi: phi };
  }
  function roman(n) {
    if (n < 1 || n > 3999) return null;
    var v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], s = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"], o = "";
    for (var i = 0; i < v.length; i++) while (n >= v[i]) { o += s[i]; n -= v[i]; } return o;
  }
  function isSquare(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function isCube(n) { var r = Math.round(Math.cbrt(n)); return r * r * r === n; }
  function isTriangular(n) { return isSquare(8 * n + 1); }
  function isFib(n) { return n >= 0 && (isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4)); }
  function fmt(n) { return Number(n).toLocaleString("en-US"); }

  var WORDS_1 = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  var WORDS_10 = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function words(n) {
    if (n < 20) return WORDS_1[n];
    if (n < 100) return WORDS_10[Math.floor(n / 10)] + (n % 10 ? "-" + WORDS_1[n % 10] : "");
    if (n < 1000) return WORDS_1[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + words(n % 100) : "");
    var units = [[1e12, "trillion"], [1e9, "billion"], [1e6, "million"], [1e3, "thousand"]];
    for (var i = 0; i < units.length; i++) if (n >= units[i][0]) {
      var q = Math.floor(n / units[i][0]), r = n % units[i][0];
      return words(q) + " " + units[i][1] + (r ? (r < 100 ? " and " : " ") + words(r) : "");
    }
    return String(n);
  }

  /* ---------------- patterns & premium score ---------------- */
  function patterns(s) {
    var L = s.length, d = digitsOf(s), uniq = {}; d.forEach(function (x) { uniq[x] = 1; });
    var distinct = Object.keys(uniq).length, p = { list: [] };
    var rev = s.split("").reverse().join("");
    var run = 1, maxRun = 1; for (var i = 1; i < L; i++) { run = s[i] === s[i - 1] ? run + 1 : 1; if (run > maxRun) maxRun = run; }
    p.maxRun = maxRun; p.distinct = distinct;
    if (L >= 2 && distinct === 1) { p.repdigit = true; p.list.push("Repdigit (every digit the same)"); }
    if (L >= 3) {
      var asc = true, desc = true;
      for (i = 1; i < L; i++) { if (d[i] !== d[i - 1] + 1) asc = false; if (d[i] !== d[i - 1] - 1) desc = false; }
      if (asc) { p.seq = "ascending"; p.list.push("Ascending sequence"); }
      if (desc) { p.seq = "descending"; p.list.push("Descending sequence"); }
      if (s === rev && !p.repdigit) { p.palindrome = true; p.list.push("Palindrome (reads the same backwards)"); }
    }
    if (L >= 4 && L % 2 === 0 && !p.repdigit) {
      var pairs = true; for (i = 0; i < L; i += 2) if (s[i] !== s[i + 1]) pairs = false;
      if (pairs) {
        p.pairs = true; var label = "";
        for (i = 0; i < L / 2; i++) label += String.fromCharCode(65 + i) + String.fromCharCode(65 + i);
        p.list.push("Double pairs (" + label + ")");
        var pd = []; for (i = 0; i < L; i += 2) pd.push(d[i]);
        var pa = true, pde = true; for (i = 1; i < pd.length; i++) { if (pd[i] !== pd[i - 1] + 1) pa = false; if (pd[i] !== pd[i - 1] - 1) pde = false; }
        if (pa || pde) { p.pairSeq = true; p.list.push("Pairs in sequence"); }
      }
    }
    if (L >= 6 && L % 3 === 0 && !p.repdigit) {
      var tri = true; for (i = 0; i < L; i += 3) if (!(s[i] === s[i + 1] && s[i] === s[i + 2])) tri = false;
      if (tri) { p.triples = true; p.list.push("Triples (AAABBB)"); }
    }
    if (!p.repdigit) {
      for (var b = 2; b <= L / 2; b++) if (L % b === 0) {
        var blk = s.slice(0, b), ok = true; for (i = b; i < L; i += b) if (s.slice(i, i + b) !== blk) ok = false;
        if (ok) { p.repeatBlock = blk; p.list.push("Repeating block (" + blk + " × " + L / b + ")"); break; }
      }
    }
    if (/^[1-9]0+$/.test(s) && L >= 2) { p.round = true; p.list.push("Round number"); }
    if (maxRun >= 3 && !p.repdigit && !p.triples && !p.round) p.list.push("Run of " + maxRun + " identical digits");
    if (/786/.test(s)) p.list.push("Contains 786");
    if (/88$/.test(s) && !p.repdigit) p.list.push("Ends in 88");
    if (/520|1314/.test(s) && L > 3) p.list.push("Contains a Chinese love number (520 / 1314)");
    return p;
  }

  function premium(s) {
    var L = s.length, d = digitsOf(s), p = patterns(s), parts = [];
    var baseT = { 1: 40, 2: 36, 3: 32, 4: 27, 5: 21, 6: 16, 7: 12, 8: 9, 9: 7, 10: 6 };
    var base = baseT[L] || 5; parts.push(["Length (" + L + " digits)", base]);
    var pat = 0, why = "";
    if (p.repdigit) { pat = 45; why = "repdigit"; }
    else if (p.round) { pat = 30; why = "round number"; }
    else if (p.triples) { pat = 30; why = "triples"; }
    else if (p.seq) { pat = 28; why = p.seq + " sequence"; }
    else if (p.pairs) { pat = p.pairSeq ? 30 : 26; why = p.pairSeq ? "pairs in sequence" : "double pairs"; }
    else if (p.repeatBlock) { pat = 22; why = "repeating block"; }
    else if (p.palindrome) { pat = 20; why = "palindrome"; }
    else if (p.maxRun >= 3) { pat = 8 + 4 * (p.maxRun - 3); why = "run of " + p.maxRun; }
    if (pat) parts.push(["Pattern (" + why + ")", pat]);
    if (L > 1) { var simp = Math.round(((L - p.distinct) / L) * 12 * 10) / 10; if (simp) parts.push(["Few distinct digits (" + p.distinct + ")", simp]); }
    var c8 = d.filter(function (x) { return x === 8; }).length, c69 = d.filter(function (x) { return x === 6 || x === 9; }).length;
    var c4 = d.filter(function (x) { return x === 4; }).length, c0 = d.filter(function (x) { return x === 0; }).length;
    if (c8) parts.push(["Digit 8 × " + c8 + " (prosperity)", Math.min(12, c8 * 4)]);
    if (c69) parts.push(["Digits 6/9 × " + c69, Math.min(6, c69 * 2)]);
    if (c4) parts.push(["Digit 4 × " + c4 + " (avoided in East Asia)", -Math.min(18, c4 * 6)]);
    if (c0 && !p.round && !p.repdigit) parts.push(["Digit 0 × " + c0, -Math.min(6, c0 * 1.5)]);
    if (/8$/.test(s) && !p.repdigit) parts.push(["Ends in 8", /88$/.test(s) ? 6 : 3]);
    if (/786/.test(s)) parts.push(["Contains 786", 6]);
    if (/108/.test(s) && L > 3) parts.push(["Contains 108", 3]);
    if (/520|1314/.test(s) && L > 3) parts.push(["Love number 520/1314", 4]);
    var total = Math.max(0, Math.min(100, Math.round(sum(parts.map(function (x) { return x[1]; })))));
    var grade = total >= 85 ? ["A+", "Collector grade", "Diamond"] : total >= 72 ? ["A", "Premium", "Platinum"] : total >= 58 ? ["B", "Strong", "Gold"] : total >= 44 ? ["C", "Notable", "Silver"] : ["D", "Everyday", "Standard"];
    return { score: total, grade: grade[0], label: grade[1], tier: grade[2], parts: parts };
  }

  /* Indicative numeric .com value band (USD). Ranges anchored to public sales reporting; not an appraisal. */
  function domainBand(s, score) {
    var L = s.length, band = { 1: null, 2: null, 3: [15000, 250000], 4: [1500, 60000], 5: [200, 8000], 6: [100, 17000], 7: [20, 1500] }[L];
    if (L >= 8) band = [10, 500];
    if (!band) return { rare: true, text: "One- and two-digit .com names almost never change hands; when they do, prices are in the high six to seven figures." };
    var f = Math.pow(score / 100, 2), mid = band[0] + (band[1] - band[0]) * f;
    if (/^0/.test(s)) mid *= 0.6;
    var lo = Math.max(band[0], mid * 0.6), hi = Math.min(band[1] * 1.2, mid * 1.4);
    function r(x) { var m = x >= 10000 ? 1000 : x >= 1000 ? 100 : 10; return Math.round(x / m) * m; }
    return { lo: r(lo), hi: r(hi), floor: band[0], ceil: band[1], L: L };
  }

  function cultureRating(s, table) {
    var d = digitsOf(s), t = sum(d.map(function (x) { return table[x].r; })) / Math.max(1, d.length);
    var hasBad = d.some(function (x) { return table[x].r <= -1.5; });
    if (t >= 1.2) return ["Very lucky", 2];
    if (t >= 0.45 && !hasBad) return ["Lucky", 1];
    if (hasBad && t < 0) return ["Unlucky", -2];
    if (hasBad) return ["Mixed", -1];
    return ["Neutral", 0];
  }

  /* ---------------- analysis ---------------- */
  function analyze(input) {
    var s = clean(input); if (!s) return null;
    if (s.length > 15) s = s.slice(0, 15);
    var n = Number(s), d = digitsOf(s), ds = sum(d);
    var red = reduceKeepMaster(ds, [ds]);
    var core = red.value, coreDigit = reducePlain(ds) || 0;
    var A = { s: s, n: n, L: s.length, digits: d, digitSum: ds, reduction: red, core: core, coreDigit: coreDigit };
    A.masters = []; [11, 22, 33].forEach(function (m) { if (s.indexOf(String(m)) > -1) A.masters.push(m); });
    A.count = {}; d.forEach(function (x) { A.count[x] = (A.count[x] || 0) + 1; });
    A.dominant = Object.keys(A.count).map(Number).sort(function (a, b) { return A.count[b] - A.count[a] || a - b; });
    A.runs = []; var cur = s[0], c = 1;
    for (var i = 1; i <= s.length; i++) { if (s[i] === cur) c++; else { A.runs.push(cur.repeat(c)); cur = s[i]; c = 1; } }
    A.patterns = patterns(s); A.premium = premium(s); A.domain = domainBand(s, A.premium.score);
    A.zh = cultureRating(s, ZH); A.ja = cultureRating(s, JA);
    if (/520|1314/.test(s)) A.zh = ["Lucky (love code)", 1];
    A.chaldeanCompound = ds >= 10 && ds <= 52 ? CHALDEAN[ds] : null;
    A.curated = CURATED[s] || null;
    A.leadingZero = s.length > 1 && s[0] === "0";
    if (!A.leadingZero && n <= 1e12) {
      A.isPrime = isPrime(n); A.factors = groupFactors(factorize(n)); A.div = n > 1 ? divisorStats(A.factors) : null;
      A.square = isSquare(n); A.cube = isCube(n); A.tri = isTriangular(n); A.fib = isFib(n);
      A.perfect = A.div && A.div.sigma - n === n; A.abundant = A.div && A.div.sigma - n > n;
      A.roman = roman(n); A.bin = n.toString(2); A.hex = n.toString(16).toUpperCase(); A.oct = n.toString(8);
      A.words = n < 1e15 ? words(n) : null;
    }
    if (s.length === 3 || s.length === 4) {
      var hh = Number(s.slice(0, s.length - 2)), mm = Number(s.slice(-2));
      if (hh <= 23 && mm <= 59) A.clock = (hh < 10 ? "0" + hh : hh) + ":" + s.slice(-2);
    }
    if (s.length === 4 && n >= 1900 && n <= 2100) A.year = true;
    return A;
  }

  /* ---------------- text composition ---------------- */
  function list(arr) { return arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1]; }
  function runPhrase(r) {
    var dg = Number(r[0]), m = DIGIT[dg];
    if (r.length === 1) return "<strong>" + r + "</strong> (" + m.k + ")";
    if (r.length === 2 && MASTER[Number(r)]) return "<strong>" + r + "</strong> (" + m.k + " doubled — also the master number " + MASTER[Number(r)].k + ")";
    return "<strong>" + r + "</strong> (" + m.k + ", amplified " + r.length + "×)";
  }
  function summary(A) {
    var top = A.dominant[0], m = DIGIT[A.core > 9 ? A.coreDigit : A.core];
    var coreTxt = MASTER[A.core] ? "the master number " + A.core + " — " + MASTER[A.core].k : A.core + " (" + DIGIT[A.core].k + ")";
    return A.s + " reduces to " + coreTxt + ". Its strongest digit is " + top + " (" + DIGIT[top].k + "), so the overall message is: " + m.msg + ".";
  }
  function meaning(A) {
    var out = [], top = A.dominant[0];
    out.push("<p>" + (A.runs.length > 1 ? "Read left to right, " + A.s + " is built from " + list(A.runs.map(runPhrase)) + "." : A.L > 1 ? A.s + " repeats the digit " + A.s[0] + " " + A.L + " times, which numerologists read as the energy of " + DIGIT[top].k + " turned all the way up." : "As a single digit, " + A.s + " stands for " + DIGIT[top].k + ".") + " In angel-number tradition the core message is: " + DIGIT[top].msg + ".</p>");
    if (A.masters.length) out.push("<p>It contains the master number" + (A.masters.length > 1 ? "s " : " ") + list(A.masters.map(String)) + ": " + A.masters.map(function (x) { return x + " is " + MASTER[x].msg; }).join("; ") + ".</p>");
    var c = A.core > 9 ? A.core : A.core;
    out.push("<p>The digits add up to " + A.digitSum + (A.reduction.steps.length > 1 ? ", which reduces to " + A.core : "") + ". " + (MASTER[c] ? "Because " + c + " is a master number it is not reduced further — " + MASTER[c].msg + "." : "In numerology " + c + " is the number of " + DIGIT[c].k + ": " + DIGIT[c].msg + ".") + "</p>");
    return out.join("");
  }
  function lifeAreas(A) {
    var c = A.core > 9 ? A.coreDigit : A.core, t = A.dominant[0];
    return [
      ["Love", cap(DIGIT[t].love) + "; underneath, " + DIGIT[c].love + "."],
      ["Career and money", cap(DIGIT[t].work) + ". The reduction (" + A.core + ") adds " + DIGIT[c].work + "."],
      ["Spiritual reading", cap(DIGIT[t].spirit) + (c !== t ? ", grounded by " + DIGIT[c].spirit : "") + "."]
    ];
  }
  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }

  function faq(A) {
    var q = [];
    q.push(["What does " + A.s + " mean?", summary(A)]);
    q.push(["Is " + A.s + " a lucky number?", "In Chinese culture " + A.s + " rates " + A.zh[0].toLowerCase() + ", in Japanese culture " + A.ja[0].toLowerCase() + ". " + (A.count[4] ? "It contains 4, which East Asian buyers avoid. " : "") + (A.count[8] ? "It contains 8, the most prized digit in Chinese culture. " : "") + "In numerology no number is purely lucky or unlucky — it describes a theme."]);
    if (A.isPrime !== undefined) q.push(["Is " + A.s + " a prime number?", A.n < 2 ? A.s + " is neither prime nor composite." : A.isPrime ? "Yes. " + A.s + " is prime — its only divisors are 1 and itself." : "No. " + A.s + " = " + A.factors.map(function (f) { return f.p + (f.e > 1 ? "^" + f.e : ""); }).join(" × ") + ", so it has " + A.div.count + " divisors."]);
    q.push(["How valuable is " + A.s + " as a phone number, plate or domain?", "Our premium-number score is " + A.premium.score + "/100 (" + A.premium.label.toLowerCase() + ", " + A.premium.tier + " tier). " + (A.domain.rare ? A.domain.text : "As a .com, comparable numeric names have traded around $" + fmt(A.domain.lo) + "–$" + fmt(A.domain.hi) + ".") + " A real appraisal depends on the exact market, so treat this as a starting point."]);
    if (A.clock) q.push(["What does seeing " + A.clock + " on a clock mean?", "Clock sightings are read the same way as the digits themselves — " + DIGIT[A.dominant[0]].msg + ". Psychologically, noticing a time you already find meaningful is the frequency illusion at work."]);
    return q;
  }

  /* ---------------- HTML rendering (shared) ---------------- */
  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tiles(s) { return '<div class="flap" aria-label="' + esc(s) + '">' + s.split("").map(function (c) { return '<span class="t"><b>' + c + "</b></span>"; }).join("") + "</div>"; }
  function row(k, v) { return "<tr><th scope=\"row\">" + k + "</th><td>" + v + "</td></tr>"; }
  function badge(r) { var cls = r[1] >= 1 ? "good" : r[1] <= -1 ? "bad" : "mid"; return '<span class="tag ' + cls + '">' + r[0] + "</span>"; }

  function render(A, opt) {
    opt = opt || {}; var root = opt.root || "", s = A.s, H = [];
    var areas = lifeAreas(A);
    H.push('<section class="nhero"><div class="wrap">' + (opt.crumbs || "") + tiles(s) +
      '<h1 class="nh1">' + (opt.h1 || "Number " + s + ": meaning, math, culture and value") + "</h1>" +
      '<p class="lede">' + summary(A) + "</p>" +
      '<dl class="kv"><div><dt>Reduces to</dt><dd>' + A.core + "</dd></div><div><dt>Chinese reading</dt><dd>" + A.zh[0] + "</dd></div><div><dt>Premium score</dt><dd>" + A.premium.score + "<small>/100</small></dd></div><div><dt>" + (A.isPrime !== undefined ? "Prime" : "Digits") + "</dt><dd>" + (A.isPrime !== undefined ? (A.isPrime ? "Yes" : "No") : A.L) + "</dd></div></dl></div></section>");

    H.push('<div class="wrap numgrid"><article class="read">');
    if (A.curated) H.push('<aside class="note"><strong>Did you know?</strong> ' + A.curated + "</aside>");
    H.push('<h2 id="meaning">What ' + s + " means</h2>" + meaning(A));
    H.push('<div class="tbl"><table><tbody>' + areas.map(function (a) { return row(a[0], a[1]); }).join("") + "</tbody></table></div>");
    H.push('<div class="cta-inline"><p><strong>Want a reading built on your birth date, not just this number?</strong> A numerologist can map ' + s + " against your life path.</p><a class=\"btn\" href=\"" + root + "concierge.html?intent=reading&n=" + s + '">Request a personal reading</a></div>');
    H.push('<div class="ad"><div class="box" data-slot="inContent"></div></div>');

    H.push('<h2 id="numerology">Numerology breakdown</h2><p>Pythagorean method: add every digit, then keep adding until you reach a single digit or a master number (11, 22, 33).</p>');
    H.push('<p class="calc">' + A.digits.join(" + ") + " = " + A.digitSum + (A.reduction.steps.length > 1 ? " → " + A.reduction.steps.slice(1).join(" → ") : "") + "</p>");
    H.push('<div class="tbl"><table><tbody>' +
      row("Digit sum", A.digitSum) + row("Core number", A.core + (MASTER[A.core] ? " (master number)" : "")) +
      (A.chaldeanCompound ? row("Chaldean compound " + A.digitSum, A.chaldeanCompound) : "") +
      row("Vedic ruling planet", VEDIC[A.coreDigit || 9] + " — " + VEDIC_KW[A.coreDigit || 9]) +
      row("Digits present", A.dominant.map(function (x) { return x + (A.count[x] > 1 ? " ×" + A.count[x] : ""); }).join(", ")) +
      row("Missing digits", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (x) { return !A.count[x]; }).join(", ") || "none") +
      "</tbody></table></div>");

    H.push('<h2 id="culture">' + s + " across cultures</h2><p>The same digits carry different weight depending on language. These readings are traditional associations, not predictions.</p>");
    var uniq = A.dominant.slice().sort(function (a, b) { return a - b; });
    H.push('<div class="tbl"><table><thead><tr><th>Digit</th><th>Chinese</th><th>Japanese</th><th>Korean</th><th>Vedic</th></tr></thead><tbody>' +
      uniq.map(function (x) { return "<tr><td class=\"dg\">" + x + "</td><td><span lang=\"zh\">" + ZH[x].h + "</span> " + ZH[x].p + " — " + ZH[x].s + "</td><td>" + JA[x].rd + " — " + JA[x].s + "</td><td>" + KO[x] + "</td><td>" + (x ? VEDIC[x] : "—") + "</td></tr>"; }).join("") + "</tbody></table></div>");
    H.push('<div class="tbl"><table><tbody>' + row("Overall in Chinese culture", badge(A.zh)) + row("Overall in Japanese culture", badge(A.ja)) + row("Western associations", western(A)) + "</tbody></table></div>");

    if (A.isPrime !== undefined) {
      H.push('<h2 id="math">Math facts about ' + s + "</h2>");
      H.push('<div class="tbl"><table><tbody>' +
        (A.words ? row("In words", cap(A.words)) : "") +
        row("Prime?", A.n < 2 ? "Neither prime nor composite" : A.isPrime ? "Yes, prime" : "No — composite") +
        (A.n > 1 ? row("Prime factorization", A.factors.map(function (f) { return f.p + (f.e > 1 ? "<sup>" + f.e + "</sup>" : ""); }).join(" × ")) : "") +
        (A.div ? row("Number of divisors", A.div.count) + row("Sum of divisors", fmt(A.div.sigma)) + row("Euler’s totient φ", fmt(A.div.phi)) : "") +
        row("Parity", A.n % 2 ? "Odd" : "Even") +
        row("Special forms", [A.square && A.n > 1 ? "perfect square" : "", A.cube && A.n > 1 ? "perfect cube" : "", A.tri && A.n > 0 ? "triangular" : "", A.fib ? "Fibonacci" : "", A.perfect ? "perfect number" : "", A.abundant ? "abundant" : "", A.patterns.palindrome || A.patterns.repdigit ? "palindrome" : ""].filter(Boolean).join(", ") || "none of the classic forms") +
        (A.roman ? row("Roman numeral", A.roman) : "") +
        row("Binary", A.bin) + row("Hexadecimal", A.hex) + row("Octal", A.oct) +
        row("Square root", Math.sqrt(A.n).toFixed(4).replace(/\.?0+$/, "")) +
        "</tbody></table></div>");
    }
    H.push('<div class="ad"><div class="box" data-slot="inContent"></div></div>');

    H.push('<h2 id="value">What ' + s + " is worth as a phone number, plate or domain</h2>");
    H.push('<div class="scorecard"><div class="dial" style="--v:' + A.premium.score + '"><span>' + A.premium.score + "</span><small>of 100</small></div><div><p class=\"grade\">Grade " + A.premium.grade + " · " + A.premium.label + "</p><p>Phone-number tier: <strong>" + A.premium.tier + "</strong>" + (A.patterns.list.length ? ". Patterns found: " + A.patterns.list.join("; ") : ". No collectible pattern found") + ".</p>" +
      (A.domain.rare ? "<p>" + A.domain.text + "</p>" : "<p>As a numeric .com, names like this have typically traded between <strong>$" + fmt(A.domain.lo) + " and $" + fmt(A.domain.hi) + "</strong> (" + A.domain.L + "-digit .com public sales range: $" + fmt(A.domain.floor) + "–$" + fmt(A.domain.ceil) + "+).</p>") + "</div></div>");
    H.push('<details class="why"><summary>How this score is calculated</summary><div class="tbl"><table><tbody>' + A.premium.parts.map(function (p) { return row(p[0], (p[1] > 0 ? "+" : "") + p[1]); }).join("") + row("<strong>Total (capped 0–100)</strong>", "<strong>" + A.premium.score + "</strong>") + "</tbody></table></div><p class=\"small\">Indicative only. Real prices depend on the country, carrier, plate code or extension, and on who is bidding that week. See <a href=\"" + root + "records.html\">record sales</a>.</p></details>");
    H.push('<div class="ticket"><div><p class="tk-h">Own ' + s + " — or want a number like it?</p><p>Our concierge sources VIP phone numbers and plates, and gets numeric domains and fancy numbers in front of buyers.</p></div><div class=\"tk-a\"><a class=\"btn\" href=\"" + root + "concierge.html?intent=find&n=" + s + "\">Find me a number</a><a class=\"btn ghost\" href=\"" + root + "concierge.html?intent=sell&n=" + s + "\">Sell or appraise</a></div></div>");

    H.push('<h2 id="video">Watch: numbers like ' + s + " explained</h2>");
    H.push('<div class="vgrid" data-videos="' + esc(s) + '"></div>');

    var F = faq(A);
    H.push('<h2 id="faq">Questions about ' + s + "</h2>" + F.map(function (f) { return "<details class=\"qa\"><summary>" + f[0] + "</summary><p>" + f[1] + "</p></details>"; }).join(""));
    H.push(opt.after || "");
    H.push("</article>");
    H.push('<aside class="side"><nav class="toc" aria-label="On this page"><p>On this page</p><a href="#meaning">Meaning</a><a href="#numerology">Numerology</a><a href="#culture">Cultures</a>' + (A.isPrime !== undefined ? '<a href="#math">Math</a>' : "") + '<a href="#value">Value</a><a href="#faq">FAQ</a></nav><div class="ad"><div class="box" data-slot="sidebar"></div></div>' + (opt.sideExtra || "") + "</aside></div>");
    return { html: H.join(""), faq: F };
  }
  function western(A) {
    var w = [];
    if (A.count[7]) w.push("7 is the West’s favourite “lucky” number");
    if (/13/.test(A.s)) w.push("contains 13, the classic unlucky number");
    if (/666/.test(A.s)) w.push("666 is the biblical “number of the beast”");
    if (A.count[3] && !/13/.test(A.s)) w.push("3 is a common good-luck number");
    if (A.patterns.repdigit && A.L >= 3) w.push("repeating digits are popular “angel numbers”");
    return w.length ? cap(list(w)) + "." : "No strong Western superstition attached.";
  }

  return {
    analyze: analyze, render: render, faq: faq, summary: summary, premium: premium, patterns: patterns, domainBand: domainBand,
    reduce: reduceKeepMaster, reducePlain: reducePlain, digitSum: function (s) { return sum(digitsOf(clean(s))); },
    DIGIT: DIGIT, MASTER: MASTER, ZH: ZH, JA: JA, KO: KO, VEDIC: VEDIC, VEDIC_KW: VEDIC_KW, CHALDEAN: CHALDEAN, CHALDEAN_LETTERS: CHALDEAN_LETTERS,
    CURATED: CURATED, tiles: tiles, fmt: fmt, esc: esc, cap: cap, clean: clean
  };
});
