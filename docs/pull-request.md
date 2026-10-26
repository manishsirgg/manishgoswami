## Summary

Introduce Manish before the consulting ecosystem and turn the consultation flow into a clear request-and-handoff experience. Preserve the dark blue design, personal photography, four consulting platforms and existing routes.

## Branding and UX

- Keep Founder • Coach • Consultant consistently and explain the connection between YouTube perspectives and individualized guidance without invented achievements or credentials.
- Order the homepage as hero, audience, services, approach, platforms, consultation invitation and contact.
- Retain four platform cards per row on desktop/tablet and one per row on phones. Improve service context and deep-link enquiries with the relevant focus selected.
- Expand About with the Understand → Explore → Identify Next Steps philosophy and clear service boundaries.

## Consultation and lead handling

- Preserve 40 minutes, Google Meet and ₹5,000 INR.
- Validate name/email, allowed service and future preferred times; include IANA timezone, date-specific UTC offset and UTC instant, rejecting invalid dates and DST-skipped times.
- Review and edit a request, then explicitly open a WhatsApp/email draft or copy the request. Check expiry again at handoff. Never claim an enquiry, payment or appointment is confirmed.
- Remove calendar invitations and misleading scheduled/payment wording. No backend or payment integration is presented as operational.
- Explain page-memory-only form handling, external draft-provider handling, and professional scope. Campaign labels are session-only; sharing them in an enquiry is optional and off by default. No analytics service or visitor identifiers.

## SEO, performance and maintainability

- Prerender complete HTML for all four routes, with distinct metadata, canonical/social tags and factual Person/WebSite/WebPage/Service JSON-LD. Preserve sitemap and robots.
- Add Vercel and local-preview route mapping so extensionless requests receive the correct HTML.
- Compile Tailwind locally instead of the CDN. Add responsive WebP portraits (~50/158 KB versus the original 1.6 MB), explicit dimensions and hero priority; preserve original assets.
- Centralize contact/session/metadata and service data, extract booking/date logic, remove unused dependencies and unreferenced legacy duplicate content, and remove frontend Gemini key definitions. Pin the tested Node 24 runtime.

## Accessibility

Native crawlable CTA/navigation links, skip link, visible focus, labelled form controls, error/review focus, copy loading/error state, mobile menu Escape/focus return, reduced motion, and direct phone/email/WhatsApp contact.

## Validation

- `npm ci`, `npm run lint`, `npm run build`, `npm test`, `git diff --check`: passed; 10 automated tests executed.
- Chromium: all four routes at nine widths (320–1920px), route HTML/hydration, focus selection, optional campaign sharing, intercepted draft handoff, clipboard failure, expired requests, history, mobile navigation, reduced motion and content without JavaScript passed. No page errors or failed resources.
- axe-core WCAG A/AA scans: zero violations on each route at 1440px and 390px; final direct-phone contact action also checked.
- No actual enquiry, appointment or payment was submitted. No live deployment, external destination availability, manual screen-reader or field Core Web Vitals result is claimed.

## Limits and configuration

No secrets or backend setup is required for this request flow. Automated availability, persistent lead storage and payment confirmation would require a separately configured server-side provider and appropriate operational/privacy decisions. Visitors must press Send in their email/WhatsApp app. Other static hosts need mappings equivalent to `vercel.json`; live host redirects and deployment still need verification.

See [delivery notes](https://github.com/manishsirgg/manishgoswami/blob/feat/website-consultation-upgrade/docs/website-upgrade.md) and [screenshots](https://github.com/manishsirgg/manishgoswami/tree/feat/website-consultation-upgrade/docs/screenshots).
