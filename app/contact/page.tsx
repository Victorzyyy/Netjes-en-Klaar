import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Contact | Netjes & Klaar",
  description:
    "Neem contact op met Netjes & Klaar voor zakelijke schoonmaak of een particuliere aanvraag. Kies de route die past bij je locatie en vraag eenvoudig een voorstel aan.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ContactPageContent />
    </main>
  );
}
