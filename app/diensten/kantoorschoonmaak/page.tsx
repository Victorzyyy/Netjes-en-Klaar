import type { Metadata } from "next";

import { ServicePageContent } from "@/components/service-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Kantoorschoonmaak | Netjes & Klaar",
  description:
    "Kantoorschoonmaak voor bedrijven, praktijken en werkplekken die fris, representatief en strak georganiseerd moeten blijven. Ook geschikt voor vaste rondes en duidelijke checklists.",
  keywords: ["kantoorschoonmaak", "schoonmaak kantoor", "zakelijke schoonmaak", "kantoor schoonmaakbedrijf", "periodieke kantoorschoonmaak"],
  alternates: {
    canonical: "/diensten/kantoorschoonmaak",
  },
};

const content = {
  nl: {
    kicker: "Kantoorschoonmaak",
    title: "Frisse werkplekken zonder dat je de planning opnieuw hoeft uit te vinden.",
    body: "Kantoorschoonmaak werkt het best als het rustig in je organisatie meedraait. Daarom zorgen we voor duidelijke rondes, vaste afspraken en schoonmaak die past bij werkplekken, ontvangst en vergaderruimtes.",
    points: [
      {
        title: "Representatief elke ronde",
        text: "Werkplekken, entree, pantry en sanitair blijven op niveau zonder dat je daar dagelijks achteraan hoeft.",
      },
      {
        title: "Afstemming op gebruik",
        text: "We kijken naar drukke dagen, ontvangst van klanten, vergaderruimtes en momenten waarop schoonmaak wel of juist niet handig is.",
      },
      {
        title: "Duidelijke checklist",
        text: "Per locatie of verdieping spreken we af wat de standaard is, zodat kwaliteit niet afhangt van toeval.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Kantoren, praktijken, bedrijfsunits, showrooms, wachtruimtes en locaties waar een nette uitstraling direct meetelt.",
    approach: "Praktische aanpak",
    approachBody: "We stemmen frequentie, tijdvak en aandachtspunten af op de locatie. Zo blijft het schoonmaakritme logisch voor medewerkers, receptie en bezoekers.",
    cta: "Vraag kantoorschoonmaak aan",
    back: "Terug naar home",
    faq: [
      {
        q: "Is kantoorschoonmaak alleen interessant voor grote bedrijven?",
        a: "Nee. Ook kleinere kantoren, praktijken en bedrijfsruimtes hebben baat bij vaste schoonmaak die rust en representativiteit bewaakt.",
      },
      {
        q: "Kunnen jullie voor of na werktijd werken?",
        a: "Ja. Ochtend, avond of rustige momenten overdag kunnen we afstemmen op wat praktisch is voor de locatie.",
      },
      {
        q: "Kunnen jullie met een vaste checklist werken?",
        a: "Ja. Dat is juist een van de sterkste manieren om kwaliteit constant te houden per ruimte of verdieping.",
      },
    ],
  },
  ar: {
    kicker: "تنظيف المكاتب",
    title: "أماكن عمل نظيفة ومنظمة من دون أن تعيد اختراع التخطيط كل مرة.",
    body: "تنظيف المكاتب يعمل بأفضل شكل عندما ينسجم بهدوء مع عمل المؤسسة. لذلك نعتمد جولات واضحة واتفاقات ثابتة وتنظيفاً يناسب أماكن العمل والاستقبال وغرف الاجتماعات.",
    points: [
      {
        title: "مظهر ممثل في كل جولة",
        text: "تبقى المكاتب والمدخل والمطبخ الصغير ودورات المياه بمستوى جيد من دون أن تضطر لملاحقة ذلك يومياً.",
      },
      {
        title: "تنسيق مع الاستخدام",
        text: "نأخذ في الاعتبار الأيام المزدحمة واستقبال العملاء وغرف الاجتماعات والأوقات المناسبة وغير المناسبة للتنظيف.",
      },
      {
        title: "قائمة مهام واضحة",
        text: "نحدد لكل موقع أو طابق ما هو المستوى المطلوب حتى لا تعتمد الجودة على الصدفة.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "المكاتب والعيادات والوحدات التجارية وصالات العرض وغرف الانتظار والمواقع التي يكون فيها المظهر المرتب مهماً مباشرة.",
    approach: "طريقة عملية",
    approachBody: "ننسق التكرار والفترة الزمنية ونقاط الانتباه حسب الموقع، بحيث يبقى الإيقاع منطقياً للموظفين والاستقبال والزوار.",
    cta: "اطلب تنظيف المكاتب",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "هل تنظيف المكاتب مهم فقط للشركات الكبيرة؟",
        a: "لا. حتى المكاتب الصغيرة والعيادات والوحدات التجارية تستفيد من تنظيف ثابت يحافظ على الراحة والمظهر المهني.",
      },
      {
        q: "هل يمكنكم العمل قبل أو بعد الدوام؟",
        a: "نعم. يمكننا التنسيق صباحاً أو مساءً أو في الأوقات الهادئة خلال اليوم حسب ما يناسب الموقع.",
      },
      {
        q: "هل يمكنكم العمل وفق قائمة مهام ثابتة؟",
        a: "نعم. هذه من أفضل الطرق للحفاظ على جودة ثابتة لكل مساحة أو طابق.",
      },
    ],
  },
} as const;

export default function OfficeCleaningPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ServicePageContent content={content} />
    </main>
  );
}
