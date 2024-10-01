import { Inter } from "next/font/google";
import { Metadata } from "next";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { personalInfo } from "@/data";
const inter = Inter({ subsets: ["latin"] });

const { name, location, websiteDomain, briefInfo } = personalInfo;

export const metadata: Metadata = {
  title: `${name} - Frontend Web Developer Portfolio`,
  description: briefInfo,
  keywords: `web developer, frontend, React, Next.js, TypeScript, Javascript, Tailwind Css, Framer Motion, ${location}, ${name}, MERN Stack, Tanstack Query, React Hook Form, Node JS, Express JS, Mongo DB, Mongoose, Webflow, Shopify, UI-UX Designer, vite`,
  authors: [{ name: name, url: websiteDomain }],
  openGraph: {
    title: `${name} - Frontend Web Developer Portfolio`,
    description: briefInfo,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: `${name} - Frontend Web Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} - Frontend Web Developer`,
    description: briefInfo,
    images: [
      "/twitter-image.png",
      "/twitter-image-2.png",
      "/twitter-image-3.png",
      "/twitter-image-4.png",
    ],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
