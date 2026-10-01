// The counter guide: a scripted, keyword-matched Q&A. No model runs; every answer is hand-written.

export interface AgentKnowledgeItem {
  id: string;
  keywords: string[];
  /** Per-keyword score. Generic topics get less so specific ones win ties. */
  weight?: number;
  response: string;
  suggestedPrompts: string[];
  actionLink?: { label: string; sectionId: string };
}

export const AGENT_KNOWLEDGE_BASE: AgentKnowledgeItem[] = [
  {
    id: "greetings",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "howdy", "namaste"],
    weight: 0.5,
    response: `Hello! I'm the counter guide: a scripted helper with answers Sworup wrote himself (no AI model runs here).

Ask about his projects, skills, experience, or how to reach him.`,
    suggestedPrompts: ["What does he build?", "What projects has he built?", "How can I hire him?"],
  },
  {
    id: "overview",
    keywords: ["who", "introduce", "summary", "overview", "bio", "background", "yourself"],
    weight: 1,
    response: `Sworup Ranjan Nayak is an AI/ML engineer and fullstack developer with 3+ years of production experience.

He builds:
• Multi-agent AI systems with LangGraph and the Model Context Protocol (FastMCP)
• Retrieval-Augmented Generation (RAG) pipelines on vector databases
• React clinical software: IPD, EMR and nursing-station modules used by 50+ clinicians

He holds a B.Tech in Computer Science (9.1 CGPA) from Silicon Institute of Technology.`,
    suggestedPrompts: ["What projects has he built?", "What did he do at Squbix?", "How can I hire him?"],
    actionLink: { label: "Walk the stalls", sectionId: "stalls" },
  },
  {
    id: "social-links",
    keywords: ["social", "socials", "links", "link", "linkedin", "github", "profile", "profiles", "handles", "url", "repo", "repos"],
    response: `His profiles:

• LinkedIn: linkedin.com/in/sworup-ranjan-nayak
• GitHub: github.com/sworupnayak62
• Email: sworupnayak62@gmail.com`,
    suggestedPrompts: ["How can I hire him?", "What projects has he built?", "What are his top skills?"],
    actionLink: { label: "Go to the counter", sectionId: "contact" },
  },
  {
    id: "skills",
    keywords: ["skills", "skill", "stack", "tech", "technologies", "languages", "tools", "python", "typescript", "react", "nextjs", "aws", "docker"],
    response: `His toolkit:

1. AI & agents: LangGraph, LangChain, Model Context Protocol (MCP), vector DBs (ChromaDB, Pinecone, Qdrant, FAISS), OpenAI & Gemini APIs, prompt and token optimization
2. Frontend: React, TypeScript, Next.js, Redux Toolkit, Tailwind CSS
3. Backend & real-time: Python (FastAPI), Node.js / Express, WebSockets, JWT & RBAC security
4. Cloud & delivery: AWS (EC2, ECS, S3, IAM), Docker, GitHub Actions`,
    suggestedPrompts: ["Tell me about his AI work", "What projects has he built?", "How can I hire him?"],
    actionLink: { label: "Read the menu", sectionId: "skills" },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "build", "builds", "portfolio", "apps", "stalls", "made"],
    response: `The stalls on this page:

1. Multi-Agent Clinical Workflow Pipeline: LangGraph agents turning doctor dictation into structured EMR data (50% less manual documentation).
2. GitHub MCP Server: a FastMCP server that lets AI agents work with repositories, pull requests and issues.
3. Telephony Voice Agent: an AI agent that talks to callers over the phone.
4. Handwritten Document Data Entry Agent: OpenCV + multimodal LLMs extracting data from handwritten forms.
5. Reusable RAG Chatbot Framework: chunking, vector search and guardrail prompts.
6. Speech-to-Speech Coding Assistant: hands-free voice coding.
7. Portfolio Guide: me, a scripted guide.`,
    suggestedPrompts: ["Which of these is in production?", "How does the guardrail agent work?", "Show his GitHub"],
    actionLink: { label: "Walk the stalls", sectionId: "stalls" },
  },
  {
    id: "production",
    keywords: ["production", "shipped", "live", "deployed", "real", "prod"],
    response: `The multi-agent clinical pipeline was built at Squbix for its hospital software, where it lifted clinical workflow automation by 35% and cut manual documentation by 50%.

His React work at Squbix (the IPD module, EMR components, nursing station, notifications) is in daily use by 50+ clinicians.

For the status of the other stalls, ask him by email.`,
    suggestedPrompts: ["How does the guardrail agent work?", "What did he do at Squbix?", "How can I hire him?"],
    actionLink: { label: "Watch the kitchen", sectionId: "demo" },
  },
  {
    id: "pipeline",
    keywords: ["demo", "pipeline", "kitchen", "guardrail", "guardrails", "validate", "validation", "validator", "dictation", "extraction", "loop"],
    response: `The clinical pipeline runs four agent stations:

1. Transcribe: speech to text
2. Extract: vitals, medications, allergies
3. Validate: a guardrail agent checks the extraction, for example a drug against the patient's allergies. If it fails, the state goes back to Extract (a cyclic LangGraph loop) and anything still unsafe is held for a clinician.
4. Format: EMR-ready JSON

The kitchen on this page replays it with pre-written outputs. Try swapping the drug on the cardiology ticket to watch the guardrail reject it.`,
    suggestedPrompts: ["Which of these is in production?", "Does he know FHIR / EMR?", "How can I hire him?"],
    actionLink: { label: "Watch the kitchen", sectionId: "demo" },
  },
  {
    id: "healthcare",
    keywords: ["fhir", "emr", "ehr", "clinical", "healthcare", "health", "hospital", "ipd", "medical", "clinicians", "nursing", "patient", "patients"],
    response: `Healthcare software is where he has shipped the most:

• Led the IPD (in-patient) module and dashboards used by 50+ clinicians
• Integrated EMR components: discharge summaries, clinical notes, vitals, medication charts
• Medication management including infusion therapy and variable-dose workflows
• A notification module with real-time WebSocket alerts across 4 HIS modules
• JWT + RBAC across 20+ user roles
• A drag-and-drop form engine that cut form configuration effort by ~60%

His clinical agent pipeline outputs EMR-ready structured data (FHIR / EMR is in its stack).`,
    suggestedPrompts: ["How does the guardrail agent work?", "What did he do at Squbix?", "How can I hire him?"],
    actionLink: { label: "Open the workshop", sectionId: "workshop" },
  },
  {
    id: "experience",
    keywords: ["squbix", "job", "jobs", "company", "employer", "experience", "career", "worked", "sde"],
    response: `Squbix Digital, Bhubaneswar:

• Software Engineer (SDE-II), Mar 2025 to Sep 2026: led IPD module delivery for 50+ clinicians and designed multi-agent clinical automation with LangGraph (35% automation gain, 50% less documentation, 25% lower token cost).
• Software Engineer (SDE-I), Sep 2023 to Mar 2025: built a drag-and-drop form engine (~60% less configuration effort), core EMR modules and nursing-station tools.`,
    suggestedPrompts: ["Does he know FHIR / EMR?", "What are his top skills?", "How can I hire him?"],
    actionLink: { label: "Open the workshop", sectionId: "workshop" },
  },
  {
    id: "ai-agentic",
    weight: 1.5, // broad: any more specific topic should win a tie
    keywords: ["ai", "ml", "agent", "agents", "agentic", "langgraph", "langchain", "mcp", "fastmcp", "rag", "genai", "llm", "llms", "vector"],
    response: `His AI work:

• LangGraph multi-agent systems: stateful, cyclic graphs with specialist agents for classification, extraction and safety guardrails
• Model Context Protocol: FastMCP servers that give AI agents tools, such as his GitHub MCP server
• RAG: chunking strategies, vector indexing (ChromaDB, FAISS, Qdrant) and guardrail prompts that keep answers to the retrieved text
• Token optimization: context pruning that cut LLM token cost by 25% in production`,
    suggestedPrompts: ["How does the guardrail agent work?", "Which of these is in production?", "How can I hire him?"],
    actionLink: { label: "Watch the kitchen", sectionId: "demo" },
  },
  {
    id: "voice",
    keywords: ["voice", "telephony", "speech", "audio", "calls", "calling", "phone agent"],
    response: `Two stalls are voice work:

• Telephony Voice Agent: an AI agent that holds phone conversations, listening, reasoning and speaking back over the call.
• Speech-to-Speech Coding Assistant: hands-free voice questions answered with speech and on-screen code.`,
    suggestedPrompts: ["What projects has he built?", "Tell me about his AI work", "How can I hire him?"],
    actionLink: { label: "Walk the stalls", sectionId: "stalls" },
  },
  {
    id: "now",
    keywords: ["currently", "working on", "right now", "now", "latest", "cooking", "special", "handwritten", "ocr", "data entry"],
    response: `On the stove right now: the Handwritten Document Data Entry AI Agent.

It cleans up scanned handwritten forms with OpenCV, reads them with a vision-capable LLM, and saves the structured result to PostgreSQL, with a FastAPI backend and an Electron desktop app for checking what was read. It's still in progress.`,
    suggestedPrompts: ["What projects has he built?", "Tell me about his AI work", "How can I hire him?"],
    actionLink: { label: "See the stall", sectionId: "data-entry-ai-agent" },
  },
  {
    id: "looking",
    keywords: ["looking", "roles", "role", "opportunities", "opportunity", "available", "availability", "notice", "position", "freelance", "contract", "salary"],
    response: `He's open to:
• AI/ML engineering and agentic-systems roles
• Fullstack roles
• Freelance and contract builds

For notice period, start dates or compensation, email him directly.`,
    suggestedPrompts: ["Is he open to relocation?", "How can I hire him?", "What are his top skills?"],
    actionLink: { label: "Go to the counter", sectionId: "contact" },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "mail", "phone", "hire", "reach", "interview", "call", "connect", "hiring", "number"],
    response: `Fastest route: email sworupnayak62@gmail.com.

Also: +91 8249220066 · linkedin.com/in/sworup-ranjan-nayak

The counter at the end of the page has ready-made email tickets for hiring, contract builds, and talking shop.`,
    suggestedPrompts: ["What roles is he looking for?", "Is he open to relocation?", "Show his GitHub"],
    actionLink: { label: "Go to the counter", sectionId: "contact" },
  },
  {
    id: "location",
    keywords: ["location", "city", "country", "relocate", "relocation", "remote", "where", "hybrid", "based", "onsite"],
    response: `He's based in Bhubaneswar, Odisha, India, and open to remote, hybrid, or relocating for the right role.`,
    suggestedPrompts: ["What roles is he looking for?", "How can I hire him?", "What are his top skills?"],
    actionLink: { label: "Go to the counter", sectionId: "contact" },
  },
  {
    id: "education",
    keywords: ["education", "college", "degree", "cgpa", "gpa", "silicon", "btech", "university", "school", "marks", "graduate", "graduated"],
    response: `B.Tech in Computer Science and Engineering, Silicon Institute of Technology, Bhubaneswar (class of June 2023), CGPA 9.1 / 10.

Focus: algorithms, distributed systems, database management and artificial intelligence.`,
    suggestedPrompts: ["What did he do at Squbix?", "What projects has he built?", "How can I hire him?"],
    actionLink: { label: "Open the workshop", sectionId: "workshop" },
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download", "pdf"],
    response: `There's no download here yet. Ask for his latest resume at sworupnayak62@gmail.com, or see his history on LinkedIn: linkedin.com/in/sworup-ranjan-nayak.`,
    suggestedPrompts: ["What did he do at Squbix?", "What are his top skills?", "How can I hire him?"],
    actionLink: { label: "Go to the counter", sectionId: "contact" },
  },
];

