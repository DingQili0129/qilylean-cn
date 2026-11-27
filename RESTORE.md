# Restore notes — qilylean.cn

## What this repo is

The complete static site for https://qilylean.cn/ (release
`QL-CN-EVIDENCE-20261127.pdffix01`, 2026-11-27). The repo root is the site
root. There is no build step: the deployed release directory IS the
source. There is no database.

## Restore to a static host

Copy the whole tree to the host's web root and serve it as static files.
Verify afterwards:

- homepage `/` — SHA-256
  `afc27981b085cde8313dcc2f8a65d28203c7770368de72e8284b1119e865302f`
- `/qilylean/site-data.json` — 431 bytes, terminology 205, briefings 390,
  latest briefing 2026-11-26 《让改善走在制造之前》
- one voice-lecture page (e.g. `/briefs/archive/2026-11-08/`) — player
  loads and its audio segments play
- the evidence page `/archive/practice/lean-improvement-evidence/` —
  page SHA-256
  `b7262b35c6ac3dd7af717b6b00d8e9935d20b4e5b6fcec7ebfa70f42a0f5b669`,
  and its 3 linked PDFs under
  `/assets/projects/lean-improvement-evidence/` (q3 5 pages, q4 9 pages,
  award 3 pages — 17 pages total)

## Restore to the Tencent Cloud server

Follow the proven release method (do not copy straight over `current`):

1. Copy the tree to a new release directory, e.g.
   `/var/www/qilylean-cn/releases/QL-CN-RESTORE-YYYYMMDD.<name>/`
   (use `cp -aL` so symlinks resolve to real files).
2. `chmod 644` all new files, then verify with a SHA-256 gate
   (`sha256sum -c` against a checksum file) before switching.
3. Switch atomically: `ln -sfn <new-release> /var/www/qilylean-cn/current`.
4. Keep the previous release directory as the rollback anchor
   (never rely on the stale `previous` symlink).

## Dependencies that live OUTSIDE this repo

- **`/mirror-media/`** proxies to `qilylean.com`, which is down (GitHub
  account suspended since 2026-11-20). That content is NOT in this repo
  and cannot be recovered from the public site. If `qilylean.com`
  recovers, re-fetch it; until then the proxy returns 404.
- **`/translate`** proxies to `localhost:8081` — a service running on the
  server itself, not part of the site files. A restore to another host
  needs an equivalent translation service or the proxy removed.
- **Certificates / server config:** Let's Encrypt certificate and the
  web-server configuration live on the server, not in this repo.
- **Deployment markers:** `.https-ready`, `.trust-balance-ready`,
  `.vi-deploy-ready` at the root are readiness markers, not content.

## What is NOT backed up here

Server logs, the old GitHub (`.com`) repository history, and the two
pending follow-up packages that were built but not yet deployed on
2026-11-27 (site-data wiring `wiring01` and knowledge-chain
`toolcases01`) — those live in the local work directory and go out with
the next publish, then get synced here under the sync rule.
