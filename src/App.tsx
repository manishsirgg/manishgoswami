import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ExternalLink, Mail, Menu, Phone, Search, Youtube, X } from 'lucide-react';

type StaticPage = 'home' | 'about' | 'insights' | 'work-with-me' | 'contact';
type Page = StaticPage | 'insight-detail';
type BlogCategory = 'Psychology' | 'Business Strategy' | 'Society & Systems' | 'Power & Influence' | 'Personal Growth';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  content: string[];
}

const SITE_URL = 'https://manishgoswami.com';
const EMAIL = 'hello@manishgoswami.com';
const WHATSAPP = '+91 89896 01701';

const navItems: Array<{ label: string; page: StaticPage; path: string }> = [
  { label: 'Home', page: 'home', path: '/' },
  { label: 'About', page: 'about', path: '/about' },
  { label: 'Insights', page: 'insights', path: '/insights' },
  { label: 'Work With Me', page: 'work-with-me', path: '/work-with-me' },
  { label: 'Contact', page: 'contact', path: '/contact' },
];

const blogPosts: BlogPost[] = [
  {
    slug: 'clarity-is-a-competitive-advantage',
    title: 'Clarity Is a Competitive Advantage in a Distracted World',
    excerpt: 'Most people don’t lose because they lack talent. They lose because they lack strategic clarity.',
    date: '2026-03-18',
    readTime: '7 min read',
    category: 'Psychology',
    content: [
      'In high-pressure environments, confusion is expensive. Every unclear decision compounds downstream friction.',
      'Clarity is not a motivational slogan. It is a practical operating system for better thinking, cleaner priorities, and stronger execution.',
      'If you want better outcomes, reduce mental noise first. Then design systems that keep momentum stable even when circumstances change.',
    ],
  },
  {
    slug: 'strategic-positioning-for-founders',
    title: 'Strategic Positioning for Founders Who Want Long-Term Authority',
    excerpt: 'Positioning is not branding decoration—it is how markets understand your value and relevance.',
    date: '2026-03-04',
    readTime: '8 min read',
    category: 'Business Strategy',
    content: [
      'Founders often over-focus on visibility and under-focus on strategic differentiation. The result is noise, not authority.',
      'Strong positioning answers one critical question: Why you, and why now?',
      'When your message, offer, and execution standards align, trust compounds naturally across audiences and channels.',
    ],
  },
  {
    slug: 'discipline-over-motivation',
    title: 'Discipline Over Motivation: The Real Driver of Sustainable Growth',
    excerpt: 'Motivation is emotional. Discipline is structural. Sustainable growth requires structure.',
    date: '2026-02-22',
    readTime: '6 min read',
    category: 'Personal Growth',
    content: [
      'People wait for motivation, but progress belongs to those who build repeatable routines.',
      'Discipline is not harshness. It is self-respect in action, repeated over time.',
      'The more your systems reduce decision fatigue, the more energy you preserve for meaningful execution.',
    ],
  },
  {
    slug: 'power-behavior-and-modern-influence',
    title: 'Power, Behavior, and the Architecture of Modern Influence',
    excerpt: 'Influence today is less about volume and more about precision, timing, and credibility.',
    date: '2026-02-05',
    readTime: '9 min read',
    category: 'Power & Influence',
    content: [
      'Power dynamics are shaped by perception, incentives, and consistency of behavior.',
      'If your public narrative and private standards are disconnected, influence erodes quickly.',
      'Real authority is built through coherent action: think clearly, communicate clearly, and execute consistently.',
    ],
  },
  {
    slug: 'systems-shape-society',
    title: 'Systems Shape Society More Than Individual Intentions',
    excerpt: 'Outcomes are often produced by systems, not individual effort alone.',
    date: '2026-01-15',
    readTime: '7 min read',
    category: 'Society & Systems',
    content: [
      'People often overestimate personal intention and underestimate system design.',
      'When incentives are misaligned, even talented individuals struggle to produce healthy outcomes.',
      'Better systems create better defaults. Better defaults create better long-term behavior.',
    ],
  },
];

