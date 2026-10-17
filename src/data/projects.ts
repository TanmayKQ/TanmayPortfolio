export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  architecture: string;
  keyDecisions: string[];
  whatNext: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  repo?: string;
  live?: string;
  visual: string; // Identifier for the code-built signature component
  screenshots?: string[]; // Optional screenshots array (public/projects/<slug>/)
  caseStudy?: ProjectCaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: "docmind",
    title: "DocMind: Multi-Tenant RAG Document Intelligence Platform",
    shortTitle: "DocMind",
    tagline: "Multi-tenant RAG platform featuring hybrid semantic-lexical retrieval and token streaming over Server-Sent Events.",
    stack: [
      "FastAPI",
      "PostgreSQL (pgvector)",
      "React.js",
      "Gemini API",
      "Alembic",
      "SSE",
    ],
    bullets: [
      "Hybrid retrieval: pgvector semantic search combined with PostgreSQL tsvector full-text search in a single CTE query, weighted 70/30 semantic-to-lexical.",
      "Real-time answers over Server-Sent Events, streaming Gemini 2.5 Flash tokens through an async generator to a React typing interface.",
      "Async ingestion pipeline: 500-token chunking, batch embeddings (20 chunks per request), returns HTTP 202 in under 1 second while background workers process.",
      "12 REST endpoints with JWT auth, tenant isolation, and token-bucket rate limiting; schema changes managed with versioned Alembic migrations.",
    ],
    repo: "https://github.com/TanmayKQ/DocMind",
    visual: "DocMindRetrievalVisual",
    screenshots: [],
    caseStudy: {
      problem:
        "Traditional RAG implementations struggle with balancing semantic relevance with exact keyword accuracy (contract terms, specific identifiers, part numbers). Additionally, synchronous PDF parsing and dense embedding generation block worker threads, causing client timeouts during large document ingestion.",
      approach:
        "Designed an asynchronous ingestion pipeline with background workers returning HTTP 202 in under one second, paired with a hybrid CTE query in PostgreSQL that fuses dense pgvector cosine similarity with sparse tsvector keyword ranking weighted 70/30.",
      architecture:
        "Client Upload (HTTP 202 Accepted) -> Background Worker (500-token Chunking & Batch Embeddings) -> PostgreSQL / pgvector + tsvector tables. Query Path: React Client -> FastAPI SSE Endpoint -> Hybrid CTE (70% Cosine Vector + 30% tsvector full-text ranking) -> Top-K Context Window -> Gemini 2.5 Flash Token Stream -> SSE Response.",
      keyDecisions: [
        "70/30 Hybrid Retrieval Fusion: Pure vector search missed alphanumeric product IDs and specific contract terminology; combining pgvector with tsvector inside a single Common Table Expression (CTE) keeps lexical and semantic search in one PostgreSQL query, with no separate search service to run.",
        "HTTP 202 Async Ingestion vs Synchronous Ingestion: Offloaded PDF chunking and embedding generation to background task workers, reducing API response times to under 1 second and preventing worker thread exhaustion.",
        "Native Server-Sent Events (SSE) over WebSockets: SSE provides unidirectional streaming with automatic reconnection over standard HTTP, reducing protocol overhead for token-by-token LLM output.",
        "Token-Bucket Rate Limiter & Tenant Isolation: Enforced tenant isolation and per-tenant rate limits to prevent noisy-neighbor issues on shared database instances.",
      ],
      whatNext: [
        "Integrate cross-encoder reranking (Cohere or bge-reranker) on top of the initial CTE candidate pool for high-precision legal document analysis.",
        "Implement granular document access control lists (ACLs) per organization folder.",
      ],
    },
  },
  {
    slug: "devagent",
    title: "DevAgent: Autonomous CLI Coding Assistant",
    shortTitle: "DevAgent",
    tagline: "Autonomous coding assistant decoupling Python LangGraph reasoning from a Node.js execution harness with a two-phase commit safety loop.",
    stack: ["Python", "LangGraph", "Node.js", "TypeScript"],
    bullets: [
      "Decoupled architecture: a Python/LangGraph reasoning core and a Node.js/TypeScript execution harness talking over schema-validated JSONL IPC.",
      "LangGraph state machine that plans a task, performs filesystem operations, evaluates test results, and iteratively recovers from failures.",
      "Controlled execution: repository-scoped directory isolation, shell-less subprocesses, and a two-phase plan-then-commit flow so file changes need approval.",
      "Deterministic E2E evaluation framework with 17 automated coding benchmarks, using dependency injection to mock LLM responses for reproducible, cost-free CI.",
    ],
    repo: "https://github.com/TanmayKQ/DevAgent",
    visual: "DevAgentTerminalVisual",
    screenshots: [],
    caseStudy: {
      problem:
        "Monolithic autonomous coding agents often execute arbitrary shell commands blindly, leading to broken local environments, uncontrolled hallucinations, non-deterministic CI costs, and security risks.",
      approach:
        "Separated the system into two distinct processes: a Python/LangGraph agent that strictly reasons and plans, and a sandboxed Node.js/TypeScript execution harness that inspects diffs, requests user approval, and executes isolated subprocesses with schema-validated JSONL IPC.",
      architecture:
        "User Command -> Node.js CLI -> JSONL IPC -> Python/LangGraph State Machine (Planner Node -> Tool Call Node -> Evaluator Node -> Recovery Node) -> Two-Phase Commit Guard -> Filesystem Isolation & Shell-less Subprocess -> Test Execution & Feedback Loop.",
      keyDecisions: [
        "IPC via Schema-Validated JSONL over Stdin/Stdout: Streamed JSONL eliminates TCP port collisions and external daemon dependencies while enforcing strict runtime type checking across both language boundaries.",
        "Two-Phase Plan-Then-Commit Flow: File modifications are rendered as unified diffs and held in memory until explicit user authorization or test-phase validation, preventing catastrophic repository overwrites.",
        "Deterministic E2E Evaluation with 17 CI Benchmarks: Replaced expensive live LLM calls during continuous integration with dependency-injected mock response fixtures to verify state machine recovery loops deterministically and without API costs.",
        "Shell-less Subprocess Invocation: Executed commands with explicit argument arrays rather than shell string interpolation, mitigating command-injection risks.",
      ],
      whatNext: [
        "Integrate Language Server Protocol (LSP) diagnostics directly into the LangGraph evaluator node to catch syntax and type errors before invoking test suites.",
        "Implement SQLite checkpoint persistence for state rollbacks across multi-turn sessions.",
      ],
    },
  },
  {
    slug: "intelstudy",
    title: "IntelStudy: AI-Powered Study Assistant",
    shortTitle: "IntelStudy",
    tagline: "Resilient study assistant converting course materials into structured summaries and quizzes with circuit-breaker inference protection.",
    stack: [
      "React.js",
      "Node.js/Express",
      "MongoDB",
      "Firebase",
      "HuggingFace",
    ],
    bullets: [
      "Document-ingestion REST API that parses PDFs and chunks content before calling HuggingFace Inference APIs for summarization and quiz generation.",
      "Resilient inference layer: exponential-backoff retries, a circuit breaker, and structured JSON fallbacks for graceful degradation when the model API is down.",
      "Secured with Firebase Authentication, Helmet.js, and API rate limiting; environment secrets isolated across dev and production.",
    ],
    repo: "https://github.com/TanmayKQ/IntelStudy",
    visual: "IntelStudyCircuitVisual",
    screenshots: [],
    caseStudy: {
      problem:
        "Public AI inference endpoints frequently experience cold-start latency spikes, rate limits, and transient server outages, creating unhandled application errors and leaving students stranded during study sessions.",
      approach:
        "Constructed an Express.js ingestion backend featuring an automated circuit breaker (Closed -> Open -> Half-Open), exponential-backoff retry logic, and structured JSON schema fallbacks to guarantee continuous application responsiveness.",
      architecture:
        "Client Upload (PDF) -> Node.js / Express Ingestion -> PDF Extraction & Text Chunking -> Circuit Breaker Layer (Closed / Open / Half-Open state monitoring) -> HuggingFace Transformer Inference -> Fallback Cache & Structuring Engine -> MongoDB Storage -> React Client View.",
      keyDecisions: [
        "Circuit Breaker Pattern over Indefinite Retries: Prevents cascading thread lockups and exhaustion by tripping open when failure thresholds are crossed, delivering informative fallbacks instantly.",
        "Structured Schema Extraction with Regex Fallbacks: Standardized AI output format into clean quiz questions, options, and flashcard payloads.",
        "Firebase Token Verification Middleware: Secured every document endpoint with token validation, preventing unauthorized data access.",
        "Helmet.js & Rate Limiting: Hardened HTTP headers and throttled burst uploads to protect server resources.",
      ],
      whatNext: [
        "Add client-side lightweight ONNX/WebAssembly model fallbacks for offline study capability.",
        "Implement spaced-repetition scheduling (SuperMemo SM-2) for flashcard decks.",
      ],
    },
  },
  {
    slug: "beautyandbangs",
    title: "Beauty & Bangs: Client Website (Freelance)",
    shortTitle: "Beauty & Bangs",
    tagline: "Production salon client site statically generated with zero render-blocking resources, scoring 100/98/100/100 on Google Lighthouse.",
    stack: ["Next.js", "Tailwind CSS", "Static Generation"],
    bullets: [
      "Delivered a statically generated Next.js/Tailwind client site scoring 100/98/100/100 on Lighthouse, with asset optimization and zero render-blocking resources.",
    ],
    live: "https://beautyandbangs.vercel.app/",
    visual: "BeautyBangsLighthouseVisual",
    screenshots: [],
    caseStudy: {
      problem:
        "Local service businesses rely on rapid mobile discovery; heavy JavaScript frameworks and unoptimized images often inflate First Contentful Paint times and harm local search rankings.",
      approach:
        "Delivered a statically generated Next.js architecture with inlined critical styles, zero render-blocking resources, and modern WebP image assets.",
      architecture:
        "Next.js SSG Export -> Pure Static HTML/CSS Prerender -> Edge CDN (Vercel) -> Client Device (<1.2s First Contentful Paint, 0 Layout Shift).",
      keyDecisions: [
        "Static Export (SSG): Completely eliminated server-side computation at request time, achieving sub-second worldwide response times.",
        "Zero Render-Blocking Assets: Clean utility CSS and pre-sized image containers prevented layout shifts (CLS 0).",
      ],
      whatNext: [
        "Integrate automated booking appointment calendar with SMS notification hooks.",
      ],
    },
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "Krios Info Solutions Pvt. Ltd.",
    location: "Wakad, Pune",
    period: "Jun 2026 – Oct 2026",
    bullets: [
      "Led backend architecture and delivery of an enterprise ASN (advance shipping notice) supply-chain portal: 130+ REST APIs, a 28-model MySQL schema with Prisma ORM, and 9 bi-directional SAP S/4HANA integration pipelines, translating requirements from procurement and SAP teams.",
      "Built the inbound logistics and delivery-scheduling engine for manufacturing plants and vendor networks: real-time shipment coordination, multi-batch commitments, gate check-ins, transaction-level revision guards, and multi-step state machines for safe order changes and rollbacks.",
      "Built an asynchronous document-intelligence pipeline with OCR extraction and purchase-order validation, plus automated tax and valuation processing, to remove manual gate check-in bottlenecks and catch billing discrepancies before SAP posting.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Beauty & Bangs",
    location: "Remote / Client Site",
    period: "Nov 2025",
    bullets: [
      "Delivered a statically generated Next.js/Tailwind client site scoring 100/98/100/100 on Lighthouse, with asset optimization and zero render-blocking resources.",
    ],
  },
];