export const FALLBACK: AgentKnowledgeItem = {
  id: "fallback",
  keywords: [],
  response: `That isn't in my script. I only know what Sworup wrote down: his projects, skills, experience, and how to reach him.

For anything else, email him at sworupnayak62@gmail.com.`,
  suggestedPrompts: ["What projects has he built?", "What are his top skills?", "How can I hire him?"],
  actionLink: { label: "Go to the counter", sectionId: "contact" },
};

// Starter questions matched to where the visitor is on the page.
export const SECTION_STARTERS: Record<string, string[]> = {
  '': ['What does he build?', 'Is he open to relocation?', 'How can I hire him?'],
  stalls: ['What is he working on now?', 'Which of these is in production?', 'Tell me about the voice agent'],
  demo: ['How does the guardrail agent work?', 'Does he know FHIR / EMR?', 'Which of these is in production?'],
  skills: ['What are his top skills?', 'Tell me about his AI work', 'What roles is he looking for?'],
  workshop: ['What did he do at Squbix?', 'What is his education?', 'Is he open to relocation?'],
  contact: ['How can I hire him?', 'What roles is he looking for?', 'Can I get his resume?'],
};

const words = (s: string) => ` ${(s.toLowerCase().match(/[a-z0-9]+/g) || []).join(' ')} `;

// Whole-word (and whole-phrase) keyword scoring; the best-scoring topic wins.
export function queryAgentKnowledge(query: string): AgentKnowledgeItem {
  const q = words(query);
  let best = FALLBACK;
  let top = 0;
  for (const item of AGENT_KNOWLEDGE_BASE) {
    const w = item.weight ?? 2;
    const score = item.keywords.reduce((s, kw) => (q.includes(` ${kw} `) ? s + w : s), 0);
    if (score > top) {
      top = score;
      best = item;
    }
  }
  // "What does he build?" style questions with no topic word get the overview
  if (top === 0 && /\b(he|him|sworup)\b/.test(q)) return AGENT_KNOWLEDGE_BASE[1];
  return best;
}
