export interface Project {
  id: string;
  title: string;
  category: 'agentic' | 'frontend' | 'fullstack';
  badge: string;
  tagline: string;
  description: string;
  architecture: string[];
  metrics: string[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  iconName: string;
  highlight?: boolean;
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  impactMetrics: { label: string; value: string; detail: string }[];
  bulletPoints: {
    category: 'GenAI & Agents' | 'Frontend Architecture' | 'Real-time & Security' | 'Clinical Systems';
    text: string;
  }[];
  skillsUsed: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string; // 'Expert' | 'Advanced' | 'Proficient'
    tags: string[];
    highlight?: boolean;
  }[];
}

export interface PortfolioData {
  personal: {
    name: string;
    tagline: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    summary: string;
    status: string;
    yearsExperience: string;
    cgpa: string;
  };
  keyMetrics: {
    value: string;
    label: string;
    subtext: string;
    trend: string;
  }[];
  experiences: ExperienceRole[];
  projects: Project[];
  skillsCategories: SkillCategory[];
  education: {
    degree: string;
    institution: string;
    cgpa: string;
    graduationDate: string;
    location: string;
    highlights: string[];
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Sworup Ranjan Nayak",
    tagline: "AI/ML Engineer | Fullstack Developer | Generative AI & Agentic Systems",
    location: "Bhubaneswar, Odisha, India",
    phone: "+91 8249220066",
    email: "sworupnayak62@gmail.com",
    linkedin: "https://linkedin.com/in/sworup-ranjan-nayak",
    github: "https://github.com/sworupnayak62",
    summary: `Software Engineer with 3+ years of experience building scalable Healthcare Information Systems (HIS), Electronic Medical Records (EMR), and real-time web applications using React.js, JavaScript, and Redux Toolkit, now specializing in AI/ML and Agentic Systems. Hands-on experience designing multi-agent AI systems, Retrieval-Augmented Generation (RAG) pipelines, and LLM-powered applications using LangChain, LangGraph, Vector & Graph Databases, and the Model Context Protocol (MCP). Skilled at combining strong full-stack engineering fundamentals with applied Generative AI to build production-ready, real-time, and intelligent systems.`,
    status: "Available for High-Impact Roles",
    yearsExperience: "3+",
    cgpa: "9.1",
  },

  keyMetrics: [
    {
      value: "35%",
      label: "Clinical Workflow Efficiency",
      subtext: "Designed multi-agent AI systems using LangGraph",
      trend: "+35%",
    },
    {
      value: "50%",
      label: "Doc Effort Reduction",
      subtext: "Multilingual conversational AI for unstructured notes",
      trend: "-50%",
    },
    {
      value: "30%+",
      label: "Load Time Optimization",
      subtext: "Memoization, dynamic imports & code-splitting",
      trend: "+30%",
    },
    {
      value: "60%",
      label: "Form Config Reduction",
      subtext: "Drag-and-drop form engine with conditional logic",
      trend: "-60%",
    },
  ],

