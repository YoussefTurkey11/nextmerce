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
import { GoogleOAuthProvider } from "@react-oauth/google";
import HeaderServer from "@/components/layouts/headers/HeaderServer";
import ScrollUp from "@/components/common/ScrollUp";
import FooterServer from "@/components/layouts/footers/FooterServer";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              >
                <HolyLoader />
                <HeaderServer />
                <ScrollUp />
                {children}
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                  strategy="afterInteractive"
                />

                <Script id="google-analytics" strategy="afterInteractive">
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                      page_path: window.location.pathname,
                    });
                  `}
                </Script>
                <FooterServer />
              </GoogleOAuthProvider>
            </NextIntlClientProvider>
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
