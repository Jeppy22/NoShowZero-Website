import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NoShowZero — AI-Powered No-Show Elimination for Dental Practices",
  description:
    "Worcester dental practices: stop losing $300 per no-show. NoShowZero AI handles reminders, confirmations, and reactivation automatically — zero staff required.",
  openGraph: {
    title: "NoShowZero — AI-Powered No-Show Elimination for Dental Practices",
    description:
      "Worcester dental practices are eliminating no-shows with AI. NoShowZero runs 24/7 — reminders, confirmation tracking, and reactivation without any staff involvement.",
    url: "https://noshowzero.vercel.app",
    siteName: "NoShowZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoShowZero — Zero No-Shows for Worcester Dental Practices",
    description:
      "AI automation that eliminates dental no-shows. Set it up once, it runs forever. Now accepting founding practices in Worcester, MA.",
  },
  metadataBase: new URL("https://noshowzero.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${plusJakarta.variable}`}>
      <body className="bg-navy text-text-primary font-body antialiased">
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
