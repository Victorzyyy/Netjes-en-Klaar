import type { Metadata } from "next";

import { ServicePageContent } from "@/components/service-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Dieptereiniging | Netjes & Klaar",
  description:
    "Dieptereiniging voor achterstallige schoonmaak, keukens, sanitair, vloeren en locaties die een grondige reset nodig hebben. Voor bedrijven en locaties die echt schoon willen opleveren.",
  keywords: ["dieptereiniging", "grondige schoonmaak", "achterstallige schoonmaak", "keuken reiniging", "sanitair dieptereiniging"],
  alternates: {
    canonical: "/diensten/dieptereiniging",
  },
};

const content = {
  nl: {
    kicker: "Dieptereiniging",
    title: "Voor locaties die niet alleen netjes moeten lijken, maar echt grondig schoon moeten worden.",
    body: "Soms is een normale ronde niet genoeg. Dan is dieptereiniging nodig om vet, kalkaanslag, opgehoopt vuil en detailvervuiling echt goed aan te pakken.",
    points: [
      {
        title: "Grondige reset",
        text: "We richten ons op vervuiling die zich opbouwt in randen, hoeken, sanitair, keukenzones en andere intensief gebruikte plekken.",
      },
      {
        title: "Voor en na intensief gebruik",
        text: "Dieptereiniging is sterk voor opleveringen, achterstallige schoonmaak, piekgebruik of wanneer een ruimte weer fris moet starten.",
      },
      {
        title: "Detailniveau telt",
        text: "Niet alleen grote vlakken, maar juist ook contactpunten, naden, afwerking en moeilijke delen krijgen extra aandacht.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Keukens, sanitair, vloeren, opslagruimtes, bedrijfsruimtes, achterstallige schoonmaak en locaties die weer representatief en fris moeten aanvoelen.",
    approach: "Praktische aanpak",
    approachBody: "We bespreken vooraf de vervuilingsgraad, kritieke zones en het gewenste eindniveau, zodat duidelijk is waar de dieptereiniging op moet leveren.",
    cta: "Vraag dieptereiniging aan",
    back: "Terug naar home",
    faq: [
      {
        q: "Wanneer is dieptereiniging slimmer dan gewone schoonmaak?",
        a: "Wanneer vuil zich heeft opgebouwd of wanneer een ruimte weer echt naar een hoger basisniveau moet worden gebracht, is dieptereiniging vaak de betere keuze.",
      },
      {
        q: "Kunnen jullie ook alleen een specifieke zone aanpakken?",
        a: "Ja. Dieptereiniging kan voor een volledige locatie, maar ook gericht op bijvoorbeeld sanitair, keukenzones of vloeren.",
      },
      {
        q: "Is dieptereiniging eenmalig of periodiek?",
        a: "Allebei is mogelijk. Sommige locaties hebben een reset nodig, andere plannen periodiek een grondigere ronde naast de reguliere schoonmaak.",
      },
    ],
  },
  ar: {
    kicker: "تنظيف عميق",
    title: "للمواقع التي لا يكفي أن تبدو مرتبة فقط، بل تحتاج إلى تنظيف فعلي عميق.",
    body: "أحياناً لا تكفي الجولة العادية. عندها يكون التنظيف العميق ضرورياً لمعالجة الدهون والترسبات والأوساخ المتراكمة والتفاصيل المتسخة بشكل حقيقي.",
    points: [
      {
        title: "إعادة ضبط قوية",
        text: "نركز على الأوساخ التي تتراكم في الحواف والزوايا والمرافق الصحية ومناطق المطبخ وغيرها من الأماكن المستخدمة بكثافة.",
      },
      {
        title: "قبل وبعد الاستخدام المكثف",
        text: "التنظيف العميق مناسب جداً للتسليمات والتنظيف المتأخر وفترات الضغط أو عندما يجب أن تبدأ المساحة بإحساس جديد بالنظافة.",
      },
      {
        title: "مستوى التفاصيل مهم",
        text: "لا نهتم فقط بالمساحات الكبيرة، بل أيضاً بنقاط اللمس والوصلات والتشطيبات والأجزاء الصعبة.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "المطابخ والمرافق الصحية والأرضيات والمخازن والمساحات التجارية والتنظيف المتأخر والمواقع التي يجب أن تعود ممثلة ومنعشة.",
    approach: "طريقة عملية",
    approachBody: "نتفق مسبقاً على درجة التلوث والمناطق الحساسة والمستوى النهائي المطلوب حتى يكون واضحاً ما الذي يجب أن يحققه التنظيف العميق.",
    cta: "اطلب تنظيفاً عميقاً",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "متى يكون التنظيف العميق أفضل من التنظيف العادي؟",
        a: "عندما تكون الأوساخ قد تراكمت أو عندما يجب رفع المساحة فعلياً إلى مستوى نظافة أعلى، يكون التنظيف العميق غالباً الخيار الأفضل.",
      },
      {
        q: "هل يمكنكم معالجة منطقة محددة فقط؟",
        a: "نعم. يمكن أن يكون التنظيف العميق لموقع كامل أو لمناطق محددة مثل المرافق الصحية أو المطابخ أو الأرضيات.",
      },
      {
        q: "هل التنظيف العميق مرة واحدة أم بشكل دوري؟",
        a: "الاثنان ممكنان. بعض المواقع تحتاج إلى إعادة ضبط، وأخرى تخطط لجولة أعمق بشكل دوري بجانب التنظيف المعتاد.",
      },
    ],
  },
} as const;

export default function DeepCleaningPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ServicePageContent content={content} />
    </main>
  );
}
