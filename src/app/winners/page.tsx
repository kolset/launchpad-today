import type { Metadata } from "next";
import { WinnersContent } from "./winners-content";

export const metadata: Metadata = {
  title: "Winners Hall of Fame — Launchpad.today",
  description:
    "Every Product of the Day, Week, and Month winner. The best startup launches, crowned by AI.",
  openGraph: {
    title: "Winners Hall of Fame — Launchpad.today",
    description:
      "Every Product of the Day, Week, and Month winner. The best startup launches, crowned by AI.",
    type: "website",
    url: "https://launchpad.today/winners",
  },
};

export default function WinnersPage() {
  return <WinnersContent />;
}
