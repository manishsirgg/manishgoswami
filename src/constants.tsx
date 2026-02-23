
import React from 'react';
import { Shield, Target, TrendingUp } from 'lucide-react';
import { ServicePillar, PhilosophyItem, Venture } from './types';

export const BRAND_NAME = "Manish Sir G";
export const BRAND_TITLE = "Life Coaching | Education Consultancy | Business Consultancy";
export const CONTACT_EMAIL = "info@manishgoswami.com";
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
  { name: "EvoLeveX", description: "Advanced learning systems for the modern era.", url: "https://evolevex.com" },
  { name: "VidyaInfinity", description: "Empowering educational foundations.", url: "https://vidyainfinity.com" },
  { name: "InfinityGrowthTech", description: "Technological solutions for scalable business.", url: "https://infinitygrowthtech.com" },
  { name: "DaPear", description: "Strategic consulting for niche markets.", url: "https://evolevex.com/dapearstore" }
];
