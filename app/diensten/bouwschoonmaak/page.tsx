import type { Metadata } from "next";

import { ServicePageContent } from "@/components/service-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Bouwschoonmaak | Netjes & Klaar",
  description:
    "Bouwschoonmaak voor opleveringen, renovaties en nieuwbouw. Stofvrij opleveren met aandacht voor glas, randen, sanitair en detailwerk voor overdracht.",
  keywords: ["bouwschoonmaak", "opleveringsschoonmaak", "nieuwbouw schoonmaak", "renovatie schoonmaak", "eindschoonmaak bouw"],
  alternates: {
    canonical: "/diensten/bouwschoonmaak",
  },
};

const content = {
  nl: {
    kicker: "Bouwschoonmaak",
    title: "Opleveren zonder bouwstof, resten en losse eindjes.",
    body: "Na bouw of verbouwing wil je een ruimte schoon, stofvrij en representatief kunnen overdragen. Bouwschoonmaak vraagt daarom detailwerk, tempo en een duidelijke opleverfocus.",
    points: [
      {
        title: "Klaar voor overdracht",
        text: "We richten ons op een nette eindsituatie waarin stof, resten en zichtbare vervuiling niet meer in de weg zitten voor oplevering of gebruik.",
      },
      {
        title: "Detail telt mee",
        text: "Niet alleen vloeren en grote vlakken, maar ook glas, kozijnen, sanitair, randen en afwerking krijgen aandacht.",
      },
      {
        title: "Afgestemd op planning",
        text: "We werken mee in het ritme van de oplevering, zodat de schoonmaak niet achteraf los bungelt maar onderdeel is van het slotstuk.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Nieuwbouw, renovaties, winkelpanden, kantoren, bedrijfsunits en ruimtes die schoon en representatief opgeleverd moeten worden.",
    approach: "Praktische aanpak",
    approachBody: "We stemmen af op opleverdatum, type ruimte, vervuilingsgraad en de delen die extra aandacht nodig hebben voor een nette overdracht.",
    cta: "Vraag bouwschoonmaak aan",
    back: "Terug naar home",
    faq: [
      {
        q: "Doen jullie alleen een eindschoonmaak of ook tussendoor?",
        a: "De meeste aanvragen gaan om eindschoonmaak, maar tussentijdse rondes kunnen ook helpen om de laatste fase beheersbaar te houden.",
      },
      {
        q: "Nemen jullie glas en kozijnen mee?",
        a: "Ja. Glas, kozijnen, randen en andere zichtbare details horen vaak juist bij de belangrijke opleverpunten.",
      },
      {
        q: "Kunnen jullie snel voor een oplevermoment schakelen?",
        a: "Vaak wel. Dat hangt af van planning, omvang en vervuiling, maar we begrijpen dat bouwopleveringen vaak strak op tijd zitten.",
      },
    ],
  },
  ar: {
    kicker: "تنظيف ما بعد البناء",
    title: "تسليم نظيف من دون غبار بناء أو بقايا أو تفاصيل ناقصة.",
    body: "بعد البناء أو التجديد تريد تسليم المساحة وهي نظيفة وخالية من الغبار وممثلة بشكل جيد. لذلك يحتاج تنظيف ما بعد البناء إلى دقة وسرعة وتركيز واضح على التسليم.",
    points: [
      {
        title: "جاهز للتسليم",
        text: "نركز على نتيجة نهائية مرتبة لا يعود فيها الغبار أو البقايا أو التلوث الظاهر عائقاً أمام التسليم أو الاستخدام.",
      },
      {
        title: "التفاصيل مهمة",
        text: "لا نهتم فقط بالأرضيات والمساحات الكبيرة، بل أيضاً بالزجاج والإطارات والمرافق الصحية والحواف والتشطيبات.",
      },
      {
        title: "منسق مع الجدول",
        text: "نعمل ضمن إيقاع التسليم حتى لا يبقى التنظيف خطوة منفصلة في النهاية بل جزءاً من الإغلاق المنظم للمشروع.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "المباني الجديدة والتجديدات والمتاجر والمكاتب والوحدات التجارية والمساحات التي يجب تسليمها نظيفة وممثلة.",
    approach: "طريقة عملية",
    approachBody: "ننسق حسب تاريخ التسليم ونوع المساحة ودرجة التلوث والأجزاء التي تحتاج إلى اهتمام إضافي قبل التسليم.",
    cta: "اطلب تنظيف ما بعد البناء",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "هل تقدمون التنظيف النهائي فقط أم التنظيف أثناء المراحل أيضاً؟",
        a: "أغلب الطلبات تكون للتنظيف النهائي، لكن الجولات المرحلية قد تساعد أيضاً في إبقاء المرحلة الأخيرة تحت السيطرة.",
      },
      {
        q: "هل يشمل العمل الزجاج والإطارات؟",
        a: "نعم. الزجاج والإطارات والحواف والتفاصيل الظاهرة غالباً ما تكون من أهم نقاط التسليم.",
      },
      {
        q: "هل يمكنكم التحرك بسرعة قبل موعد التسليم؟",
        a: "غالباً نعم. الأمر يعتمد على الجدول والحجم ودرجة التلوث، لكننا نعرف أن مواعيد التسليم غالباً ما تكون مضغوطة.",
      },
    ],
  },
} as const;

export default function ConstructionCleaningPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ServicePageContent content={content} />
    </main>
  );
}
