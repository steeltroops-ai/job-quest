import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Job Quest | The Ultimate Job Application Tracker",
  description: "Take control of your career search with Job Quest. Organize applications, track your progress, and land your next role with scientific precision.",
  keywords: ["job tracker", "career journey", "application management", "job quest", "professional growth", "recruitment tracker"],
  authors: [{ name: "Mayank Pratap Singh", url: "https://steeltroops.vercel.app" }],
  creator: "steeltroops-ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://job-quest.vercel.app",
    title: "Job Quest | The Ultimate Job Application Tracker",
    description: "Empower your career journey. Track applications and visualize your success with Job Quest.",
    siteName: "Job Quest",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Job Quest Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Quest | The Ultimate Job Application Tracker",
    description: "Empower your career journey. Track applications and visualize your success with Job Quest.",
    creator: "@steeltroops_ai",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
