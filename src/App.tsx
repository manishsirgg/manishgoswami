import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ExternalLink, Menu, X } from 'lucide-react';

type Page = 'home' | 'about' | 'insights' | 'work-with-me' | 'contact';

type BlogCategory =
  | 'Psychology'
  | 'Business Strategy'
  | 'Power & Influence'
  | 'Society & Systems'
  | 'Personal Growth';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: BlogCategory;
}

const SITE_URL = 'https://manishgoswami.com';
const EMAIL = 'hello@manishgoswami.com';

const pages: Array<{ label: string; path: `/${string}`; page: Page }> = [
  { label: 'Home', path: '/', page: 'home' },
  { label: 'About', path: '/about', page: 'about' },
  { label: 'Insights', path: '/insights', page: 'insights' },
  { label: 'Work With Me', path: '/work-with-me', page: 'work-with-me' },
  { label: 'Contact', path: '/contact', page: 'contact' },
];

const identityStack = [
  {
    role: 'Strategist',
    description: 'Designs decision frameworks that convert complexity into decisive execution.',
  },
  {
    role: 'Entrepreneur',
    description: 'Builds scalable ventures by compounding systems, leverage, and disciplined focus.',
  },
  {
    role: 'Coach',
    description: 'Develops high-performance thinking for leaders facing pressure, growth, and transition.',
  },
  {
    role: 'Consultant',
    description: 'Advises founders and operators on clarity, positioning, and strategic momentum.',
  },
  {
    role: 'Author',
    description: 'Writes on psychology, power, systems, and the architecture of modern influence.',
  },
];

const featuredPosts: BlogPost[] = [
  {
    slug: 'the-clarity-loop',
    title: 'The Clarity Loop: Why Most Ambition Dies in Noise',
    excerpt: 'A practical model for reducing cognitive drag and making better strategic decisions every week.',
    date: '2026-03-22',
    readTime: '7 min read',
    category: 'Psychology',
  },
  {
    slug: 'positioning-without-posturing',
    title: 'Positioning Without Posturing',
    excerpt: 'Authority is not performance. It is consistency between what you think, build, and ship.',
    date: '2026-03-07',
    readTime: '6 min read',
    category: 'Power & Influence',
  },
  {
    slug: 'strategy-as-a-system',
    title: 'Strategy Is a System, Not a Deck',
    excerpt: 'How elite operators design strategic engines that survive uncertainty and scale intelligently.',
    date: '2026-02-16',
    readTime: '9 min read',
    category: 'Business Strategy',
  },
  {
    slug: 'status-games-and-modern-work',
    title: 'Status Games and Modern Work',
    excerpt: 'A lens for understanding institutions, incentives, and why talent often underperforms structure.',
    date: '2026-01-29',
    readTime: '8 min read',
    category: 'Society & Systems',
  },
  {
    slug: 'identity-before-output',
    title: 'Identity Before Output',
    excerpt: 'Sustainable performance begins with a personal operating system—not motivation spikes.',
    date: '2026-01-05',
    readTime: '5 min read',
    category: 'Personal Growth',
  },
];

const pageMeta: Record<Page, { title: string; description: string }> = {
  home: {
    title: 'Manish Goswami — Strategist. Entrepreneur. Architect of High-Performance Systems.',
    description:
      'Personal authority platform of Manish Goswami focused on strategy, psychology, systems, and high-performance execution.',
  },
  about: {
    title: 'About | Manish Goswami',
    description:
      'Read the philosophy, journey, and mission of Manish Goswami—strategist, entrepreneur, and systems architect.',
  },
  insights: {
    title: 'Insights | Manish Goswami',
    description:
      'Essays on psychology, business strategy, power, systems, and personal growth.',
  },
  'work-with-me': {
    title: 'Work With Me | Manish Goswami',
    description:
      'Consulting, mentorship, strategic advisory, and speaking engagements for leaders and organizations.',
  },
  contact: {
    title: 'Contact | Manish Goswami',
    description: 'Get in touch for strategic advisory, speaking requests, mentorship, and partnerships.',
  },
};

const inferPageFromPath = (path: string): Page => {
  const found = pages.find((item) => item.path === path);
  return found?.page ?? 'home';
};

const toPath = (page: Page) => pages.find((item) => item.page === page)?.path ?? '/';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const BlogCard = ({ post }: { post: BlogPost }) => (
  <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
    <p className="text-xs uppercase tracking-[0.24em] text-[#4DA3FF]">{post.category}</p>
    <h3 className="mt-4 text-xl font-semibold leading-tight text-white">{post.title}</h3>
    <p className="mt-3 text-sm leading-7 text-white/70">{post.excerpt}</p>
    <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/50">
      <span className="flex items-center gap-2">
        <CalendarDays size={14} />
        {formatDate(post.date)}
      </span>
      <span>{post.readTime}</span>
    </div>
  </article>
);

