"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

const content = {
  nl: {
    kicker: "Industriele schoonmaak",
    title: "Schoonmaak voor productieomgevingen waar veiligheid en ritme meewegen.",
    body: "Voor fabrieken, productiehallen en technische ruimtes is schoonmaak niet zomaar een extra ronde. Het moet passen binnen werkzones, looproutes, veiligheidsafspraken en momenten waarop het team toegang heeft.",
    points: [
      {
        title: "Afstemming op productie",
        text: "We plannen rond ploegendienst, stilstandmomenten en toegankelijke zones zodat schoonmaak niet dwars door de operatie loopt.",
      },
      {
        title: "Veiligheid eerst",
        text: "Werkafspraken, looproutes, PBM's en toegang per zone stemmen we vooraf af. Dat is extra belangrijk in technische en productieomgevingen.",
      },
      {
        title: "Duidelijke zones en taken",
        text: "Niet alles hoeft op dezelfde manier gereinigd te worden. Daarom werken we per ruimte, machinezone of route met een heldere takenlijst.",
      },
    ],
    suitable: "Geschikt voor",
    suitableBody: "Productiehallen, fabrieken, logistieke zones, technische ruimtes, verwerkingsruimtes en locaties waar vaste veiligheids- of hygieneregels gelden.",
    approach: "Praktische aanpak",
    approachBody: "We stemmen vooraf af welke zones gereinigd worden, hoe vaak, met welk team en op welke momenten. Zo blijft de planning werkbaar voor beheer en operatie.",
    cta: "Bespreek je locatie",
    back: "Terug naar home",
    faq: [
      {
        q: "Is fabriek schoonmaak hetzelfde als industriele schoonmaak?",
        a: "In de praktijk zoeken veel bedrijven op beide termen. Voor de website is industriele schoonmaak meestal breder en sterker, omdat het ook productiehallen, technische ruimtes en logistieke zones dekt.",
      },
      {
        q: "Kunnen jullie rekening houden met voedselveiligheid of strakke hygieneregels?",
        a: "Ja. Waar nodig stemmen we het schoonmaakniveau af op de regels en werkwijze van de locatie, inclusief zones, materialen en momenten waarop gereinigd mag worden.",
      },
      {
        q: "Werken jullie ook buiten normale uren?",
        a: "Ja. In productieomgevingen is dat vaak juist nodig. We kunnen vroeg, laat of in overleg op stilstandmomenten werken.",
      },
    ],
  },
  ar: {
    kicker: "التنظيف الصناعي",
    title: "تنظيف لبيئات الإنتاج حيث تؤخذ السلامة وإيقاع العمل بجدية.",
    body: "في المصانع وقاعات الإنتاج والغرف التقنية، التنظيف ليس مجرد جولة إضافية. يجب أن ينسجم مع مناطق العمل ومسارات الحركة وتعليمات السلامة والأوقات التي يمكن للفريق الوصول فيها.",
    points: [
      {
        title: "تنسيق مع الإنتاج",
        text: "نخطط حول الورديات وأوقات التوقف والمناطق المتاحة حتى لا يمر التنظيف وسط العملية التشغيلية بشكل مزعج.",
      },
      {
        title: "السلامة أولاً",
        text: "نتفق مسبقاً على التعليمات ومسارات الحركة ووسائل الحماية والدخول لكل منطقة. هذا مهم جداً في البيئات التقنية والإنتاجية.",
      },
      {
        title: "مناطق ومهام واضحة",
        text: "ليس كل شيء يحتاج نفس طريقة التنظيف. لذلك نعمل لكل مساحة أو منطقة آلة أو مسار بقائمة مهام واضحة.",
      },
    ],
    suitable: "مناسب لـ",
    suitableBody: "قاعات الإنتاج والمصانع والمناطق اللوجستية والغرف التقنية ومساحات المعالجة والمواقع التي تطبق قواعد سلامة أو نظافة ثابتة.",
    approach: "طريقة عملية",
    approachBody: "نتفق مسبقاً على المناطق التي سيتم تنظيفها وعدد المرات والفريق والأوقات المناسبة. بهذه الطريقة تبقى الخطة عملية للإدارة والتشغيل.",
    cta: "ناقش موقعك معنا",
    back: "العودة للرئيسية",
    faq: [
      {
        q: "هل تنظيف المصانع هو نفسه التنظيف الصناعي؟",
        a: "عملياً تبحث كثير من الشركات عن المصطلحين. لكن على الموقع يكون التنظيف الصناعي أوسع وأقوى لأنه يشمل أيضاً قاعات الإنتاج والغرف التقنية والمناطق اللوجستية.",
      },
      {
        q: "هل يمكنكم مراعاة سلامة الغذاء أو قواعد النظافة الصارمة؟",
        a: "نعم. عند الحاجة ننسق مستوى التنظيف مع قواعد الموقع وطريقة عمله، بما في ذلك المناطق والمواد والأوقات المسموح فيها بالتنظيف.",
      },
      {
        q: "هل تعملون أيضاً خارج الساعات العادية؟",
        a: "نعم. في بيئات الإنتاج يكون هذا مطلوباً غالباً. يمكننا العمل مبكراً أو متأخراً أو في أوقات التوقف المتفق عليها.",
      },
    ],
  },
} as const;

export function IndustrialPageContent() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const syncLanguage = (nextLanguage: string | null) => {
      if (nextLanguage === "nl" || nextLanguage === "ar") {
        setLanguage(nextLanguage);
        document.documentElement.lang = nextLanguage;
        document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
      }
    };

    syncLanguage(window.localStorage.getItem(languageStorageKey));

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      syncLanguage(customEvent.detail);
    };

    const handleStorage = () => {
      syncLanguage(window.localStorage.getItem(languageStorageKey));
    };

    window.addEventListener(languageChangeEvent, handleLanguageChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(languageChangeEvent, handleLanguageChange as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const copy = content[language];

  return (
    <section dir={language === "ar" ? "rtl" : "ltr"} className="fresh-shell relative z-10 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">{copy.kicker}</p>
        <h1 className="mt-5 text-balance text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] text-fresh-ink md:text-7xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[hsl(var(--muted))]">
          {copy.body}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
        {copy.points.map((point) => (
          <article key={point.title} className="premium-panel rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-fresh-ink">{point.title}</h2>
            <p className="mt-4 leading-7 text-[hsl(var(--muted))]">{point.text}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-[2.2rem] border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,251,252,0.88))] p-6 shadow-[0_34px_96px_-60px_rgba(21,86,112,0.3)] ring-1 ring-fresh-blue/8 backdrop-blur-[10px] md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.suitable}</p>
            <p className="mt-3 leading-7 text-fresh-ink/92">
              {copy.suitableBody}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.approach}</p>
            <p className="mt-3 leading-7 text-fresh-ink/92">
              {copy.approachBody}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/#contact" className="inline-flex items-center justify-center rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue">
            {copy.cta}
          </a>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-fresh-blue/20 bg-white px-6 py-3.5 text-sm font-semibold text-fresh-ink shadow-fresh transition hover:-translate-y-0.5 hover:border-fresh-ink/20">
            {copy.back}
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="premium-panel rounded-[2.25rem] p-5 md:p-6">
          <div className="divide-y divide-fresh-blue/20">
            {copy.faq.map((item) => (
              <details key={item.q} className="group py-4 first:pt-1 last:pb-1">
                <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-fresh-ink">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fresh-cloud text-fresh-blue transition group-open:rotate-45 group-open:bg-fresh-ink group-open:text-white">+</span>
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-[hsl(var(--muted))]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
