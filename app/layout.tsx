import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulscast — AI News Podcast on WhatsApp",
  description:
    "Your daily news, as a podcast. Delivered to WhatsApp. AI-curated, personalized, and spoken aloud every morning.",
  openGraph: {
    title: "Pulscast",
    description: "AI-powered personalized news podcast delivered via WhatsApp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] antialiased">
        {children}
      </body>
    </html>
  );
}
