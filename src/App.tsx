import { Dispatch, FormEvent, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Compass,
  Edit3,
  ExternalLink,
  Facebook,
  Gem,
  Image as ImageIcon,
  Instagram,
  Layers3,
  Link2,
  Linkedin,
  Mail,
  Menu,
  PenSquare,
  Phone,
  PlayCircle,
  Save,
  Search,
  Sparkles,
  Target,
  Youtube,
  X,
} from 'lucide-react';

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
  bannerImage?: string;
  inlineImage?: string;
  affiliateLink?: string;
  youtubeLink?: string;
  status: 'draft' | 'published';
}

const SITE_URL = 'https://manishgoswami.com';
const HERO_IMAGE = '/hero.png';
const EMAIL = 'manishsirgg@gmail.com';
const WHATSAPP = '+918989601701';

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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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

const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 ${
      variant === 'primary'
        ? 'bg-gradient-to-r from-[#4DA3FF] to-[#2B7BFF] text-[#061325] shadow-[0_0_40px_rgba(47,136,255,0.35)] hover:brightness-110'
        : 'border border-white/20 bg-white/[0.02] text-white hover:border-[#66B2FF]/50 hover:bg-[#66B2FF]/10'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const sectionClass = 'mt-16 rounded-3xl border border-white/10 bg-[#0B111B]/75 p-7 sm:p-10 lg:mt-20 lg:p-14';

const App = () => {
  const initialRoute = inferRoute(window.location.pathname);
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('manish-blog-posts');
    return saved ? (JSON.parse(saved) as BlogPost[]) : blogPosts;
  });
  const [page, setPage] = useState<Page>(initialRoute.page);
  const [activeSlug, setActiveSlug] = useState<string | undefined>(initialRoute.slug);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const activePost = useMemo(() => posts.find((post) => post.slug === activeSlug) ?? posts[0] ?? blogPosts[0], [activeSlug, posts]);
  const publishedPosts = useMemo(() => posts.filter((post) => post.status === 'published'), [posts]);

  useEffect(() => {
    localStorage.setItem('manish-blog-posts', JSON.stringify(posts));
  }, [posts]);

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
    const ogTitle = page === 'home' ? 'Manish Goswami | Build Smarter. Think Deeper. Win Bigger.' : meta.title;
    const ogDescription =
      page === 'home'
        ? 'Clarity, Strategy, Impact. Personal brand of Manish Goswami — strategist, entrepreneur, coach, consultant, and author.'
        : meta.description;
    setMetaTag('meta[property="og:title"]', 'content', ogTitle);
    setMetaTag('meta[property="og:description"]', 'content', ogDescription);
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
    return publishedPosts.filter((post) => {
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const searchMatch = `${post.title} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase().trim());
      return categoryMatch && searchMatch;
    });
  }, [publishedPosts, search, selectedCategory]);

  useEffect(() => setVisibleCount(4), [selectedCategory, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const onSubmit = (event: FormEvent<HTMLFormElement>, message: string) => {
    event.preventDefault();
    alert(message);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070D] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070D]/80 backdrop-blur-xl">
        <Container>
          <nav className="flex min-h-20 items-center justify-between py-4">
            <button onClick={() => navigateTo('home')} className="text-left">
              <p className="text-lg font-semibold tracking-wide">Manish Goswami</p>
              <p className="text-xs uppercase tracking-[0.24em] text-[#66B2FF]">Clarity, Strategy, Impact.</p>
            </button>

            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <button key={item.page} onClick={() => navigateTo(item.page)} className="text-sm font-medium text-white/80 transition hover:text-white">
                  {item.label}
                </button>
              ))}
              <Button onClick={() => navigateTo('work-with-me')} className="rounded-full px-5 py-2.5">Work With Me</Button>
            </div>

            <button className="lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </Container>

        {mobileOpen ? (
          <Container className="lg:hidden">
            <div className="border-t border-white/10 py-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button key={item.page} onClick={() => navigateTo(item.page)} className="rounded-xl border border-white/10 px-4 py-3 text-left text-base font-medium text-white">
                    {item.label}
                  </button>
                ))}
                <Button onClick={() => navigateTo('work-with-me')} className="mt-2">Work With Me</Button>
              </div>
            </div>
          </Container>
        ) : null}
      </header>

      <Container className="pb-20">
        <main className="pt-12">
          {page === 'home' ? (
            <HomePage navigateTo={navigateTo} onSubmit={onSubmit} />
          ) : null}

          {page === 'about' ? <AboutPage navigateTo={navigateTo} /> : null}

          {page === 'insights' ? (
            <InsightsPage
              posts={publishedPosts}
              allPosts={posts}
              setPosts={setPosts}
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
      </Container>
    </div>
  );
};

const HomePage = ({ navigateTo, onSubmit }: { navigateTo: (page: StaticPage, slug?: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>, message: string) => void }) => (
  <>
    <section className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C1221] via-[#090E19] to-[#070A12] p-8 shadow-[0_0_100px_rgba(34,119,255,0.2)] lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
      <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-[#2d87ff]/20 blur-3xl" />
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#66B2FF]">Personal Brand of Manish Goswami</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
          Build Smarter.
          <br />
          Think Deeper.
          <br />
          <span className="text-[#5EAFFF]">Win Bigger.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">I help ambitious individuals, founders, professionals, and businesses unlock clarity, strategy, and execution power.</p>
        <div className="mt-8 grid gap-3 sm:flex">
          <Button onClick={() => navigateTo('work-with-me')}>Work With Me</Button>
          <Button variant="secondary" onClick={() => navigateTo('insights')}>Explore Insights</Button>
        </div>
        <p className="mt-7 text-sm text-white/65">Strategist • Entrepreneur • Coach • Consultant • Author</p>
        <div className="mt-6 inline-flex max-w-md items-center gap-3 rounded-2xl border border-[#66B2FF]/35 bg-[#66B2FF]/10 px-4 py-3 text-sm text-[#cae6ff]">
          <Sparkles size={16} className="text-[#66B2FF]" />
          Strategist. Entrepreneur. Architect of High-Performance Systems.
        </div>
      </div>
      <div className="relative rounded-3xl border border-[#66B2FF]/25 bg-[#070C14] p-3">
        <img src={HERO_IMAGE} alt="Manish Goswami speaking on stage" className="h-full max-h-[620px] w-full rounded-[1.25rem] object-cover" />
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
        ].map(([title, body], index) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-[#0B111E] p-6 transition hover:-translate-y-1 hover:border-[#66B2FF]/50 hover:bg-[#101a2c]">
            <div className="mb-4 inline-flex rounded-lg border border-[#66B2FF]/30 bg-[#66B2FF]/10 p-2 text-[#8fc7ff]">
              {[<Compass size={18} />, <Layers3 size={18} />, <Target size={18} />, <BriefcaseBusiness size={18} />, <BookOpen size={18} />][index]}
            </div>
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
      <Button variant="secondary" onClick={() => navigateTo('insights')} className="mt-7">View All Insights</Button>
    </section>

    <section className={`${sectionClass} grid gap-8 lg:grid-cols-2`}>
      <div>
      <h2 className="text-3xl font-semibold">From Ideas to Insights</h2>
      <p className="mt-4 max-w-4xl text-white/75">Not everything can be understood in a short video.</p>
      <p className="mt-3 max-w-4xl text-white/75">My content goes deeper—breaking down ideas, behaviors, systems, and strategies so you can think independently and act with clarity.</p>
      <p className="mt-3 max-w-4xl text-white/75">Every video is expanded into deeper insights for those who want more than surface-level thinking. YouTube channel: @manishsirg</p>
      <div className="mt-7 grid gap-3 sm:flex">
        <Button onClick={() => navigateTo('insights')}>Read Articles</Button>
        <a href="https://www.youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:border-[#66B2FF]/50 hover:bg-[#66B2FF]/10">Watch on YouTube</a>
      </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f182a] to-[#0a0f1a] p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8bc6ff]">Content Engine</p>
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4"><PlayCircle size={18} className="text-[#66B2FF]" /> Short-form video idea</div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4"><ArrowRight size={16} className="text-[#66B2FF]" /> Deeper structured article</div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4"><BrainCircuit size={18} className="text-[#66B2FF]" /> Practical strategic framework</div>
        </div>
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
      <Button onClick={() => navigateTo('work-with-me')} className="mt-7">Start a Conversation</Button>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Join the Inner Circle</h2>
      <p className="mt-4 max-w-3xl text-white/70">Get direct insights on psychology, strategy, discipline, business, and growth—without noise or fluff.</p>
      {/* TODO: connect this form to newsletter backend endpoint when available. */}
      <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={(event) => onSubmit(event, 'Thanks for joining the Inner Circle. We will be in touch soon.') }>
        <input required name="name" placeholder="Name" className="h-12 rounded-xl border border-white/15 bg-[#0A111E] px-4" />
        <input required type="email" name="email" placeholder="Email" className="h-12 rounded-xl border border-white/15 bg-[#0A111E] px-4" />
        <button className="h-12 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#2B7BFF] px-5 font-semibold text-[#061325] sm:col-span-2">Join Now</button>
      </form>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Ready to Think Sharper and Build Better?</h2>
      <p className="mt-4 text-white/70">Explore insights, understand systems, and take action with clarity.</p>
      <div className="mt-7 grid gap-3 sm:flex">
        <Button onClick={() => navigateTo('work-with-me')}>Work With Me</Button>
        <Button variant="secondary" onClick={() => navigateTo('insights')}>Read Insights</Button>
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

const InsightsPage = ({ posts, allPosts, setPosts, categories, selectedCategory, setSelectedCategory, search, setSearch, visiblePosts, visibleCount, total, onLoadMore, openArticle }: {
  posts: BlogPost[];
  allPosts: BlogPost[];
  setPosts: Dispatch<SetStateAction<BlogPost[]>>;
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
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editor, setEditor] = useState({
    title: '',
    excerpt: '',
    category: 'Psychology' as BlogCategory,
    content: '',
    bannerImage: '',
    inlineImage: '',
    affiliateLink: '',
    youtubeLink: '',
    status: 'draft' as 'draft' | 'published',
  });

  const resetEditor = () => {
    setEditingSlug(null);
    setEditor({ title: '', excerpt: '', category: 'Psychology', content: '', bannerImage: '', inlineImage: '', affiliateLink: '', youtubeLink: '', status: 'draft' });
  };

  const createOrUpdateBlog = (mode: 'draft' | 'published') => {
    const slug = (editingSlug ?? editor.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || `post-${Date.now()}`;
    const payload: BlogPost = {
      slug,
      title: editor.title,
      excerpt: editor.excerpt,
      category: editor.category,
      content: editor.content.split('\n').map((line) => line.trim()).filter(Boolean),
      date: new Date().toISOString().slice(0, 10),
      readTime: `${Math.max(3, Math.ceil(editor.content.split(' ').filter(Boolean).length / 180))} min read`,
      bannerImage: editor.bannerImage.trim(),
      inlineImage: editor.inlineImage.trim(),
      affiliateLink: editor.affiliateLink.trim(),
      youtubeLink: editor.youtubeLink.trim(),
      status: mode,
    };
    setPosts((prev) => {
      const existing = prev.find((post) => post.slug === slug);
      if (existing) return prev.map((post) => (post.slug === slug ? payload : post));
      return [payload, ...prev];
    });
    resetEditor();
  };

  const submitBlog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrUpdateBlog('published');
  };

  const editPost = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setEditor({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      content: post.content.join('\n'),
      bannerImage: post.bannerImage ?? '',
      inlineImage: post.inlineImage ?? '',
      affiliateLink: post.affiliateLink ?? '',
      youtubeLink: post.youtubeLink ?? '',
      status: post.status,
    });
  };

  return (
    <section className={sectionClass}>
      <h1 className="text-4xl font-semibold md:text-5xl">Insights</h1>
      <p className="mt-4 text-xl text-white/75">Ideas on psychology, business, power, discipline, society, and growth.</p>
      <p className="mt-4 max-w-4xl text-white/70">This is where thinking becomes structured. Here, you’ll find deeper breakdowns of ideas, behaviors, systems, and strategies—designed to help you see clearly and act intelligently.</p>

      <article className="mt-10 rounded-2xl border border-[#66B2FF]/30 bg-[#0B1320] p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#A8D4FF]">Blog Studio</p>
        <h2 className="mt-3 text-2xl font-semibold">Write, Edit & Post Blogs</h2>
        <p className="mt-2 text-white/70">Create drafts or publish with banner image, inline image, affiliate links, and YouTube links.</p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submitBlog}>
          <input required value={editor.title} onChange={(event) => setEditor((prev) => ({ ...prev, title: event.target.value }))} placeholder="Blog title" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4 sm:col-span-2" />
          <input required value={editor.excerpt} onChange={(event) => setEditor((prev) => ({ ...prev, excerpt: event.target.value }))} placeholder="Short excerpt" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4 sm:col-span-2" />
          <select value={editor.category} onChange={(event) => setEditor((prev) => ({ ...prev, category: event.target.value as BlogCategory }))} className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4">
            {categories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={editor.bannerImage} onChange={(event) => setEditor((prev) => ({ ...prev, bannerImage: event.target.value }))} placeholder="Banner image URL" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4" />
          <input value={editor.inlineImage} onChange={(event) => setEditor((prev) => ({ ...prev, inlineImage: event.target.value }))} placeholder="Content image URL" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4" />
          <input value={editor.affiliateLink} onChange={(event) => setEditor((prev) => ({ ...prev, affiliateLink: event.target.value }))} placeholder="Affiliate link" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4" />
          <input value={editor.youtubeLink} onChange={(event) => setEditor((prev) => ({ ...prev, youtubeLink: event.target.value }))} placeholder="YouTube video link" className="h-11 rounded-xl border border-white/15 bg-[#08101A] px-4 sm:col-span-2" />
          <textarea required rows={6} value={editor.content} onChange={(event) => setEditor((prev) => ({ ...prev, content: event.target.value }))} placeholder="Write your blog content (new line = new paragraph)" className="rounded-xl border border-white/15 bg-[#08101A] p-4 sm:col-span-2" />
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="button" onClick={() => createOrUpdateBlog('draft')} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold"><Save size={14} />Save Draft</button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#4DA3FF] px-5 py-2.5 text-sm font-semibold text-[#061325]"><PenSquare size={14} />{editingSlug ? 'Update & Post' : 'Post Blog'}</button>
            {editingSlug ? <button type="button" onClick={resetEditor} className="rounded-xl border border-white/20 px-5 py-2.5 text-sm">Cancel Edit</button> : null}
          </div>
        </form>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {allPosts.slice(0, 6).map((post) => (
            <div key={post.slug} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold">{post.title}</p>
              <p className="mt-1 text-xs text-white/60">{post.status.toUpperCase()}</p>
              <button onClick={() => editPost(post)} className="mt-3 inline-flex items-center gap-1 text-xs text-[#8CC7FF]"><Edit3 size={12} />Edit</button>
            </div>
          ))}
        </div>
      </article>

      {featured ? <article className="mt-10 rounded-2xl border border-white/10 bg-[#0D121D] p-7">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A8D4FF]">Featured Article</span>
        <h2 className="mt-3 text-2xl font-semibold">{featured.title}</h2>
        <p className="mt-3 text-white/70">{featured.excerpt}</p>
        <button onClick={() => openArticle(featured.slug)} className="mt-5 inline-flex items-center gap-2 text-sm text-[#8CC7FF]">Read More <ArrowRight size={15} /></button>
      </article> : null}

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
            {post.bannerImage ? <img src={post.bannerImage} alt={post.title} className="mb-4 h-44 w-full rounded-xl object-cover" /> : null}
            <span className="rounded-full border border-[#66B2FF]/40 px-3 py-1 text-xs text-[#A8D4FF]">{post.category}</span>
            <h3 className="mt-4 text-xl font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-white/50"><span className="inline-flex items-center gap-1"><CalendarDays size={13} />{formatDate(post.date)}</span><span>{post.readTime}</span></div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#9fd1ff]">
              {post.inlineImage ? <span className="inline-flex items-center gap-1"><ImageIcon size={12} />Image</span> : null}
              {post.affiliateLink ? <a href={post.affiliateLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Link2 size={12} />Affiliate</a> : null}
              {post.youtubeLink ? <a href={post.youtubeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white"><Youtube size={12} />Video</a> : null}
            </div>
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
    {post.bannerImage ? <img src={post.bannerImage} alt={post.title} className="mt-7 h-72 w-full rounded-2xl object-cover" /> : null}
    <div className="mt-8 space-y-5 text-lg leading-9 text-white/80">
      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    {post.inlineImage ? <img src={post.inlineImage} alt={`${post.title} visual`} className="mt-8 w-full rounded-2xl object-cover" /> : null}
    <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#9fd1ff]">
      {post.affiliateLink ? <a href={post.affiliateLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Link2 size={14} />Affiliate resource</a> : null}
      {post.youtubeLink ? <a href={post.youtubeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={14} />Watch related video</a> : null}
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
        ['WhatsApp / Call', WHATSAPP, <Phone size={16} key="phone" />],
        ['Website', 'https://manishgoswami.com', <ExternalLink size={16} key="web" />],
        ['YouTube', 'youtube.com/@manishsirg', <Youtube size={16} key="yt1" />],
        ['YouTube', 'youtube.com/@mangopeptalks', <Youtube size={16} key="yt2" />],
        ['Instagram', 'instagram.com/@manishsirgg', <Instagram size={16} key="ig" />],
        ['X', 'x.com/@manishsirg', <X size={16} key="x" />],
        ['LinkedIn', 'linkedin.com/in/manishsirg', <Linkedin size={16} key="li" />],
        ['Facebook', 'facebook.com/manishsirg14', <Facebook size={16} key="fb" />],
      ].map(([title, value, icon]) => (
        <div key={`${title as string}-${value as string}`} className="rounded-xl border border-white/10 bg-[#0B111A] p-5">
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
  <footer className="mt-20 rounded-3xl border border-white/10 bg-[#080d16] p-8 sm:p-10">
    <p className="text-sm uppercase tracking-[0.2em] text-[#8CC7FF]">Strategist. Entrepreneur. Architect of High-Performance Systems.</p>
    <p className="mt-4 max-w-2xl text-white/70">Helping individuals and businesses think clearly, build systems, and execute with discipline.</p>
    <div className="mt-6 flex flex-wrap gap-5 text-sm">
      {['about', 'insights', 'work-with-me', 'contact'].map((item) => (
        <button key={item} onClick={() => navigateTo(item as StaticPage)} className="text-white/75 hover:text-white">{item === 'work-with-me' ? 'Work With Me' : item.charAt(0).toUpperCase() + item.slice(1)}</button>
      ))}
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
      <a href="https://youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={15} />YouTube</a>
      <a href="https://youtube.com/@mangopeptalks" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={15} />Mango Pep Talks</a>
      <a href="https://instagram.com/@manishsirgg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Instagram size={15} />Instagram</a>
      <a href="https://x.com/@manishsirg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><X size={15} />X</a>
      <a href="https://www.linkedin.com/in/manishsirg/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Linkedin size={15} />LinkedIn</a>
      <a href="https://www.facebook.com/manishsirg14" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Facebook size={15} />Facebook</a>
    </div>
    <p className="mt-4 text-sm text-white/60">WhatsApp/Call: +918989601701 • Email: manishsirgg@gmail.com • Website: https://manishgoswami.com</p>
    <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/60"><Gem size={14} className="text-[#8CC7FF]" />Founder of Infinity Global Advisory.</p>
  </footer>
);

export default App;
