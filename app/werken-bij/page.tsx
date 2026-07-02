import type { Metadata } from "next";
import { CareersPageContent } from "@/components/careers-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Werken bij Netjes & Klaar | Solliciteren in schoonmaak en facilitair",
  description: "Solliciteer bij Netjes & Klaar voor schoonmaakwerk in kantoren, vakantieparken, events, bouwoplevering en industrie. Open sollicitatie, CV upload en praktische intake.",
};

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <CareersPageContent />
    </main>
  );
}
