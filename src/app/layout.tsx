import type { Metadata } from "next";
import { Orbitron, Space_Mono } from "next/font/google";
import { WebsiteSchema } from "@/components/structured-data";
import { ToastProvider } from "@/components/toast";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-orbitron",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

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
    <html lang="en" className={`${orbitron.variable} ${spaceMono.variable}`}>
      <body className="scanlines">
        <WebsiteSchema />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
