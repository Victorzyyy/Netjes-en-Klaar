import type { Metadata } from "next";

import { PrivacyPageContent } from "@/components/privacy-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Privacy & cookies | Netjes & Klaar",
  description:
    "Lees hoe Netjes & Klaar omgaat met contactgegevens, formulieren, cookies en analytics op de website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <PrivacyPageContent />
    </main>
  );
}
