import { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "NeuralForge",
    tagline: "Train custom AI models in your browser",
    description:
      "No-code platform that lets anyone fine-tune and deploy AI models without writing a single line of code. Drag-and-drop training data, pick a base model, and deploy to production in minutes.",
    url: "https://neuralforge.ai",
    category: "AI/ML",
    submittedBy: "sarah_builds",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🧠",
    aiScore: 94,
    aiVerdict:
      "Exceptional execution on a real pain point. Browser-based ML training is the next frontier. Strong technical moat and clear path to enterprise adoption.",
    aiBreakdown: { innovation: 96, execution: 93, potential: 95, timing: 92 },
    isWinner: "day",
  },
  {
    id: "2",
    name: "ShipStack",
    tagline: "One-click deploy for any framework",
    description:
      "Push to deploy with zero config. Auto-detects your stack, provisions infrastructure, and gives you a production URL in 30 seconds. Works with Next.js, Rails, Django, Go, and 40+ more.",
    url: "https://shipstack.dev",
    category: "Developer Tools",
    submittedBy: "devops_dan",
    submittedAt: new Date().toISOString(),
    logoEmoji: "📦",
    aiScore: 91,
    aiVerdict:
      "Strong developer experience play. The zero-config approach differentiates from competitors. Market is crowded but the execution here is crisp.",
    aiBreakdown: { innovation: 88, execution: 95, potential: 90, timing: 91 },
  },
  {
    id: "3",
    name: "CashPilot",
    tagline: "AI treasury management for startups",
    description:
      "Automatically sweeps idle cash across high-yield accounts, money markets, and T-bills. AI optimizes for yield while maintaining your runway requirements.",
    url: "https://cashpilot.com",
    category: "Fintech",
    submittedBy: "fintech_founder",
    submittedAt: new Date().toISOString(),
    logoEmoji: "💰",
    aiScore: 89,
    aiVerdict:
      "Addresses a universal startup problem with elegant automation. Regulatory complexity is a moat. Revenue model is clear and scalable.",
    aiBreakdown: { innovation: 87, execution: 90, potential: 92, timing: 87 },
  },
  {
    id: "4",
    name: "Voxform",
    tagline: "Turn voice memos into structured data",
    description:
      "Record a voice note and Voxform extracts structured data, creates CRM entries, generates reports, or fills any form. Custom schemas let you define exactly what gets extracted.",
    url: "https://voxform.io",
    category: "Productivity",
    submittedBy: "voice_first",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🎙️",
    aiScore: 86,
    aiVerdict:
      "Clever twist on voice-to-text. The structured extraction angle is underexplored. Integration story needs work but core idea is solid.",
    aiBreakdown: { innovation: 90, execution: 83, potential: 87, timing: 84 },
  },
  {
    id: "5",
    name: "GreenStack",
    tagline: "Carbon-aware cloud infrastructure",
    description:
      "Routes your workloads to the greenest data centers in real-time. Dashboard shows carbon savings, generates compliance reports, and optimizes for both cost and emissions.",
    url: "https://greenstack.cloud",
    category: "SaaS",
    submittedBy: "climate_coder",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🌿",
    aiScore: 84,
    aiVerdict:
      "Timely play on ESG requirements. Enterprise demand is real but sales cycles will be long. Technical approach is sound.",
    aiBreakdown: { innovation: 85, execution: 82, potential: 88, timing: 81 },
  },
  {
    id: "6",
    name: "SyntaxBuddy",
    tagline: "AI pair programmer that explains as it codes",
    description:
      "An AI coding assistant focused on teaching. Every suggestion comes with a plain-English explanation of why it works. Built for junior devs and bootcamp grads.",
    url: "https://syntaxbuddy.dev",
    category: "Education",
    submittedBy: "edu_hacker",
    submittedAt: new Date().toISOString(),
    logoEmoji: "👾",
    aiScore: 82,
    aiVerdict:
      "Education angle is a smart differentiation in a crowded AI coding space. Retention could be strong. Needs to nail the explanation quality.",
    aiBreakdown: { innovation: 80, execution: 84, potential: 83, timing: 81 },
  },
  {
    id: "7",
    name: "FitLoop",
    tagline: "AI personal trainer in your pocket",
    description:
      "Computer vision watches your form through your phone camera. Real-time corrections, progressive overload tracking, and workout generation based on your equipment and goals.",
    url: "https://fitloop.app",
    category: "Health",
    submittedBy: "gym_dev",
    submittedAt: new Date().toISOString(),
    logoEmoji: "💪",
    aiScore: 79,
    aiVerdict:
      "Solid execution on computer vision fitness. The form-correction angle is compelling. Crowded market but the tech moat is real if accuracy holds.",
    aiBreakdown: { innovation: 82, execution: 78, potential: 80, timing: 76 },
  },
  {
    id: "8",
    name: "Bazaar",
    tagline: "Peer-to-peer marketplace for digital assets",
    description:
      "Buy and sell templates, prompts, datasets, and digital tools directly. No middleman fees over 3%. Built-in escrow, reviews, and instant delivery.",
    url: "https://bazaar.market",
    category: "E-Commerce",
    submittedBy: "market_maker",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🏪",
    aiScore: 76,
    aiVerdict:
      "Low-fee marketplace is attractive but chicken-and-egg problem is real. Digital asset focus helps with margins. Needs a strong launch strategy.",
    aiBreakdown: { innovation: 74, execution: 78, potential: 79, timing: 73 },
  },
  {
    id: "9",
    name: "ThreadSync",
    tagline: "Unified inbox for every messaging platform",
    description:
      "Slack, Discord, Teams, Telegram, WhatsApp — all in one interface. AI summarizes threads, prioritizes messages, and drafts responses in your voice.",
    url: "https://threadsync.app",
    category: "Social",
    submittedBy: "inbox_zero",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🔗",
    aiScore: 73,
    aiVerdict:
      "Universal messaging aggregation is a perennial idea. Execution looks clean. The AI summarization is the real value prop but integration maintenance is a grind.",
    aiBreakdown: { innovation: 70, execution: 76, potential: 75, timing: 71 },
  },
  {
    id: "10",
    name: "SpectrumOS",
    tagline: "Modular smart home OS",
    description:
      "Open-source operating system for smart homes. Visual programming for automations, local-first processing, works with any hardware. No cloud dependency.",
    url: "https://spectrumos.io",
    category: "Hardware",
    submittedBy: "iot_builder",
    submittedAt: new Date().toISOString(),
    logoEmoji: "🏠",
    aiScore: 71,
    aiVerdict:
      "Privacy-first smart home has a passionate niche. Local processing is a real differentiator. Adoption will be slow but community could drive it.",
    aiBreakdown: { innovation: 78, execution: 68, potential: 72, timing: 66 },
  },
];