export const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java"],
    description: "Core programming languages used for APIs, algorithms, and agent runtimes.",
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "FastAPI",
      "REST API design",
      "Microservices",
    ],
    description: "High-throughput asynchronous servers, modular architectures, and clean API contracts.",
  },
  {
    category: "AI / LLM",
    skills: [
      "RAG",
      "LangGraph",
      "LangChain",
      "LLM APIs (Gemini)",
      "HuggingFace",
      "pgvector",
    ],
    description: "Applied generative AI, dense vector indexing, and agentic state machines.",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Prisma ORM", "MySQL", "MongoDB"],
    description: "Relational modeling, migrations, vector extensions, and document storage.",
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "React Query", "Tailwind CSS"],
    description: "Modern, performant client interfaces with zero layout shift and smooth interactivity.",
  },
  {
    category: "Cloud & Tools",
    skills: ["Firebase", "Vercel", "Git", "Alembic", "Server-Sent Events"],
    description: "Continuous deployment, version control, database migrations, and streaming protocols.",
  },
  {
    category: "Integrations & Patterns",
    skills: [
      "SAP S/4HANA integration",
      "state machines",
      "async job pipelines",
      "JWT auth",
      "rate limiting",
    ],
    description: "Enterprise data interchange, defensive state transitions, and background execution queues.",
  },
];

