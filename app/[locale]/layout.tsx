import '../globals.css';
import type { Metadata } from "next";
import { Source_Serif_4, Plus_Jakarta_Sans } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export const metadata: Metadata = {
  title: "SweetSpots - From Inspo to Itinerary | Travel Planning Made Simple",
  description:
    "Discover hidden gems, read real reviews, and plan your perfect trip with SweetSpots. The all-in-one travel planning app that helps you discover and plan in one place.",
  keywords:
    "travel planning, itinerary planner, travel app, hidden gems, travel reviews, group travel, trip planning",
  openGraph: {
    title: "SweetSpots - From Inspo to Itinerary",
    description:
      "Discover hidden gems, read real reviews, and plan your perfect trip with SweetSpots.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SweetSpots - From Inspo to Itinerary",
    description:
      "Discover hidden gems, read real reviews, and plan your perfect trip with SweetSpots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Set the locale explicitly to avoid requestAsyncStorage issues
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sourceSerif.variable} ${plusJakarta.variable}`}
    >
      <body className="font-jakarta bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
