import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, ExternalLink, Mail, Phone, MessageSquare, Send,
  Linkedin, Youtube, Instagram, Music, ChevronRight, Sparkles,
  BookOpen, Code, Lightbulb, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BRAND_NAME, 
  BRAND_TITLE, 
  SERVICE_PILLARS, 
  PHILOSOPHY, 
  VENTURES, 
  CONTACT_EMAIL,
  CONTACT_PHONE
} from './constants';
import heroImage from './assets/hero.png';
import logo from './assets/logo.png';
import favIcon from './assets/favicon.ico';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/manishsirg', icon: <Linkedin size={18} /> },
  { name: 'X', href: 'https://x.com/manishsirg', icon: <XIcon size={18} /> },
  { name: 'YouTube', href: 'https://youtube.com/@manishsirg', icon: <Youtube size={18} /> },
  { name: 'Instagram', href: 'https://instagram.com/manishsirgg', icon: <Instagram size={18} /> },
  { name: 'Spotify', href: 'https://creators.spotify.com/pod/show/manishsirg', icon: <Music size={18} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Framework', href: '#framework' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#" 
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-white flex items-center justify-center overflow-hidden relative">
             <img src={logo} alt="MG Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => {
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-bold text-xl">MG</span>';
             }} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tighter uppercase leading-none">Manish Sir G</span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#0A84FF] font-black">Strategic Architect</span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-bold hover:text-[#0A84FF] transition-colors uppercase tracking-[0.2em] text-white/60 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0A84FF] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, i) => (
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[#0A84FF] transition-all transform hover:scale-110"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            href="#contact" 
            className="bg-[#0A84FF] text-white px-6 py-2.5 text-[10px] font-black rounded-sm hover:bg-[#0070E0] transition-all uppercase tracking-[0.2em] ml-4 shadow-[0_0_20px_rgba(10,132,255,0.3)]"
          >
            Book Session
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 p-6"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black hover:text-[#0A84FF] transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-8 py-8">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#0A84FF] transition-all scale-125"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="w-full max-w-xs bg-[#0A84FF] text-white text-center py-5 text-lg font-black rounded-sm uppercase tracking-[0.2em] mt-4"
            >
              Book Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const App = () => {

  {/* FORM STATE */}
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen gradient-mesh selection:bg-[#0A84FF] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(10,132,255,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 text-[#0A84FF] text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
              <Sparkles size={12} className="animate-pulse" />
              Strategic Growth Architect
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase">
              Clarity <br />
              <span className="text-[#0A84FF]">Scale</span> <br />
              <span className="text-white/20">Impact</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-xl font-light leading-relaxed text-balance">
              {BRAND_TITLE}. Helping leaders dismantle confusion to rebuild their businesses and identities with discipline and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="group flex items-center justify-center gap-3 bg-[#0A84FF] text-white px-10 py-5 font-black rounded-sm hover:bg-[#0070E0] transition-all shadow-[0_20px_40px_rgba(10,132,255,0.2)] uppercase tracking-[0.2em] text-xs"
              >
                Initiate Strategy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-1000 group">
               <div className="absolute inset-0 border-2 border-[#0A84FF]/30 -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
               <img 
                 src={heroImage} 
                 alt="Manish Goswami" 
                 className="w-full h-full object-cover rounded-sm relative z-10 border border-white/10"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute -bottom-10 -left-10 z-20 w-64 p-8 bg-[#0A84FF] text-white font-black leading-none uppercase tracking-tighter text-4xl shadow-2xl">
                 Manish <br /> Goswami
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 bg-white text-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-5" />
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
               <span className="text-[#0A84FF] font-black tracking-[0.4em] uppercase text-xs">The Philosophy</span>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                 Systems <br />
                 Always <br />
                 Beat <br />
                 <span className="text-[#0A84FF]">Trends</span>
               </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl leading-relaxed font-light space-y-8 text-black/70"
            >
              <p>
                As a <span className="font-bold text-black">Life Coach, Education Consultant, and Business Consultant</span>, my journey has been defined by one core realization: clarity is the ultimate competitive advantage.
              </p>
              <p>
                While the market chases fleeting tactics, I've spent my career building institutional-grade structures that stand the test of time. I help leaders dismantle confusion to rebuild their businesses and identities with discipline and precision.
              </p>
              <div className="pt-8 flex gap-12">
                {[
                  { label: 'Growth', value: '10x+' },
                  { label: 'Ventures', value: '04+' },
                  { label: 'Consulting', value: '500+' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-4xl font-black text-black tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-[#0A84FF]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="space-y-6">
              <span className="text-[#0A84FF] font-black tracking-[0.4em] uppercase text-xs">Strategic Verticals</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Structural <br /> Advancement</h2>
            </div>
            <p className="text-white/30 max-w-sm text-xl font-light italic leading-relaxed">
              Specialized systems designed for comprehensive personal, educational, and technological dominance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {SERVICE_PILLARS.map((pillar, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                key={i} 
                className="group p-12 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#0A84FF]/40 transition-all duration-700 rounded-sm flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-9xl font-black tracking-tighter">{i + 1}</span>
                </div>
                <div className="mb-12 p-5 bg-[#0A84FF]/10 inline-block rounded-sm group-hover:bg-[#0A84FF] group-hover:text-white transition-all duration-500 text-[#0A84FF]">
                  {pillar.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-none">{pillar.title}</h3>
                <p className="text-white/50 mb-10 leading-relaxed font-light text-lg">{pillar.description}</p>
                <ul className="space-y-4 mb-12 flex-grow">
                  {pillar.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-4 text-sm text-white/70 font-bold uppercase tracking-widest">
                      <ChevronRight size={14} className="text-[#0A84FF]" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="#contact" 
                  className="flex items-center justify-between w-full py-5 px-8 border border-white/10 hover:border-[#0A84FF] hover:bg-[#0A84FF] text-white transition-all uppercase tracking-[0.3em] text-[10px] font-black"
                >
                  Select System
                  <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="framework" className="py-40 px-6 bg-[#0A84FF] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32 space-y-6">
             <span className="text-white/60 font-black tracking-[0.4em] uppercase text-xs">Execution Framework</span>
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">The Principles <br /> of Authority</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 border border-white/20">
            {PHILOSOPHY.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-12 bg-[#0A84FF] flex flex-col gap-6 hover:bg-white/5 transition-colors group"
              >
                <span className="text-6xl font-black text-white/20 group-hover:text-white/40 transition-colors">0{i+1}</span>
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">{item.title}</h3>
                <p className="text-white/80 text-lg font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-32 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl max-w-5xl mx-auto font-light italic leading-relaxed text-balance"
            >
              "We do not rise to the level of our goals. We fall to the level of our systems."
            </motion.p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-40 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0A84FF]/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-32 space-y-6">
             <span className="text-[#0A84FF] font-black tracking-[0.4em] uppercase text-xs">The Ecosystem</span>
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Integrated <br /> Verticals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {VENTURES.map((venture, i) => (
              <motion.div 
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                key={i} 
                className="p-12 bg-black group transition-all"
              >
                <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase group-hover:text-[#0A84FF] transition-colors">{venture.name}</h3>
                <p className="text-white/40 text-lg mb-8 leading-relaxed font-light">{venture.description}</p>
                <a href={venture.url} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-[#0A84FF]">
                  Visit Project <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">

          <div>
            <h2 className="text-6xl font-black uppercase mb-6">
              Ready To Build With <span className="text-[#0A84FF]">Clarity?</span>
            </h2>
            <p>Email: {CONTACT_EMAIL}</p>
            <p>Phone: {CONTACT_PHONE}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full bg-black border border-white/20 p-4"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full bg-black border border-white/20 p-4"
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/20 p-4"
              >
                <option value="">Select Inquiry</option>
                <option value="Life Coaching">Life Coaching</option>
                <option value="Education Consultancy">Education Consultancy</option>
                <option value="Business Consultancy">Business Consultancy</option>
              </select>

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Describe your current bottleneck..."
                className="w-full bg-black border border-white/20 p-4"
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[#0A84FF] py-4 font-bold uppercase"
              >
                {status === 'sending' ? 'Sending...' : 'Initiate Strategy Session'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm">Message sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong.</p>
              )}

            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-20 mb-32">
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white flex items-center justify-center">
                  <img src={logo} alt="MG Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => {
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-bold text-xl">MG</span>';
             }} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Manish Sir G</h3>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#0A84FF] font-black">Strategic Architect</span>
                </div>
              </div>
              <p className="text-white/30 max-w-sm font-light leading-relaxed text-lg">
                Strategic thinker and growth architect helping individuals and businesses build clarity, identity, and scalable systems for long-term dominance.
              </p>
              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a 
                    whileHover={{ scale: 1.1, color: '#0A84FF' }}
                    key={social.name} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:border-[#0A84FF] transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0A84FF]">Navigation</h4>
              <ul className="space-y-5">
                {['Home', 'About', 'Services', 'Contact'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0A84FF]">Ecosystem</h4>
              <ul className="space-y-5">
                {VENTURES.map(v => (
                  <li key={v.name}><a href={v.url} className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">{v.name}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0A84FF]">Presence</h4>
              <ul className="space-y-5">
                {SOCIAL_LINKS.map(s => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-3">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] font-black text-white/10">
            <div>© {new Date().getFullYear()} Manish Sir G. All strategic rights reserved.</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Systems</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
