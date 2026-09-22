export interface AgentKnowledgeItem {
  id: string;
  keywords: string[];
  topic: string;
  sourceTag: string;
  response: string;
  suggestedPrompts: string[];
  actionLink?: {
    label: string;
    sectionId: string;
  };
}

export const AGENT_KNOWLEDGE_BASE: AgentKnowledgeItem[] = [
  {
    id: "greetings",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "howdy"],
    topic: "Greeting & Assistant Info",
    sourceTag: "Sworup AI Assistant",
    response: `Hello! I'm Sworup's personal AI Assistant. 

I can answer your questions about his skills, projects, background, and availability, or help you connect with him directly. 

What would you like to know?`,
    suggestedPrompts: [
      "What are his top skills?",
      "What projects has he built?",
      "Show his LinkedIn & GitHub links",
      "How can I contact or hire Sworup?",
    ],
  },
  {
    id: "overview",
    keywords: ["who", "about", "introduce", "summary", "overview", "bio", "experience"],
    topic: "About Sworup Ranjan Nayak",
    sourceTag: "Profile Overview",
    response: `Sworup Ranjan Nayak is an AI/ML Engineer and Fullstack Developer with 3+ years of production experience building intelligent AI systems and scalable web applications.

He specializes in:
• Multi-Agent AI systems using LangGraph and Model Context Protocol (FastMCP)
• Retrieval-Augmented Generation (RAG) pipelines and Vector Databases
• Modern high-performance web applications using React, TypeScript, Node.js, and Redux Toolkit

He holds a B.Tech in Computer Science with a 9.1 CGPA from Silicon Institute of Technology.`,
    suggestedPrompts: [
      "What projects has he built?",
      "What are his top skills?",
      "How can I contact him?",
    ],
    actionLink: { label: "View Featured Projects", sectionId: "projects" }
  },
  {
    id: "social-links",
    keywords: ["social", "socials", "links", "link", "linkedin", "github", "profile", "profiles", "handles", "url"],
    topic: "Social & Online Profiles",
    sourceTag: "Social Links",
    response: `Here are Sworup's verified social profiles and channels:

• LinkedIn: https://linkedin.com/in/sworup-ranjan-nayak
• GitHub: https://github.com/sworupnayak62
• Email: sworupnayak62@gmail.com
• Phone: +91 8249220066
• Location: Bhubaneswar, Odisha, India

Feel free to connect on LinkedIn or check out his open-source repositories on GitHub!`,
    suggestedPrompts: [
      "How can I contact or hire Sworup?",
      "What projects has he built?",
      "What are his skills?",
    ],
    actionLink: { label: "Go to Contact Hub", sectionId: "contact" }
  },
  {
    id: "skills",
    keywords: ["skills", "stack", "tech", "technologies", "languages", "tools", "python", "typescript", "react"],
    topic: "Technical Skills & Toolkit",
    sourceTag: "Core Skills",
    response: `Sworup's core technical toolkit spans AI/ML and fullstack engineering:

1. AI / GenAI & Agentic: LangGraph, LangChain, Model Context Protocol (MCP), Vector DBs (ChromaDB, Pinecone, FAISS), OpenAI & Gemini APIs, Prompt Engineering
2. Frontend: React.js, TypeScript, Next.js, Redux Toolkit, Tailwind CSS, Responsive Design
3. Backend & APIs: Python, FastAPI, Node.js, Express.js, WebSockets, REST APIs, JWT Security
4. Cloud & DevOps: AWS (EC2, ECS, S3), Docker, GitHub Actions CI/CD`,
    suggestedPrompts: [
      "What projects has he built?",
      "Tell me about his AI experience",
      "How can I contact him?",
    ],
    actionLink: { label: "Explore Skills Section", sectionId: "skills" }
  },
  {
    id: "projects",
    keywords: ["project", "projects", "work", "built", "portfolio", "apps", "code"],
    topic: "Featured Projects",
    sourceTag: "Projects Showcase",
    response: `Here are Sworup's flagship engineering projects:

1. Multi-Agent Clinical Workflow Pipeline: LangGraph-powered stateful agent converting unstructured doctor dictations into structured records, reducing documentation time by 50%.
2. GitHub MCP Server: Command-line FastMCP server connecting AI models to GitHub API functions with JSON-RPC.
3. Data Entry AI Agent: Computer vision and LLM agent for handwritten clinical document screening (OpenCV, FastAPI, Electron).
4. AI Portfolio Agent & RAG System: Conversational portfolio assistant grounded in CV data.
5. Speech-to-Speech AI Coding Assistant: Real-time audio assistant for hands-free voice coding.`,
    suggestedPrompts: [
      "Try the Interactive AI Demo",
      "Show his GitHub profile",
      "How can I hire him?",
    ],
    actionLink: { label: "View Projects", sectionId: "projects" }
  },
  {
    id: "ai-agentic",
    keywords: ["ai", "agent", "agents", "langgraph", "mcp", "fastmcp", "rag", "genai", "llm"],
    topic: "AI & Agentic Systems Experience",
    sourceTag: "AI & GenAI",
    response: `Sworup has deep, hands-on production experience in Generative AI:

• LangGraph Multi-Agent Workflows: Building stateful, cyclic agent graphs with specialized agents for extraction, classification, and safety guardrails.
• Model Context Protocol (MCP): Building FastMCP servers allowing AI models to execute external tools and API calls securely.
• RAG Pipelines: Document chunking, vector indexing (ChromaDB/Pinecone), and semantic similarity search with low hallucination.
• Context & Token Optimization: Pruning prompts to cut LLM token costs by ~25%.`,
    suggestedPrompts: [
      "Try the Interactive AI Demo",
      "What are his other skills?",
      "How to reach out to him?",
    ],
    actionLink: { label: "Try Interactive Demo", sectionId: "demo" }
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "hire", "reach", "interview", "call", "connect", "hiring"],
    topic: "Contact & Hiring",
    sourceTag: "Direct Contact",
    response: `Sworup is open to high-impact opportunities in AI/ML Engineering, Agentic Systems, and Fullstack Development.

Direct contact channels:
• Email: sworupnayak62@gmail.com
• Phone: +91 8249220066
• LinkedIn: https://linkedin.com/in/sworup-ranjan-nayak
• GitHub: https://github.com/sworupnayak62
• Location: Bhubaneswar, Odisha, India (Open to Remote & Relocation)

You can send him an email or use the contact form on the website!`,
    suggestedPrompts: [
      "Show his LinkedIn & GitHub links",
      "What are his skills?",
      "What is his education?",
    ],
    actionLink: { label: "Open Contact Form", sectionId: "contact" }
  },
  {
    id: "location",
    keywords: ["location", "city", "country", "relocate", "relocation", "remote", "where", "hybrid"],
    topic: "Location & Work Preference",
    sourceTag: "Work Availability",
    response: `Sworup is based in Bhubaneswar, Odisha, India.

He is fully open to:
• Remote roles worldwide
• Hybrid arrangements
• Relocation for the right opportunity`,
    suggestedPrompts: [
      "How can I contact him?",
      "What roles is he looking for?",
      "Show his skills",
    ],
    actionLink: { label: "Contact Sworup", sectionId: "contact" }
  },
  {
    id: "education",
    keywords: ["education", "college", "degree", "cgpa", "silicon", "btech", "university", "school", "marks"],
    topic: "Education & Degree",
    sourceTag: "Education",
    response: `Sworup earned his B.Tech in Computer Science and Engineering from Silicon Institute of Technology, Bhubaneswar (Class of June 2023).

• Cumulative GPA: 9.1 / 10.0 (High Academic Honors)
• Key Focus: Distributed Systems, Algorithms, Machine Learning, and Database Architecture.`,
    suggestedPrompts: [
      "What projects has he built?",
      "What are his skills?",
      "How to contact him?",
    ],
    actionLink: { label: "View Education Section", sectionId: "education" }
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download", "pdf"],
    topic: "Resume & CV",
    sourceTag: "Resume",
    response: `You can request Sworup's verified PDF resume directly:

• Send a quick email to: sworupnayak62@gmail.com
• Or connect on LinkedIn: https://linkedin.com/in/sworup-ranjan-nayak

He will share the latest copy of his resume promptly!`,
    suggestedPrompts: [
      "Show his contact details",
      "What are his top skills?",
      "What projects has he built?",
    ],
    actionLink: { label: "Go to Contact Hub", sectionId: "contact" }
  },
];

export function queryAgentKnowledge(query: string): AgentKnowledgeItem {
  const normalized = query.toLowerCase().trim();
  
  let bestMatch: AgentKnowledgeItem = AGENT_KNOWLEDGE_BASE[1]; // default to overview
  let highestScore = 0;

  for (const item of AGENT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length * 3;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // If no match found, provide a friendly general answer
  if (highestScore === 0) {
    return {
      id: "general-fallback",
      keywords: [],
      topic: "General Inquiry",
      sourceTag: "Sworup AI",
      response: `Thanks for asking! Sworup Ranjan Nayak is an AI/ML Engineer and Fullstack Developer specializing in LangGraph multi-agent systems, FastMCP, and high-performance React applications.

Feel free to ask about his projects, skills, education, or how to contact him directly at sworupnayak62@gmail.com!`,
      suggestedPrompts: [
        "What are his top skills?",
        "What projects has he built?",
        "Show his LinkedIn & GitHub links",
        "How can I contact or hire Sworup?",
      ],
      actionLink: { label: "View Projects", sectionId: "projects" }
    };
  }

  return bestMatch;
}
