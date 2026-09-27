import { FormEvent, ReactNode, useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Sparkles,
  Target,
  UserRound,
  Youtube,
  X,
} from 'lucide-react';

type Page = 'home' | 'about' | 'work-with-me' | 'contact';

const SITE_URL = 'https://manishgoswami.com';
const EMAIL = 'manishsirgg@gmail.com';
const WHATSAPP = '+918989601701';
const YOUTUBE = 'https://youtube.com/@manishsirg';

const navItems: Array<{ label: string; page: Page; path: string }> = [
  { label: 'Home', page: 'home', path: '/' },
  { label: 'About', page: 'about', path: '/about' },
  { label: 'Work With Me', page: 'work-with-me', path: '/work-with-me' },
  { label: 'Contact', page: 'contact', path: '/contact' },
];

const pageMeta: Record<Page, { title: string; description: string }> = {
  home: {
    title: 'Manish Goswami | Coach & Consultant',
    description: "Men's coaching, career counseling, abroad admission support, personal branding and digital marketing guidance from Manish Goswami.",
  },
  about: {
    title: 'About Manish Goswami | Coach & Consultant',
    description: "Meet Manish Goswami, a men's coach, career counselor and personal branding consultant.",
  },
  'work-with-me': {
    title: 'Work With Manish Goswami | 1:1 Counseling',
    description: "Book men's coaching, career counseling, abroad admission support, or personal branding guidance with Manish Goswami.",
  },
  contact: {
    title: 'Contact Manish Goswami | Coach & Consultant',
    description: 'Contact Manish Goswami for coaching, counseling, admission support and personal branding.',
  },
};