  experiences: [
    {
      id: "squbix-sde-2",
      role: "Software Engineer (SDE-II)",
      company: "Squbix Digital Pvt Ltd",
      location: "Bhubaneswar, IN",
      period: "Mar 2025 – Present",
      type: "Full-Time",
      summary: "Leading IPD module delivery for 50+ clinicians, designing multi-agent clinical automation pipelines with LangGraph, and optimizing enterprise React architectures for real-time healthcare monitoring.",
      impactMetrics: [
        { label: "AI Efficiency Gain", value: "35%", detail: "Automated clinical workflows using LangGraph" },
        { label: "Documentation Saved", value: "50%", detail: "Converting doctor-patient speech to structured EMR" },
        { label: "Frontend Speedup", value: "30%+", detail: "Optimized bundle load times via code-splitting" },
        { label: "Token Cost Cut", value: "25%", detail: "Context management & prompt optimization" },
      ],
      bulletPoints: [
        {
          category: 'Clinical Systems',
          text: "Led delivery of the IPD (In-Patient Department) module and dashboards used by 50+ clinicians, streamlining patient care workflows.",
        },
        {
          category: 'Frontend Architecture',
          text: "Architected patient dashboards, vitals tracking, printable views, and 10+ tab-based clinical interfaces using React, Redux Toolkit, and CSS Modules.",
        },
        {
          category: 'Frontend Architecture',
          text: "Designed a responsive grid layout system supporting nested widgets and patient-centric visualizations across multiple healthcare workflows.",
        },
        {
          category: 'Real-time & Security',
          text: "Strengthened application security through JWT authentication, RBAC, and permission mapping across 20+ user roles.",
        },
        {
          category: 'Frontend Architecture',
          text: "Improved application performance through memoization, lazy loading, and dynamic imports, reducing load times by over 30%.",
        },
        {
          category: 'Clinical Systems',
          text: "Integrated 4+ EMR components including discharge summaries, clinical notes, vitals, and medication charts with backend APIs.",
        },
        {
          category: 'Clinical Systems',
          text: "Delivered Medication Management capabilities including Infusion Therapy and Variable Dose Medication workflows.",
        },
        {
          category: 'Real-time & Security',
          text: "Engineered a centralized Notification Module supporting real-time alerts across 4 major HIS modules with WebSocket synchronization.",
        },
        {
          category: 'Real-time & Security',
          text: "Established a configurable Patient Alert System supporting allergies, warnings, and critical patient information.",
        },
        {
          category: 'Frontend Architecture',
          text: "Created shared component libraries containing 30+ reusable UI components, improving development consistency across applications.",
        },
        {
          category: 'GenAI & Agents',
          text: "Designed multi-agent AI systems using LangGraph, improving clinical workflow automation efficiency by 35%.",
        },
        {
          category: 'GenAI & Agents',
          text: "Built multilingual conversational AI pipelines converting unstructured patient-doctor interactions into structured EMR-ready data, reducing manual documentation effort by 50%.",
        },
        {
          category: 'GenAI & Agents',
          text: "Optimized LLM pipelines with context management and prompt engineering, reducing token usage cost by 25%.",
        },
      ],
      skillsUsed: ["LangGraph", "LangChain", "React.js", "Redux Toolkit", "WebSockets", "JWT / RBAC", "AWS ECS", "Docker", "Prompt Engineering"],
    },
    {
      id: "squbix-sde-1",
      role: "Software Engineer (SDE-I)",
      company: "Squbix Digital Pvt Ltd",
      location: "Bhubaneswar, IN",
      period: "Sep 2023 – Mar 2025",
      type: "Full-Time",
      summary: "Engineered a drag-and-drop form engine cutting form configuration effort by ~60%, built core EMR platform modules, and delivered Nursing Station operational management tools.",
      impactMetrics: [
        { label: "Config Effort Saved", value: "60%", detail: "Drag-and-drop dynamic form schema engine" },
        { label: "HIS Core Modules", value: "5+", detail: "Auth, onboarding, appointments, patient visits" },
        { label: "Bed & Shift Tracking", value: "Live", detail: "Real-time Nursing Station operational views" },
      ],
      bulletPoints: [
        {
          category: 'Clinical Systems',
          text: "Delivered a configurable Healthcare Information System (HIS) supporting forms, workflows, and role management through a no-code interface.",
        },
        {
          category: 'Frontend Architecture',
          text: "Built an EMR platform supporting customizable patient workflows, reusable templates, and conditional rendering capabilities.",
        },
        {
          category: 'Frontend Architecture',
          text: "Created modules for authentication, user management, employee onboarding, appointments, and patient visits.",
        },
        {
          category: 'Frontend Architecture',
          text: "Engineered a drag-and-drop form engine with validations, conditional logic, and reusable field components, reducing form configuration effort by approximately 60%.",
        },
        {
          category: 'Clinical Systems',
          text: "Developed Nursing Station functionality for bed management, task delegation, shift tracking, and live operational updates.",
        },
      ],
      skillsUsed: ["React.js", "JavaScript (ES6+)", "Context API", "CSS Modules", "REST APIs", "Node.js", "Agile / Scrum"],
    },
  ],

