/* =========================================================
   115522.com — site configuration (the only file you normally edit)
   ========================================================= */
window.SITE = {
  name: "115522 · Number Intelligence",
  domain: "115522.com",
  partnerContact: "https://web.works/contact",

  /* Google AdSense (live). The loader is in every page <head>; Auto ads can be switched on in AdSense.
     Optional: paste ad-unit slot ids to fill the in-page slots with fixed units instead of house ads. */
  ADSENSE_CLIENT: "ca-pub-6620975821265271",
  AD_SLOTS: { inContent: "", sidebar: "", footer: "" },

  /* YouTube — add your channel URL and video ids. Empty list = curated topic cards that open YouTube. */
  YOUTUBE_CHANNEL: "",
  VIDEOS: [
    // { id: "VIDEO_ID", title: "115522 explained in 60 seconds", topic: "Meaning" },
  ],

  /* Donations — paste links when ready. Empty = pledge form collects the intent and you follow up. */
  DONATE: { paypal: "", stripe: "", kofi: "", bmac: "", patreon: "", upi: "" },
  DONATION_GOAL: { label: "Season 1 fund · prizes, research and new tools", raised: 0, goal: 11552 },

  /* Analytics — GA4 measurement id, e.g. "G-XXXXXXX" */
  GA4: ""
};

/* Contact routing — obfuscated and assembled only at submit time. Never replace with plain text. */
window.__r = [70,84,88,66,90,72,89,65,76,85,37,4,2,5,12,93,31,89,90,88];
window.__k = "11:55:22-decode";
