import type { Metadata } from "next";
import { WebsiteSchema } from "@/components/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://launchpad.today"),
  title: "Launchpad.today — AI-Ranked Startup Launches",
  description:
    "The daily startup launch ranking. AI judges every submission and crowns the Product of the Day, Week, and Month. Submit your startup and get ranked.",
  openGraph: {
    title: "Launchpad.today — AI-Ranked Startup Launches",
    description:
      "AI judges every startup launch. Daily, weekly, and monthly winners crowned automatically.",
    type: "website",
    url: "https://launchpad.today",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launchpad.today",
    description: "AI-ranked startup launches. Daily winners crowned.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanlines">
        <WebsiteSchema />
        {children}
      </body>
    </html>
  );
}
