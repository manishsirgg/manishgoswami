import {
  EMAIL,
  WHATSAPP,
  YOUTUBE,
  SITE_URL,
  navItems,
  pageMeta,
  PROFESSIONAL_BOUNDARIES,
  type Page,
} from "./site";
import { services, type Service } from "./services";
import BookingCard from "./BookingCard";
import { structuredData } from "./seo";
import { captureCampaign } from "./campaign";
import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Target,
  Youtube,
  X,
} from "lucide-react";

const ventures = services;

const XSocialIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const socialLinks: Array<{ label: string; href: string; icon: ReactNode }> = [
  { label: "YouTube", href: YOUTUBE, icon: <Youtube size={16} /> },
  {
    label: "Instagram",
    href: "https://instagram.com/manishsirgg",
    icon: <Instagram size={16} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manishsirg/",
    icon: <Linkedin size={16} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/manishsirg14",
    icon: <Facebook size={16} />,
  },
  { label: "X", href: "https://x.com/manishsirg", icon: <XSocialIcon /> },
];

const SocialLinks = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex flex-wrap items-center gap-2">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit Manish Goswami on ${link.label}`}
        className={`inline-flex items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#66B2FF]/50 hover:bg-[#66B2FF]/10 hover:text-white ${compact ? "h-8 w-8" : "h-10 w-10"}`}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary";
}) => (
  <a
    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 ${variant === "primary" ? "bg-gradient-to-r from-[#4DA3FF] to-[#2B7BFF] text-[#061325] shadow-[0_0_40px_rgba(47,136,255,0.3)] hover:brightness-110" : "border border-white/20 bg-white/[0.02] text-white hover:border-[#66B2FF]/50 hover:bg-[#66B2FF]/10"} ${className}`}
    {...props}
  >
    {children}
  </a>
);

const sectionClass =
  "mt-16 rounded-3xl border border-white/10 bg-[#0B111B]/75 p-7 sm:p-10 lg:mt-20 lg:p-14";

const App = ({ initialPath = "/" }: { initialPath?: string }) => {
  const route = navItems.find(
    (item) => item.path === (initialPath.replace(/\/$/, "") || "/"),
  );
  const [page, setPage] = useState<Page>(route?.page ?? "home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  useEffect(() => {
    captureCampaign();
    const handlePopState = () => {
      const match = navItems.find(
        (item) =>
          item.path === (window.location.pathname.replace(/\/$/, "") || "/"),
      );
      setPage(match?.page ?? "home");
      setMobileOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[page];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", meta.description);
    const path = navItems.find((item) => item.page === page)?.path ?? "/";
    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    let schema = document.getElementById("site-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "site-schema";
      schema.setAttribute("type", "application/ld+json");
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData(page));
  }, [page]);

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    window.requestAnimationFrame(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
    });
  }, [page]);

  const navigateTo = (nextPage: Page, hash = "") => {
    const path = navItems.find((item) => item.page === nextPage)?.path ?? "/";
    window.history.pushState({}, "", `${path}${window.location.search}${hash}`);
    setPage(nextPage);
    setMobileOpen(false);
    requestAnimationFrame(() =>
      document
        .getElementById(hash.slice(1) || "main-content")
        ?.focus({ preventScroll: true }),
    );
    if (hash) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
            block: "start",
          });
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070D] text-white">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070D]/85 backdrop-blur-xl">
        <Container>
          <nav
            aria-label="Main navigation"
            className="flex min-h-20 items-center justify-between py-4"
          >
            <a href="/" className="flex items-center gap-3 text-left">
              <img
                src="/logo.svg"
                width="44"
                height="44"
                alt="Manish Goswami logo"
                className="h-11 w-11 rounded-md border border-white/10 bg-black object-contain p-1"
              />
              <div>
                <p className="text-lg font-semibold tracking-wide">
                  Manish Goswami
                </p>
                <p className="text-[9px] uppercase tracking-[0.1em] sm:text-xs text-[#66B2FF]">
                  Founder • Coach • Consultant
                </p>
              </div>
            </a>
            <div className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.page}
                  href={item.path}
                  aria-current={page === item.page ? "page" : undefined}
                  onClick={(event) => {
                    if (
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.shiftKey &&
                      !event.altKey
                    ) {
                      event.preventDefault();
                      navigateTo(item.page);
                    }
                  }}
                  className={`text-sm font-medium transition hover:text-white ${page === item.page ? "text-[#8CC7FF]" : "text-white/75"}`}
                >
                  {item.label}
                </a>
              ))}
              <SocialLinks compact />
              <Button
                href="/work-with-me#book"
                className="rounded-full px-5 py-2.5"
              >
                Request a Consultation
              </Button>
            </div>
            <button
              ref={menuToggle}
              aria-controls="mobile-navigation"
              className="lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </nav>
          {mobileOpen && (
            <div
              id="mobile-navigation"
              className="border-t border-white/10 py-5 lg:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.page}
                  href={item.path}
                  aria-current={page === item.page ? "page" : undefined}
                  onClick={(event) => {
                    if (
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.shiftKey &&
                      !event.altKey
                    ) {
                      event.preventDefault();
                      navigateTo(item.page);
                    }
                  }}
                  className="mb-2 block w-full rounded-xl border border-white/10 px-4 py-3 text-left"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 border-t border-white/10 pt-4">
                <SocialLinks />
              </div>
            </div>
          )}
        </Container>
        <nav className="platform-quick-nav" aria-label="Featured platforms">
          <a
            className="platform-quick-label"
            href="/#platforms"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("home", "#platforms");
            }}
          >
            Explore my platforms <ArrowRight size={14} aria-hidden="true" />
          </a>
          <div>
            {ventures.map((venture) => (
              <a
                key={venture.name}
                href={venture.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {venture.name}
                <ExternalLink size={12} aria-hidden="true" />
                <span className="platform-sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </nav>
      </header>
      <Container className="pb-20">
        <main id="main-content" tabIndex={-1} className="pt-8 sm:pt-12">
          {page === "home" && <HomePage />}
          {page === "about" && <AboutPage />}
          {page === "work-with-me" && <WorkWithMePage />}
          {page === "contact" && <ContactPage navigateTo={navigateTo} />}
        </main>
        <Footer navigateTo={navigateTo} />
      </Container>
      {page !== "work-with-me" && (
      <a
        aria-label="Contact Manish on WhatsApp (opens in a new tab)"
        href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-4 sm:px-5 sm:py-3 text-sm font-semibold text-[#05240f] shadow-[0_12px_35px_rgba(37,211,102,0.4)]"
      >
        <MessageCircle size={19} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      )}
    </div>
  );
};

const PlatformShowcase = () => (
  <section
    tabIndex={-1}
    id="platforms"
    className="platform-showcase"
    aria-labelledby="platforms-heading"
  >
    <div className="platform-intro">
      <div>
        <p className="platform-eyebrow">
          <span /> The Manish Goswami ecosystem
        </p>
        <h2 id="platforms-heading">One founder. Four ways to move forward.</h2>
        <p className="platform-description">
          Explore Manish Goswami’s platforms for personal transformation,
          careers, digital growth and global opportunities. Choose the one that
          fits your next step.
        </p>
      </div>
      <span className="platform-invitation">
        Choose your direction <ArrowRight size={18} aria-hidden="true" />
      </span>
    </div>
    <div className="platform-grid">
      {ventures.map((venture, index) => (
        <a
          key={venture.name}
          href={venture.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`platform-card platform-card-${index}`}
        >
          <div className="platform-card-top">
            <span className="platform-icon" aria-hidden="true">
              {venture.icon}
            </span>
            <span className="platform-category">{venture.category}</span>
            <ExternalLink size={17} aria-hidden="true" />
          </div>
          <h3>{venture.name}</h3>
          <p>
            {venture.points[0]}. {venture.points[1]}.
          </p>
          <span className="platform-goal">{venture.action}</span>
          <span className="platform-action">
            Visit {venture.name}
            <ArrowRight size={18} aria-hidden="true" />
          </span>
          <span className="platform-domain">
            {new URL(venture.href).hostname}
            <span className="platform-new-tab">Opens in a new tab</span>
          </span>
        </a>
      ))}
    </div>
  </section>
);

const ConsultationApproach = () => (
  <section
    className={sectionClass}
    aria-labelledby="consultation-approach-heading"
  >
    <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
      Work directly with Manish
    </p>
    <h2
      id="consultation-approach-heading"
      className="mt-3 text-3xl font-semibold"
    >
      Your goals first. A practical way forward.
    </h2>
    <p className="mt-4 max-w-3xl leading-8 text-white/75">
      You may be working on yourself, choosing a career, growing a business or
      exploring life abroad. Start with the decision in front of you. I’ll help
      you see how the pieces fit together and choose your next steps.
    </p>
    <div className="mt-7 grid gap-5 md:grid-cols-3">
      {[
        {
          title: "1. Understand the situation",
          copy: "Bring your questions, priorities and challenges. We start with your circumstances and what you want to change.",
        },
        {
          title: "2. Explore the options",
          copy: "Identify the coaching or consulting area that fits your needs, drawing on the relevant platform when useful.",
        },
        {
          title: "3. Identify practical next steps",
          copy: "Turn the conversation into clear actions, resources and the right connections for your next stage.",
        },
      ].map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-white/10 bg-[#0B111E] p-6"
        >
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
        </article>
      ))}
    </div>
  </section>
);

const HomePage = () => (
  <>
    <section className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C1221] via-[#090E19] to-[#070A12] p-8 shadow-[0_0_100px_rgba(34,119,255,0.18)] lg:grid-cols-[1.12fr_0.88fr] lg:p-12">
      <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-[#2d87ff]/20 blur-3xl" />
      <div className="relative self-center">
        <p className="text-xs uppercase tracking-[0.28em] text-[#66B2FF]">
          Founder • Coach • Consultant
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
          Clarity for Your Life.
          <br />
          <span className="text-[#5EAFFF]">Direction for What’s Next.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
          I’m Manish Goswami. I help individuals and businesses make informed
          decisions, navigate challenges, recognize opportunities, and move
          forward with greater clarity across personal development, careers,
          education, business, and global opportunities.
        </p>
        <div className="mt-8 grid gap-3 sm:flex">
          <Button href="/work-with-me#book">
            Book a Consultation <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" href="/#services">
            Explore My Services
          </Button>
        </div>
        <p className="mt-7 text-sm text-white/60">
          Personal Transformation • Career & Education • Brand & Business •
          Global Opportunities
        </p>
      </div>
      <div className="relative rounded-3xl border border-[#66B2FF]/25 bg-[#070C14] p-3">
        <img
          src="/hero-960.webp"
          srcSet="/hero-480.webp 480w, /hero-960.webp 960w"
          sizes="(min-width:1024px) 42vw, 90vw"
          width="960"
          height="1437"
          fetchPriority="high"
          alt="Portrait of Manish Goswami, Founder, Coach and Consultant"
          className="h-full max-h-[620px] w-full rounded-[1.25rem] object-cover"
        />
      </div>
    </section>

    <AudienceSection />
    <section tabIndex={-1} id="services" className={sectionClass}>
      <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
        How I can help
      </p>
      <h2 className="mt-3 text-3xl font-semibold">
        Four areas of support. Your goals at the centre.
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>

    <ConsultationApproach />
    <PlatformShowcase />

    <section className={`${sectionClass} grid gap-8 lg:grid-cols-[1fr_0.8fr]`}>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
          Start with one conversation
        </p>
        <h2 className="mt-3 text-3xl font-semibold">One-on-One Consultation</h2>
        <p className="mt-4 max-w-2xl leading-7 text-white/70">
          A private 40-minute Google Meet session with Manish to discuss your
          goals in personal transformation, career and education, digital growth
          or global opportunities—and identify practical next steps.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/75">
          <span className="rounded-full border border-white/15 px-4 py-2">
            40 minutes
          </span>
          <span className="rounded-full border border-white/15 px-4 py-2">
            Google Meet
          </span>
          <span className="rounded-full border border-[#66B2FF]/40 bg-[#66B2FF]/10 px-4 py-2 font-semibold text-[#A8D4FF]">
            ₹5,000
          </span>
        </div>
      </div>
      <div className="flex items-center rounded-2xl border border-[#66B2FF]/25 bg-[#0B1728] p-7">
        <div>
          <BadgeCheck className="text-[#66B2FF]" size={28} />
          <p className="mt-4 text-lg font-semibold">
            Confidential. Practical. Personal.
          </p>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Choose your focus and preferred time, then prepare a consultation
            request. Availability is confirmed personally.
          </p>
          <Button href="/work-with-me#book" className="mt-5">
            Request a Consultation
          </Button>
        </div>
      </div>
    </section>
    <FinalContact />
  </>
);

const AudienceSection = () => (
  <section className={sectionClass} aria-labelledby="audience-heading">
    <p className="text-xs uppercase tracking-[0.25em] text-[#8CC7FF]">
      A perspective. A conversation. A next step.
    </p>
    <h2 id="audience-heading" className="mt-3 text-3xl font-semibold">
      Guidance for the decisions in front of you.
    </h2>
    <p className="mt-4 max-w-3xl leading-8 text-white/75">
      For men seeking personal direction, students and professionals exploring
      their next move, and individuals or businesses building a stronger
      presence. Online consultations make it possible to work together across
      locations and time zones.
    </p>
    <div className="mt-7 rounded-2xl border border-white/15 bg-[#09121f] p-6">
      <h3 className="text-xl font-semibold">Here from YouTube?</h3>
      <p className="mt-3 leading-7 text-white/75">
        My public conversations explore global affairs, geopolitics, economics,
        trade, business, technology and the opportunities they create. Here, you
        can learn about my work and find practical guidance relevant to your own
        life.
      </p>
      <div className="mt-4 flex flex-wrap gap-5">
        <a
          className="inline-flex min-h-11 items-center gap-2 text-[#8CC7FF]"
          href="/about"
        >
          Meet Manish <ArrowRight size={16} />
        </a>
        <a
          className="inline-flex min-h-11 items-center gap-2 text-[#8CC7FF]"
          href={YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube <ExternalLink size={15} />
          <span className="sr-only"> (new tab)</span>
        </a>
      </div>
    </div>
  </section>
);

const FinalContact = () => (
  <section
    className={`${sectionClass} text-center`}
    aria-labelledby="final-contact-heading"
  >
    <h2 id="final-contact-heading" className="text-3xl font-semibold">
      Not sure where to begin?
    </h2>
    <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/75">
      Tell me what you’re considering. We can clarify whether a consultation or
      one of the platforms is a useful next step.
    </p>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <a className="primary-link" href="/work-with-me#book">
        Request a Consultation
      </a>
      <a className="secondary-link" href="/contact">
        Contact Manish
      </a>
    </div>
  </section>
);

const PrivacyNotice = () => (
  <details
    id="privacy"
    className="mt-7 scroll-mt-40 border-t border-white/15 pt-5 text-sm leading-7 text-white/75"
  >
    <summary className="min-h-11 cursor-pointer text-[#a8d4ff]">
      Privacy, contact and professional scope
    </summary>
    <div className="mt-3 space-y-3">
      <p>
        The request form keeps your details in page memory only. Leaving or
        refreshing clears them. It does not send them to a website database or
        analytics service. Opening a WhatsApp or email draft shares the entered
        details with that provider; press Send in that app to transmit your
        enquiry. Those services handle information under their own terms and
        privacy practices.
      </p>
      <p>
        Use only the details needed for an initial reply. Do not include
        identity documents, payment credentials or sensitive medical
        information. Enquiries and subsequent replies are handled through the
        chosen email or messaging provider. For questions about your enquiry or
        a request to delete correspondence, email{" "}
        <a className="underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
      <p>
        Non-personal campaign labels from links may be kept in your browser’s
        session storage for this visit. No advertising trackers or analytics
        beacons are installed. They are included in a consultation draft only if
        you select the optional checkbox. Do not put personal information in
        campaign URLs. Your hosting provider may maintain technical access logs
        under its own settings.
      </p>
      <p>{PROFESSIONAL_BOUNDARIES}</p>
    </div>
  </details>
);

const ServiceCard = ({
  title,
  copy,
  icon,
  points,
  name,
  href,
  audience,
}: Service) => (
  <article className="flex flex-col rounded-2xl border border-white/10 bg-[#0B111E] p-6 transition hover:border-[#66B2FF]/45">
    <div className="inline-flex self-start rounded-xl border border-[#66B2FF]/30 bg-[#66B2FF]/10 p-2.5 text-[#8fc7ff]">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    <p className="mt-3 text-sm font-medium text-[#a8d4ff]">{audience}</p>
    <p className="mt-3 text-sm leading-7 text-white/70">{copy}</p>
    <ul className="mt-4 mb-6 space-y-2 text-sm text-white/60">
      {points.map((point) => (
        <li key={point} className="flex gap-2">
          <span className="text-[#66B2FF]">✓</span>
          {point}
        </li>
      ))}
    </ul>
    {name === "Infinity Global Advisory" && (
      <p className="mb-5 text-xs leading-6 text-white/70">
        General informational guidance only. Regulated immigration advice and
        representation require an authorized professional in the relevant
        jurisdiction.
      </p>
    )}
    <a
      href={`/work-with-me?focus=${encodeURIComponent(name)}#book`}
      className="mb-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#8CC7FF]"
    >
      Request guidance <ArrowRight size={16} />
      <span className="sr-only"> for {title}</span>
    </a>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-[#8CC7FF]"
    >
      Explore {name}
      <ExternalLink size={14} />
      <span className="platform-sr-only"> (opens in a new tab)</span>
    </a>
  </article>
);

const AboutPage = () => (
  <>
    <section className={sectionClass}>
      <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
        About
      </p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
        Manish Goswami
      </h1>
      <p className="mt-4 text-xl text-white/75">Founder • Coach • Consultant</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
        <div className="space-y-8 text-white/72">
          <article>
            <h2 className="text-2xl font-semibold text-white">
              Guidance built around the person
            </h2>
            <p className="mt-3 leading-8">
              I’m Manish Goswami, a founder, coach and consultant helping
              individuals make clearer decisions and take practical action. My
              work spans men’s personal transformation, career counselling and
              education, personal branding, digital marketing, citizenship and
              residency.
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold text-white">
              A connected ecosystem
            </h2>
            <p className="mt-3 leading-8">
              I founded EvoLeveX for men’s transformation, VidyaInfinity for
              careers and education, InfinityGrowthTech for brands and digital
              business growth and Infinity Global Advisory for citizenship and
              residency. Each platform has a distinct purpose; one-to-one
              consultations bring the right support together around you.
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold text-white">My approach</h2>
            <p className="mt-3 leading-8">
              Good guidance does not hand you a generic answer. It asks better
              questions, understands your context and turns clarity into
              practical action. Every conversation is direct, confidential and
              focused on decisions you can use.
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold text-white">
              What I believe
            </h2>
            <p className="mt-3 leading-8">
              Growth starts with understanding yourself and making deliberate
              choices. Whether you’re building confidence, choosing an education
              path, creating a brand or considering a global move, your
              decisions should fit your goals and circumstances.
            </p>
          </article>
        </div>
        <aside className="rounded-2xl border border-white/10 bg-[#0A101A] p-7">
          <h2 className="text-xl font-semibold">Areas of focus</h2>
          <div className="mt-5 space-y-3">
            {services
              .map((service) => service.title)
              .map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-white/10 p-4 text-sm text-white/75"
                >
                  <Target size={17} className="shrink-0 text-[#66B2FF]" />
                  {item}
                </div>
              ))}
          </div>
          <Button href="/work-with-me#book" className="mt-6 w-full">
            Work With Me
          </Button>
        </aside>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ventures.map((venture) => (
          <a
            key={venture.name}
            href={venture.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-[#66B2FF]/40"
          >
            {venture.name} <ExternalLink className="ml-1 inline" size={13} />
          </a>
        ))}
      </div>
    </section>
    <ConsultationApproach />
    <FinalContact />
  </>
);

