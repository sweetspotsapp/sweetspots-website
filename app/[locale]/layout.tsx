import "../globals.css";
import type { Metadata } from "next";
import {
  Source_Serif_4,
  Plus_Jakarta_Sans,
  IBM_Plex_Sans_Thai,
  Poppins,
} from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";

import { GA_ID } from "../gtag";
import Script from "next/script";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-ibm-thai",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SweetSpots - Travel Planning Made Simple",
  description:
    "Discover hidden gems and plan your perfect trip with SweetSpots.",
  keywords:
    "travel planning, itinerary planner, travel app, hidden gems, trip planning",
  openGraph: {
    title: "SweetSpots - Travel Planning Made Simple",
    description:
      "Discover hidden gems and plan your perfect trip with SweetSpots.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SweetSpots - Travel Planning Made Simple",
    description:
      "Discover hidden gems and plan your perfect trip with SweetSpots.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const fontClass =
    locale === "th"
      ? ibmThai.variable
      : `${sourceSerif.variable} ${poppins.variable}`;

  const bodyFontClass = locale === "th" ? "font-ibm-thai" : "font-poppins";

  return (
    <html lang={locale} className={fontClass}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true
                });
              `}
      </Script>
      <Analytics />
      <body className={`${bodyFontClass} bg-white text-gray-900 antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
