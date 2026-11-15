import { Inter } from "next/font/google";
import { Metadata } from "next";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { personalInfo } from "@/data";
const inter = Inter({ subsets: ["latin"] });

const { name, title, location, websiteDomain, briefInfo } = personalInfo;

export const metadata: Metadata = {
  metadataBase: new URL(websiteDomain),
  title: `${name} - ${title}`,
  description: briefInfo,
  keywords: `full-stack developer, frontend developer, remote, React, Next.js, TypeScript, JavaScript, Node.js, Laravel, PHP, WordPress, WooCommerce, PostgreSQL, Docker, Tailwind CSS, ${location}, ${name}`,
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
