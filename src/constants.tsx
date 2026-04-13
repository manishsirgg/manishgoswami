
import React from 'react';
import { Shield, Target, TrendingUp, Dumbbell, GraduationCap, Building2, Home, Plane, ShoppingBag } from 'lucide-react';
import { ServicePillar, PhilosophyItem, Venture } from './types';

export const BRAND_NAME = "Manish Sir G";
export const BRAND_TITLE = "Life Coaching | Education Consultancy | Business Consultancy";
export const CONTACT_EMAIL = "manishsirgg@gmail.com";
export const CONTACT_PHONE = "+91-8989601701";

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    title: "Life Coaching & Personal Development",
    description: "Expert guidance for life direction, mindset growth, and personal breakthroughs.",
    features: [
      "Life direction & clarity",
      "Confidence & Personality development",
      "Emotional intelligence & mindset growth",
      "Goal setting, discipline & habit building",
      "Career confusion & life transitions"
    ],
    icon: <Target className="w-8 h-8 text-[#0A84FF]" />
  },
  {
    title: "Education Consultancy",
    description: "Comprehensive support for career planning, university admissions, and test preparation.",
    features: [
      "Career planning & stream selection",
      "University shortlisting (India & Abroad)",
      "Admission applications & SOP guidance",
      "Visa documentation & approval assistance",
      "IELTS, TOEFL, GRE, GMAT, SAT prep"
    ],
    icon: <Shield className="w-8 h-8 text-[#0A84FF]" />
  },
  {
    title: "Business Consultancy",
    description: "Strategic solutions for brand identity, digital presence, and market growth.",
    features: [
      "Logo & brand identity design",
      "High-converting landing pages",
      "Ecommerce & LMS website setup",
      "Social media & Ads management",
      "Media & PR strategy"
    ],
    icon: <TrendingUp className="w-8 h-8 text-[#0A84FF]" />
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    title: "Clarity precedes scale.",
    description: "You cannot scale chaos. True growth requires a foundation of absolute structural clarity before acceleration."
  },
  {
    title: "Identity precedes influence.",
    description: "The world reflects what you are. Authority is a byproduct of a solid, engineered identity."
  },
  {
    title: "Discipline precedes success.",
    description: "Motivation is a fleeting emotion. Success is the inevitable result of disciplined systems and relentless execution."
  },
  {
    title: "Execution creates authority.",
    description: "Ideas are cheap. Strategic execution is the only currency that builds institutional-grade authority."
  }
];

export const VENTURES: Venture[] = [
  {
    name: "EvoLeveX",
    positioning: "Elite male performance system",
    tagline: "Evolve. Elevate. Excel.",
    offer: ["Discipline system", "Masculine development", "High-performance frameworks"],
    cta: "Enter Academy",
    url: "https://evolevex.com",
    icon: <Dumbbell className="w-7 h-7 text-[#0A84FF]" />
  },
  {
    name: "Vidya Infinity",
    positioning: "Global education & career architecture",
    tagline: "Global Education Architects",
    offer: ["Study abroad", "Career planning", "Admissions strategy"],
    cta: "Start Your Journey",
    url: "https://vidyainfinity.com",
    icon: <GraduationCap className="w-7 h-7 text-[#0A84FF]" />
  },
  {
    name: "Infinity Growth Tech",
    positioning: "Business infrastructure + execution",
    tagline: "Architecting Business Growth",
    offer: ["Business setup", "Tech systems", "Digital infrastructure"],
    cta: "Build Your Business",
    url: "https://infinitygrowthtech.com",
    icon: <Building2 className="w-7 h-7 text-[#0A84FF]" />
  },
  {
    name: "Brick Infinity",
    positioning: "Real estate solutions",
    tagline: "Find. Connect. Move.",
    offer: ["Buying", "Selling", "Rentals"],
    cta: "Explore Properties",
    url: "https://brickinfinity.com",
    icon: <Home className="w-7 h-7 text-[#0A84FF]" />
  },
  {
    name: "Swift Fly Trips",
    positioning: "Travel & experiences",
    tagline: "Find Your Next Escape",
    offer: ["Tours", "Visa assistance", "Holiday planning"],
    cta: "Plan Your Trip",
    url: "https://swiftflytrips.com",
    icon: <Plane className="w-7 h-7 text-[#0A84FF]" />
  },
  {
    name: "DaPear",
    positioning: "Lifestyle + identity brand",
    tagline: "Street. Casual. Essential.",
    offer: ["Apparel", "Lifestyle identity"],
    cta: "Shop Collection",
    url: "https://dapear.com",
    icon: <ShoppingBag className="w-7 h-7 text-[#0A84FF]" />
  }
];
