import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Providers } from "@/components/layout/Providers";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from "@/lib/jsonld";
import "@scootify/shared/styles";
import "@scootify/shared/styles/themes/nami";
import "./globals.css";

const CookieBanner = dynamic(
  () => import("@/components/ui").then((mod) => ({ default: mod.CookieBanner }))
);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NAMI | Електросамокати преміум класу — купити в Україні",
    template: "%s | NAMI",
  },
  description:
    "Nami електросамокати — преміум клас. Потужність до 8400W, гідравлічна підвіска, великий дисплей. Доставка по Україні.",
  keywords: [
    "Nami",
    "Nami Burn-E",
    "електросамокат",
    "преміум електросамокат",
    "Nami Burn-E 3 Max",
    "купити електросамокат Україна",
    "гідравлічна підвіска",
  ],
  authors: [{ name: "NAMI" }],
  creator: "NAMI",
  publisher: "NAMI",
  metadataBase: new URL("https://nami.com.ua"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://nami.com.ua",
    siteName: "NAMI",
    title: "NAMI | Електросамокати преміум класу — купити в Україні",
    description:
      "Nami електросамокати — преміум клас. Потужність до 8400W, гідравлічна підвіска.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NAMI - Електросамокати преміум класу",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAMI | Електросамокати преміум класу",
    description: "Потужність до 8400W, гідравлічна підвіска.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const globalJsonLd = combineSchemas(
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateLocalBusinessSchema()
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Перейти до основного вмісту
        </a>
        <Providers>
          <PageWrapper>{children}</PageWrapper>
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
