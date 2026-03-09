export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
  logoEmoji: string;
  aiScore: number;
  aiVerdict: string;
  aiBreakdown: {
    innovation: number;
    execution: number;
    potential: number;
    timing: number;
  };
  communityVotes?: number;
  commentCount?: number;
  isWinner?: "day" | "week" | "month";
}

export interface Comment {
  id: string;
  productId: string;
  author: string;
  text: string;
  createdAt: string;
  isMaker: boolean;
}

export type TimeFilter = "today" | "week" | "month" | "all-time";

export type Category =
  | "AI/ML"
  | "SaaS"
  | "Developer Tools"
  | "Fintech"
  | "Health"
  | "E-Commerce"
  | "Productivity"
  | "Social"
  | "Education"
  | "Hardware"
  | "Other";

export const CATEGORIES: Category[] = [
  "AI/ML",
  "SaaS",
  "Developer Tools",
  "Fintech",
  "Health",
  "E-Commerce",
  "Productivity",
  "Social",
  "Education",
  "Hardware",
  "Other",
];
