"use client";

import { useEffect, useMemo, useState } from "react";

import { CleanWaveDivider } from "@/components/clean-wave-divider";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { PoppableSiteBubbles } from "@/components/poppable-site-bubbles";
import { ProcessTimeline } from "@/components/process-timeline";
import { ServiceSituationFlow } from "@/components/service-situation-flow";
import { businessInfo } from "@/data/site-content";
import { Language, translations } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";

export function HomeLanguageShell() {
  const [language, setLanguage] = useState<Language>("nl");
  const copy = translations[language];

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "nl" || stored === "ar") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
    document.documentElement.dir = copy.dir;
  }, [copy.dir, language]);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CleaningService",
      name: businessInfo.name,
      description: copy.meta.schemaDescription,
      telephone: "+31612345678",
      email: businessInfo.email,
      areaServed: businessInfo.serviceAreas.map((area) => ({ "@type": "Country", name: area })),
      serviceType: businessInfo.services,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+31612345678",
        email: businessInfo.email,
        contactType: "customer service",
        areaServed: businessInfo.serviceAreas,
        availableLanguage: copy.meta.availableLanguages,
      },
    }),
    [copy.meta.availableLanguages, copy.meta.schemaDescription],
  );

  return (
    <main dir={copy.dir} className="relative min-h-screen overflow-x-hidden">
      <PoppableSiteBubbles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="fresh-shell sticky top-3 z-40 pt-3">
        <div className="fresh-card flex flex-wrap items-center justify-between gap-3 rounded-[2rem] px-4 py-3 md:flex-nowrap md:px-5">
          <a href="#top" className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] text-fresh-ink">
            <span className="grid size-9 place-items-center rounded-full bg-fresh-ink text-white shadow-glow">N</span>
            <span className="hidden sm:inline">Netjes & Klaar</span>
          </a>

          <nav className="order-3 flex w-full items-center justify-center gap-5 text-sm font-bold text-[hsl(var(--muted))] md:order-2 md:w-auto md:gap-7">
            <a className="transition hover:text-fresh-ink" href="#diensten">{copy.nav.services}</a>
            <a className="transition hover:text-fresh-ink" href="#planning">{copy.nav.process}</a>
            <a className="transition hover:text-fresh-ink" href="#contact">{copy.nav.contact}</a>
            <a className="transition hover:text-fresh-ink" href="/werken-bij">{copy.nav.careers}</a>
          </nav>

          <div className="order-2 flex items-center gap-2 md:order-3">
            <div className="flex items-center gap-1 rounded-full border border-fresh-blue/18 bg-white/78 p-1 shadow-[0_16px_40px_-28px_rgba(21,86,112,0.24)]">
              <span className="sr-only">{copy.nav.switchLabel}</span>
              <button
                type="button"
                onClick={() => setLanguage("nl")}
                className={
                  "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
                  (language === "nl" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
                }
              >
                NL
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={
                  "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
                  (language === "ar" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
                }
              >
                العربية
              </button>
            </div>

            <a href={businessInfo.phoneHref} className="hidden rounded-full bg-fresh-ink px-4 py-2 text-sm font-black text-white transition hover:bg-fresh-blue sm:inline-flex">
              {copy.nav.callNow}
            </a>
          </div>
        </div>
      </header>

      <HeroSection copy={copy.hero} />

      <CleanWaveDivider />

      <section id="diensten" className="fresh-shell relative z-10 grid min-h-screen content-center gap-8 py-16">
        <div className="relative grid justify-items-center gap-5 text-center md:min-h-[14rem]">
          <div className="space-y-5">
            <h2 className="mx-auto mt-4 max-w-5xl text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-fresh-ink md:text-6xl lg:text-7xl">
              {copy.servicesSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[hsl(var(--muted))]">
              {copy.servicesSection.body}
            </p>
          </div>
        </div>
        <ServiceSituationFlow copy={copy.servicesSection} />
      </section>

      <section className="fresh-shell relative z-10 py-24 md:py-28">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <p className="section-kicker">{copy.processSection.kicker}</p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.045em] text-fresh-ink md:text-5xl">{copy.processSection.title}</h2>
        </div>

        <ProcessTimeline steps={copy.processSection.steps} />
      </section>

      <section className="fresh-shell relative z-10 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-kicker">{copy.faqSection.kicker}</p>
            <h2 className="text-balance text-4xl font-extrabold tracking-[-0.045em] text-fresh-ink md:text-5xl">{copy.faqSection.title}</h2>
            <p className="max-w-md text-lg leading-8 text-[hsl(var(--muted))]">{copy.faqSection.body}</p>
          </div>

          <div className="premium-panel rounded-[2.25rem] p-4 md:p-5">
            <div className="divide-y divide-fresh-blue/20">
              {copy.faqSection.items.map((faq) => (
                <details key={faq.question} className="group py-4 first:pt-1 last:pb-1">
                  <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-fresh-ink">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fresh-cloud text-fresh-blue transition group-open:rotate-45 group-open:bg-fresh-ink group-open:text-white">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-7 text-[hsl(var(--muted))]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection copy={copy.contactSection} />
    </main>
  );
}
