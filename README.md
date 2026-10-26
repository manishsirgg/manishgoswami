# Manish Goswami — Founder • Coach • Consultant

React 19, TypeScript and Vite personal website. The four consulting platforms, photography, dark palette and existing routes are retained.

## Develop and validate

Use Node.js 24 (validated with 24.19.0) and npm 11.9.0. No API keys, backend, database or Gemini configuration are needed.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npm run preview -- --port 4175
```

`npm run lint` runs TypeScript. `npm run build` compiles local Tailwind CSS and JS, renders the four routes into static HTML, and removes the temporary server bundle. `npm test` runs ten booking/date and production-HTML checks and therefore requires a completed build. Production output is `dist/`.

Optional browser checks use Python Playwright with a system Chromium:

```sh
SITE_TEST_URL=http://127.0.0.1:4175 python tests/browser-smoke.py
```

Set `CHROMIUM_PATH` if Chromium is elsewhere. Screenshots go to `/tmp/manish-website-checks` (override with `SITE_TEST_ARTIFACTS`). These checks intercept the WhatsApp draft; no enquiry is sent. Browser tools are development-only and are not application dependencies.

## Content and configuration

- `src/site.ts`: identity, contact details, routes, metadata, session duration/fee and scope statement.
- `src/services.tsx`: the four services and platform URLs.
- `src/BookingCard.tsx`: form, review and explicit contact handoff.
- `src/consultation.ts`: date validation, timezone-aware draft and contact URLs.
- `src/campaign.ts`: session-only campaign labels; no analytics service.
- `src/seo.ts`, `src/entry-server.tsx`, `scripts/prerender.mjs`: factual schema and static route generation.

The form prepares a request, not a confirmed booking. Visitors must send it through WhatsApp or their email app. No payment collection, availability API, automated confirmation or persistent lead storage is implemented. See [delivery and integration notes](docs/website-upgrade.md).

## Deployment

Deploy `dist` after `npm ci && npm run build`. `vercel.json` maps `/about`, `/work-with-me` and `/contact` to their generated HTML rather than the homepage SPA fallback. Equivalent static-host mappings or directory-index routing are required on other hosts. Keep `/`, `/about`, `/work-with-me`, `/contact`, assets, `robots.txt` and `sitemap.xml` publicly accessible. Canonicals use `https://manishgoswami.com`; configure the hosting domain settings to redirect alternate domains to that origin.

Test direct route visits and refreshes on the deployed host. Local preview explicitly uses the same route mapping. A generic SPA-only catch-all that serves homepage HTML for every route undermines route metadata and hydration. No production deployment is implied by a successful local build.
