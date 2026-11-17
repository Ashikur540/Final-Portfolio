import { Kalam } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";

import "./globals.css";
import { personalInfo } from "@/data";

const sans = localFont({
  src: "./fonts/HostGrotesk-Variable.woff2",
  weight: "300 800",
  variable: "--font-sans",
  display: "swap",
});
const hand = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
  display: "swap",
});
const stamp = localFont({
  src: "./fonts/Doto-Black.woff2",
  weight: "900",
  variable: "--font-stamp",
  display: "swap",
});

const { name, title, location, websiteDomain, briefInfo } = personalInfo;

export const metadata: Metadata = {
  metadataBase: new URL(websiteDomain),
  title: `${name} - ${title}`,
  description: briefInfo,
  keywords: `full-stack developer, software engineer, frontend developer, React, Next.js, TypeScript, JavaScript, Node.js, Laravel, PHP, PostgreSQL, Docker, AI integration, Tailwind CSS, ${location}, ${name}, Md Ashikur Rahman`,
  authors: [{ name: name, url: websiteDomain }],
  openGraph: {
    title: `${name} - ${title}`,
    description: briefInfo,
    url: websiteDomain,
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: `${name} - ${title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} - ${title}`,
    description: briefInfo,
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${hand.variable} ${stamp.variable}`} suppressHydrationWarning>
      <head>
        {/* lets CSS hide the handwriting before the pen writes it; without JS it simply shows */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