const socialLinks: Array<{ label: string; href: string; icon: ReactNode }> = [
  { label: 'YouTube', href: YOUTUBE, icon: <Youtube size={16} /> },
  { label: 'Instagram', href: 'https://instagram.com/manishsirgg', icon: <Instagram size={16} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manishsirg/', icon: <Linkedin size={16} /> },
  { label: 'Facebook', href: 'https://www.facebook.com/manishsirg14', icon: <Facebook size={16} /> },
];

const services = [
  {
    title: "Men's Coaching",
    copy: 'Build confidence, emotional strength, discipline, relationships and a clear direction for the man you want to become.',
    icon: <UserRound size={20} />,
    points: ['Confidence & self-worth', 'Discipline & habits', 'Relationships & life direction'],
  },
  {
    title: 'Career Counseling',
    copy: 'Choose your next move with clarity—from stream and course selection to career transitions and a practical action plan.',
    icon: <Briefcase size={20} />,
    points: ['Career clarity', 'Course & stream selection', 'Career transition planning'],
  },
  {
    title: 'Abroad Admission Support',
    copy: 'Get personal guidance through university shortlisting, applications, SOPs and the study-abroad journey.',
    icon: <Plane size={20} />,
    points: ['University shortlisting', 'Applications & SOP guidance', 'Visa documentation support'],
  },
  {
    title: 'Personal Branding & Digital Marketing',
    copy: 'Shape a credible personal brand, communicate your value and build a focused digital presence that feels like you.',
    icon: <Sparkles size={20} />,
    points: ['Positioning & messaging', 'Content direction', 'Digital presence'],
  },
];

const ventures = [
  { name: 'EvoLeveX', copy: 'Men’s growth, discipline and self-mastery.', href: 'https://EvoLeveX.com' },
  { name: 'VidyaInfinity', copy: 'Career clarity and global education support.', href: 'https://vidyainfinity.com' },
  { name: 'InfinityGrowthTech', copy: 'Digital presence, technology and marketing support.', href: 'https://infinitygrowthtech.com' },
  { name: 'BrickInfinity', copy: 'Simple, trusted real-estate connections.', href: 'https://BrickInfinity.com' },
];

const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => (
  <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 ${variant === 'primary' ? 'bg-gradient-to-r from-[#4DA3FF] to-[#2B7BFF] text-[#061325] shadow-[0_0_40px_rgba(47,136,255,0.3)] hover:brightness-110' : 'border border-white/20 bg-white/[0.02] text-white hover:border-[#66B2FF]/50 hover:bg-[#66B2FF]/10'} ${className}`} {...props}>
    {children}
  </button>
);

const sectionClass = 'mt-16 rounded-3xl border border-white/10 bg-[#0B111B]/75 p-7 sm:p-10 lg:mt-20 lg:p-14';

const App = () => {
  const route = navItems.find((item) => item.path === (window.location.pathname.replace(/\/$/, '') || '/'));
  const [page, setPage] = useState<Page>(route?.page ?? 'home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const match = navItems.find((item) => item.path === (window.location.pathname.replace(/\/$/, '') || '/'));
      setPage(match?.page ?? 'home');
      setMobileOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[page];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);
    const path = navItems.find((item) => item.page === page)?.path ?? '/';
    const url = `${SITE_URL}${path === '/' ? '' : path}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  }, [page]);

  const navigateTo = (nextPage: Page) => {
    const path = navItems.find((item) => item.page === nextPage)?.path ?? '/';
    window.history.pushState({}, '', path);
    setPage(nextPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070D] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070D]/85 backdrop-blur-xl">
        <Container>
          <nav className="flex min-h-20 items-center justify-between py-4">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 text-left">
              <img src="/logo.svg" alt="Manish Goswami logo" className="h-11 w-11 rounded-md border border-white/10 bg-black object-contain p-1" />
              <div><p className="text-lg font-semibold tracking-wide">Manish Goswami</p><p className="text-xs uppercase tracking-[0.24em] text-[#66B2FF]">Coach & Consultant</p></div>
            </button>
            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => <button key={item.page} onClick={() => navigateTo(item.page)} className={`text-sm font-medium transition hover:text-white ${page === item.page ? 'text-[#8CC7FF]' : 'text-white/75'}`}>{item.label}</button>)}
              <Button onClick={() => navigateTo('work-with-me')} className="rounded-full px-5 py-2.5">Book 1:1</Button>
            </div>
            <button className="lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
          </nav>
          {mobileOpen && <div className="border-t border-white/10 py-5 lg:hidden">{navItems.map((item) => <button key={item.page} onClick={() => navigateTo(item.page)} className="mb-2 block w-full rounded-xl border border-white/10 px-4 py-3 text-left">{item.label}</button>)}</div>}
        </Container>
      </header>
      <Container className="pb-20">
        <main className="pt-12">
          {page === 'home' && <HomePage navigateTo={navigateTo} />}
          {page === 'about' && <AboutPage navigateTo={navigateTo} />}
          {page === 'work-with-me' && <WorkWithMePage />}
          {page === 'contact' && <ContactPage />}
        </main>
        <Footer navigateTo={navigateTo} />
      </Container>
      <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#05240f] shadow-[0_12px_35px_rgba(37,211,102,0.4)]"><MessageCircle size={17} /> WhatsApp</a>
    </div>
  );
};

