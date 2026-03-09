import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — Launchpad.today",
  description:
    "How Launchpad.today handles your data. We collect minimal information and never sell it to third parties.",
  openGraph: {
    title: "Privacy Policy — Launchpad.today",
    description:
      "How Launchpad.today handles your data. We collect minimal information and never sell it to third parties.",
    type: "website",
    url: "https://launchpad.today/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
