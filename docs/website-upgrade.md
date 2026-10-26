# Website upgrade delivery notes

## Behaviour

The homepage introduces Manish before service information and associated platforms. Identity is Founder • Coach • Consultant throughout. The site describes public YouTube perspectives without making a news portal or inventing credentials, achievements or client statistics. About includes Understand the Situation → Explore the Options → Identify Practical Next Steps. All four platform associations and social links remain. Cards use four columns from 768px and one column below that breakpoint.

Consultation requests preserve the 40-minute Google Meet session and ₹5,000 INR fee. Browser-local date/time is paired with an IANA timezone, date-specific UTC offset and UTC instant in the outgoing draft. Past times, invalid dates and DST-skipped times are rejected. In a repeated DST hour, the browser chooses the earlier occurrence; the UI asks visitors to choose a different time to avoid ambiguity. The visitor can review, edit, open an email/WhatsApp draft or copy the request. Expiry is checked again at handoff. There is no Google Calendar invitation or claim that a slot, payment or delivery has been confirmed.

Form details live only in page state. No consultation record is written to storage or sent to analytics. Email/WhatsApp receive the details when their draft is opened and manage them under their own terms. The visitor must send there. Contact links and manual copying provide fallbacks for devices without a configured email app or clipboard permission.

UTM campaign labels are restricted to short alphanumeric/underscore/hyphen values, stored only in sessionStorage, and never sent to an analytics service. Optional sharing in an enquiry is off by default. Campaign URLs must not contain personal information. Hosting-provider technical logs are outside the app's storage behaviour.

## SEO and performance

The build emits complete HTML for `/`, `/about`, `/work-with-me` and `/contact`, with route-specific titles, descriptions, canonical, Open Graph and Twitter tags. Person, WebSite, WebPage and Service JSON-LD uses only site facts. No ratings, credentials or reviews were invented. Robots and sitemap retain all four routes. Vercel route rewrites and preview mapping avoid rendering homepage HTML for another route.

Tailwind 3.4 now compiles locally through PostCSS; the remote runtime script was removed. Existing opacity variants are preserved in the Tailwind configuration. Unused application dependencies and unreferenced legacy content modules were removed; current service data is centralized. No framework migration or backend was introduced. Gemini client-side key definitions were removed.

The original 1.6 MB portrait is preserved. Responsive 480px/960px WebP derivatives are roughly 50 KB/158 KB, with explicit dimensions and high loading priority. Existing logo and social preview are retained. System font fallbacks avoid external font requests. Local bundle sizes are recorded in build output; no live Core Web Vitals improvement is claimed without field measurements.

## Accessibility and checks

Semantic navigation, native CTA links, a skip link, visible focus, menu Escape/focus return, labelled inputs, focused review/error feedback, clipboard loading/error feedback, reduced motion and mobile layouts are covered by implementation and browser checks. Automated axe scans cover WCAG A/AA tags; they do not replace manual assistive-technology testing.

Run the commands in README. The browser suite checks all four routes at nine viewport widths, direct HTML metadata, hydration, service preselection, campaign consent, explicit intercepted draft handoff, clipboard failure, expired preferred time, navigation/history, reduced motion and JavaScript-disabled page content. No real message, payment or appointment is submitted by these tests. External platform availability and delivery through visitors' messaging/email clients are not guaranteed by local tests.

## External integrations not implemented

The current request workflow needs no secrets or external account setup. To replace it with automated booking, first select a scheduling provider and authorized server-side API/OAuth integration, define availability/timezone rules and cancellation/rescheduling behaviour. Persistent leads additionally require server-side storage, access controls, a documented retention/deletion policy and delivery/error handling. Payment verification requires a payment-provider account, server-held credentials and signed webhooks; never expose keys or trust a client-side success flag. Confirm jurisdiction-specific professional authorization before offering regulated representation.

These are optional future integrations, not hidden prerequisites or unfinished controls in the delivered request flow. Live deployment, email delivery, payment verification, and regulated professional credentials have not been verified here.

## Recorded validation

- Frozen-lockfile installation (`npm ci`), TypeScript, production build and all 10 automated tests passed on Node 24.19.0 / npm 11.9.0.
- Chromium browser suite passed all four routes at 1920, 1366, 1024, 820, 768, 767, 430, 390 and 320px. No page errors or failed resource requests were recorded.
- axe-core WCAG 2 A/AA and 2.1 AA scans reported zero violations on each route at desktop (1440px) and mobile (390px). Manual screen-reader testing and live field Core Web Vitals were not performed.
- Current screenshots: [desktop hero](screenshots/home-desktop.png), [mobile hero](screenshots/home-mobile.png), [mobile consultation](screenshots/consultation-mobile.png). These are local production-preview screenshots, not a claim of deployment; no baseline screenshots were captured.
