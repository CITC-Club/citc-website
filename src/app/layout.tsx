import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CITC | Tech Community at NCIT",
  description:
    "Join CITC (Computer Engineering Innovation & Tech Club) - the premier tech community at Nepal College of Information Technology. Discover workshops, events, hackathons, and networking opportunities for aspiring tech enthusiasts.",
  openGraph: {
    title: "CITC | Tech Community at NCIT",
    description:
      "Join CITC (Computer Engineering Innovation & Tech Club) - the premier tech community at Nepal College of Information Technology.",
    siteName: "CITC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#020617] transition-colors duration-300">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
