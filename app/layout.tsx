import { Kalam } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";

import "./globals.css";
import { personalInfo, socialUrl } from "@/data";

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
  // one address for this page, so search engines never split it into duplicates
  alternates: { canonical: "/" },
  // the share image comes from app/opengraph-image.jpg (with its .alt.txt); X falls back to it too
  openGraph: {
    title: `${name} - ${title}`,
    description: briefInfo,
    url: websiteDomain,
    siteName: name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} - ${title}`,
    description: briefInfo,
  },
};

// tells Google who this page is about (name, job, links), which helps searches for the name
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  alternateName: "Md Ashikur Rahman",
  jobTitle: title,
  url: websiteDomain,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: [socialUrl("GitHub"), socialUrl("LinkedIn")],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Laravel", "PHP", "AI integration"],
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
        {/* fixed data from data/index.ts; "<" is escaped so the text can never close the script tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
