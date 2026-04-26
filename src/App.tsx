diff --git a/src/App.tsx b/src/App.tsx
index 908adeb1ae2df9bb0a2d1202e5ec5610048a18f0..bcf3f4ce004fd4f117bba0133305cbfaebaebf1c 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,565 +1,836 @@
 import { FormEvent, useEffect, useMemo, useState } from 'react';
-import { ArrowRight, CalendarDays, ExternalLink, Menu, X } from 'lucide-react';
-
-type Page = 'home' | 'about' | 'insights' | 'work-with-me' | 'contact';
+import {
+  ArrowRight,
+  CalendarDays,
+  ChevronRight,
+  ExternalLink,
+  Mail,
+  Menu,
+  Phone,
+  Search,
+  Youtube,
+  X,
+} from 'lucide-react';
+
+type Page = 'home' | 'about' | 'insights' | 'work-with-me' | 'contact' | 'insight-detail';
 
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
+  image: string;
+  content: string[];
 }
 
 const SITE_URL = 'https://manishgoswami.com';
+const OG_IMAGE = `${SITE_URL}/social-preview.jpg`;
 const EMAIL = 'hello@manishgoswami.com';
 
-const pages: Array<{ label: string; path: `/${string}`; page: Page }> = [
+const pages: Array<{ label: string; path: `/${string}`; page: Exclude<Page, 'insight-detail'> }> = [
   { label: 'Home', path: '/', page: 'home' },
   { label: 'About', path: '/about', page: 'about' },
   { label: 'Insights', path: '/insights', page: 'insights' },
   { label: 'Work With Me', path: '/work-with-me', page: 'work-with-me' },
   { label: 'Contact', path: '/contact', page: 'contact' },
 ];
 
+const trustStack = ['Strategist', 'Entrepreneur', 'Coach', 'Consultant', 'Author'];
+
 const identityStack = [
   {
     role: 'Strategist',
-    description: 'Designs decision frameworks that convert complexity into decisive execution.',
+    description: 'I simplify complexity and help people make clearer, sharper, more profitable decisions.',
   },
   {
     role: 'Entrepreneur',
-    description: 'Builds scalable ventures by compounding systems, leverage, and disciplined focus.',
+    description: 'I build brands, platforms, and systems designed for long-term growth and scalable impact.',
   },
   {
     role: 'Coach',
-    description: 'Develops high-performance thinking for leaders facing pressure, growth, and transition.',
+    description: 'I help individuals develop clarity, confidence, discipline, and self-leadership.',
   },
   {
     role: 'Consultant',
-    description: 'Advises founders and operators on clarity, positioning, and strategic momentum.',
+    description: 'I advise businesses on positioning, growth, systems, digital infrastructure, and execution.',
   },
   {
     role: 'Author',
-    description: 'Writes on psychology, power, systems, and the architecture of modern influence.',
+    description: 'I write on psychology, power, relationships, discipline, human behavior, and modern society.',
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
+    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1400&q=80',
+    content: [
+      '## Why Clarity Compounds',
+      'Most people are not short on ambition; they are short on decision architecture. When your inputs are noisy, your output quality decays over time.',
+      '## The Weekly Clarity Audit',
+      'Use one recurring review to identify what creates momentum and what creates confusion. Remove friction first, then add intensity.',
+      '## Build Strategic Filters',
+      'A strong personal system asks: Is this aligned? Is this scalable? Is this worth the cognitive cost? That filter alone can recover hours every week.',
+    ],
   },
   {
     slug: 'positioning-without-posturing',
     title: 'Positioning Without Posturing',
     excerpt: 'Authority is not performance. It is consistency between what you think, build, and ship.',
     date: '2026-03-07',
     readTime: '6 min read',
     category: 'Power & Influence',
+    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
+    content: [
+      '## The Signal Gap',
+      'Positioning fails when public messaging and private operating standards are disconnected.',
+      '## Authority Through Consistency',
+      'You do not need to appear bigger. You need to become more coherent over time—message, systems, and execution in one line.',
+    ],
   },
   {
     slug: 'strategy-as-a-system',
     title: 'Strategy Is a System, Not a Deck',
     excerpt: 'How elite operators design strategic engines that survive uncertainty and scale intelligently.',
     date: '2026-02-16',
     readTime: '9 min read',
     category: 'Business Strategy',
+    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
+    content: [
+      '## Beyond Planning Theater',
+      'Strategy is not what you present once a quarter. It is what your team repeats every day under pressure.',
+      '## Decision Cadence',
+      'Create clear cadences for priorities, reviews, and tradeoffs. Rhythm reduces panic and improves quality under volatility.',
+    ],
   },
   {
     slug: 'status-games-and-modern-work',
     title: 'Status Games and Modern Work',
     excerpt: 'A lens for understanding institutions, incentives, and why talent often underperforms structure.',
     date: '2026-01-29',
     readTime: '8 min read',
     category: 'Society & Systems',
+    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
+    content: [
+      '## Incentives Shape Identity',
+      'People often optimize for visibility, not value. The environment determines whether substance is rewarded.',
+      '## System Design Matters',
+      'If you want better outcomes, redesign feedback loops—not just targets.',
+    ],
   },
   {
     slug: 'identity-before-output',
     title: 'Identity Before Output',
     excerpt: 'Sustainable performance begins with a personal operating system—not motivation spikes.',
     date: '2026-01-05',
     readTime: '5 min read',
     category: 'Personal Growth',
+    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
+    content: [
+      '## Motivation Is Unreliable',
+      'People who win long-term rely on systems and identity standards, not emotional spikes.',
+      '## Identity Rules',
+      'Ask: Who am I becoming with this behavior? That question shifts focus from outcome to process integrity.',
+    ],
   },
 ];
 
-const pageMeta: Record<Page, { title: string; description: string }> = {
-  home: {
-    title: 'Manish Goswami — Strategist. Entrepreneur. Architect of High-Performance Systems.',
-    description:
-      'Personal authority platform of Manish Goswami focused on strategy, psychology, systems, and high-performance execution.',
-  },
-  about: {
-    title: 'About | Manish Goswami',
-    description:
-      'Read the philosophy, journey, and mission of Manish Goswami—strategist, entrepreneur, and systems architect.',
-  },
-  insights: {
-    title: 'Insights | Manish Goswami',
-    description:
-      'Essays on psychology, business strategy, power, systems, and personal growth.',
-  },
-  'work-with-me': {
-    title: 'Work With Me | Manish Goswami',
-    description:
-      'Consulting, mentorship, strategic advisory, and speaking engagements for leaders and organizations.',
-  },
-  contact: {
-    title: 'Contact | Manish Goswami',
-    description: 'Get in touch for strategic advisory, speaking requests, mentorship, and partnerships.',
-  },
-};
+const categories: Array<'All' | BlogCategory> = [
+  'All',
+  'Psychology',
+  'Business Strategy',
+  'Society & Systems',
+  'Power & Influence',
+  'Personal Growth',
+];
 
-const inferPageFromPath = (path: string): Page => {
-  const found = pages.find((item) => item.path === path);
-  return found?.page ?? 'home';
+const inferRoute = (path: string): { page: Page; slug?: string } => {
+  const normalized = path.replace(/\/$/, '') || '/';
+  if (normalized.startsWith('/insights/')) {
+    return { page: 'insight-detail', slug: normalized.replace('/insights/', '') };
+  }
+  const found = pages.find((item) => item.path === normalized);
+  return { page: found?.page ?? 'home' };
 };
 
-const toPath = (page: Page) => pages.find((item) => item.page === page)?.path ?? '/';
+const toPath = (page: Exclude<Page, 'insight-detail'>) => pages.find((item) => item.page === page)?.path ?? '/';
 
 const formatDate = (value: string) =>
   new Date(value).toLocaleDateString('en-US', {
     year: 'numeric',
-    month: 'short',
+    month: 'long',
     day: 'numeric',
   });
 
-const BlogCard = ({ post }: { post: BlogPost }) => (
-  <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
-    <p className="text-xs uppercase tracking-[0.24em] text-[#4DA3FF]">{post.category}</p>
-    <h3 className="mt-4 text-xl font-semibold leading-tight text-white">{post.title}</h3>
+const SectionHeading = ({ title, body, eyebrow }: { title: string; body?: string; eyebrow?: string }) => (
+  <div className="max-w-3xl">
+    {eyebrow ? <p className="text-xs uppercase tracking-[0.28em] text-[#4DA3FF]">{eyebrow}</p> : null}
+    <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
+    {body ? <p className="mt-5 text-base leading-8 text-white/70">{body}</p> : null}
+  </div>
+);
+
+const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => (
+  <article className="group rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
+    <span className="rounded-full border border-[#4DA3FF]/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#7DBBFF]">
+      {post.category}
+    </span>
+    <h3 className="mt-5 text-xl font-semibold leading-tight text-white">{post.title}</h3>
     <p className="mt-3 text-sm leading-7 text-white/70">{post.excerpt}</p>
-    <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/50">
+    <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/55">
       <span className="flex items-center gap-2">
         <CalendarDays size={14} />
         {formatDate(post.date)}
       </span>
       <span>{post.readTime}</span>
     </div>
+    <button
+      onClick={onClick}
+      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#7DBBFF] transition group-hover:text-[#9CCCFF]"
+    >
+      Read More <ChevronRight size={16} />
+    </button>
   </article>
 );
 
-const SectionTitle = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => (
-  <div className="max-w-3xl">
-    <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">{eyebrow}</p>
-    <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
-    {body ? <p className="mt-5 text-base leading-8 text-white/70">{body}</p> : null}
-  </div>
-);
-
 function App() {
+  const [{ page, slug }, setRoute] = useState(() => inferRoute(window.location.pathname));
   const [mobileOpen, setMobileOpen] = useState(false);
-  const [currentPage, setCurrentPage] = useState<Page>(() => inferPageFromPath(window.location.pathname));
+  const [activeCategory, setActiveCategory] = useState<'All' | BlogCategory>('All');
+  const [query, setQuery] = useState('');
+  const [visibleCount, setVisibleCount] = useState(4);
 
   useEffect(() => {
-    const handlePop = () => setCurrentPage(inferPageFromPath(window.location.pathname));
+    const handlePop = () => setRoute(inferRoute(window.location.pathname));
     window.addEventListener('popstate', handlePop);
     return () => window.removeEventListener('popstate', handlePop);
   }, []);
 
+  const selectedPost = page === 'insight-detail' ? featuredPosts.find((post) => post.slug === slug) : undefined;
+
+  const meta = useMemo(() => {
+    if (selectedPost) {
+      return {
+        title: `${selectedPost.title} | Insights | Manish Goswami`,
+        description: selectedPost.excerpt,
+        type: 'article',
+        url: `${SITE_URL}/insights/${selectedPost.slug}`,
+      };
+    }
+    const data: Record<Exclude<Page, 'insight-detail'>, { title: string; description: string; type: string; url: string }> = {
+      home: {
+        title: 'Manish Goswami — Strategist. Entrepreneur. Coach. Consultant. Author.',
+        description:
+          'Personal authority platform of Manish Goswami focused on strategy, psychology, systems, and high-performance execution.',
+        type: 'website',
+        url: `${SITE_URL}/`,
+      },
+      about: {
+        title: 'About Manish Goswami | Strategist, Entrepreneur, Coach, Consultant, Author',
+        description:
+          'Learn about Manish Goswami, his philosophy, journey, and long-term approach to strategy, growth, and systems.',
+        type: 'profile',
+        url: `${SITE_URL}/about`,
+      },
+      insights: {
+        title: 'Insights | Manish Goswami',
+        description: 'Articles on psychology, power, business strategy, society, discipline, and growth.',
+        type: 'website',
+        url: `${SITE_URL}/insights`,
+      },
+      'work-with-me': {
+        title: 'Work With Me | Manish Goswami',
+        description: 'Strategic guidance for founders, professionals, institutions, and ambitious individuals.',
+        type: 'website',
+        url: `${SITE_URL}/work-with-me`,
+      },
+      contact: {
+        title: 'Contact | Manish Goswami',
+        description: 'Reach out for consulting, mentorship, strategy, speaking, collaborations, or media inquiries.',
+        type: 'website',
+        url: `${SITE_URL}/contact`,
+      },
+    };
+
+    return data[page as Exclude<Page, 'insight-detail'>];
+  }, [page, selectedPost]);
+
   useEffect(() => {
-    const meta = pageMeta[currentPage];
     document.title = meta.title;
-
-    const updateMetaTag = (name: string, content: string, property = false) => {
+    const updateMeta = (name: string, content: string, property = false) => {
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
 
-    updateMetaTag('description', meta.description);
-    updateMetaTag('og:title', meta.title, true);
-    updateMetaTag('og:description', meta.description, true);
-    updateMetaTag('og:type', currentPage === 'insights' ? 'website' : 'profile', true);
-    updateMetaTag('og:url', `${SITE_URL}${toPath(currentPage)}`, true);
-  }, [currentPage]);
+    updateMeta('description', meta.description);
+    updateMeta('og:title', meta.title, true);
+    updateMeta('og:description', meta.description, true);
+    updateMeta('og:type', meta.type, true);
+    updateMeta('og:url', meta.url, true);
+    updateMeta('og:image', OG_IMAGE, true);
+  }, [meta]);
 
-  const articleSchema = useMemo(
-    () => ({
-      '@context': 'https://schema.org',
-      '@type': 'ItemList',
-      itemListElement: featuredPosts.map((post, index) => ({
-        '@type': 'Article',
-        position: index + 1,
-        headline: post.title,
-        description: post.excerpt,
-        datePublished: post.date,
-        articleSection: post.category,
-        url: `${SITE_URL}/insights/${post.slug}`,
-        author: {
-          '@type': 'Person',
-          name: 'Manish Goswami',
-        },
-      })),
-    }),
-    [],
-  );
-
-  const navigate = (page: Page) => {
-    const path = toPath(page);
+  const navigate = (target: Exclude<Page, 'insight-detail'>) => {
+    const path = toPath(target);
     window.history.pushState({}, '', path);
-    setCurrentPage(page);
+    setRoute({ page: target });
     setMobileOpen(false);
     window.scrollTo({ top: 0, behavior: 'smooth' });
   };
 
+  const navigateToArticle = (post: BlogPost) => {
+    window.history.pushState({}, '', `/insights/${post.slug}`);
+    setRoute({ page: 'insight-detail', slug: post.slug });
+    window.scrollTo({ top: 0, behavior: 'smooth' });
+  };
+
+  const filteredPosts = featuredPosts.filter((post) => {
+    const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
+    const queryMatch = `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase());
+    return categoryMatch && queryMatch;
+  });
+
+  const listSchema = {
+    '@context': 'https://schema.org',
+    '@type': 'ItemList',
+    itemListElement: featuredPosts.map((post, index) => ({
+      '@type': 'Article',
+      position: index + 1,
+      headline: post.title,
+      description: post.excerpt,
+      datePublished: post.date,
+      articleSection: post.category,
+      image: post.image,
+      url: `${SITE_URL}/insights/${post.slug}`,
+      author: { '@type': 'Person', name: 'Manish Goswami' },
+    })),
+  };
+
+  const articleSchema =
+    selectedPost &&
+    JSON.stringify({
+      '@context': 'https://schema.org',
+      '@type': 'Article',
+      headline: selectedPost.title,
+      description: selectedPost.excerpt,
+      datePublished: selectedPost.date,
+      image: selectedPost.image,
+      articleSection: selectedPost.category,
+      mainEntityOfPage: `${SITE_URL}/insights/${selectedPost.slug}`,
+      author: { '@type': 'Person', name: 'Manish Goswami' },
+      publisher: { '@type': 'Person', name: 'Manish Goswami' },
+    });
+
   return (
-    <div className="min-h-screen bg-[#030406] text-white selection:bg-[#0A84FF] selection:text-white">
-      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
-        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
-          <button className="text-left" onClick={() => navigate('home')}>
-            <p className="text-sm uppercase tracking-[0.28em] text-[#4DA3FF]">Manish Goswami</p>
-            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
-              Strategist. Entrepreneur. Systems Architect.
-            </p>
+    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#0A84FF]">
+      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
+        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
+          <button onClick={() => navigate('home')} className="text-left">
+            <p className="text-sm font-medium uppercase tracking-[0.26em] text-white">Manish Goswami</p>
           </button>
 
-          <nav className="hidden items-center gap-8 md:flex">
+          <nav className="hidden items-center gap-7 md:flex">
             {pages.map((item) => (
               <button
                 key={item.page}
-                className={`text-xs uppercase tracking-[0.2em] transition ${
-                  currentPage === item.page ? 'text-white' : 'text-white/60 hover:text-white'
-                }`}
                 onClick={() => navigate(item.page)}
+                className={`text-xs uppercase tracking-[0.2em] ${page === item.page ? 'text-white' : 'text-white/65 hover:text-white'}`}
               >
                 {item.label}
               </button>
             ))}
+            <button
+              onClick={() => navigate('work-with-me')}
+              className="rounded-full bg-[#0A84FF] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
+            >
+              Work With Me
+            </button>
           </nav>
 
-          <button className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle navigation">
-            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
+          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
+            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
 
-        {mobileOpen ? (
-          <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
-            <div className="grid gap-4">
-              {pages.map((item) => (
-                <button
-                  key={item.page}
-                  className="text-left text-xs uppercase tracking-[0.2em] text-white/80"
-                  onClick={() => navigate(item.page)}
-                >
-                  {item.label}
-                </button>
-              ))}
-            </div>
+        <div
+          className={`fixed inset-0 z-40 bg-[#050608] px-7 py-8 transition-transform duration-300 md:hidden ${
+            mobileOpen ? 'translate-x-0' : 'translate-x-full'
+          }`}
+        >
+          <div className="flex justify-end">
+            <button onClick={() => setMobileOpen(false)}>
+              <X size={28} />
+            </button>
           </div>
-        ) : null}
+          <div className="mt-10 grid gap-6">
+            {pages.map((item) => (
+              <button
+                key={item.page}
+                onClick={() => navigate(item.page)}
+                className="text-left text-3xl font-semibold text-white"
+              >
+                {item.label}
+              </button>
+            ))}
+            <button
+              onClick={() => navigate('work-with-me')}
+              className="mt-3 h-12 w-full rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em]"
+            >
+              Work With Me
+            </button>
+          </div>
+        </div>
       </header>
 
-      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
-        {currentPage === 'home' ? (
+      <main className="mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
+        {page === 'home' ? (
           <>
-            <section className="border-b border-white/10 pb-20 md:pb-28">
-              <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">Personal Authority Platform</p>
-              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
-                Build Smarter. Think Deeper. Win Bigger.
-              </h1>
-              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
-                I help individuals and businesses unlock clarity, strategy, and execution power.
-              </p>
-              <div className="mt-12 flex flex-wrap gap-4">
-                <button
-                  onClick={() => navigate('work-with-me')}
-                  className="inline-flex items-center gap-2 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
-                >
-                  Work With Me <ArrowRight size={16} />
-                </button>
-                <button
-                  onClick={() => navigate('insights')}
-                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/90"
-                >
-                  Explore Insights
-                </button>
+            <section className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c111a] to-[#060709] p-7 md:grid-cols-2 md:p-12">
+              <div>
+                <p className="text-xs uppercase tracking-[0.3em] text-[#7DBBFF]">Personal Brand of Manish Goswami</p>
+                <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">Build Smarter. Think Deeper. Win Bigger.</h1>
+                <p className="mt-6 text-base leading-8 text-white/75">
+                  I help ambitious individuals, founders, professionals, and businesses unlock clarity, strategy, and
+                  execution power.
+                </p>
+                <div className="mt-8 grid gap-3 sm:grid-cols-2">
+                  <button
+                    onClick={() => navigate('work-with-me')}
+                    className="h-12 w-full rounded-full bg-[#0A84FF] px-6 text-sm font-semibold uppercase tracking-[0.14em]"
+                  >
+                    Work With Me
+                  </button>
+                  <button
+                    onClick={() => navigate('insights')}
+                    className="h-12 w-full rounded-full border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.14em]"
+                  >
+                    Explore Insights
+                  </button>
+                </div>
+                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
+                  {trustStack.map((item) => (
+                    <span key={item} className="rounded-xl border border-white/15 bg-white/[0.02] px-3 py-2 text-center text-xs uppercase tracking-[0.14em] text-white/80">
+                      {item}
+                    </span>
+                  ))}
+                </div>
+              </div>
+              <div className="rounded-3xl border border-[#0A84FF]/30 bg-gradient-to-br from-[#0A84FF]/20 to-transparent p-3 shadow-[0_0_100px_rgba(10,132,255,0.2)]">
+                <img src="/hero.png" alt="Manish Goswami" className="h-full min-h-[320px] w-full rounded-2xl object-cover" />
               </div>
             </section>
 
-            <section className="border-b border-white/10 py-20 md:py-24">
-              <SectionTitle
-                eyebrow="Identity Stack"
-                title="Designed for leverage, built for consequence."
-                body="This platform is intentionally focused on one thing: creating strategic advantage for people and organizations operating in high-stakes environments."
+            <section className="py-20">
+              <SectionHeading
+                eyebrow="What I Do"
+                title="I work at the intersection of strategy, psychology, business, and personal transformation."
               />
-              <div className="mt-12 grid gap-5 md:grid-cols-2">
+              <div className="mt-10 grid gap-5 md:grid-cols-3">
                 {identityStack.map((item) => (
-                  <div key={item.role} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
-                    <h3 className="text-lg font-semibold">{item.role}</h3>
+                  <article key={item.role} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
+                    <h3 className="text-xl font-semibold">{item.role}</h3>
                     <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
+                  </article>
+                ))}
+              </div>
+            </section>
+
+            <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12">
+              <SectionHeading
+                title="Clarity Creates Power."
+                body="Most people do not fail because they lack talent. They fail because they lack structure, direction, discipline, and strategic thinking. My work is built around helping people see clearly, act intelligently, and build systems that compound over time."
+              />
+              <div className="mt-8 grid gap-4 md:grid-cols-3">
+                {['Think Clearly', 'Build Systems', 'Execute Relentlessly'].map((item) => (
+                  <div key={item} className="rounded-2xl border border-[#0A84FF]/30 bg-[#0A84FF]/10 p-5 text-lg font-medium">
+                    {item}
                   </div>
                 ))}
               </div>
             </section>
 
-            <section className="border-b border-white/10 py-20 md:py-24">
-              <SectionTitle
-                eyebrow="Authority"
+            <section className="py-20">
+              <SectionHeading
+                eyebrow="Founder Bridge"
                 title="Founder of Infinity Global Advisory"
-                body="A strategic ecosystem focused on execution infrastructure across consulting, growth systems, and enterprise acceleration."
+                body="Infinity Global Advisory is the ecosystem where ideas become companies, platforms, and execution systems across education, technology, real estate, lifestyle, travel, and personal transformation."
               />
-              <div className="mt-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/65">
-                {['Infinity Global Advisory', 'Infinity Growth Tech', 'Vidya Infinity', 'EvoLeveX'].map((item) => (
-                  <span key={item} className="rounded-full border border-white/15 px-4 py-2">
+              <div className="mt-8 grid gap-4 md:grid-cols-3">
+                {[
+                  'EvoLeveX — Elite performance systems for men.',
+                  'Vidya Infinity — Global education and career architecture.',
+                  'Infinity Growth Tech — Digital and business infrastructure.',
+                  'Brick Infinity — Real estate execution partner.',
+                  'Swift Fly Trips — Travel and mobility platform.',
+                  'DaPear — Lifestyle and identity brand.',
+                ].map((item) => (
+                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/75">
                     {item}
-                  </span>
+                    <a href="https://infinityglobaladvisory.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[#7DBBFF]">
+                      Explore <ExternalLink size={14} />
+                    </a>
+                  </div>
                 ))}
               </div>
-              <p className="mt-6 text-sm text-white/60">
-                Infinity Global Advisory — where execution happens.
-                <a
-                  className="ml-2 inline-flex items-center gap-1 text-[#4DA3FF]"
-                  href="https://infinityglobaladvisory.com"
-                  target="_blank"
-                  rel="noreferrer"
-                >
-                  Visit ecosystem <ExternalLink size={14} />
-                </a>
-              </p>
+              <a href="https://infinityglobaladvisory.com" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.14em] text-white/85">
+                Explore Infinity Global Advisory <ArrowRight size={16} />
+              </a>
             </section>
 
-            <section className="border-b border-white/10 py-20 md:py-24">
-              <div className="flex items-end justify-between gap-4">
-                <SectionTitle
-                  eyebrow="Featured Insights"
-                  title="Writing that sharpens judgment."
-                  body="Essays at the intersection of psychology, strategy, and systems thinking."
-                />
-                <button
-                  onClick={() => navigate('insights')}
-                  className="hidden text-xs uppercase tracking-[0.18em] text-white/70 md:block"
-                >
-                  View all insights
-                </button>
-              </div>
-              <div className="mt-12 grid gap-5 md:grid-cols-2">
-                {featuredPosts.slice(0, 4).map((post) => (
-                  <BlogCard key={post.slug} post={post} />
+            <section className="py-8">
+              <SectionHeading
+                eyebrow="Featured Insights"
+                title="Essays, reflections, and strategic thinking on psychology, society, business, power, and growth."
+              />
+              <div className="mt-10 grid gap-5 md:grid-cols-3">
+                {featuredPosts.slice(0, 3).map((post) => (
+                  <BlogCard key={post.slug} post={post} onClick={() => navigateToArticle(post)} />
                 ))}
               </div>
+              <button onClick={() => navigate('insights')} className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.14em]">
+                View All Insights
+              </button>
             </section>
 
-            <section className="border-b border-white/10 py-20 md:py-24">
-              <SectionTitle
-                eyebrow="Thinking"
-                title="My philosophy is simple: intelligence must become execution."
-              />
-              <div className="mt-10 grid gap-8 text-white/75 md:grid-cols-2">
-                <p className="leading-8">
-                  Most people do not lose because they lack ambition. They lose because their decisions are fragmented,
-                  reactive, and poorly sequenced.
-                </p>
-                <p className="leading-8">
-                  Sustainable advantage comes from psychological precision, strategic restraint, and systems that perform
-                  under pressure.
-                </p>
+            <section className="grid gap-6 py-16 md:grid-cols-2">
+              <div>
+                <SectionHeading
+                  eyebrow="From Ideas to Insights"
+                  title="Videos from @manishsirg become deeper frameworks and essays."
+                  body="Videos from @manishsirg are expanded into deeper essays, articles, and frameworks for readers who want more than surface-level opinions."
+                />
+              </div>
+              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
+                <p className="text-xs uppercase tracking-[0.2em] text-[#7DBBFF]">Latest Integration</p>
+                <h3 className="mt-4 text-2xl font-semibold">How to Build Self-Leadership in a Distracted Era</h3>
+                <p className="mt-3 text-sm leading-7 text-white/70">A strategic breakdown from video to long-form writing: structure, discipline, and decision rules.</p>
+                <div className="mt-6 grid gap-3 sm:grid-cols-2">
+                  <button onClick={() => navigate('insights')} className="h-11 rounded-full bg-[#0A84FF] text-xs font-semibold uppercase tracking-[0.14em]">Read Article</button>
+                  <a href="https://youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center rounded-full border border-white/20 text-xs font-semibold uppercase tracking-[0.14em]">
+                    Watch on YouTube
+                  </a>
+                </div>
               </div>
             </section>
 
-            <section className="border-b border-white/10 py-20 md:py-24">
-              <SectionTitle
+            <section className="py-6">
+              <SectionHeading
                 eyebrow="Work With Me"
-                title="Focused engagements for serious builders."
+                title="For founders, professionals, students, institutions, and ambitious individuals who need clarity, strategy, and execution direction."
               />
-              <div className="mt-10 grid gap-4 text-sm uppercase tracking-[0.18em] text-white/80 md:grid-cols-4">
-                {['Consulting', 'Mentorship', 'Strategy', 'Speaking'].map((item) => (
-                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center">
-                    {item}
+              <div className="mt-8 grid gap-4 md:grid-cols-4">
+                {[
+                  '1:1 Consulting',
+                  'Business Strategy',
+                  'Mentorship',
+                  'Speaking & Workshops',
+                ].map((item) => (
+                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
+                    <h3 className="text-lg font-semibold">{item}</h3>
+                    <p className="mt-2 text-sm text-white/70">Focused support designed around clarity, positioning, and execution rhythm.</p>
+                    <button onClick={() => navigate('work-with-me')} className="mt-4 text-sm text-[#7DBBFF]">Learn More</button>
                   </div>
                 ))}
               </div>
-              <button
-                onClick={() => navigate('work-with-me')}
-                className="mt-10 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white"
-              >
-                Explore Engagements
-              </button>
+              <button onClick={() => navigate('contact')} className="mt-7 h-12 w-full rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em] md:w-auto md:px-8">Start a Conversation</button>
             </section>
 
-            <section className="pt-20 md:pt-24">
-              <SectionTitle
-                eyebrow="Join the Inner Circle"
-                title="Weekly strategic notes for leaders who value clarity."
-                body="No noise. No trends. Just practical thinking frameworks and high-performance ideas."
-              />
-              <form className="mt-10 flex flex-col gap-4 md:max-w-xl md:flex-row">
-                <input
-                  type="email"
-                  required
-                  placeholder="Enter your best email"
-                  className="h-12 flex-1 rounded-full border border-white/15 bg-white/[0.02] px-5 text-sm text-white placeholder:text-white/35"
+            <section className="py-16">
+              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0A84FF]/20 to-transparent p-8">
+                <SectionHeading
+                  eyebrow="Join the Inner Circle"
+                  title="Get sharp insights in your inbox."
+                  body="Get sharp insights on psychology, strategy, discipline, business, and personal growth directly in your inbox."
                 />
-                <button className="h-12 rounded-full bg-[#0A84FF] px-8 text-xs font-semibold uppercase tracking-[0.16em]">
-                  Subscribe
-                </button>
-              </form>
+                <form className="mt-8 grid gap-3 md:grid-cols-3">
+                  <input className="h-12 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Name" />
+                  <input type="email" className="h-12 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Email" />
+                  <button className="h-12 rounded-xl bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em]">Join Now</button>
+                </form>
+              </div>
+            </section>
+
+            <section className="pt-8">
+              <div className="rounded-3xl border border-white/10 p-8 text-center">
+                <h2 className="text-3xl font-semibold">Ready to Think Sharper and Build Better?</h2>
+                <p className="mx-auto mt-4 max-w-3xl text-white/70">Explore my work, read my insights, or connect for consulting, mentorship, and strategic guidance.</p>
+                <div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
+                  <button onClick={() => navigate('work-with-me')} className="h-12 rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em]">Work With Me</button>
+                  <button onClick={() => navigate('insights')} className="h-12 rounded-full border border-white/20 text-sm font-semibold uppercase tracking-[0.14em]">Read Insights</button>
+                </div>
+              </div>
             </section>
           </>
         ) : null}
 
-        {currentPage === 'about' ? (
-          <section className="space-y-10">
-            <SectionTitle
+        {page === 'about' ? (
+          <section className="space-y-14">
+            <SectionHeading
               eyebrow="About"
-              title="I build systems for people who carry serious responsibility."
+              title="About Manish Goswami"
+              body="Strategist, entrepreneur, coach, consultant, and author focused on clarity, growth, psychology, and high-performance systems."
             />
-            <p className="max-w-4xl text-lg leading-9 text-white/75">
-              My work began with one obsession: why high-potential people underperform in critical moments. Across
-              advisory, entrepreneurship, and coaching, I have seen the same pattern—talent is common, strategic clarity
-              is rare. I help leaders close that gap.
-            </p>
             <div className="grid gap-6 md:grid-cols-2">
-              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
-                <h3 className="text-lg font-semibold">Philosophy</h3>
-                <p className="mt-4 text-sm leading-8 text-white/70">
-                  Clarity precedes scale. Identity precedes influence. Systems precede results. My frameworks are built
-                  to turn insight into repeatable performance.
-                </p>
+              <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-7"><h3 className="text-xl font-semibold">My Work</h3><p className="mt-3 text-white/70">My work integrates personal transformation, business strategy, and system design to build long-term leverage for people and organizations.</p></article>
+              <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-7"><h3 className="text-xl font-semibold">My Philosophy</h3><p className="mt-3 text-white/70">Clarity. Discipline. Systems. Self-mastery. Long-term thinking. These are the pillars behind every framework I teach.</p></article>
+            </div>
+            <div className="rounded-3xl border border-white/10 p-7">
+              <h3 className="text-xl font-semibold">My Journey</h3>
+              <div className="mt-5 grid gap-4 text-sm text-white/75 md:grid-cols-5">
+                {['Education and intellectual foundation', 'Counseling and mentoring', 'Business and consulting', 'Brand ecosystem building', 'Writing and thought leadership'].map((item) => (
+                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">{item}</div>
+                ))}
               </div>
-              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
-                <h3 className="text-lg font-semibold">Mission</h3>
-                <p className="mt-4 text-sm leading-8 text-white/70">
-                  To develop decision quality and strategic depth in founders, executives, and ambitious professionals so
-                  they can build meaningful outcomes with less noise and more precision.
-                </p>
+            </div>
+            <div>
+              <h3 className="text-xl font-semibold">What I Stand For</h3>
+              <div className="mt-5 grid gap-4 md:grid-cols-4">
+                {['Truth over comfort', 'Discipline over motivation', 'Systems over chaos', 'Long-term growth over short-term hype'].map((item) => (
+                  <div key={item} className="rounded-2xl border border-[#0A84FF]/30 bg-[#0A84FF]/10 p-5 text-sm">{item}</div>
+                ))}
               </div>
             </div>
+            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
+              <h3 className="text-xl font-semibold">Founder Note</h3>
+              <p className="mt-3 text-white/70">I also founded Infinity Global Advisory, the ecosystem where ideas become execution platforms across education, technology, real estate, travel, and lifestyle.</p>
+              <button onClick={() => navigate('work-with-me')} className="mt-5 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em]">Work With Me</button>
+            </div>
           </section>
         ) : null}
 
-        {currentPage === 'insights' ? (
+        {page === 'insights' ? (
           <section>
-            <SectionTitle
+            <SectionHeading
               eyebrow="Insights"
-              title="The content engine: psychology, strategy, and influence."
-              body="Every article is structured for depth, SEO discoverability, and practical application."
+              title="Articles on psychology, power, business, society, discipline, and growth."
             />
-            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/65">
-              {['Psychology', 'Business Strategy', 'Power & Influence', 'Society & Systems', 'Personal Growth'].map(
-                (category) => (
-                  <span key={category} className="rounded-full border border-white/20 px-4 py-2">
-                    {category}
-                  </span>
-                ),
-              )}
+
+            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
+              <label className="flex h-12 items-center gap-3 rounded-xl border border-white/15 bg-white/[0.02] px-4">
+                <Search size={16} className="text-white/60" />
+                <input
+                  value={query}
+                  onChange={(event) => {
+                    setQuery(event.target.value);
+                    setVisibleCount(4);
+                  }}
+                  placeholder="Search insights"
+                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
+                />
+              </label>
+              <div className="flex gap-2 overflow-x-auto pb-2">
+                {categories.map((item) => (
+                  <button
+                    key={item}
+                    onClick={() => {
+                      setActiveCategory(item);
+                      setVisibleCount(4);
+                    }}
+                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
+                      activeCategory === item ? 'bg-[#0A84FF] text-white' : 'border border-white/20 text-white/75'
+                    }`}
+                  >
+                    {item}
+                  </button>
+                ))}
+              </div>
             </div>
-            <div className="mt-12 grid gap-5 md:grid-cols-2">
-              {featuredPosts.map((post) => (
-                <BlogCard key={post.slug} post={post} />
+
+            {filteredPosts[0] ? (
+              <article className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-7">
+                <p className="text-xs uppercase tracking-[0.18em] text-[#7DBBFF]">Featured Article</p>
+                <h3 className="mt-4 text-3xl font-semibold">{filteredPosts[0].title}</h3>
+                <p className="mt-3 max-w-3xl text-white/70">{filteredPosts[0].excerpt}</p>
+                <button onClick={() => navigateToArticle(filteredPosts[0])} className="mt-5 inline-flex items-center gap-2 text-[#7DBBFF]">Read Full Article <ArrowRight size={16} /></button>
+              </article>
+            ) : null}
+
+            <div className="mt-8 grid gap-5 md:grid-cols-3">
+              {filteredPosts.slice(1, visibleCount).map((post) => (
+                <BlogCard key={post.slug} post={post} onClick={() => navigateToArticle(post)} />
               ))}
             </div>
-            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
+
+            {filteredPosts.length > visibleCount ? (
+              <button onClick={() => setVisibleCount((v) => v + 3)} className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.14em]">
+                Load More
+              </button>
+            ) : null}
+
+            <script type="application/ld+json">{JSON.stringify(listSchema)}</script>
           </section>
         ) : null}
 
-        {currentPage === 'work-with-me' ? (
+        {page === 'insight-detail' ? (
+          selectedPost ? (
+            <article className="mx-auto max-w-4xl">
+              <button onClick={() => navigate('insights')} className="text-sm text-[#7DBBFF]">← Back to Insights</button>
+              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#7DBBFF]">{selectedPost.category}</p>
+              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{selectedPost.title}</h1>
+              <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/60">
+                <span>{formatDate(selectedPost.date)}</span>
+                <span>{selectedPost.readTime}</span>
+              </div>
+              <img src={selectedPost.image} alt={selectedPost.title} className="mt-8 h-72 w-full rounded-3xl object-cover md:h-96" />
+
+              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
+                <p className="text-sm uppercase tracking-[0.16em] text-white/65">Table of contents</p>
+                <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
+                  {selectedPost.content.filter((item) => item.startsWith('##')).map((heading) => (
+                    <li key={heading}>{heading.replace('## ', '')}</li>
+                  ))}
+                </ul>
+              </div>
+
+              <div className="mt-10 space-y-6 text-lg leading-9 text-white/80">
+                {selectedPost.content.map((item) =>
+                  item.startsWith('##') ? (
+                    <h2 key={item} className="text-2xl font-semibold text-white">{item.replace('## ', '')}</h2>
+                  ) : (
+                    <p key={item}>{item}</p>
+                  ),
+                )}
+              </div>
+
+              <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0A84FF]/20 to-transparent p-7 md:grid-cols-2">
+                <button onClick={() => navigate('insights')} className="h-12 rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em]">Explore More Insights</button>
+                <a href="https://youtube.com/@manishsirg" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center rounded-full border border-white/20 text-sm font-semibold uppercase tracking-[0.14em]">Watch on YouTube</a>
+              </div>
+
+              <script type="application/ld+json">{articleSchema}</script>
+            </article>
+          ) : (
+            <section className="text-center">
+              <h2 className="text-3xl font-semibold">Article not found</h2>
+              <button onClick={() => navigate('insights')} className="mt-5 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em]">Back to Insights</button>
+            </section>
+          )
+        ) : null}
+
+        {page === 'work-with-me' ? (
           <section className="space-y-12">
-            <SectionTitle
+            <SectionHeading
               eyebrow="Work With Me"
-              title="Strategic engagements for operators building at the next level."
+              title="Strategic guidance for individuals, founders, professionals, institutions, and businesses seeking clarity, direction, and execution."
             />
-            <div className="grid gap-6 md:grid-cols-2">
-              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
-                <h3 className="text-lg font-semibold">Who this is for</h3>
-                <p className="mt-3 text-sm leading-8 text-white/70">
-                  Founders, growth-stage teams, and professionals navigating scale, complexity, or high-stakes decision
-                  environments.
-                </p>
-              </div>
-              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
-                <h3 className="text-lg font-semibold">Problems I solve</h3>
-                <p className="mt-3 text-sm leading-8 text-white/70">
-                  Strategic drift, inconsistent execution, weak positioning, decision fatigue, and misaligned growth
-                  priorities.
-                </p>
-              </div>
+            <div className="grid gap-4 md:grid-cols-5">
+              {['Founders', 'Students & Professionals', 'Businesses', 'Institutions', 'Creators & Personal Brands'].map((item) => (
+                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm">{item}</div>
+              ))}
             </div>
-            <div className="grid gap-4 md:grid-cols-2">
-              {['1:1 Consulting', 'Business Strategy', 'Mentorship', 'Speaking'].map((item) => (
-                <div key={item} className="rounded-2xl border border-white/10 p-6">
-                  <h4 className="text-base font-semibold">{item}</h4>
-                  <p className="mt-2 text-sm leading-7 text-white/65">
-                    Tailored engagement designed around your strategic objectives and execution constraints.
-                  </p>
-                </div>
+            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
+              <h3 className="text-2xl font-semibold">Problems I Help Solve</h3>
+              <ul className="mt-4 grid list-disc gap-2 pl-5 text-white/75 md:grid-cols-2">
+                {['Lack of clarity', 'Weak positioning', 'Poor execution', 'Confused brand direction', 'Career or business uncertainty', 'Personal discipline and mindset gaps'].map((item) => (
+                  <li key={item}>{item}</li>
+                ))}
+              </ul>
+            </div>
+            <div className="grid gap-4 md:grid-cols-4">
+              {['1:1 Consulting', 'Business Strategy', 'Personal Mentorship', 'Speaking / Workshops'].map((item) => (
+                <div key={item} className="rounded-2xl border border-white/10 p-5"><h4 className="font-semibold">{item}</h4><p className="mt-2 text-sm text-white/70">Tailored, high-context, execution-focused engagement.</p></div>
               ))}
             </div>
-            <button
-              onClick={() => navigate('contact')}
-              className="rounded-full bg-[#0A84FF] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
-            >
-              Book Call / Contact
-            </button>
+            <div className="rounded-3xl border border-white/10 p-7">
+              <h3 className="text-2xl font-semibold">Process</h3>
+              <div className="mt-4 grid gap-3 md:grid-cols-4">
+                {['Apply / Contact', 'Discovery', 'Strategy Session', 'Execution Direction'].map((item) => (
+                  <div key={item} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">{item}</div>
+                ))}
+              </div>
+              <form className="mt-7 grid gap-3" onSubmit={(event: FormEvent) => event.preventDefault()}>
+                <input className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Name" required />
+                <input type="email" className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Email" required />
+                <input className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Phone / WhatsApp" required />
+                <textarea className="min-h-32 rounded-xl border border-white/15 bg-white/[0.02] p-4" placeholder="What do you need help with?" required />
+                <select className="h-12 rounded-xl border border-white/15 bg-[#0c0d10] px-4" required>
+                  <option value="">Preferred engagement type</option>
+                  <option>1:1 Consulting</option>
+                  <option>Business Strategy</option>
+                  <option>Personal Mentorship</option>
+                  <option>Speaking / Workshops</option>
+                </select>
+                <button className="h-12 w-full rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em] md:w-auto md:px-7">Submit Inquiry</button>
+              </form>
+            </div>
           </section>
         ) : null}
 
-        {currentPage === 'contact' ? (
-          <section className="space-y-8">
-            <SectionTitle
+        {page === 'contact' ? (
+          <section className="space-y-10">
+            <SectionHeading
               eyebrow="Contact"
-              title="For advisory, speaking, and strategic conversations."
-              body="Share context, goals, and timelines. Relevant inquiries receive a response within 48 hours."
+              title="Reach out for consulting, mentorship, strategy, speaking, collaborations, or media inquiries."
             />
-            <form
-              className="grid max-w-3xl gap-4"
-              onSubmit={(event: FormEvent) => {
-                event.preventDefault();
-                alert('Thanks. Your message has been captured.');
-              }}
-            >
-              <input
-                required
-                className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4"
-                placeholder="Full name"
-              />
-              <input
-                required
-                type="email"
-                className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4"
-                placeholder="Email address"
-              />
-              <textarea
-                required
-                className="min-h-36 rounded-xl border border-white/15 bg-white/[0.02] p-4"
-                placeholder="Tell me about your challenge"
-              />
-              <button className="h-12 w-fit rounded-full bg-[#0A84FF] px-8 text-xs font-semibold uppercase tracking-[0.16em]">
-                Send Inquiry
-              </button>
+            <div className="grid gap-4 md:grid-cols-4">
+              {[
+                { label: 'Email', value: EMAIL, icon: <Mail size={16} /> },
+                { label: 'WhatsApp', value: '+91 89896 01701', icon: <Phone size={16} /> },
+                { label: 'YouTube', value: '@manishsirg', icon: <Youtube size={16} /> },
+                { label: 'Website', value: 'infinityglobaladvisory.com', icon: <ExternalLink size={16} /> },
+              ].map((item) => (
+                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
+                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#7DBBFF]">{item.icon} {item.label}</p>
+                  <p className="mt-3 text-sm text-white/80">{item.value}</p>
+                </div>
+              ))}
+            </div>
+            <form className="grid max-w-3xl gap-3" onSubmit={(event: FormEvent) => event.preventDefault()}>
+              <input className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Name" required />
+              <input type="email" className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Email" required />
+              <input className="h-12 rounded-xl border border-white/15 bg-white/[0.02] px-4" placeholder="Phone" />
+              <textarea className="min-h-36 rounded-xl border border-white/15 bg-white/[0.02] p-4" placeholder="Message" required />
+              <button className="h-12 w-full rounded-full bg-[#0A84FF] text-sm font-semibold uppercase tracking-[0.14em] md:w-auto md:px-8">Submit</button>
             </form>
-            <p className="text-sm text-white/65">Direct email: {EMAIL}</p>
+            <p className="text-sm text-white/65">For business execution and service-related inquiries, visit Infinity Global Advisory.</p>
           </section>
         ) : null}
       </main>
 
-      <footer className="border-t border-white/10 py-8">
-        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.16em] text-white/50">
-          <p>© {new Date().getFullYear()} Manish Goswami</p>
-          <p>Built for clarity, authority, and depth.</p>
+      <footer className="border-t border-white/10">
+        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
+          <p className="text-sm text-white/75">Strategist. Entrepreneur. Architect of High-Performance Systems.</p>
+          <div className="mt-5 flex flex-wrap gap-5 text-xs uppercase tracking-[0.14em] text-white/70">
+            {['About', 'Insights', 'Work With Me', 'Contact'].map((item) => (
+              <button
+                key={item}
+                onClick={() => navigate(item.toLowerCase().replace(/ /g, '-') as Exclude<Page, 'insight-detail'>)}
+              >
+                {item}
+              </button>
+            ))}
+          </div>
+          <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/65">
+            <a href="https://youtube.com/@manishsirg" target="_blank" rel="noreferrer">YouTube @manishsirg</a>
+            <a href="https://youtube.com/@mangopeptalks" target="_blank" rel="noreferrer">YouTube @mangopeptalks</a>
+            <a href="https://infinityglobaladvisory.com" target="_blank" rel="noreferrer">Infinity Global Advisory</a>
+          </div>
+          <p className="mt-6 text-xs uppercase tracking-[0.14em] text-white/45">© {new Date().getFullYear()} Manish Goswami. All rights reserved.</p>
         </div>
       </footer>
     </div>
   );
 }
 
 export default App;
