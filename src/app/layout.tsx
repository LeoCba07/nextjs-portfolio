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
  title: 'LT_',
  description: 'Full Stack Developer based in Tokyo. Building software that makes life easier.',
  keywords: ['Full Stack Developer', 'Web Developer', 'Tokyo', 'React', 'Next.js', 'Rails'],
  authors: [{ name: 'Leandro Trabucco' }],
  creator: 'Leandro Trabucco',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leandrotrabucco.me',
    siteName: 'Leandro Trabucco',
    title: 'Leandro Trabucco | Full Stack Developer',
    description: 'Full Stack Developer based in Tokyo. Building software that makes life easier.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Leandro Trabucco - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Trabucco | Full Stack Developer',
    description: 'Full Stack Developer based in Tokyo. Building software that makes life easier.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

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
