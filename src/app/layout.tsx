import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiWhatsAppWidget from "@/components/MultiWhatsAppWidget";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DealRite Realty Limited",
  description: "Premium real estate and properties for comfortable living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <MultiWhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
