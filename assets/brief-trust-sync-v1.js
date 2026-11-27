(async function syncTrustBriefs() {
  const total = document.querySelector('[data-trust-stat="briefs"]');
  const firstDate = document.querySelector('[data-trust-stat="earliest-date"]');
  const latestDate = document.querySelector('[data-trust-stat="latest-date"]');
  const latest = latestDate?.closest("a");
  const version = document.querySelector('[data-trust-sync-version]');
  if (!latest || !total || !latestDate || !version) return;

  try {
    const response = await fetch('/briefs/', { cache: 'no-cache' });
    if (!response.ok) return;
    const directory = new DOMParser().parseFromString(await response.text(), 'text/html');
    const entries = new Map();
    for (const card of directory.querySelectorAll('#briefCuratedGrid .brief-index-card[data-date]')) {
      const date = card.dataset.date;
      const href = '/briefs/archive/' + date + '/';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          !card.querySelector('a[href="' + href + '"]') || entries.has(date)) return;
      entries.set(date, href);
    }
    const dates = Array.from(entries.keys()).sort();
    const declared = directory.querySelector('[data-qily-brief-total]');
    if (!declared || dates.length === 0 || dates.length !== Number(declared.dataset.qilyBriefTotal)) return;
    const last = dates[dates.length - 1];
    total.textContent = String(dates.length);
    if (firstDate) firstDate.textContent = dates[0];
    latestDate.textContent = last;
    latest.href = entries.get(last);
    latest.title = '打开 ' + last + ' 精选简报';
    latest.setAttribute('aria-label', '打开' + last + '精选简报');
    version.textContent = last;
  } catch {
    // Keep the last published values when the directory is unavailable.
  }
})();
