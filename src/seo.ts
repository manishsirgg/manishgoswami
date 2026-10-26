import {
  EMAIL,
  SITE_URL,
  YOUTUBE,
  navItems,
  pageMeta,
  SESSION,
  type Page,
} from "./site";
import { services } from "./services";

export function structuredData(page: Page) {
  const path = navItems.find((item) => item.page === page)?.path || "/";
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Manish Goswami",
        jobTitle: "Founder, Coach & Consultant",
        url: SITE_URL,
        image: `${SITE_URL}/hero-960.webp`,
        email: EMAIL,
        sameAs: [
          YOUTUBE,
          "https://instagram.com/manishsirgg",
          "https://www.linkedin.com/in/manishsirg/",
          "https://www.facebook.com/manishsirg14",
          "https://x.com/manishsirg",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Manish Goswami",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: pageMeta[page].title,
        description: pageMeta[page].description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
      },
      ...services.map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.copy,
        url: service.href,
        provider: { "@id": `${SITE_URL}/#person` },
      })),
      {
        "@type": "Service",
        name: "One-to-one consultation",
        provider: { "@id": `${SITE_URL}/#person` },
        description: `${SESSION.minutes}-minute Google Meet consultation. Requested times require availability and payment verification.`,
        offers: {
          "@type": "Offer",
          price: SESSION.fee,
          priceCurrency: SESSION.currency,
          url: `${SITE_URL}/work-with-me#book`,
        },
      },
    ],
  };
}
