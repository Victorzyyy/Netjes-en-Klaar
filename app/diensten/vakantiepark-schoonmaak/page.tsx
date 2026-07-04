import type { Metadata } from "next";

import { ServicePageContent } from "@/components/service-page-content";
import { SubpageHeader } from "@/components/subpage-header";

export const metadata: Metadata = {
  title: "Vakantiepark schoonmaak | Netjes & Klaar",
  description:
    "Vakantiepark schoonmaak voor wisseldagen, bungalows, chalets en recreatiewoningen. Heldere planning, controle per unit en schoonmaak die past bij check-in drukte.",
  keywords: ["vakantiepark schoonmaak", "bungalow schoonmaak", "chalet schoonmaak", "recreatiewoning schoonmaak", "wisselschoonmaak vakantiepark"],
  alternates: {
    canonical: "/diensten/vakantiepark-schoonmaak",
  },
};

const content = {
  nl: {
    kicker: "Vakantiepark schoonmaak",
    title: "Schoon op wisseldagen, zonder ruis tussen planning, controle en oplevering.",
    body: "Bij vakantieparken draait schoonmaak om timing, controle en betrouwbaarheid. Nieuwe gasten moeten binnenkomen in een woning die fris, compleet en op tijd klaarstaat.",
    points: [
      {
        title: "Gebouwd voor wisseldagen",
        text: "We plannen rond aankomst- en vertrektijden zodat de operatie meeloopt met de drukte van het park.",
      },
      {
        title: "Controle per unit",
        text: "Per bungalow, chalet of recreatiewoning kijken we niet alleen naar schoonmaak, maar ook naar de standaard van oplevering.",
      },
      {
        title: "Minder losse eindjes",
        text: "Door heldere afspraken over linnen, inventaris en aandachtspunten wordt het voor beheer en receptie veel rustiger.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Vakantieparken, recreatiewoningen, chalets, groepsaccommodaties en locaties met vaste of piekmatige wisselmomenten.",
    approach: "Praktische aanpak",
    approachBody: "We stemmen teamgrootte, woningtype, wisseldagen en controlemomenten af, zodat het park geen gedoe krijgt op de drukste momenten.",
    cta: "Bespreek je vakantiepark",
    back: "Terug naar home",
    faq: [
      {
        q: "Kunnen jullie meebewegen met piekdagen en weekenden?",
        a: "Ja. Juist bij vakantieparken stemmen we planning en bezetting af op drukke wisseldagen en piekmomenten.",
      },
      {
        q: "Doen jullie alleen schoonmaak of ook controle?",
        a: "We kunnen ook controlepunten meenemen, zoals linnen, inventaris en opvallende punten per woning.",
      },
      {
        q: "Werken jullie per type woning anders?",
        a: "Ja. Een chalet, bungalow of groepsaccommodatie vraagt vaak een andere volgorde en andere aandachtspunten.",
      },
    ],
  },
  ar: {
    kicker: "تنظيف منتجعات العطلات",
    title: "نظيف في أيام التبديل، من دون فوضى بين التخطيط والفحص والتسليم.",
    body: "في منتجعات العطلات، التنظيف يدور حول التوقيت والفحص والاعتمادية. يجب أن يدخل الضيف الجديد إلى وحدة نظيفة وكاملة وجاهزة في الوقت المحدد.",
    points: [
      {
        title: "مبني لأيام التبديل",
        text: "نخطط حول أوقات الوصول والمغادرة حتى ينسجم العمل مع ضغط المنتجع.",
      },
      {
        title: "فحص لكل وحدة",
        text: "في كل بنغالو أو شاليه أو وحدة ترفيهية لا ننظر فقط إلى التنظيف، بل أيضاً إلى مستوى التسليم المطلوب.",
      },
      {
        title: "نهايات أقل معلقة",
        text: "من خلال اتفاقات واضحة حول البياضات والمحتويات ونقاط الانتباه يصبح العمل أهدأ بكثير للإدارة والاستقبال.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "منتجعات العطلات والوحدات الترفيهية والشاليهات والإقامات الجماعية والمواقع ذات أيام التبديل الثابتة أو المزدحمة.",
    approach: "طريقة عملية",
    approachBody: "ننسق حجم الفريق ونوع الوحدة وأيام التبديل ونقاط الفحص حتى لا يواجه المنتجع مشاكل في أكثر لحظاته ازدحاماً.",
    cta: "ناقش منتجعك معنا",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "هل يمكنكم مواكبة أيام الذروة وعطلة نهاية الأسبوع؟",
        a: "نعم. في منتجعات العطلات ننسق التخطيط والطاقم حسب أيام التبديل المزدحمة ولحظات الذروة.",
      },
      {
        q: "هل تقدمون التنظيف فقط أم الفحص أيضاً؟",
        a: "يمكننا أيضاً تضمين نقاط فحص مثل البياضات والمحتويات وأي ملاحظات مهمة لكل وحدة.",
      },
      {
        q: "هل تختلف الطريقة حسب نوع الوحدة؟",
        a: "نعم. الشاليه أو البنغالو أو الإقامة الجماعية غالباً ما يحتاج إلى ترتيب عمل ونقاط اهتمام مختلفة.",
      },
    ],
  },
} as const;

export default function HolidayParkCleaningPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24">
      <SubpageHeader />
      <ServicePageContent content={content} />
    </main>
  );
}
