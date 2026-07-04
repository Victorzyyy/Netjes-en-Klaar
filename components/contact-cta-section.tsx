"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, House } from "lucide-react";

import type { Language, TranslationDictionary } from "@/data/translations";

const cardCopy = {
  nl: {
    businessTitle: "Zakelijk",
    businessBody: "Voor bedrijven, locaties, events en beheerders die schoonmaak willen inplannen of structureel willen samenwerken.",
    businessCta: "Naar zakelijke aanvraag",
    privateTitle: "Particulier",
    privateBody: "Voor particulieren die een woning, oplevering of grondige schoonmaak willen laten uitvoeren op een locatie.",
    privateCta: "Naar particuliere aanvraag",
  },
  ar: {
    businessTitle: "تجاري",
    businessBody: "للشركات والمواقع والفعاليات والإدارة التي تريد تخطيط التنظيف أو بدء تعاون ثابت.",
    businessCta: "إلى الطلب التجاري",
    privateTitle: "خاص",
    privateBody: "للأفراد الذين يريدون تنظيف منزل أو تسليم أو تنظيف عميق في موقع معين.",
    privateCta: "إلى الطلب الخاص",
  },
} as const;

export function ContactCtaSection({ copy, language }: { copy: TranslationDictionary["contactSection"]; language: Language }) {
  const labels = cardCopy[language];
  return (
    <section className="fresh-shell relative z-10 pb-24 pt-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">{copy.kicker}</p>
        <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] text-fresh-ink md:text-6xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[hsl(var(--muted))]">
          {copy.body}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        <Link
          href="/contact?route=business"
          className="premium-panel group rounded-[2rem] p-6 transition hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">
                {copy.kicker}
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-fresh-ink md:text-4xl">
                {labels.businessTitle}
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[hsl(var(--muted))]">
                {labels.businessBody}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fresh-ink text-white shadow-fresh transition group-hover:bg-fresh-blue">
              <Building2 size={22} />
            </span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-fresh-ink px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-fresh-blue">
            {labels.businessCta} <ArrowUpRight size={18} />
          </div>
        </Link>

        <Link
          href="/contact?route=private"
          className="premium-panel group rounded-[2rem] p-6 transition hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">
                {copy.kicker}
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-fresh-ink md:text-4xl">
                {labels.privateTitle}
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[hsl(var(--muted))]">
                {labels.privateBody}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fresh-cloud text-fresh-blue shadow-[0_18px_40px_-30px_rgba(21,86,112,0.25)] transition group-hover:bg-fresh-mint group-hover:text-fresh-ink">
              <House size={22} />
            </span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-fresh-blue/20 bg-white px-5 py-3 text-sm font-semibold text-fresh-ink transition group-hover:border-fresh-ink/20">
            {labels.privateCta} <ArrowUpRight size={18} />
          </div>
        </Link>
      </div>
    </section>
  );
}
