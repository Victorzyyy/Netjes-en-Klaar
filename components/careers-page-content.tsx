"use client";

import { useEffect, useState } from "react";

import { JobApplicationForm } from "@/components/job-application-form";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";

const content = {
  nl: {
    kicker: "Werken bij",
    title: "Schoon werk begint met goede mensen.",
    body: "Heb je ervaring in schoonmaak, facilitair werk of productieomgevingen? Stuur een open sollicitatie of laat direct zien waar je inzetbaar bent.",
    sectionTitle: "Wat we graag van je zien",
    benefits: [
      "Open sollicitatie of gericht op een rol",
      "Werk in kantoren, vakantieparken, events, bouw en industrie",
      "Praktische intake zonder onnodige stappen",
    ],
    fitTitle: "Past goed bij",
    fitBody: "Schoonmaakmedewerkers, meewerkend voormannen, mensen met ervaring in vakantieparken, kantoorschoonmaak, bouwoplevering of industriele schoonmaak.",
  },
  ar: {
    kicker: "العمل معنا",
    title: "العمل النظيف يبدأ بأشخاص جيدين.",
    body: "هل لديك خبرة في التنظيف أو العمل الخدمي أو بيئات الإنتاج؟ أرسل طلباً مفتوحاً أو وضح مباشرة أين يمكنك أن تكون مفيداً.",
    sectionTitle: "ما الذي نحب أن نراه لديك",
    benefits: [
      "طلب مفتوح أو اهتمام بدور محدد",
      "العمل في المكاتب ومنتجعات العطلات والفعاليات والبناء والقطاع الصناعي",
      "خطوة عملية واضحة بدون إجراءات طويلة غير ضرورية",
    ],
    fitTitle: "مناسب بشكل جيد لـ",
    fitBody: "عمال النظافة، المشرفون الميدانيون، ومن لديهم خبرة في منتجعات العطلات أو تنظيف المكاتب أو التنظيف بعد البناء أو التنظيف الصناعي.",
  },
} as const;

export function CareersPageContent() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "nl" || stored === "ar") {
      setLanguage(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
    }
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
          <div className="space-y-5 px-1 pt-2">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-fresh-ink">{copy.sectionTitle}</h2>
            <div className="grid gap-4">
              {copy.benefits.map((item, index) => (
                <div key={item} className="relative overflow-hidden rounded-[1.5rem] border border-white/55 bg-white/18 px-4 py-4 shadow-[0_20px_50px_-42px_rgba(21,86,112,0.22)] backdrop-blur-[3px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-fresh-aqua/65 via-fresh-blue/55 to-fresh-leaf/55 rtl:left-auto rtl:right-0" />
                  <div className="flex items-start gap-4 pl-3 rtl:pl-0 rtl:pr-3">
                    <span className="mt-0.5 text-xs font-black tracking-[0.22em] text-fresh-blue/72">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base font-semibold leading-7 text-fresh-ink/84">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
