import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import AuthInitializer from "@/providers/AuthInitializer";
import ReduxProvider from "@/redux/provider";
import HolyLoader from "holy-loader";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextMerce",
  description: "Greate and smarter e-commerce",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <body className={`${cairo.variable}`}>
        <ReduxProvider>
          <AuthInitializer>
            <NextIntlClientProvider>
              <HolyLoader />
              {children}
            </NextIntlClientProvider>
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
