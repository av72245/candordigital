/*
 * Candor Digital — analytics loader.
 * Paste your IDs below. Leave a value empty to keep that tag switched off.
 *   GA4:        Google Analytics > Admin > Data streams > Measurement ID (G-XXXXXXX)
 *   Meta Pixel: Meta Events Manager > Data sources > Pixel ID (numbers only)
 */
(function () {
  var GA4_ID = 'G-72MMMVTC8K';
  var META_PIXEL_ID = '';

  var w = window;
  // Only track the live site, so local previews don't pollute the numbers.
  if (!/(^|\.)candordigital\.com\.au$/.test(location.hostname)) { GA4_ID = ''; META_PIXEL_ID = ''; }
  var onThanks = /\/thanks(\.html|\/)?$/.test(location.pathname);

  function loadScript(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }

  if (GA4_ID) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    w.gtag('config', GA4_ID);
  }

  if (META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(w, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    w.fbq('init', META_PIXEL_ID);
    w.fbq('track', 'PageView');
  }

  // Shared event helper: sends to whichever tags are switched on.
  w.candorTrack = function (name, params) {
    if (w.gtag) w.gtag('event', name, params || {});
    if (w.fbq) w.fbq('trackCustom', name, params || {});
  };

  // A completed audit request lands on /thanks — count it as the lead conversion.
  if (onThanks) {
    if (w.gtag) w.gtag('event', 'generate_lead');
    if (w.fbq) w.fbq('track', 'Lead');
  }

  document.addEventListener('DOMContentLoaded', function () {
    // CTA clicks (any element with data-track="...")
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () { w.candorTrack('cta_click', { cta: el.getAttribute('data-track') }); });
    });
    // Form started — first interaction with the audit form
    ['quickForm', 'auditForm'].forEach(function (id) {
      var form = document.getElementById(id);
      if (!form) return;
      var started = false;
      form.addEventListener('focusin', function () {
        if (started) return; started = true;
        w.candorTrack('form_start', { form: form.getAttribute('name') });
      });
    });
  });
})();