const SectionTitle = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => (
  <div className="max-w-3xl">
    <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">{eyebrow}</p>
    <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
    {body ? <p className="mt-5 text-base leading-8 text-white/70">{body}</p> : null}
  </div>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(() => inferPageFromPath(window.location.pathname));

  useEffect(() => {
    const handlePop = () => setCurrentPage(inferPageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    const meta = pageMeta[currentPage];
    document.title = meta.title;

    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', name);
        else tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateMetaTag('description', meta.description);
    updateMetaTag('og:title', meta.title, true);
    updateMetaTag('og:description', meta.description, true);
    updateMetaTag('og:type', currentPage === 'insights' ? 'website' : 'profile', true);
    updateMetaTag('og:url', `${SITE_URL}${toPath(currentPage)}`, true);
  }, [currentPage]);

  const articleSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: featuredPosts.map((post, index) => ({
        '@type': 'Article',
        position: index + 1,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        articleSection: post.category,
        url: `${SITE_URL}/insights/${post.slug}`,
        author: {
          '@type': 'Person',
          name: 'Manish Goswami',
        },
      })),
    }),
    [],
  );

  const navigate = (page: Page) => {
    const path = toPath(page);
    window.history.pushState({}, '', path);
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030406] text-white selection:bg-[#0A84FF] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button className="text-left" onClick={() => navigate('home')}>
            <p className="text-sm uppercase tracking-[0.28em] text-[#4DA3FF]">Manish Goswami</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
              Strategist. Entrepreneur. Systems Architect.
            </p>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {pages.map((item) => (
              <button
                key={item.page}
                className={`text-xs uppercase tracking-[0.2em] transition ${
                  currentPage === item.page ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                onClick={() => navigate(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
            <div className="grid gap-4">
              {pages.map((item) => (
                <button
                  key={item.page}
                  className="text-left text-xs uppercase tracking-[0.2em] text-white/80"
                  onClick={() => navigate(item.page)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {currentPage === 'home' ? (
          <>
            <section className="border-b border-white/10 pb-20 md:pb-28">
              <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">Personal Authority Platform</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
                Build Smarter. Think Deeper. Win Bigger.
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
                I help individuals and businesses unlock clarity, strategy, and execution power.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('work-with-me')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Work With Me <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('insights')}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/90"
                >
                  Explore Insights
                </button>
              </div>
            </section>

            <section className="border-b border-white/10 py-20 md:py-24">
              <SectionTitle
                eyebrow="Identity Stack"
                title="Designed for leverage, built for consequence."
                body="This platform is intentionally focused on one thing: creating strategic advantage for people and organizations operating in high-stakes environments."
              />
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {identityStack.map((item) => (
                  <div key={item.role} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-white/10 py-20 md:py-24">
              <SectionTitle
                eyebrow="Authority"
                title="Founder of Infinity Global Advisory"
                body="A strategic ecosystem focused on execution infrastructure across consulting, growth systems, and enterprise acceleration."
              />
              <div className="mt-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/65">
                {['Infinity Global Advisory', 'Infinity Growth Tech', 'Vidya Infinity', 'EvoLeveX'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/60">
                Infinity Global Advisory — where execution happens.
                <a
                  className="ml-2 inline-flex items-center gap-1 text-[#4DA3FF]"
                  href="https://infinityglobaladvisory.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit ecosystem <ExternalLink size={14} />
                </a>
              </p>
            </section>

            <section className="border-b border-white/10 py-20 md:py-24">
              <div className="flex items-end justify-between gap-4">
                <SectionTitle
                  eyebrow="Featured Insights"
                  title="Writing that sharpens judgment."
                  body="Essays at the intersection of psychology, strategy, and systems thinking."
                />
                <button
                  onClick={() => navigate('insights')}
                  className="hidden text-xs uppercase tracking-[0.18em] text-white/70 md:block"
                >
                  View all insights
                </button>
              </div>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {featuredPosts.slice(0, 4).map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>

            <section className="border-b border-white/10 py-20 md:py-24">
              <SectionTitle
                eyebrow="Thinking"
                title="My philosophy is simple: intelligence must become execution."
              />
              <div className="mt-10 grid gap-8 text-white/75 md:grid-cols-2">
                <p className="leading-8">
                  Most people do not lose because they lack ambition. They lose because their decisions are fragmented,
                  reactive, and poorly sequenced.
                </p>
                <p className="leading-8">
                  Sustainable advantage comes from psychological precision, strategic restraint, and systems that perform
                  under pressure.
                </p>
              </div>
            </section>

            <section className="border-b border-white/10 py-20 md:py-24">
              <SectionTitle
                eyebrow="Work With Me"
                title="Focused engagements for serious builders."
              />
              <div className="mt-10 grid gap-4 text-sm uppercase tracking-[0.18em] text-white/80 md:grid-cols-4">
                {['Consulting', 'Mentorship', 'Strategy', 'Speaking'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center">
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('work-with-me')}
                className="mt-10 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white"
              >
                Explore Engagements
              </button>
            </section>

            <section className="pt-20 md:pt-24">
              <SectionTitle
                eyebrow="Join the Inner Circle"
                title="Weekly strategic notes for leaders who value clarity."
                body="No noise. No trends. Just practical thinking frameworks and high-performance ideas."
              />
              <form className="mt-10 flex flex-col gap-4 md:max-w-xl md:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Enter your best email"
                  className="h-12 flex-1 rounded-full border border-white/15 bg-white/[0.02] px-5 text-sm text-white placeholder:text-white/35"
                />
                <button className="h-12 rounded-full bg-[#0A84FF] px-8 text-xs font-semibold uppercase tracking-[0.16em]">
                  Subscribe
                </button>
              </form>
            </section>
          </>
        ) : null}

        {currentPage === 'about' ? (
          <section className="space-y-10">
            <SectionTitle
              eyebrow="About"
              title="I build systems for people who carry serious responsibility."
            />
            <p className="max-w-4xl text-lg leading-9 text-white/75">
              My work began with one obsession: why high-potential people underperform in critical moments. Across
              advisory, entrepreneurship, and coaching, I have seen the same pattern—talent is common, strategic clarity
              is rare. I help leaders close that gap.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-lg font-semibold">Philosophy</h3>
                <p className="mt-4 text-sm leading-8 text-white/70">
                  Clarity precedes scale. Identity precedes influence. Systems precede results. My frameworks are built
                  to turn insight into repeatable performance.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-lg font-semibold">Mission</h3>
                <p className="mt-4 text-sm leading-8 text-white/70">
                  To develop decision quality and strategic depth in founders, executives, and ambitious professionals so
                  they can build meaningful outcomes with less noise and more precision.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {currentPage === 'insights' ? (
          <section>
            <SectionTitle
              eyebrow="Insights"
              title="The content engine: psychology, strategy, and influence."
              body="Every article is structured for depth, SEO discoverability, and practical application."
            />
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/65">
              {['Psychology', 'Business Strategy', 'Power & Influence', 'Society & Systems', 'Personal Growth'].map(
                (category) => (
                  <span key={category} className="rounded-full border border-white/20 px-4 py-2">
                    {category}
                  </span>
                ),
              )}
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
          </section>
        ) : null}

        {currentPage === 'work-with-me' ? (
          <section className="space-y-12">
            <SectionTitle
              eyebrow="Work With Me"
              title="Strategic engagements for operators building at the next level."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-lg font-semibold">Who this is for</h3>
                <p className="mt-3 text-sm leading-8 text-white/70">
                  Founders, growth-stage teams, and professionals navigating scale, complexity, or high-stakes decision
                  environments.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-lg font-semibold">Problems I solve</h3>
                <p className="mt-3 text-sm leading-8 text-white/70">
                  Strategic drift, inconsistent execution, weak positioning, decision fatigue, and misaligned growth
                  priorities.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {['1:1 Consulting', 'Business Strategy', 'Mentorship', 'Speaking'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 p-6">
                  <h4 className="text-base font-semibold">{item}</h4>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    Tailored engagement designed around your strategic objectives and execution constraints.
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('contact')}
              className="rounded-full bg-[#0A84FF] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              Book Call / Contact
            </button>
          </section>
        ) : null}

        {currentPage === 'contact' ? (
          <section className="space-y-8">
            <SectionTitle
              eyebrow="Contact"
              title="For advisory, speaking, and strategic conversations."
              body="Share context, goals, and timelines. Relevant inquiries receive a response within 48 hours."
            />
            <form
              className="grid max-w-3xl gap-4"
              onSubmit={(event: FormEvent) => {
                event.preventDefault();
                alert('Thanks. Your message has been captured.');
              }}
            >
              <input
                required
                className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4"
                placeholder="Full name"
              />
              <input
                required
                type="email"
                className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4"
                placeholder="Email address"
              />
              <textarea
                required
                className="min-h-36 rounded-xl border border-white/15 bg-white/[0.02] p-4"
                placeholder="Tell me about your challenge"
              />
              <button className="h-12 w-fit rounded-full bg-[#0A84FF] px-8 text-xs font-semibold uppercase tracking-[0.16em]">
                Send Inquiry
              </button>
            </form>
            <p className="text-sm text-white/65">Direct email: {EMAIL}</p>
          </section>
        ) : null}
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.16em] text-white/50">
          <p>© {new Date().getFullYear()} Manish Goswami</p>
          <p>Built for clarity, authority, and depth.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
