export type Page = "home" | "about" | "work-with-me" | "contact";

export const SITE_URL = "https://manishgoswami.com";
export const EMAIL = "manishsirgg@gmail.com";
export const WHATSAPP = "+918989601701";
export const YOUTUBE = "https://youtube.com/@manishsirg";

export const navItems: Array<{ label: string; page: Page; path: string }> = [
  { label: "Home", page: "home", path: "/" },
  { label: "About", page: "about", path: "/about" },
  { label: "Work With Me", page: "work-with-me", path: "/work-with-me" },
  { label: "Contact", page: "contact", path: "/contact" },
];

export const pageMeta: Record<Page, { title: string; description: string }> = {
  home: {
    title: "Manish Goswami | Founder, Coach & Consultant",
    description:
      "Official website of Manish Goswami — Founder, Coach & Consultant. Explore personal coaching, career and education guidance, digital growth, and global opportunities.",
  },
  about: {
    title: "About Manish Goswami | Founder, Coach & Consultant",
    description:
      "Meet Manish Goswami, founder of four platforms supporting personal growth, careers, brands and global opportunities.",
  },
  "work-with-me": {
    title: "Work With Manish Goswami | One-on-One Consultations",
    description:
      "Request a consultation for personal transformation, career and education, brand and digital growth or citizenship and residency.",
  },
  contact: {
    title: "Contact Manish Goswami | Coaching & Consulting",
    description:
      "Contact Manish Goswami for one-to-one coaching and consulting across personal growth, education, digital business and global opportunities.",
  },
};

export const SESSION = {
  minutes: 40,
  fee: 5000,
  currency: "INR",
  platform: "Google Meet",
} as const;
export const PROFESSIONAL_BOUNDARIES =
  "Coaching and consultancy provide practical guidance, not medical, mental-health or legal care. Global mobility discussions are general information; regulated immigration advice or representation must come from a professional authorized in the relevant jurisdiction. No admission, visa, residency, career or business outcome is guaranteed.";
