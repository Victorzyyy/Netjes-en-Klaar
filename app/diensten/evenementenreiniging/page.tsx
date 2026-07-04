import type { Metadata } from "next";

import { ServicePageContent } from "@/components/service-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Evenementenreiniging | Netjes & Klaar",
  description:
    "Evenementenreiniging voor zalen, festivals, hospitality en bedrijfsevents. Voor, tijdens en na het event met duidelijke planning, piekrondes en snelle afstemming.",
  keywords: ["evenementenreiniging", "event schoonmaak", "festival schoonmaak", "schoonmaak evenement", "schoonmaak hospitality event"],
  alternates: {
    canonical: "/diensten/evenementenreiniging",
  },
};

const content = {
  nl: {
    kicker: "Evenementenreiniging",
    title: "Schoon en onder controle, ook wanneer de drukte piekt.",
    body: "Bij events moet schoonmaak meebewegen met bezoekersstromen, sanitaire pieken en het ritme van opbouw, uitvoering en afbouw. Daarvoor heb je geen generieke ploeg nodig, maar een team dat snel leest wat de locatie vraagt.",
    points: [
      {
        title: "Voor, tijdens en na",
        text: "We kunnen ondersteunen in de opbouw, tijdens het event en in de eindschoonmaak, zodat de locatie representatief en beheersbaar blijft.",
      },
      {
        title: "Piekmomenten opvangen",
        text: "Sanitaire rondes, afvalpunten, publiekszones en backstage vragen timing en overzicht, zeker wanneer bezoekersdruk snel verandert.",
      },
      {
        title: "Snel schakelen op locatie",
        text: "Bij events telt communicatie. Daarom werken we met duidelijke aanspreekpunten en taken per zone of moment.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Bedrijfsevents, hospitality, zalen, festivals, beurzen, openingen en locaties waar veel bezoekers in korte tijd bewegen.",
    approach: "Praktische aanpak",
    approachBody: "We stemmen bezetting, tijdvakken en focuszones af op bezoekersstromen, programma, sanitaire belasting en oplevermomenten.",
    cta: "Bespreek je event",
    back: "Terug naar home",
    faq: [
      {
        q: "Kunnen jullie ook tijdens het evenement schoonhouden?",
        a: "Ja. Juist tijdens drukte houden we sanitaire ruimtes, publiekszones en afvalpunten op niveau met korte, slimme rondes.",
      },
      {
        q: "Werken jullie ook in avonden of weekenden?",
        a: "Ja. Events vragen vaak afwijkende tijden, en daar kunnen we de planning op inrichten.",
      },
      {
        q: "Kunnen jullie ook de eindschoonmaak doen?",
        a: "Ja. We kunnen voor, tijdens en na het event ondersteunen, inclusief een strakke eindschoonmaak na afloop.",
      },
    ],
  },
  ar: {
    kicker: "تنظيف الفعاليات",
    title: "نظيف وتحت السيطرة، حتى عندما تصل الحركة إلى ذروتها.",
    body: "في الفعاليات يجب أن يتحرك التنظيف مع تدفق الزوار وضغط المرافق الصحية وإيقاع التجهيز والتنفيذ والتفكيك. لهذا تحتاج إلى فريق يفهم الموقع بسرعة، لا إلى طاقم عام فقط.",
    points: [
      {
        title: "قبل وأثناء وبعد",
        text: "يمكننا الدعم أثناء التجهيز وخلال الفعالية وفي التنظيف النهائي، حتى يبقى الموقع ممثلاً وقابلاً للإدارة.",
      },
      {
        title: "استيعاب لحظات الذروة",
        text: "جولات المرافق الصحية ونقاط النفايات ومناطق الجمهور والكواليس تحتاج إلى توقيت ومتابعة، خاصة عندما يتغير الضغط بسرعة.",
      },
      {
        title: "سرعة في التنسيق بالموقع",
        text: "في الفعاليات التواصل مهم جداً، لذلك نعمل مع نقاط اتصال واضحة ومهام محددة لكل منطقة أو لحظة.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "فعاليات الشركات والضيافة والقاعات والمهرجانات والمعارض والافتتاحات والمواقع التي تشهد حركة زوار كبيرة في وقت قصير.",
    approach: "طريقة عملية",
    approachBody: "ننسق عدد العاملين والفترات الزمنية ومناطق التركيز حسب حركة الزوار والبرنامج وضغط المرافق الصحية ومواعيد التسليم.",
    cta: "ناقش فعاليتك معنا",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "هل يمكنكم الحفاظ على النظافة أثناء الفعالية نفسها؟",
        a: "نعم. أثناء الضغط نحافظ على المرافق الصحية ومناطق الجمهور ونقاط النفايات من خلال جولات قصيرة ومدروسة.",
      },
      {
        q: "هل تعملون أيضاً في المساء أو عطلات نهاية الأسبوع؟",
        a: "نعم. الفعاليات غالباً ما تحتاج إلى أوقات غير تقليدية ويمكننا تنظيم التخطيط بما يناسب ذلك.",
      },
      {
        q: "هل يمكنكم أيضاً تنفيذ التنظيف النهائي بعد الفعالية؟",
        a: "نعم. يمكننا الدعم قبل الفعالية وأثناءها وبعدها، بما في ذلك تنظيف نهائي مرتب بعد الانتهاء.",
      },
    ],
  },
} as const;

export default function EventCleaningPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ServicePageContent content={content} />
    </main>
  );
}
