import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION, SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Leandro Trabucco | Full Stack Developer";
const description = `Full Stack Developer based in ${LOCATION.country}. Building software that makes life easier with React, Next.js, TypeScript, and Ruby on Rails.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Argentina",
    "React",
    "Next.js",
    "TypeScript",
    "Rails",
    "React Native",
    "Leandro Trabucco",
  ],
  authors: [{ name: "Leandro Trabucco", url: SITE_URL }],
  creator: "Leandro Trabucco",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-AR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    url: SITE_URL,
    siteName: "Leandro Trabucco",
    title,
    description,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Leandro Trabucco · Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leandro Trabucco",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpeg`,
  jobTitle: "Full Stack Developer",
  email: `mailto:${EMAIL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: LOCATION.countryCode,
  },
  knowsLanguage: ["en", "es", "ja", "pt"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
      <GoogleAnalytics gaId="G-NE9NYJDJWZ" />
    </html>
  );
}
