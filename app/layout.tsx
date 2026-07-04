import type { Metadata } from "next";
import Script from "next/script";

import { CookieConsent } from "@/components/cookie-consent";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";

import "./globals.css";

export const metadata: Metadata = {
  title: "Netjes & Klaar | Commerciele schoonmaak voor kantoren, vakantieparken, industrie en events",
  description: "Netjes & Klaar verzorgt commerciele schoonmaak voor kantoren, vakantieparken, evenementen, bouwopleveringen en productieomgevingen in Nederland. Heldere planning, duidelijke takenlijsten en vaste aanspreekpunten.",
  keywords: ["schoonmaakbedrijf", "commerciele schoonmaak", "kantoorschoonmaak", "vakantiepark schoonmaak", "evenementenreiniging", "bouwschoonmaak", "industriele schoonmaak", "fabriek schoonmaak", "facilitaire schoonmaak", "zakelijke schoonmaak nederland"],
  openGraph: {
    title: "Netjes & Klaar | Commerciele schoonmaak voor bedrijven en locaties",
    description: "Schoonmaak voor kantoren, vakantieparken, evenementen, bouwopleveringen en productieomgevingen in Nederland met duidelijke planning en terugkoppeling.",
    type: "website",
    locale: "nl_NL",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        {children}
        <CookieConsent />
        <FloatingWhatsAppButton />
      </body>
      {gaId ? (
        <>
          <Script id="google-consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
    </html>
  );
}
