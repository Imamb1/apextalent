import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Talent Group — Connect. Influence. Convert.",
  description: "We connect brands with high-performing creators to drive awareness, conversions, and long-term trust.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
