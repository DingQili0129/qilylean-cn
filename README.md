# QilyLean 中国站 (qilylean.cn) — 源码备份

Private backup of the live QilyLean China site. One-way backup only:
Tencent Cloud stays production; this repo never deploys by itself.

- **Live site:** https://qilylean.cn/
- **Backed-up release:** `QL-CN-EVIDENCE-20261127.pdffix01` (live since 2026-11-27 ~16:55 CST)
- **Backup date:** 2026-11-27
- **Contents:** 1,465 files, 342,935,932 bytes — the complete live release
  directory, copied directly from the server (1,462 files from the
  `0809fix01` inventory plus the 3 evidence PDFs restored in this release).
  The 3 PDFs (5 + 9 + 3 = 17 pages) are byte-exact against the `.com`
  protected origin copy; the evidence page, homepage, latest briefing,
  site-data.json and the lecture player script all match their known
  SHA-256 values.
- **Repo root = site root:** `index.html` is at the repo root, so a clone is
  directly servable as a static site.

## How it was obtained

Direct copy of the live release directory on the Tencent Cloud server
(`cp -aL` from `current`), plus this README and RESTORE.md. No server
files were modified and no production, DNS or publish flow was touched.
No secrets exist in this tree: the release holds no `.env`, keys, tokens,
credentials, logs, database dumps or git history. (The earlier
`0809fix01` snapshot was built by a public crawl and verified byte-exact
against the server manifest; this release continues from that inventory.)

## Sync rule

After every future `.cn` release passes acceptance, sync its source here
and record the release date + commit SHA in the commit message.

## Restore

See [RESTORE.md](RESTORE.md).
