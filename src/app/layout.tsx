import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import NavWrapper from "@/components/NavWrapper";
import InstallBanner from "@/components/InstallBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.gcsemathsai.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GCSEMathsAI — Preparation worthy of the grade you want",
    template: "%s | GCSEMathsAI",
  },
  description:
    "Every topic on the AQA, Edexcel and OCR specifications — taught properly, marked like a real examiner, and organised into structured revision that actually moves your grade.",
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
    title: "GCSEMathsAI — Preparation worthy of the grade you want",
    description:
      "Every topic on the AQA, Edexcel and OCR specifications — taught properly, marked like a real examiner.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GCSEMathsAI — AI-Powered GCSE Maths Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GCSEMathsAI — Preparation worthy of the grade you want",
    description:
      "AI examiner marking for GCSE Maths. Study notes, timed papers and topic practice for AQA, Edexcel and OCR.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "7yfaIa1Y-jOROaNuyuWVAE3_FY2ct8AIlu7g_cb5VD8",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F4F3A",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GCSEMathsAI" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GCSEMathsAI',
          url: 'https://www.gcsemathsai.co.uk',
          logo: 'https://www.gcsemathsai.co.uk/og.png',
          description: 'AI-powered GCSE Maths preparation with real examiner-style marking. Study notes, practice questions and past papers for AQA, Edexcel and OCR.',
          sameAs: [],
          contactPoint: { '@type': 'ContactPoint', email: 'suppoprtgcsemaths@gmail.com', contactType: 'customer service' },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'GCSEMathsAI',
          url: 'https://www.gcsemathsai.co.uk',
          description: 'AI-powered GCSE Maths revision platform with instant marking.',
          publisher: { '@type': 'Organization', name: 'GCSEMathsAI' },
          inLanguage: 'en-GB',
        }) }} />
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`}>
        <NavWrapper />
        {children}
        <InstallBanner />
      </body>
    </html>
  );
}