export const SKILL_PROJECT_MAP: Record<string, string> = {
  "pgvector": "DocMind",
  "FastAPI": "DocMind",
  "Server-Sent Events": "DocMind",
  "Alembic": "DocMind",
  "PostgreSQL": "DocMind",
  "RAG": "DocMind",
  "LangGraph": "DevAgent",
  "Python": "DevAgent",
  "Node.js": "DevAgent",
  "TypeScript": "DevAgent",
  "state machines": "DevAgent",
  "HuggingFace": "IntelStudy",
  "MongoDB": "IntelStudy",
  "Firebase": "IntelStudy",
  "Express.js": "IntelStudy",
  "SAP S/4HANA integration": "Krios Experience",
  "Prisma ORM": "Krios Experience",
  "MySQL": "Krios Experience",
  "async job pipelines": "Krios Experience",
  "Next.js": "Beauty & Bangs",
  "Tailwind CSS": "Beauty & Bangs",
};

export const PROOF_STATS = [
  { value: 130, suffix: "+", label: "REST APIs shipped", detail: "Krios enterprise supply-chain portal" },
  { value: 28, suffix: "", label: "Prisma models in schema", detail: "Single coherent relational MySQL schema" },
  { value: 9, suffix: "", label: "SAP S/4HANA pipelines", detail: "Bi-directional ERP integrations" },
  { value: 17, suffix: "", label: "Agent benchmarks in CI", detail: "Deterministic mock evaluation suite" },
  { value: 100, suffix: "/98/100/100", label: "Lighthouse mobile score", detail: "Shipped client production site" },
];

export const VERIFIED_LINKS = {
  email: "tanmaykotak22@gmail.com",
  github: "https://github.com/TanmayKQ",
  linkedin: "https://www.linkedin.com/in/tanmay-kotak-b3840b282/",
  portfolio: "https://tanmay-devprofile.vercel.app",
  docmindRepo: "https://github.com/TanmayKQ/DocMind",
  devagentRepo: "https://github.com/TanmayKQ/DevAgent",
  intelstudyRepo: "https://github.com/TanmayKQ/IntelStudy",
  beautyandbangsLive: "https://beautyandbangs.vercel.app/",
  resumePdf: "/TanmayKotakResume.pdf",
};
