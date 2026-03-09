import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About — Launchpad.today",
  description:
    "How Launchpad.today's AI scoring methodology works. Learn about our 4 criteria: Innovation, Execution, Potential, and Timing.",
  openGraph: {
    title: "About — Launchpad.today",
    description:
      "AI judges every startup launch objectively. No bias. No politics. Just the score.",
    type: "website",
    url: "https://launchpad.today/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
