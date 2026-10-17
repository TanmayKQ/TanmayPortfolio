export interface ProfileMe {
  name: string;
  role: string;
  location: string;
  status: string;
  looking_for: string[];
  graduating: string;
  focus: string[];
  stack: string[];
  shipped: {
    rest_apis: string;
    sap_pipelines: number;
    prisma_models: number;
  };
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
}

export interface ProfileProjectItem {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
  case_study: string;
}

export interface ProfileExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ProfileContact {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  availability: string;
}

export const PROFILE_ME: ProfileMe = {
  name: "Tanmay Kotak",
  role: "Backend & Applied AI Engineer",
  location: "Pune, IN",
  status: "open_to_internships_and_full_time",
  looking_for: ["SDE", "Backend", "AI Engineer"],
  graduating: "2027-06",
  focus: ["REST APIs", "SAP S/4HANA integrations", "RAG pipelines", "agentic AI"],
  stack: ["TypeScript", "Python", "Node.js", "FastAPI", "PostgreSQL", "Prisma"],
  shipped: {
    rest_apis: "130+",
    sap_pipelines: 9,
    prisma_models: 28,
  },
  links: {
    github: "https://github.com/TanmayKQ",
    linkedin: "https://www.linkedin.com/in/tanmay-kotak-b3840b282/",
    resume: "https://tanmay-devprofile.vercel.app/TanmayKotakResume.pdf",
  },
};

export const PROFILE_PROJECTS: ProfileProjectItem[] = [
  {
    slug: "docmind",
    title: "DocMind: Multi-Tenant RAG Document Intelligence Platform",
    summary:
      "Multi-tenant RAG platform featuring hybrid semantic-lexical retrieval and token streaming over Server-Sent Events.",
    stack: [
      "FastAPI",
      "PostgreSQL (pgvector)",
      "React.js",
      "Gemini API",
      "Alembic",
      "SSE",
    ],
    repo: "https://github.com/TanmayKQ/DocMind",
    case_study: "https://tanmay-devprofile.vercel.app/projects/docmind/",
  },
  {
    slug: "devagent",
    title: "DevAgent: Autonomous CLI Coding Assistant",
    summary:
      "Autonomous coding assistant decoupling Python LangGraph reasoning from a Node.js execution harness with a two-phase commit safety loop.",
    stack: ["Python", "LangGraph", "Node.js", "TypeScript"],
    repo: "https://github.com/TanmayKQ/DevAgent",
    case_study: "https://tanmay-devprofile.vercel.app/projects/devagent/",
  },
  {
    slug: "intelstudy",
    title: "IntelStudy: AI-Powered Study Assistant",
    summary:
      "Resilient study assistant converting course materials into structured summaries and quizzes with circuit-breaker inference protection.",
    stack: [
      "React.js",
      "Node.js/Express",
      "MongoDB",
      "Firebase",
      "HuggingFace",
    ],
    repo: "https://github.com/TanmayKQ/IntelStudy",
    case_study: "https://tanmay-devprofile.vercel.app/projects/intelstudy/",
  },
  {
    slug: "beautyandbangs",
    title: "Beauty & Bangs: Client Website (Freelance)",
    summary:
      "Production salon client site statically generated with zero render-blocking resources, scoring 100/98/100/100 on Google Lighthouse.",
    stack: ["Next.js", "Tailwind CSS", "Static Generation"],
    live: "https://beautyandbangs.vercel.app/",
    case_study: "https://tanmay-devprofile.vercel.app/projects/beautyandbangs/",
  },
];

export const PROFILE_EXPERIENCE: ProfileExperienceItem[] = [
  {
    company: "Krios Info Solutions Pvt. Ltd.",
    role: "Software Engineering Intern",
    location: "Wakad, Pune",
    period: "2026-06 to 2026-10",
    highlights: [
      "Architected enterprise ASN supply-chain portal with 130+ REST APIs, 28 Prisma models, and 9 SAP S/4HANA integration pipelines.",
      "Built inbound delivery-scheduling engine with multi-batch commitments, gate check-in guards, and transactional rollback mechanisms.",
      "Engineered document-intelligence pipeline with OCR extraction and automated PO valuation to catch billing discrepancies before SAP posting.",
    ],
  },
  {
    company: "Beauty & Bangs",
    role: "Freelance Web Developer",
    location: "Remote / Client Site",
    period: "2025-11",
    highlights: [
      "Delivered a statically generated Next.js/Tailwind client site scoring 100/98/100/100 on Lighthouse with zero render-blocking resources.",
    ],
  },
];

export const PROFILE_CONTACT: ProfileContact = {
  email: "tanmaykotak22@gmail.com",
  github: "https://github.com/TanmayKQ",
  linkedin: "https://www.linkedin.com/in/tanmay-kotak-b3840b282/",
  resume: "https://tanmay-devprofile.vercel.app/TanmayKotakResume.pdf",
  availability: "SDE / Backend / AI Engineer internships and full-time roles",
};
