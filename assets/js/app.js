/* 115522 — UI, forms, ads, video, donations, lookups */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  var ROOT = document.body.getAttribute("data-root") || "";
  var Q = new URLSearchParams(location.search);

  /* ---------- nav ---------- */
  var mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) {
    mb.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", o);
      mb.textContent = o ? "Close" : "Menu";
    });
  }
  var here = location.pathname.replace(/\/$/, "/index.html");
  $$(".nav a:not(.btn)").forEach(function (a) {
    var p = new URL(a.href, location.href).pathname;
    if (p === here || (p.indexOf("/tools/") > -1 && here.indexOf("/tools/") > -1 && /index\.html$/.test(p)) || (p.indexOf("/guides/") > -1 && here.indexOf("/guides/") > -1) || (p.indexOf("/number/") > -1 && here.indexOf("/number/") > -1)) a.setAttribute("aria-current", "page");
  });
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- toast ---------- */
  function toast(msg) {
    var t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 4200);
  }
  window.toast115 = toast;

  /* ---------- analytics ---------- */
  if (S.GA4) {
    var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + S.GA4; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", S.GA4);
  }
  function track(ev, p) { if (window.gtag) gtag("event", ev, p || {}); }

  /* ---------- ads: fixed units when slot ids exist, otherwise house ads (Auto ads still run) ---------- */
  var HOUSE = [
    ["Own a VIP number? Get it in front of buyers", "Phone numbers, plates and numeric domains — free appraisal.", "concierge.html?intent=sell", "Get a free appraisal"],
    ["Advertise to number buyers", "Reach collectors, dealers and domain investors in 120+ countries.", "advertise.html", "See placements"],
    ["Guess the Hammer — monthly contest", "Predict the next record plate or domain sale and win.", "contests.html", "Enter free"],
    ["Keep 115522 free", "Support new tools, research and contest prizes.", "donate.html", "Support the project"],
    ["Looking for a lucky number?", "Tell us your digits and budget — we shortlist options.", "concierge.html?intent=find", "Find my number"]
  ];
  $$(".ad .box").forEach(function (b, i) {
    var slot = S.AD_SLOTS && S.AD_SLOTS[b.getAttribute("data-slot") || "inContent"];
    if (S.ADSENSE_CLIENT && slot) {
      b.innerHTML = '<span class="k">Advertisement</span><ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="' + S.ADSENSE_CLIENT + '" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    } else {
      var h = HOUSE[(i + (location.pathname.length % HOUSE.length)) % HOUSE.length];
      b.innerHTML = '<span class="k">Sponsored · from 115522</span><strong>' + h[0] + '</strong><span class="mute small">' + h[1] + '</span><a class="btn sm ghost" href="' + ROOT + h[2] + '">' + h[3] + "</a>";
    }
  });

  /* ---------- video ---------- */
  function lite(el, id, title) {
    el.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    el.setAttribute("aria-label", "Play video: " + title);
    el.addEventListener("click", function () {
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + title.replace(/"/g, "") + '" allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
      track("video_play", { id: id });
    }, { once: true });
  }
  function yt(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
  function vcard(numLabel, title, sub, q) {
    return '<a class="vcard" href="' + yt(q) + '" target="_blank" rel="noopener"><span class="vthumb"><span class="num">' + numLabel + '</span><span class="pl"></span></span><span class="vt">' + title + "<small>" + sub + "</small></span></a>";
  }
  $$("[data-videos]").forEach(function (box) {
    var n = box.getAttribute("data-videos"), html = "";
    var mine = (S.VIDEOS || []).slice(0, 3);
    mine.forEach(function (v) { html += '<div class="vcard"><button class="vthumb" data-yt="' + v.id + '" data-title="' + (v.title || "") + '"><span class="pl"></span></button><span class="vt">' + (v.title || "") + "<small>" + (v.topic || "115522 channel") + "</small></span></div>"; });
    if (n === "home" || n === "all") {
      var T = [["1111", "Why you keep seeing 11:11", "Psychology and tradition", "why do I keep seeing 11:11 frequency illusion"], ["888", "Lucky numbers in Chinese culture", "Homophones explained", "lucky numbers chinese culture 8 4 explained"], ["P7", "The AED 55M Dubai plate", "Record auctions", "P7 number plate auction Dubai 55 million"], ["Ⅰ", "Life path number, calculated", "Numerology basics", "how to calculate life path number numerology"], ["786", "What 786 means", "Abjad numerals", "786 meaning bismillah abjad"], ["8888", "VIP mobile numbers explained", "Fancy number market", "how to get VIP fancy mobile number India"], ["108", "Why 108 is sacred", "Hindu and Buddhist tradition", "why is 108 sacred number"], ["520", "520 and 1314: China’s love numbers", "Internet slang", "520 1314 meaning chinese love numbers"], ["4", "Why buildings skip the 4th floor", "Tetraphobia", "tetraphobia why buildings skip 4th floor"]];
      var lim = n === "home" ? 6 : T.length;
      T.slice(0, lim).forEach(function (t) { html += vcard(t[0], t[1], t[2], t[3]); });
    } else {
      html += vcard(n, "Angel number " + n + " meaning", "Spiritual readings on YouTube", "angel number " + n + " meaning");
      html += vcard(n, n + " in numerology", "How numerologists read it", n + " numerology meaning");
      html += vcard("8", "Lucky and unlucky digits", "Chinese, Japanese and Korean beliefs", "lucky and unlucky numbers chinese japanese korean");
    }
    box.innerHTML = html;
    $$("[data-yt]", box).forEach(function (b) { lite(b, b.getAttribute("data-yt"), b.getAttribute("data-title")); });
  });
  if (S.YOUTUBE_CHANNEL) $$("[data-channel]").forEach(function (a) { a.href = S.YOUTUBE_CHANNEL; a.hidden = false; });

  /* ---------- split-flap animation (one orchestrated moment) ---------- */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function flipTo(board, str) {
    var ts = $$(".t b", board);
    ts.forEach(function (b, i) {
      var target = str[i] != null ? str[i] : b.textContent;
      if (reduce) { b.textContent = target; return; }
      var spins = 5 + i * 2, k = 0;
      (function tick() {
        b.parentNode.classList.remove("flip"); void b.offsetWidth; b.parentNode.classList.add("flip");
        b.textContent = k < spins ? String((Number(b.textContent) + 1) % 10 || Math.floor(Math.random() * 10)) : target;
        if (k++ < spins) setTimeout(tick, 70);
      })();
    });
  }
  $$("[data-flap-intro]").forEach(function (board) { setTimeout(function () { flipTo(board, board.getAttribute("data-flap-intro")); }, 250); });
  window.flipTo115 = flipTo;

  /* ---------- number lookups ---------- */
  $$("form[data-lookup]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = ($("input", f).value || "").replace(/[^0-9]/g, "");
      if (!v) { toast("Type a number made of digits, for example 1111."); $("input", f).focus(); return; }
      track("lookup", { n: v });
      location.href = ROOT + "number/index.html?n=" + v + "#profile";
    });
  });

  /* ---------- forms ---------- */
  function addr() {
    var r = window.__r || [], k = window.__k || "", s = "";
    for (var i = 0; i < r.length; i++) s += String.fromCharCode(r[i] ^ k.charCodeAt(i % k.length));
    return s;
  }
  function utm() {
    var o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(function (k) { if (Q.get(k)) o[k] = Q.get(k); });
    return o;
  }
  var landing = store.get("115_landing") || location.href; store.set("115_landing", landing);
  var ref = store.get("115_ref") || document.referrer || "direct"; store.set("115_ref", ref);

  function validate(scope) {
    var ok = true, first = null;
    $$("input,select,textarea", scope).forEach(function (f) {
      if (f.closest(".hp") || f.closest("[hidden]")) return;
      f.classList.remove("err");
      var bad = false;
      if (f.required) {
        if (f.type === "checkbox") bad = !f.checked;
        else if (f.type === "radio") bad = !$$('input[name="' + f.name + '"]', scope).some(function (x) { return x.checked; });
        else bad = !f.value.trim();
      }
      if (!bad && f.type === "email" && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value)) bad = true;
      if (!bad && f.type === "url" && f.value && !/^https?:\/\/.+\..+/.test(f.value)) bad = true;
      if (bad) { ok = false; f.classList.add("err"); if (!first) first = f; }
    });
    if (first) { first.focus(); toast("Please complete the highlighted fields."); }
    return ok;
  }
  window.validate115 = validate;

  function send(form) {
    var msg = $(".form-msg", form);
    if (!msg) { msg = document.createElement("div"); msg.className = "form-msg"; msg.setAttribute("aria-live", "polite"); form.appendChild(msg); }
    if (!validate(form)) return;
    var hp = $('input[name="_honey"]', form);
    if (hp && hp.value) return;
    var fd = new FormData(form), data = {};
    fd.forEach(function (v, k) { if (k === "_honey") return; data[k] = data[k] ? data[k] + ", " + v : v; });
    var kind = form.getAttribute("data-form") || "form";
    data._subject = "[115522] " + (form.getAttribute("data-subject") || kind) + (data.intent ? " · " + data.intent : "");
    data._template = "table"; data._captcha = "false";
    data.form = kind; data.page = location.href; data.landing = landing; data.referrer = ref;
    var u = utm(); for (var k in u) data[k] = u[k];
    var btn = $('button[type="submit"]', form), label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    msg.className = "form-msg"; msg.textContent = "";
    fetch("https://formsubmit.co/ajax/" + addr(), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || res.j.success === "false" || res.j.success === false) throw new Error("fail");
        track("generate_lead", { form: kind });
        var okText = form.getAttribute("data-ok") || "Sent. We reply within one business day.";
        msg.className = "form-msg ok"; msg.textContent = okText; toast(okText);
        form.reset(); form.dispatchEvent(new CustomEvent("sent115"));
        var m = form.closest(".modal"); if (m) setTimeout(function () { m.classList.remove("on"); }, 1800);
      })
      .catch(function () {
        msg.className = "form-msg bad";
        msg.textContent = "That didn’t go through — check your connection and press the button again.";
      })
      .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
  }
  $$("form[data-form]").forEach(function (f) {
    if (!$('input[name="_honey"]', f)) { var h = document.createElement("div"); h.className = "hp"; h.setAttribute("aria-hidden", "true"); h.innerHTML = '<label>Leave empty<input name="_honey" tabindex="-1" autocomplete="off"></label>'; f.appendChild(h); }
    f.setAttribute("novalidate", "");
    f.addEventListener("submit", function (e) { e.preventDefault(); send(f); });
  });
  /* prefill from URL */
  var qn = (Q.get("n") || "").replace(/[^0-9]/g, "");
  if (qn) $$('input[name="number"]').forEach(function (i) { if (!i.value) i.value = qn; });

  /* ---------- concierge multi-step ---------- */
  var cf = $("#concierge-form");
  if (cf) {
    var steps = $$(".step", cf), bars = $$(".steps i", cf), cur = 0;
    function show(i) {
      cur = i; steps.forEach(function (s, k) { s.hidden = k !== i; });
      bars.forEach(function (b, k) { b.classList.toggle("on", k <= i); });
      var h = $(".stephead", cf); if (h) h.textContent = "Step " + (i + 1) + " of " + steps.length;
      var f = $("input,select,textarea", steps[i]); if (f && i) f.focus();
    }
    function intent() { var r = $('input[name="intent"]:checked', cf); return r ? r.value : ""; }
    function syncIntent() {
      var v = intent();
      $$("[data-for]", cf).forEach(function (el) {
        var on = el.getAttribute("data-for").split(" ").indexOf(v) > -1;
        el.hidden = !on;
        $$("input,select,textarea", el).forEach(function (x) { x.disabled = !on; });
      });
    }
    $$('input[name="intent"]', cf).forEach(function (r) { r.addEventListener("change", function () { syncIntent(); track("concierge_intent", { v: r.value }); }); });
    var qi = Q.get("intent"); if (qi) { var r0 = $('input[name="intent"][value="' + qi + '"]', cf); if (r0) r0.checked = true; }
    syncIntent();
    $$("[data-next]", cf).forEach(function (b) { b.addEventListener("click", function () { if (validate(steps[cur])) show(cur + 1); }); });
    $$("[data-prev]", cf).forEach(function (b) { b.addEventListener("click", function () { show(cur - 1); }); });
    cf.addEventListener("sent115", function () { show(0); syncIntent(); });
    show(0);
  }

  /* ---------- donations ---------- */
  var G = S.DONATION_GOAL;
  $$("[data-goal]").forEach(function (el) {
    if (!G) return;
    var pct = Math.min(100, Math.round((G.raised / G.goal) * 100));
    el.innerHTML = '<p class="mute small" style="margin:0 0 6px">' + G.label + '</p><div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + Math.max(pct, 2) + '%"></i></div><p class="small" style="margin:6px 0 0"><strong>$' + G.raised.toLocaleString() + "</strong> of $" + G.goal.toLocaleString() + " goal</p>";
  });
  $$(".amounts").forEach(function (box) {
    var input = $(box.getAttribute("data-target"));
    $$("button", box).forEach(function (b) {
      b.addEventListener("click", function () {
        $$("button", box).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true"); if (input) input.value = b.getAttribute("data-v");
      });
    });
  });
  var D = S.DONATE || {}, PL = $("#paylinks");
  if (PL) {
    var names = { paypal: "PayPal", stripe: "Card (Stripe)", kofi: "Ko-fi", bmac: "Buy Me a Coffee", patreon: "Patreon (monthly)", upi: "UPI (India)" }, html = "";
    Object.keys(names).forEach(function (k) { if (D[k]) html += '<a class="btn' + (html ? " ghost" : "") + '" href="' + D[k] + '" target="_blank" rel="noopener">' + names[k] + "</a>"; });
    if (html) { PL.innerHTML = html; PL.hidden = false; var pn = $("#pledge-note"); if (pn) pn.hidden = true; }
  }

  /* ---------- exit-intent lead modal (once per session) ---------- */
  var modal = $("#lead-modal");
  function openModal() { if (!modal || store.get("115_modal") || document.body.hasAttribute("data-no-exit")) return; store.set("115_modal", "1"); modal.classList.add("on"); track("exit_modal"); var f = $("input:not([type=hidden])", modal); if (f) f.focus(); }
  if (modal) {
    $(".x", modal).addEventListener("click", function () { modal.classList.remove("on"); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("on"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") modal.classList.remove("on"); });
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget && e.clientY < 8) openModal(); });
    setTimeout(function () { if (window.innerWidth < 760) openModal(); }, 60000);
  }

  /* ---------- share ---------- */
  $$("[data-share]").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = { title: document.title, url: location.href };
      if (navigator.share) navigator.share(d).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { toast("Link copied."); });
    });
  });
})();
