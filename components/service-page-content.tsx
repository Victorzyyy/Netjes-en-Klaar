"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

type ServicePageCopy = {
  nl: {
    kicker: string;
    title: string;
    body: string;
    points: ReadonlyArray<{ title: string; text: string }>;
    suitable: string;
    suitableBody: string;
    approach: string;
    approachBody: string;
    cta: string;
    back: string;
    faq: ReadonlyArray<{ q: string; a: string }>;
  };
  ar: {
    kicker: string;
    title: string;
    body: string;
    points: ReadonlyArray<{ title: string; text: string }>;
    suitable: string;
    suitableBody: string;
    approach: string;
    approachBody: string;
    cta: string;
    back: string;
    faq: ReadonlyArray<{ q: string; a: string }>;
  };
};

export function ServicePageContent({ content }: { content: ServicePageCopy }) {
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
            <p className="mt-3 leading-7 text-fresh-ink/92">{copy.suitableBody}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.approach}</p>
            <p className="mt-3 leading-7 text-fresh-ink/92">{copy.approachBody}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue">
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
