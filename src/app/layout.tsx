import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavWrapper from "@/components/NavWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.gcsemathsai.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GCSEMathsAI — AI-Powered GCSE Maths Tutor",
    template: "%s | GCSEMathsAI",
  },
  description:
    "Practise GCSE Maths with instant AI marking. Past-style papers, study notes and topic practice for AQA, Edexcel and OCR — Foundation and Higher.",
  keywords: [
    "GCSE Maths", "GCSE Mathematics", "AQA Maths", "Edexcel Maths", "OCR Maths",
    "GCSE past papers", "GCSE practice questions", "AI maths tutor",
    "GCSE revision", "Foundation maths", "Higher maths", "Year 10 maths", "Year 11 maths",
  ],
  authors: [{ name: "GCSEMathsAI" }],
  creator: "GCSEMathsAI",
  publisher: "GCSEMathsAI",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "GCSEMathsAI",
    title: "GCSEMathsAI — AI-Powered GCSE Maths Tutor",
    description:
      "Practise GCSE Maths with instant AI marking. Past-style papers, study notes and topic practice for AQA, Edexcel and OCR.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GCSEMathsAI — AI-Powered GCSE Maths Tutor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GCSEMathsAI — AI-Powered GCSE Maths Tutor",
    description:
      "Instant AI marking for GCSE Maths. Study notes, timed papers and topic practice for AQA, Edexcel and OCR.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "7yfaIa1Y-jOROaNuyuWVAE3_FY2ct8AIlu7g_cb5VD8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="google-site-verification" content="7yfaIa1Y-jOROaNuyuWVAE3_FY2ct8AIlu7g_cb5VD8" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4SCDRCH8B1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4SCDRCH8B1');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavWrapper />
        {children}
      </body>
    </html>
  );
}