  projects: [
    {
      id: "github-mcp",
      title: "GitHub Model Context Protocol (MCP) Server",
      category: "agentic",
      badge: "Agentic Systems & MCP",
      tagline: "Command-line GitHub MCP server connecting LLM agents directly to GitHub functions.",
      description: "A production-grade Model Context Protocol (MCP) server implemented with Python and FastMCP. Enables autonomous AI agents to explore repositories, inspect PR diffs, execute commit evaluations, and manage GitHub issues with high protocol compliance.",
      architecture: [
        "FastMCP Python server with stdio / SSE transport protocols",
        "Fine-grained tool definitions for GitHub API endpoints",
        "Structured schema validation with error handling and rate-limiting",
      ],
      metrics: ["10+ MCP Tools Exposed", "Sub-150ms Tool Execution", "Zero-auth leak protocol design"],
      techStack: ["Python", "FastMCP", "LLM Agents", "Model Context Protocol", "GitHub API"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "Terminal",
      highlight: true,
    },
    {
      id: "langgraph-clinical-agent",
      title: "Multi-Agent Clinical Workflow Pipeline",
      category: "agentic",
      badge: "Flagship Production System",
      tagline: "LangGraph-powered multi-agent system converting raw medical dialogues into structured EMR data.",
      description: "Designed and deployed a stateful multi-agent architecture in healthcare. Uses specialized agents for audio transcript parsing, entity extraction (symptoms, vitals, prescriptions), clinical validation, and JSON-schema formatting, cutting clinician documentation time in half.",
      architecture: [
        "Stateful LangGraph agent graph with cyclic validation loops",
        "Clinical classifier agent + entity extraction agent + guardrail agent",
        "Context pruning & prompt optimization reducing token usage by 25%",
      ],
      metrics: ["50% Manual Doc Reduction", "35% Automation Efficiency", "25% Token Cost Savings"],
      techStack: ["LangGraph", "LangChain", "Python", "OpenAI / Gemini API", "Vector DB", "FHIR / EMR"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "Cpu",
      highlight: true,
    },
    {
      id: "data-entry-ai-agent",
      title: "Handwritten Document Data Entry AI Agent",
      category: "agentic",
      badge: "Computer Vision & LLM",
      tagline: "Intelligent document agent screening and extracting structured data from handwritten forms.",
      description: "Desktop and backend AI agent platform for processing noisy handwritten clinical and administrative forms. Combines OpenCV preprocessing pipelines with multimodal LLMs to clean, classify, and persist data into PostgreSQL databases.",
      architecture: [
        "OpenCV image deskewing, noise filtering, and bounding-box segmentation",
        "FastAPI high-throughput backend with asynchronous worker queues",
        "Electron.js desktop companion with live OCR verification UI",
      ],
      metrics: ["High OCR Accuracy on Cursive Text", "Under 2s Processing per Document", "PostgreSQL ACID persistence"],
      techStack: ["Python", "FastAPI", "Electron.js", "OpenCV", "PostgreSQL", "LLM Vision"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "FileCheck",
      highlight: false,
    },
    {
      id: "ai-portfolio-agent",
      title: "Interactive AI Portfolio Agent & RAG System",
      category: "agentic",
      badge: "Conversational RAG",
      tagline: "Intelligent conversational agent answering portfolio queries with grounded resume RAG.",
      description: "An embedded conversational AI agent for interactive portfolio visitor exploration. Ingests full career history, metrics, and codebases into a vector store to deliver grounded, low-hallucination answers to recruiter and engineering inquiries.",
      architecture: [
        "LangChain vector retrieval pipeline with cosine similarity scoring",
        "Typewriter streaming responses with citation of resume milestones",
        "Client-side fallback and pre-indexed semantic embeddings",
      ],
      metrics: ["Interactive Grounded Q&A", "Sub-100ms In-Memory Retrieval", "Seamless UI Integration"],
      techStack: ["LangChain", "Vector DB", "RAG", "React.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "Bot",
      highlight: true,
    },
    {
      id: "rag-chatbot-framework",
      title: "Reusable RAG Chatbot Framework",
      category: "agentic",
      badge: "Architecture & Framework",
      tagline: "Modular Retrieval-Augmented Generation framework with document chunking and semantic search.",
      description: "A production-ready framework for building hallucination-guarded RAG applications. Features automated PDF/Markdown ingestion, semantic chunking with overlap, ChromaDB/FAISS vector indexing, and hybrid dense-sparse retrieval.",
      architecture: [
        "Configurable chunking strategies (semantic, recursive token, sentence)",
        "Pluggable vector stores: ChromaDB, FAISS, and Qdrant",
        "Guardrail prompt layer ensuring responses strictly adhere to retrieved chunks",
      ],
      metrics: ["Low-Hallucination Rate", "Supports ChromaDB & FAISS", "Plug-and-play CLI & API"],
      techStack: ["LangChain", "ChromaDB", "FAISS", "Embeddings", "Python", "FastAPI"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "Layers",
      highlight: false,
    },
    {
      id: "sts-coding-assistant",
      title: "Speech-to-Speech Real-Time AI Coding Assistant",
      category: "agentic",
      badge: "Real-Time Audio AI",
      tagline: "Hands-free voice coding companion with low-latency bidirectional speech and code suggestions.",
      description: "A real-time audio coding assistant that accepts developer voice questions, streams low-latency speech synthesis, and renders syntactic code snippets on screen for hands-free coding sessions.",
      architecture: [
        "Real-time WebSocket audio streaming pipeline",
        "Speech-to-Text $\\rightarrow$ LLM Reasoning $\\rightarrow$ Text-to-Speech synthesis pipeline",
        "Syntax-highlighted code drawer synchronized with audio cues",
      ],
      metrics: ["Real-time Bidirectional Audio", "Hands-free Voice Dev Workflow", "Low-latency streaming"],
      techStack: ["STS AI", "Real-Time Audio", "WebSockets", "LLM API", "Python", "React"],
      githubUrl: "https://github.com/sworupnayak62",
      iconName: "Mic",
      highlight: false,
    },
  ],

  skillsCategories: [
    {
      title: "AI / GenAI & Agentic Systems",
      description: "State-of-the-art frameworks for multi-agent reasoning, RAG, and LLM orchestration",
      skills: [
        { name: "LangChain", level: "Expert", tags: ["RAG", "Agent Pipelines", "Prompt Engineering"], highlight: true },
        { name: "LangGraph", level: "Expert", tags: ["Multi-Agent", "Stateful Graphs", "Cyclic Workflows"], highlight: true },
        { name: "Model Context Protocol (MCP)", level: "Advanced", tags: ["FastMCP", "Tool Calling", "JSON-RPC"], highlight: true },
        { name: "RAG & Vector DBs", level: "Expert", tags: ["Pinecone", "ChromaDB", "Qdrant", "FAISS"], highlight: true },
        { name: "Graph Databases", level: "Advanced", tags: ["Neo4j", "Knowledge Graphs"], highlight: false },
        { name: "Speech-to-Speech (STS) AI", level: "Advanced", tags: ["Real-time Audio", "Voice Agents"], highlight: false },
        { name: "Prompt & Token Optimization", level: "Expert", tags: ["Context Pruning", "Cost Reduction"], highlight: true },
        { name: "LLM APIs (OpenAI, Gemini)", level: "Expert", tags: ["Multimodal", "Function Calling"], highlight: true },
      ],
    },
    {
      title: "Frontend Engineering & Architecture",
      description: "High-performance enterprise React architecture, state management, and real-time UI",
      skills: [
        { name: "React.js", level: "Expert", tags: ["v18", "Hooks", "Custom Hooks", "Architecture"], highlight: true },
        { name: "Next.js", level: "Advanced", tags: ["App Router", "SSR", "Optimization"], highlight: false },
        { name: "Redux Toolkit & Context API", level: "Expert", tags: ["Global State", "Async Thunks", "Slices"], highlight: true },
        { name: "TypeScript", level: "Expert", tags: ["Type Safety", "Generics", "Interfaces"], highlight: true },
        { name: "Performance Optimization", level: "Expert", tags: ["Memoization", "Code Splitting", "Lazy Loading"], highlight: true },
        { name: "Shared Component Systems", level: "Expert", tags: ["30+ Reusable Components", "Design Systems"], highlight: true },
        { name: "Tailwind CSS & CSS Modules", level: "Expert", tags: ["Responsive", "Glassmorphism", "Dark Theme"], highlight: false },
      ],
    },
    {
      title: "Backend, APIs & Real-Time Sync",
      description: "Scalable services, WebSocket streaming, and healthcare-grade security",
      skills: [
        { name: "Node.js & Express.js", level: "Advanced", tags: ["REST APIs", "Middleware", "Microservices"], highlight: true },
        { name: "WebSockets", level: "Advanced", tags: ["Real-Time Alerts", "Live Monitoring", "Sync"], highlight: true },
        { name: "JWT & RBAC Security", level: "Expert", tags: ["20+ User Roles", "Permission Mapping"], highlight: true },
        { name: "Python", level: "Advanced", tags: ["FastAPI", "OpenCV", "AsyncIO", "Data Pipelines"], highlight: true },
      ],
    },
    {
      title: "Cloud, DevOps & Workflows",
      description: "Containerized deployments, CI/CD automation, and agile delivery",
      skills: [
        { name: "AWS (EC2, ECS, S3, IAM)", level: "Advanced", tags: ["ECS Deployments", "Containerization"], highlight: true },
        { name: "Docker", level: "Advanced", tags: ["Multi-stage Builds", "Container Orchestration"], highlight: true },
        { name: "GitHub Actions & CI/CD", level: "Advanced", tags: ["Automated Pipelines", "Lint & Test"], highlight: false },
        { name: "Agile / Scrum & Git", level: "Expert", tags: ["Sprint Planning", "Jira", "Code Reviews"], highlight: false },
      ],
    },
  ],

  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Silicon Institute of Technology, Bhubaneswar",
    cgpa: "9.1 / 10.0",
    graduationDate: "June 2023",
    location: "Bhubaneswar, Odisha, India",
    highlights: [
      "Graduated with High Honors (9.1 CGPA) in Computer Science & Engineering",
      "Specialized in Algorithms, Distributed Systems, Database Management, and Artificial Intelligence",
      "Built multiple real-world full-stack web and machine learning applications during undergraduate studies",
    ],
  },
};
