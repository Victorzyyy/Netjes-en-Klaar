import type { Metadata } from "next";

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
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
