import { UserRound, GraduationCap, Sparkles, Plane } from "lucide-react";

export const services = [
  {
    audience:
      "For men working on confidence, habits, relationships and life direction.",
    name: "EvoLeveX",
    category: "Men’s personal transformation",
    title: "Men’s Personal Transformation",
    action: "Become stronger & more capable",
    copy: "Build confidence, discipline, emotional strength and a clearer sense of direction. Work on the habits, mindset and relationships that shape the man you want to become.",
    points: [
      "Confidence, self-worth & life direction",
      "Discipline, habits & emotional resilience",
      "Relationships, boundaries & personal growth",
    ],
    icon: <UserRound size={22} />,
    href: "https://evolevex.com/",
  },
  {
    audience:
      "For students, graduates and professionals making education or career decisions.",
    name: "VidyaInfinity",
    category: "Career counselling & education",
    title: "Career Counselling & Education Consultancy",
    action: "Build your career",
    copy: "Make informed choices about your career and education. Explore courses and institutes, plan study-abroad applications, and get support for your next academic or professional step.",
    points: [
      "Career guidance & psychometric assessments",
      "Course discovery, institutes & enrolment support",
      "Study abroad, university applications & SOPs",
      "Relevant test-preparation options",
    ],
    icon: <GraduationCap size={22} />,
    href: "https://vidyainfinity.com/",
  },
  {
    audience:
      "For individuals and businesses building a clear, credible digital presence.",
    name: "InfinityGrowthTech",
    category: "Personal branding & digital marketing",
    title: "Personal Branding & Digital Marketing",
    action: "Build your brand & grow digitally",
    copy: "Clarify your positioning and turn it into a visible digital presence. Connect brand identity, websites, content and marketing with the practical tools your business needs to grow.",
    points: [
      "Brand identity, websites, landing pages & online stores",
      "Social media, video, Meta Ads & Google Ads",
      "Marketplace management, PR, SaaS & AI automation",
    ],
    icon: <Sparkles size={22} />,
    href: "https://infinitygrowthtech.com/",
  },
  {
    audience:
      "For people comparing international mobility and long-term residency options.",
    name: "Infinity Global Advisory",
    category: "Citizenship, residency & global opportunities",
    title: "Citizenship, Permanent Residency & Global Opportunities",
    action: "Explore global opportunities",
    copy: "Explore citizenship, permanent residency and global mobility in the context of your goals. Discuss your priorities and questions as you consider opportunities across borders.",
    points: [
      "Citizenship goals & pathway exploration",
      "Permanent residency & long-term plans",
      "Country comparisons & international mobility",
      "Eligibility and documentation questions, where permitted",
    ],
    icon: <Plane size={22} />,
    href: "https://infinityglobaladvisory.com/",
  },
];

export type Service = (typeof services)[number];