const WorkWithMePage = () => (
  <>
    <section className={sectionClass}>
      <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
        Work with me
      </p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
        One clear conversation can change your direction.
      </h1>
      <p className="mt-4 max-w-3xl text-xl leading-8 text-white/70">
        Work one-to-one with Manish Goswami on the decisions that matter to you.
        Choose personal transformation, career and education, branding and
        digital growth or citizenship and residency. Start with your questions
        and leave with a clearer direction.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
    <ConsultationApproach />
    <BookingCard />
  </>
);

const ContactPage = ({
  navigateTo,
}: {
  navigateTo: (page: Page, hash?: string) => void;
}) => (
  <section className={sectionClass}>
    <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">
      Contact
    </p>
    <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
      Let’s talk about what’s next.
    </h1>
    <p className="mt-4 max-w-2xl text-xl leading-8 text-white/70">
      Speak directly with Manish about personal transformation, career and
      education, branding and digital marketing or global opportunities. Tell me
      where you are and what you want to work towards.
    </p>
    <div className="mt-6 flex flex-wrap gap-4">
      {ventures.map((venture) => (
        <a
          key={venture.name}
          href={venture.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#8CC7FF]"
        >
          {venture.name}
          <ExternalLink size={14} />
          <span className="platform-sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
    <p className="mt-6 text-sm leading-7 text-white/75">
      Prefer to call? <a className="inline-flex min-h-11 items-center gap-2 text-[#8CC7FF] underline" href={`tel:${WHATSAPP}`}><Phone size={16} />Call {WHATSAPP}</a>
    </p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      <a
        href={`mailto:${EMAIL}`}
        className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"
      >
        <Mail className="text-[#66B2FF]" />
        <p className="mt-4 text-sm text-white/50">Email</p>
        <p className="mt-1">{EMAIL}</p>
      </a>
      <a
        href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"
      >
        <Phone className="text-[#66B2FF]" />
        <p className="mt-4 text-sm text-white/50">WhatsApp</p>
        <p className="mt-1">{WHATSAPP}</p>
      </a>
      <a
        href={YOUTUBE}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"
      >
        <Youtube className="text-[#66B2FF]" />
        <p className="mt-4 text-sm text-white/50">YouTube</p>
        <p className="mt-1">@manishsirg</p>
      </a>
      <a
        href="https://instagram.com/manishsirgg"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"
      >
        <Instagram className="text-[#66B2FF]" />
        <p className="mt-4 text-sm text-white/50">Instagram</p>
        <p className="mt-1">@manishsirgg</p>
      </a>
      <a
        href="https://x.com/manishsirg"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"
      >
        <XSocialIcon size={24} />
        <p className="mt-4 text-sm text-white/50">X</p>
        <p className="mt-1">@manishsirg</p>
      </a>
      <div className="rounded-2xl border border-white/10 bg-[#0B111A] p-6">
        <GraduationCap className="text-[#66B2FF]" />
        <p className="mt-4 text-sm text-white/50">Request online</p>
        <a
          href="/work-with-me#book"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("work-with-me", "#book");
          }}
          className="mt-1 inline-flex items-center gap-1 text-[#8CC7FF]"
        >
          Request a Consultation <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </section>
);

const Footer = ({ navigateTo }: { navigateTo: (page: Page) => void }) => (
  <footer className="mt-20 rounded-3xl border border-white/10 bg-[#080d16] p-8 sm:p-10">
    <div className="flex flex-col justify-between gap-8 md:flex-row">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            width="44"
            height="44"
            alt="Manish Goswami logo"
            className="h-11 w-11 rounded-md border border-white/10 bg-black p-1"
          />
          <div>
            <p className="font-semibold">Manish Goswami</p>
            <p className="text-[9px] uppercase tracking-[0.1em] sm:text-xs text-[#8CC7FF]">
              Founder • Coach • Consultant
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
          One-to-one guidance for personal transformation, career and education,
          brand and digital business growth, citizenship and residency. Explore
          four focused platforms or start a conversation with Manish.
          Consultations are available online worldwide, subject to time zones
          and service scope.
        </p>
      </div>
      <SocialLinks />
    </div>
    <div className="mt-7 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-white/65">
      {navItems.map((item) => (
        <a
          key={item.page}
          href={item.path}
          onClick={(event) => {
            event.preventDefault();
            navigateTo(item.page);
          }}
          className="hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </div>
    <PrivacyNotice />
    <p className="mt-6 text-xs text-white/60">
      © Manish Goswami. All rights reserved.
    </p>
  </footer>
);

export default App;
