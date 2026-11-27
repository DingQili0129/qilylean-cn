/* QilyLean site-data sync v1 (QL-CN-SITEDATA-20261126).
   Single source of truth: /qilylean/site-data.json.
   Fetches it on load and updates every element carrying the standard
   data attributes (see build script). If the fetch fails, the hardcoded
   values already in the HTML stay as fallback -- the page never breaks.
   Safe to include on any page; it only touches elements that opt in. */
(function () {
  var SRC = '/qilylean/site-data.json';
  function setCount(el, n) {
    el.textContent = el.textContent.replace(/\d+/, String(n));
  }
  function setDate(el, d) {
    el.textContent = el.textContent.replace(/\d{4}-\d{2}-\d{2}/, d);
  }
  fetch(SRC, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (d) {
      if (!d) return;
      if (d.terminology && typeof d.terminology.count === 'number') {
        document.querySelectorAll('[data-site-count="terminology"]').forEach(function (el) { setCount(el, d.terminology.count); });
      }
      if (d.briefings && typeof d.briefings.count === 'number') {
        document.querySelectorAll('[data-site-count="briefings"]').forEach(function (el) { setCount(el, d.briefings.count); });
      }
      if (d.tools && typeof d.tools.count === 'number') {
        document.querySelectorAll('[data-site-count="tools"]').forEach(function (el) { setCount(el, d.tools.count); });
      }
      if (d.briefings && d.briefings.latest) {
        var L = d.briefings.latest;
        document.querySelectorAll('[data-latest-brief-date]').forEach(function (el) {
          if (el.hasAttribute('data-latest-brief-card')) { el.setAttribute('data-latest-brief-date', L.date); }
          else { setDate(el, L.date); }
        });
        document.querySelectorAll('[data-latest-brief-meta]').forEach(function (el) {
          el.textContent = '最新精选：' + L.date + '｜' + L.title;
        });
        document.querySelectorAll('[data-latest-brief-title]').forEach(function (el) { el.textContent = L.title; });
        document.querySelectorAll('[data-latest-brief-summary]').forEach(function (el) { el.textContent = L.summary; });
        document.querySelectorAll('[data-latest-brief-link]').forEach(function (el) { el.setAttribute('href', L.url); });
      }
    })
    .catch(function () { /* keep hardcoded fallback values */ });
})();
