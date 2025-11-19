import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Think Box Memory Games - Brain Training & Cognitive Games",
  description: "Play Think Box Memory Games to boost your brainpower! Challenge your mind with fun, engaging memory puzzles and cognitive training exercises. Improve focus, concentration, and mental agility.",
  keywords: [
    "memory games",
    "brain games",
    "think box",
    "memory training",
    "cognitive games",
    "brain training",
    "puzzle games",
    "mind games",
    "concentration games",
    "mental exercises",
    "brain teasers",
    "memory test",
    "brain challenge",
    "thinking games",
    "logic games",
    "free memory games",
    "online brain games",
    "memory improvement",
    "cognitive training",
    "brain workout"
  ],
  authors: [{ name: "Think Box Games" }],
  creator: "Think Box Games",
  publisher: "Think Box Games",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thinkboxgames.com",
    siteName: "Think Box Memory Games",
    title: "Think Box Memory Games - Brain Training & Cognitive Games",
    description: "Play Think Box Memory Games to boost your brainpower! Challenge your mind with fun, engaging memory puzzles and cognitive training exercises.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Think Box Memory Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Think Box Memory Games - Brain Training & Cognitive Games",
    description: "Play Think Box Memory Games to boost your brainpower! Challenge your mind with fun, engaging memory puzzles and cognitive training exercises.",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    google: "ca-pub-1452361813515835",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
       <meta name="google-adsense-account" content="ca-pub-1452361813515835"></meta>
       </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1452361813515835"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {children}
      </body>
     
    </html>
  );
}
