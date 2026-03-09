import type { Metadata } from "next";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service — Launchpad.today",
  description:
    "Terms of Service for Launchpad.today. Rules for submissions, AI scoring, and use of the platform.",
  openGraph: {
    title: "Terms of Service — Launchpad.today",
    description:
      "Terms of Service for Launchpad.today. Rules for submissions, AI scoring, and use of the platform.",
    type: "website",
    url: "https://launchpad.today/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
