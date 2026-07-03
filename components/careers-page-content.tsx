"use client";

import { useEffect, useState } from "react";

import { JobApplicationForm } from "@/components/job-application-form";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

const content = {
  nl: {
    kicker: "Werken bij",
    title: "Schoon werk begint met goede mensen.",
    body: "Heb je ervaring in schoonmaak, facilitair werk of productieomgevingen? Stuur een open sollicitatie of laat direct zien waar je inzetbaar bent.",
    fitTitle: "Past goed bij",
    fitBody: "Schoonmaakmedewerkers, meewerkend voormannen, mensen met ervaring in vakantieparken, kantoorschoonmaak, bouwoplevering of industriele schoonmaak.",
  },
  ar: {
    kicker: "العمل معنا",
    title: "العمل النظيف يبدأ بأشخاص جيدين.",
    body: "هل لديك خبرة في التنظيف أو العمل الخدمي أو بيئات الإنتاج؟ أرسل طلباً مفتوحاً أو وضح مباشرة أين يمكنك أن تكون مفيداً.",
    fitTitle: "مناسب بشكل جيد لـ",
    fitBody: "عمال النظافة، المشرفون الميدانيون، ومن لديهم خبرة في منتجعات العطلات أو تنظيف المكاتب أو التنظيف بعد البناء أو التنظيف الصناعي.",
  },
} as const;

export function CareersPageContent() {
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
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[hsl(var(--muted))]">
          {copy.body}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[0.76fr_1.24fr]">
        <div className="space-y-4">
          <div className="rounded-[1.9rem] bg-white/44 p-5 shadow-[0_18px_55px_-42px_rgba(21,86,112,0.2)] backdrop-blur-[6px]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/62">{copy.fitTitle}</p>
            <p className="mt-3 leading-7 text-[hsl(var(--muted))]">
              {copy.fitBody}
            </p>
          </div>
        </div>

        <JobApplicationForm />
      </div>
    </section>
  );
}