const categories: Array<'All' | BlogCategory> = ['All', 'Psychology', 'Business Strategy', 'Society & Systems', 'Power & Influence', 'Personal Growth'];

const pageMeta: Record<StaticPage, { title: string; description: string }> = {
  home: {
    title: 'Manish Goswami | Strategist, Entrepreneur, Coach & Consultant',
    description:
      'Manish Goswami is a strategist, entrepreneur, coach, consultant, and author helping individuals and businesses gain clarity, build systems, and execute with discipline.',
  },
  about: {
    title: 'About Manish Goswami | Strategist, Entrepreneur & Author',
    description:
      'Learn about Manish Goswami’s philosophy, journey, and approach to strategy, psychology, systems, and disciplined execution.',
  },
  insights: {
    title: 'Insights by Manish Goswami | Psychology, Business & Growth',
    description:
      'Ideas on psychology, business strategy, power, discipline, society, systems, and personal growth by Manish Goswami.',
  },
  'work-with-me': {
    title: 'Work With Manish Goswami | Consulting, Mentorship & Strategy',
    description:
      'Strategic guidance for individuals, founders, professionals, and businesses seeking clarity, direction, and execution.',
  },
  contact: {
    title: 'Contact Manish Goswami | Consulting, Mentorship & Speaking',
    description: 'Contact Manish Goswami for consulting, mentorship, speaking, collaborations, and strategic inquiries.',
  },
};

const inferRoute = (pathname: string): { page: Page; slug?: string } => {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized.startsWith('/insights/')) {
    return { page: 'insight-detail', slug: normalized.replace('/insights/', '') };
  }
  const match = navItems.find((item) => item.path === normalized);
  return { page: match?.page ?? 'home' };
};

const toPath = (page: StaticPage) => navItems.find((item) => item.page === page)?.path ?? '/';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const setMetaTag = (selector: string, attr: 'content' | 'href', value: string) => {
  const el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) return;
  el.setAttribute(attr, value);
};