// Past winners for the hall of fame
export const PAST_WINNERS: Product[] = [
  {
    id: "w1",
    name: "CodeWeave",
    tagline: "AI-powered codebase migration tool",
    description: "Migrate any codebase between frameworks automatically.",
    url: "https://codeweave.dev",
    category: "Developer Tools",
    submittedBy: "migration_king",
    submittedAt: "2026-03-08T10:00:00Z",
    logoEmoji: "🕸️",
    aiScore: 97,
    aiVerdict: "Best-in-class migration tooling. This changes how teams approach framework decisions.",
    aiBreakdown: { innovation: 98, execution: 96, potential: 97, timing: 97 },
    isWinner: "week",
  },
  {
    id: "w2",
    name: "Promptbase",
    tagline: "Version control for AI prompts",
    description: "Git for prompts. Track, test, and deploy prompt changes with confidence.",
    url: "https://promptbase.ai",
    category: "AI/ML",
    submittedBy: "prompt_eng",
    submittedAt: "2026-03-01T10:00:00Z",
    logoEmoji: "📝",
    aiScore: 95,
    aiVerdict: "Essential infrastructure for the AI era. Simple idea, perfect timing.",
    aiBreakdown: { innovation: 94, execution: 96, potential: 95, timing: 95 },
    isWinner: "month",
  },
];
