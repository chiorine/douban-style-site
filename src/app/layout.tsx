import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteName, siteSubtitle, siteDescription } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteName} | ${siteSubtitle}`,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-stone-100 text-stone-800 antialiased">
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
