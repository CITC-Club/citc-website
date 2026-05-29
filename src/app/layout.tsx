import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#020617] transition-colors duration-300">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