const App = () => {
  const initialRoute = inferRoute(window.location.pathname);
  const [page, setPage] = useState<Page>(initialRoute.page);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(initialRoute.slug);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const activePost = useMemo(() => blogPosts.find((post) => post.slug === activeSlug) ?? blogPosts[0], [activeSlug]);

  useEffect(() => {
    const onPopState = () => {
      const route = inferRoute(window.location.pathname);
      setPage(route.page);
      setActiveSlug(route.slug);
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const isStaticPage = page !== 'insight-detail';
    const meta = isStaticPage ? pageMeta[page] : {
      title: `${activePost.title} | Insights by Manish Goswami`,
      description: activePost.excerpt,
    };

    const canonicalPath = page === 'insight-detail' ? `/insights/${activePost.slug}` : toPath(page as StaticPage);
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;

    document.title = meta.title;
    setMetaTag('meta[name="description"]', 'content', meta.description);
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);

    const schemaId = 'article-schema';
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    if (page === 'insight-detail') {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: activePost.title,
        description: activePost.excerpt,
        datePublished: activePost.date,
        dateModified: activePost.date,
        author: { '@type': 'Person', name: 'Manish Goswami' },
        publisher: { '@type': 'Person', name: 'Manish Goswami' },
        mainEntityOfPage: canonicalUrl,
      });
      document.head.appendChild(script);
    }
  }, [page, activePost]);

  const navigateTo = (nextPage: StaticPage, slug?: string) => {
    const path = slug ? `/insights/${slug}` : toPath(nextPage);
    window.history.pushState({}, '', path);
    setPage(slug ? 'insight-detail' : nextPage);
    setActiveSlug(slug);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const searchMatch = `${post.title} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase().trim());
      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  useEffect(() => setVisibleCount(4), [selectedCategory, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const onSubmit = (event: FormEvent<HTMLFormElement>, message: string) => {
    event.preventDefault();
    alert(message);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080B12]/90 backdrop-blur-md">
          <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
            <button onClick={() => navigateTo('home')} className="text-left">
              <p className="text-lg font-semibold tracking-wide">Manish Goswami</p>
              <p className="text-xs uppercase tracking-[0.24em] text-[#66B2FF]">Personal Brand Platform</p>
            </button>

            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('work-with-me')}
                className="rounded-full border border-[#66B2FF]/60 bg-[#66B2FF]/10 px-5 py-2.5 text-sm font-semibold text-[#9ECFFF] transition hover:bg-[#66B2FF]/20"
              >
                Work With Me
              </button>
            </div>

            <button className="lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {mobileOpen ? (
            <div className="border-t border-white/10 bg-[#080B12] px-5 py-6 sm:px-8 lg:hidden">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigateTo(item.page)}
                    className="rounded-xl border border-white/10 px-4 py-3 text-left text-base font-medium text-white"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => navigateTo('work-with-me')}
                  className="mt-2 rounded-xl border border-[#66B2FF]/50 bg-[#66B2FF]/10 px-4 py-3 text-base font-semibold text-[#A9D5FF]"
                >
                  Work With Me
                </button>
              </div>
            </div>
          ) : null}
        </header>

        <main className="pt-14">
          {page === 'home' ? (
            <HomePage navigateTo={navigateTo} onSubmit={onSubmit} />
          ) : null}

          {page === 'about' ? <AboutPage navigateTo={navigateTo} /> : null}

          {page === 'insights' ? (
            <InsightsPage
              posts={blogPosts}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              search={search}
              setSearch={setSearch}
              visiblePosts={visiblePosts}
              visibleCount={visibleCount}
              total={filteredPosts.length}
              onLoadMore={() => setVisibleCount((value) => value + 4)}
              openArticle={(slug) => navigateTo('insights', slug)}
            />
          ) : null}

          {page === 'insight-detail' ? (
            <InsightDetailPage post={activePost} navigateTo={navigateTo} onSubmit={onSubmit} />
          ) : null}

          {page === 'work-with-me' ? <WorkWithMePage onSubmit={onSubmit} /> : null}

          {page === 'contact' ? <ContactPage onSubmit={onSubmit} /> : null}
        </main>

        <Footer navigateTo={navigateTo} />
      </div>
    </div>
  );
};

const sectionClass = 'mt-20 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10 lg:p-14';

const HomePage = ({ navigateTo, onSubmit }: { navigateTo: (page: StaticPage, slug?: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>, message: string) => void }) => (
  <>
    <section className="grid gap-12 rounded-3xl border border-white/10 bg-[#0D1220] p-8 shadow-[0_0_100px_rgba(41,123,255,0.08)] lg:grid-cols-2 lg:p-12">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#66B2FF]">Personal Brand of Manish Goswami</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">Build Smarter. Think Deeper. Win Bigger.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
          I help ambitious individuals, founders, professionals, and businesses unlock clarity, strategy, and execution power.
        </p>
        <div className="mt-8 grid gap-3 sm:flex">
          <button onClick={() => navigateTo('work-with-me')} className="rounded-xl bg-[#4DA3FF] px-6 py-3 font-semibold text-[#061325]">Work With Me</button>
          <button onClick={() => navigateTo('insights')} className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white">Explore Insights</button>
        </div>
        <p className="mt-7 text-sm text-white/65">Strategist • Entrepreneur • Coach • Consultant • Author</p>
      </div>
      <div className="rounded-3xl border border-[#66B2FF]/25 bg-gradient-to-br from-[#111A2E] to-[#0A0E18] p-7">
        <p className="text-xs uppercase tracking-[0.28em] text-[#66B2FF]">Strategist. Entrepreneur. Architect of High-Performance Systems.</p>
        <p className="mt-6 text-2xl leading-relaxed text-white/90">
          Manish Goswami works at the intersection of strategy, psychology, business, and personal transformation. His work focuses on helping individuals and businesses gain clarity, build systems, and execute with discipline.
        </p>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">What I Do</h2>
      <p className="mt-4 text-white/70">I work at the intersection of strategy, psychology, business, and personal transformation.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['Strategist', 'I simplify complexity and help you make sharper, more intelligent decisions that actually move your life and business forward.'],
          ['Entrepreneur', 'I build brands, platforms, and systems designed for long-term growth and scalable impact.'],
          ['Coach', 'I help you develop clarity, discipline, confidence, and self-leadership in a world full of distractions.'],
          ['Consultant', 'I advise businesses on positioning, growth strategy, digital systems, and execution frameworks.'],
          ['Author', 'I write about psychology, power, discipline, relationships, and the realities of modern society.'],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-[#0B111E] p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{body}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={`${sectionClass} glow-border`}>
      <h2 className="text-3xl font-semibold">Clarity Creates Power.</h2>
      <p className="mt-4 max-w-4xl text-white/75">
        Most people don’t fail because they lack talent. They fail because they lack clarity, structure, discipline, and strategic thinking.
      </p>
      <p className="mt-4 max-w-4xl text-white/75">
        My work is built around helping you see clearly, think independently, and build systems that compound over time—so you don’t just stay busy, you actually move forward.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {['Think Clearly', 'Build Systems', 'Execute Relentlessly'].map((pillar) => (
          <span key={pillar} className="rounded-full border border-[#66B2FF]/35 bg-[#66B2FF]/10 px-5 py-2 text-sm text-[#A8D4FF]">{pillar}</span>
        ))}
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Founder of Infinity Global Advisory</h2>
      <p className="mt-4 max-w-4xl text-white/75">Behind every idea is a system. Behind every system is execution.</p>
      <p className="mt-3 max-w-4xl text-white/75">Infinity Global Advisory is the ecosystem where ideas are transformed into scalable platforms across education, technology, business, real estate, lifestyle, travel, and personal transformation.</p>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ['EvoLeveX', 'A disciplined system for men focused on self-mastery and high performance.'],
          ['Vidya Infinity', 'Career and education architecture designed for clarity and direction.'],
          ['Infinity Growth Tech', 'Business and technology systems built for scalable growth.'],
          ['Brick Infinity', 'A modern real estate platform connecting buyers and property owners.'],
          ['Swift Fly Trips', 'Curated travel experiences designed for exploration and escape.'],
          ['DaPear', 'A lifestyle brand focused on modern identity and expression.'],
        ].map(([name, text]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-[#0C1018] p-5">
            <p className="font-semibold">{name}</p>
            <p className="mt-2 text-sm text-white/70">{text}</p>
          </div>
        ))}
      </div>
      <a href="https://infinityglobaladvisory.com" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8CC7FF]">Explore Infinity Global Advisory <ExternalLink size={15} /></a>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Featured Insights</h2>
      <p className="mt-4 text-white/70">Sharp thinking on psychology, business, power, discipline, and the systems shaping modern life.</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {blogPosts.slice(0, 3).map((post) => (
          <article key={post.slug} className="rounded-2xl border border-white/10 bg-[#0D131F] p-6">
            <span className="rounded-full border border-[#66B2FF]/40 px-3 py-1 text-xs text-[#A8D4FF]">{post.category}</span>
            <h3 className="mt-4 text-xl font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
            <p className="mt-4 text-xs text-white/50">{post.readTime}</p>
            <button onClick={() => navigateTo('insights', post.slug)} className="mt-5 inline-flex items-center gap-2 text-sm text-[#8CC7FF]">Read More <ArrowRight size={14} /></button>
          </article>
        ))}
      </div>
      <button onClick={() => navigateTo('insights')} className="mt-7 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold">View All Insights</button>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">From Ideas to Insights</h2>
      <p className="mt-4 max-w-4xl text-white/75">Not everything can be understood in a short video.</p>
      <p className="mt-3 max-w-4xl text-white/75">My content goes deeper—breaking down ideas, behaviors, systems, and strategies so you can think independently and act with clarity.</p>
      <p className="mt-3 max-w-4xl text-white/75">Every video is expanded into deeper insights for those who want more than surface-level thinking. YouTube channel: @manishsirg</p>
      <div className="mt-7 grid gap-3 sm:flex">
        <button onClick={() => navigateTo('insights')} className="rounded-xl bg-[#4DA3FF] px-6 py-3 font-semibold text-[#061325]">Read Articles</button>
        <a href="https://www.youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="rounded-xl border border-white/20 px-6 py-3 font-semibold">Watch on YouTube</a>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Work With Me</h2>
      <p className="mt-4 text-white/70">For those who are serious about clarity, growth, and execution.</p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {[
          ['1:1 Consulting', 'Direct strategic guidance to help you solve complex personal or business challenges.'],
          ['Business Strategy', 'Positioning, systems, and execution frameworks to scale your business intelligently.'],
          ['Mentorship', 'Structured guidance to build discipline, clarity, and long-term direction.'],
          ['Speaking & Workshops', 'Sessions focused on mindset, growth, systems, and real-world execution.'],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-[#0B111B] p-5">
            <p className="font-semibold">{title}</p>
            <p className="mt-2 text-sm text-white/70">{text}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigateTo('work-with-me')} className="mt-7 rounded-xl bg-[#4DA3FF] px-6 py-3 font-semibold text-[#061325]">Start a Conversation</button>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Join the Inner Circle</h2>
      <p className="mt-4 max-w-3xl text-white/70">Get direct insights on psychology, strategy, discipline, business, and growth—without noise or fluff.</p>
      <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={(event) => onSubmit(event, 'Thanks for joining the Inner Circle. We will be in touch soon.') }>
        <input required name="name" placeholder="Name" className="h-12 rounded-xl border border-white/15 bg-[#0A111E] px-4" />
        <input required type="email" name="email" placeholder="Email" className="h-12 rounded-xl border border-white/15 bg-[#0A111E] px-4" />
        <button className="h-12 rounded-xl bg-[#4DA3FF] px-5 font-semibold text-[#061325] sm:col-span-2">Join Now</button>
      </form>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Ready to Think Sharper and Build Better?</h2>
      <p className="mt-4 text-white/70">Explore insights, understand systems, and take action with clarity.</p>
      <div className="mt-7 grid gap-3 sm:flex">
        <button onClick={() => navigateTo('work-with-me')} className="rounded-xl bg-[#4DA3FF] px-6 py-3 font-semibold text-[#061325]">Work With Me</button>
        <button onClick={() => navigateTo('insights')} className="rounded-xl border border-white/20 px-6 py-3 font-semibold">Read Insights</button>
      </div>
    </section>
  </>
);

const AboutPage = ({ navigateTo }: { navigateTo: (page: StaticPage) => void }) => (
  <section className={sectionClass}>
    <h1 className="text-4xl font-semibold md:text-5xl">About Manish Goswami</h1>
    <p className="mt-4 text-xl text-white/75">Strategist. Entrepreneur. Coach. Consultant. Author.</p>

    <div className="mt-10 space-y-10">
      <article>
        <h2 className="text-2xl font-semibold">My Work</h2>
        <p className="mt-3 text-white/75">I work with individuals and businesses who are tired of confusion, inconsistency, and lack of direction.</p>
        <p className="mt-2 text-white/75">Whether it’s personal growth, business strategy, or system building—my focus is always the same: clarity, structure, and execution.</p>
      </article>

      <article>
        <h2 className="text-2xl font-semibold">My Philosophy</h2>
        <p className="mt-3 text-white/75">I believe most people are not lacking potential—they are lacking structure.</p>
        <p className="mt-2 text-white/75">In a world driven by noise, distraction, and shortcuts, real growth comes from clarity, discipline, and long-term thinking.</p>
        <p className="mt-2 text-white/75">My approach is simple: Understand deeply. Think clearly. Execute consistently.</p>
      </article>

      <article>
        <h2 className="text-2xl font-semibold">My Journey</h2>
        <p className="mt-3 text-white/75">My journey has been shaped by a constant pursuit of understanding—people, systems, behavior, and growth.</p>
        <p className="mt-2 text-white/75">From working closely with individuals as a counselor and mentor to building businesses and digital platforms, I’ve seen one pattern repeatedly:</p>
        <p className="mt-2 text-white/75">Those who win are not always the most talented—but they are the most clear, disciplined, and consistent.</p>
      </article>

      <article>
        <h2 className="text-2xl font-semibold">What I Stand For</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {['Truth over comfort', 'Discipline over motivation', 'Systems over chaos', 'Long-term growth over short-term hype'].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-[#0C1018] p-4">{item}</div>
          ))}
        </div>
      </article>

      <article>
        <h2 className="text-2xl font-semibold">Founder Note</h2>
        <p className="mt-3 text-white/75">I am the founder of Infinity Global Advisory—an ecosystem of brands focused on building scalable systems across multiple industries.</p>
        <p className="mt-2 text-white/75">While my personal work focuses on thinking, clarity, and strategy, Infinity Global Advisory is where execution happens.</p>
      </article>

      <button onClick={() => navigateTo('work-with-me')} className="rounded-xl bg-[#4DA3FF] px-6 py-3 font-semibold text-[#061325]">Work With Me</button>
    </div>
  </section>
);

const InsightsPage = ({ posts, categories, selectedCategory, setSelectedCategory, search, setSearch, visiblePosts, visibleCount, total, onLoadMore, openArticle }: {
  posts: BlogPost[];
  categories: Array<'All' | BlogCategory>;
  selectedCategory: 'All' | BlogCategory;
  setSelectedCategory: (value: 'All' | BlogCategory) => void;
  search: string;
  setSearch: (value: string) => void;
  visiblePosts: BlogPost[];
  visibleCount: number;
  total: number;
  onLoadMore: () => void;
  openArticle: (slug: string) => void;
}) => {
  const featured = posts[0];

  return (
    <section className={sectionClass}>
      <h1 className="text-4xl font-semibold md:text-5xl">Insights</h1>
      <p className="mt-4 text-xl text-white/75">Ideas on psychology, business, power, discipline, society, and growth.</p>
      <p className="mt-4 max-w-4xl text-white/70">This is where thinking becomes structured. Here, you’ll find deeper breakdowns of ideas, behaviors, systems, and strategies—designed to help you see clearly and act intelligently.</p>

      <article className="mt-10 rounded-2xl border border-white/10 bg-[#0D121D] p-7">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8D4FF]">Featured Article</span>
        <h2 className="mt-3 text-2xl font-semibold">{featured.title}</h2>
        <p className="mt-3 text-white/70">{featured.excerpt}</p>
        <button onClick={() => openArticle(featured.slug)} className="mt-5 inline-flex items-center gap-2 text-sm text-[#8CC7FF]">Read More <ArrowRight size={15} /></button>
      </article>

      <div className="mt-8 flex flex-col gap-4">
        <label className="relative block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search insights" className="h-11 w-full rounded-xl border border-white/15 bg-[#0A111E] pl-10 pr-4" />
        </label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${selectedCategory === category ? 'border-[#66B2FF] bg-[#66B2FF]/15 text-[#A9D5FF]' : 'border-white/20 text-white/75'}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-white/10 bg-[#0C111A] p-6">
            <span className="rounded-full border border-[#66B2FF]/40 px-3 py-1 text-xs text-[#A8D4FF]">{post.category}</span>
            <h3 className="mt-4 text-xl font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-white/50"><span className="inline-flex items-center gap-1"><CalendarDays size={13} />{formatDate(post.date)}</span><span>{post.readTime}</span></div>
            <button onClick={() => openArticle(post.slug)} className="mt-5 inline-flex items-center gap-2 text-sm text-[#8CC7FF]">Read More <ArrowRight size={15} /></button>
          </article>
        ))}
      </div>

      {visibleCount < total ? <button onClick={onLoadMore} className="mt-8 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold">Load More</button> : null}
    </section>
  );
};

const InsightDetailPage = ({ post, navigateTo, onSubmit }: { post: BlogPost; navigateTo: (page: StaticPage) => void; onSubmit: (event: FormEvent<HTMLFormElement>, message: string) => void }) => (
  <article className={sectionClass}>
    <button onClick={() => navigateTo('insights')} className="text-sm text-[#8CC7FF]">← Back to Insights</button>
    <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{post.title}</h1>
    <div className="mt-4 flex items-center gap-4 text-sm text-white/60"><span>{post.category}</span><span>•</span><span>{formatDate(post.date)}</span><span>•</span><span>{post.readTime}</span></div>
    <div className="mt-8 space-y-5 text-lg leading-9 text-white/80">
      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>

    <section className="mt-12 rounded-2xl border border-white/10 bg-[#0A111D] p-7">
      <h2 className="text-2xl font-semibold">Want More Clarity Like This?</h2>
      <p className="mt-3 text-white/70">Join the Inner Circle and get insights directly in your inbox.</p>
      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(event) => onSubmit(event, 'Thanks for subscribing. You are on the Inner Circle list now.') }>
        <input required name="name" placeholder="Name" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4" />
        <input required type="email" name="email" placeholder="Email" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4" />
        <button className="h-11 rounded-xl bg-[#4DA3FF] px-4 font-semibold text-[#061325] sm:col-span-2">Join Now</button>
      </form>
    </section>
  </article>
);

const WorkWithMePage = ({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>, message: string) => void }) => (
  <section className={sectionClass}>
    <h1 className="text-4xl font-semibold md:text-5xl">Work With Me</h1>
    <p className="mt-4 text-xl text-white/75">Strategic guidance for individuals, founders, professionals, and businesses seeking clarity, direction, and execution.</p>

    <div className="mt-10 space-y-10">
      <div>
        <h2 className="text-2xl font-semibold">Who This Is For</h2>
        <p className="mt-3 text-white/70">This is for you if you are:</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            'A founder struggling with direction or growth',
            'A professional seeking clarity in career decisions',
            'A business looking to scale with structure',
            'An individual wanting discipline, focus, and self-mastery',
            'Someone who knows they can do more—but lacks clarity',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-[#0C111A] p-4">{item}</div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Problems I Help Solve</h2>
        <ul className="mt-3 grid gap-3 text-white/75 sm:grid-cols-2">
          {['Lack of clarity', 'Poor decision-making', 'Weak positioning', 'No structured growth plan', 'Inconsistent execution', 'Overthinking without action'].map((problem) => (
            <li key={problem} className="rounded-xl border border-white/10 bg-[#0B1018] p-4">{problem}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Engagement Types</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ['1:1 Consulting', 'Focused sessions to solve specific challenges.'],
            ['Business Strategy', 'Clarity on positioning, growth, and systems.'],
            ['Mentorship', 'Long-term guidance for personal and professional growth.'],
            ['Speaking & Workshops', 'Focused sessions on mindset, growth, and execution.'],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-[#0C111B] p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Process</h2>
        <ol className="mt-4 grid gap-3 text-white/75 sm:grid-cols-2">
          {['You reach out', 'We understand your situation', 'We define clarity and direction', 'You execute with structured guidance'].map((step, index) => (
            <li key={step} className="rounded-xl border border-white/10 bg-[#0B1018] p-4"><span className="mr-2 text-[#8EC8FF]">{index + 1}.</span>{step}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0A101A] p-6">
        <p className="text-white/80">Tell me what you’re dealing with—and what you want to build.</p>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(event) => onSubmit(event, 'Your inquiry has been submitted. We will contact you shortly.') }>
          <input required name="name" placeholder="Name" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4" />
          <input required type="email" name="email" placeholder="Email" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4" />
          <input name="phone" placeholder="Phone / WhatsApp" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4" />
          <select required name="type" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4">
            <option value="">Preferred engagement type</option>
            <option>1:1 Consulting</option>
            <option>Business Strategy</option>
            <option>Mentorship</option>
            <option>Speaking & Workshops</option>
          </select>
          <textarea required name="help" placeholder="What do you need help with?" rows={5} className="rounded-xl border border-white/15 bg-[#07101A] p-4 sm:col-span-2" />
          <button className="h-11 rounded-xl bg-[#4DA3FF] px-4 font-semibold text-[#061325] sm:col-span-2">Submit Inquiry</button>
        </form>
      </div>
    </div>
  </section>
);

const ContactPage = ({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>, message: string) => void }) => (
  <section className={sectionClass}>
    <h1 className="text-4xl font-semibold md:text-5xl">Contact</h1>
    <p className="mt-4 text-xl text-white/75">For consulting, mentorship, speaking, collaborations, or inquiries.</p>
    <p className="mt-4 max-w-4xl text-white/70">If you are serious about growth, clarity, and execution, feel free to reach out. For business services and execution, visit Infinity Global Advisory.</p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {[
        ['Email', EMAIL, <Mail size={16} key="mail" />],
        ['WhatsApp', WHATSAPP, <Phone size={16} key="phone" />],
        ['YouTube', '@manishsirg', <Youtube size={16} key="yt" />],
        ['Website', 'infinityglobaladvisory.com', <ExternalLink size={16} key="web" />],
      ].map(([title, value, icon]) => (
        <div key={title as string} className="rounded-xl border border-white/10 bg-[#0B111A] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">{title}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-white/90">{icon}{value}</p>
        </div>
      ))}
    </div>

    <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={(event) => onSubmit(event, 'Message sent. Thank you for reaching out.') }>
      <input required name="name" placeholder="Name" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4" />
      <input required type="email" name="email" placeholder="Email" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4" />
      <input name="phone" placeholder="Phone" className="h-11 rounded-xl border border-white/15 bg-[#07101A] px-4 sm:col-span-2" />
      <textarea required name="message" placeholder="Message" rows={5} className="rounded-xl border border-white/15 bg-[#07101A] p-4 sm:col-span-2" />
      <button className="h-11 rounded-xl bg-[#4DA3FF] px-4 font-semibold text-[#061325] sm:col-span-2">Send Message</button>
    </form>
  </section>
);

const Footer = ({ navigateTo }: { navigateTo: (page: StaticPage) => void }) => (
  <footer className="mt-20 border-t border-white/10 py-10">
    <p className="text-sm uppercase tracking-[0.2em] text-[#8CC7FF]">Strategist. Entrepreneur. Architect of High-Performance Systems.</p>
    <p className="mt-4 max-w-2xl text-white/70">Helping individuals and businesses think clearly, build systems, and execute with discipline.</p>
    <div className="mt-6 flex flex-wrap gap-5 text-sm">
      {['about', 'insights', 'work-with-me', 'contact'].map((item) => (
        <button key={item} onClick={() => navigateTo(item as StaticPage)} className="text-white/75 hover:text-white">{item === 'work-with-me' ? 'Work With Me' : item.charAt(0).toUpperCase() + item.slice(1)}</button>
      ))}
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
      <a href="https://www.youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={15} />@manishsirg</a>
      <a href="https://www.youtube.com/@mangopeptalks" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={15} />@mangopeptalks</a>
    </div>
    <p className="mt-6 text-sm text-white/60">Founder of Infinity Global Advisory.</p>
  </footer>
);

export default App;