const HomePage = ({ navigateTo }: { navigateTo: (page: Page) => void }) => (
  <>
    <section className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C1221] via-[#090E19] to-[#070A12] p-8 shadow-[0_0_100px_rgba(34,119,255,0.18)] lg:grid-cols-[1.12fr_0.88fr] lg:p-12">
      <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-[#2d87ff]/20 blur-3xl" />
      <div className="relative self-center">
        <p className="text-xs uppercase tracking-[0.28em] text-[#66B2FF]">Coach & Consultant</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">Clarity for your life.<br /><span className="text-[#5EAFFF]">Direction for what’s next.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">Personal guidance for men, students and professionals navigating confidence, career choices, global education and personal visibility.</p>
        <div className="mt-8 grid gap-3 sm:flex"><Button onClick={() => navigateTo('work-with-me')}>Book a 1:1 Session <ArrowRight size={16} /></Button><Button variant="secondary" onClick={() => navigateTo('about')}>About Manish</Button></div>
        <p className="mt-7 text-sm text-white/60">Men’s Coaching • Career Counseling • Abroad Admissions • Personal Branding</p>
      </div>
      <div className="relative rounded-3xl border border-[#66B2FF]/25 bg-[#070C14] p-3"><img src="/hero.png" alt="Manish Goswami" className="h-full max-h-[620px] w-full rounded-[1.25rem] object-cover" /></div>
    </section>

    <section className={sectionClass}>
      <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">How I can help</p><h2 className="mt-3 text-3xl font-semibold">Focused support for real-life decisions</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{services.map((service) => <ServiceCard key={service.title} {...service} />)}</div>
    </section>

    <section className={`${sectionClass} grid gap-8 lg:grid-cols-[1fr_0.8fr]`}>
      <div><p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">Start with one conversation</p><h2 className="mt-3 text-3xl font-semibold">First Counseling Session</h2><p className="mt-4 max-w-2xl leading-7 text-white/70">A private 60-minute Google Meet session to understand where you are, define the real challenge and leave with clear next steps.</p><div className="mt-6 flex flex-wrap gap-3 text-sm text-white/75"><span className="rounded-full border border-white/15 px-4 py-2">60 minutes</span><span className="rounded-full border border-white/15 px-4 py-2">Google Meet</span><span className="rounded-full border border-[#66B2FF]/40 bg-[#66B2FF]/10 px-4 py-2 font-semibold text-[#A8D4FF]">₹5,000</span></div></div>
      <div className="flex items-center rounded-2xl border border-[#66B2FF]/25 bg-[#0B1728] p-7"><div><BadgeCheck className="text-[#66B2FF]" size={28} /><p className="mt-4 text-lg font-semibold">Confidential. Practical. Personal.</p><p className="mt-2 text-sm leading-6 text-white/65">Choose your focus and preferred time, then continue to booking.</p><Button onClick={() => navigateTo('work-with-me')} className="mt-5">Schedule Your Session</Button></div></div>
    </section>

    <section className={sectionClass}><p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">Platforms & initiatives</p><h2 className="mt-3 text-3xl font-semibold">Explore the ecosystem</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ventures.map((venture) => <a key={venture.name} href={venture.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-[#0C111A] p-5 transition hover:-translate-y-1 hover:border-[#66B2FF]/45"><div className="flex items-center justify-between"><h3 className="font-semibold">{venture.name}</h3><ExternalLink size={15} className="text-white/40 group-hover:text-[#8CC7FF]" /></div><p className="mt-3 text-sm leading-6 text-white/65">{venture.copy}</p></a>)}</div></section>
  </>
);

const ServiceCard = ({ title, copy, icon, points }: { title: string; copy: string; icon: ReactNode; points: string[] }) => <article className="rounded-2xl border border-white/10 bg-[#0B111E] p-6 transition hover:border-[#66B2FF]/45"><div className="inline-flex rounded-xl border border-[#66B2FF]/30 bg-[#66B2FF]/10 p-2.5 text-[#8fc7ff]">{icon}</div><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{copy}</p><ul className="mt-4 space-y-2 text-sm text-white/60">{points.map((point) => <li key={point} className="flex gap-2"><span className="text-[#66B2FF]">✓</span>{point}</li>)}</ul></article>;

const AboutPage = ({ navigateTo }: { navigateTo: (page: Page) => void }) => (
  <section className={sectionClass}>
    <p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">About</p><h1 className="mt-3 text-4xl font-semibold md:text-5xl">Manish Goswami</h1><p className="mt-4 text-xl text-white/75">Coach & Consultant</p>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
      <div className="space-y-8 text-white/72">
        <article><h2 className="text-2xl font-semibold text-white">Guidance built around the person</h2><p className="mt-3 leading-8">I help men, students and professionals move through uncertainty with more self-awareness, confidence and direction. My work brings together men’s coaching, career counseling, overseas admission support and personal branding.</p></article>
        <article><h2 className="text-2xl font-semibold text-white">My approach</h2><p className="mt-3 leading-8">Good guidance does not hand you a generic answer. It asks better questions, understands your context and turns clarity into practical action. Every conversation is direct, confidential and focused on decisions you can use.</p></article>
        <article><h2 className="text-2xl font-semibold text-white">What I believe</h2><p className="mt-3 leading-8">Confidence grows through honest self-understanding. Careers become clearer when strengths meet opportunity. A strong personal brand begins with a true, consistent identity—not performance for attention.</p></article>
      </div>
      <aside className="rounded-2xl border border-white/10 bg-[#0A101A] p-7"><h2 className="text-xl font-semibold">Areas of focus</h2><div className="mt-5 space-y-3">{["Men’s identity, confidence & discipline", 'Career choices & transitions', 'Study-abroad planning', 'Personal positioning & digital presence'].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white/10 p-4 text-sm text-white/75"><Target size={17} className="shrink-0 text-[#66B2FF]" />{item}</div>)}</div><Button onClick={() => navigateTo('work-with-me')} className="mt-6 w-full">Work With Me</Button></aside>
    </div>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ventures.map((venture) => <a key={venture.name} href={venture.href} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-[#66B2FF]/40">{venture.name} <ExternalLink className="ml-1 inline" size={13} /></a>)}</div>
  </section>
);

const WorkWithMePage = () => (
  <>
    <section className={sectionClass}><p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">Work with me</p><h1 className="mt-3 text-4xl font-semibold md:text-5xl">One clear conversation can change your direction.</h1><p className="mt-4 max-w-3xl text-xl leading-8 text-white/70">Choose the support you need. We’ll use the first session to understand your situation and create a practical path forward.</p><div className="mt-10 grid gap-5 md:grid-cols-2">{services.map((service) => <ServiceCard key={service.title} {...service} />)}</div></section>
    <BookingCard />
  </>
);

const BookingCard = () => {
  const [booking, setBooking] = useState({ name: '', email: '', focus: "Men's Coaching", date: '', time: '' });
  const [ready, setReady] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setReady(true); };
  const calendarUrl = (() => {
    if (!booking.date || !booking.time) return '#';
    const start = new Date(`${booking.date}T${booking.time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const format = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const params = new URLSearchParams({ action: 'TEMPLATE', text: `First Counseling Session — ${booking.focus}`, dates: `${format(start)}/${format(end)}`, details: `Private 1:1 counseling with Manish Goswami. Focus: ${booking.focus}. A Google Meet link will be shared after payment confirmation. Client: ${booking.name} (${booking.email}). Fee: INR 5,000.`, add: EMAIL });
    return `https://calendar.google.com/calendar/render?${params}`;
  })();
  const paymentMessage = encodeURIComponent(`Hi Manish, I have scheduled my first counseling session for ${booking.date} at ${booking.time} (${booking.focus}). Please send me the secure payment link for ₹5,000 and confirm my Google Meet.`);

  return <section className={`${sectionClass} glow-border`} id="book"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">1:1 on Google Meet</p><h2 className="mt-3 text-3xl font-semibold">First Counseling Session</h2><p className="mt-4 leading-7 text-white/70">60 focused minutes for clarity, honest guidance and next steps.</p><div className="mt-6 rounded-2xl border border-[#66B2FF]/30 bg-[#66B2FF]/10 p-5"><p className="text-sm text-white/60">Session fee</p><p className="mt-1 text-3xl font-semibold">₹5,000 <span className="text-sm font-normal text-white/50">INR</span></p></div><ul className="mt-6 space-y-3 text-sm text-white/70"><li>✓ Private Google Meet session</li><li>✓ Your chosen counseling focus</li><li>✓ 60-minute first consultation</li><li>✓ Clear, practical next steps</li></ul></div><div>
    {!ready ? <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-white/65">Name<input required value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#07101A] px-4 text-white" placeholder="Your name" /></label><label className="text-sm text-white/65">Email<input required type="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#07101A] px-4 text-white" placeholder="you@example.com" /></label><label className="text-sm text-white/65 sm:col-span-2">What would you like help with?<select value={booking.focus} onChange={(e) => setBooking({ ...booking, focus: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#07101A] px-4 text-white">{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label className="text-sm text-white/65">Preferred date<input required type="date" min={new Date().toISOString().split('T')[0]} value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#07101A] px-4 text-white" /></label><label className="text-sm text-white/65">Preferred time<input required type="time" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#07101A] px-4 text-white" /></label><button className="mt-2 h-12 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#2B7BFF] font-semibold text-[#061325] sm:col-span-2">Review & Continue — ₹5,000</button><p className="text-xs leading-5 text-white/45 sm:col-span-2">Your preferred slot is confirmed after availability and payment are verified. Times use your device’s local timezone.</p></form> : <div className="rounded-2xl border border-white/10 bg-[#07101A] p-6"><BadgeCheck size={28} className="text-[#66B2FF]" /><h3 className="mt-4 text-2xl font-semibold">Your session request is ready</h3><p className="mt-3 text-white/65">{booking.focus} • {booking.date} at {booking.time} • ₹5,000</p><div className="mt-6 grid gap-3"><a href={calendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4DA3FF] px-5 py-3 font-semibold text-[#061325]"><CalendarDays size={17} /> Add to Google Calendar</a><a href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${paymentMessage}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 font-semibold text-[#7bec9e]"><MessageCircle size={17} /> Get secure ₹5,000 payment link</a><button onClick={() => setReady(false)} className="py-2 text-sm text-white/55 hover:text-white">Edit details</button></div><p className="mt-4 text-xs leading-5 text-white/45">After payment confirmation, your final invite and Google Meet link will be sent to {booking.email}.</p></div>}
  </div></div></section>;
};

const ContactPage = () => <section className={sectionClass}><p className="text-xs uppercase tracking-[0.25em] text-[#66B2FF]">Contact</p><h1 className="mt-3 text-4xl font-semibold md:text-5xl">Let’s talk about what’s next.</h1><p className="mt-4 max-w-2xl text-xl leading-8 text-white/70">For coaching, career counseling, abroad admission support or personal branding, reach out directly.</p><div className="mt-10 grid gap-4 sm:grid-cols-2"><a href={`mailto:${EMAIL}`} className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"><Mail className="text-[#66B2FF]" /><p className="mt-4 text-sm text-white/50">Email</p><p className="mt-1">{EMAIL}</p></a><a href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"><Phone className="text-[#66B2FF]" /><p className="mt-4 text-sm text-white/50">WhatsApp / Call</p><p className="mt-1">{WHATSAPP}</p></a><a href={YOUTUBE} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-[#0B111A] p-6 hover:border-[#66B2FF]/40"><Youtube className="text-[#66B2FF]" /><p className="mt-4 text-sm text-white/50">YouTube</p><p className="mt-1">@manishsirg</p></a><div className="rounded-2xl border border-white/10 bg-[#0B111A] p-6"><GraduationCap className="text-[#66B2FF]" /><p className="mt-4 text-sm text-white/50">Book online</p><a href="/work-with-me#book" className="mt-1 inline-flex items-center gap-1 text-[#8CC7FF]">First Counseling Session <ArrowRight size={14} /></a></div></div></section>;

const Footer = ({ navigateTo }: { navigateTo: (page: Page) => void }) => <footer className="mt-20 rounded-3xl border border-white/10 bg-[#080d16] p-8 sm:p-10"><div className="flex flex-col justify-between gap-8 md:flex-row"><div><div className="flex items-center gap-3"><img src="/logo.svg" alt="Manish Goswami logo" className="h-11 w-11 rounded-md border border-white/10 bg-black p-1" /><div><p className="font-semibold">Manish Goswami</p><p className="text-xs uppercase tracking-[0.2em] text-[#8CC7FF]">Coach & Consultant</p></div></div><p className="mt-4 max-w-xl text-sm leading-6 text-white/60">Men’s coaching, career counseling, abroad admission support, and personal branding & digital marketing.</p></div><div className="flex gap-3">{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-[#66B2FF]/50 hover:text-white">{link.icon}</a>)}</div></div><div className="mt-7 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-white/65">{navItems.map((item) => <button key={item.page} onClick={() => navigateTo(item.page)} className="hover:text-white">{item.label}</button>)}</div><p className="mt-6 text-xs text-white/35">© {new Date().getFullYear()} Manish Goswami. All rights reserved.</p></footer>;

export default App;
