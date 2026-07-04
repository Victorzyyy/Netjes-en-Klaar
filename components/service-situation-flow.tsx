"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import type { TranslationDictionary } from "@/data/translations";

export function ServiceSituationFlow({ copy }: { copy: TranslationDictionary["servicesSection"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = copy.items[activeIndex];

  return (
    <div className="grid gap-5">
      <div className="space-y-3 rounded-[2.1rem] bg-white/62 p-3 shadow-[0_22px_60px_-48px_rgba(21,86,112,0.18)] backdrop-blur-[8px] md:p-4">
        <p className="directional-text text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/72">{copy.pickerTitle}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {copy.items.map((situation, index) => {
            const selected = index === activeIndex;

            return (
              <button
                key={situation.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={
                  "group flex min-w-0 items-center justify-start rounded-[1.1rem] border px-3 py-3 text-left transition md:px-4 md:py-3.5 " +
                  (selected
                    ? "border-fresh-blue/34 bg-fresh-ink text-white shadow-[0_18px_36px_rgba(14,31,41,0.16)]"
                    : "border-fresh-blue/10 bg-white/84 text-fresh-ink/86 hover:border-fresh-blue/20 hover:bg-white")
                }
              >
                <span className={"block text-[0.82rem] font-semibold leading-5 md:text-sm " + (selected ? "text-white" : "text-fresh-ink")}>
                  {situation.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.article
        key={active.service}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[2.25rem] border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,251,252,0.88))] p-6 shadow-[0_34px_96px_-60px_rgba(21,86,112,0.3)] ring-1 ring-fresh-blue/8 backdrop-blur-[10px] md:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-fresh-blue/18 bg-fresh-cloud/55 px-4 py-2 text-sm font-semibold text-fresh-ink">
              {active.label}
            </div>
            <h3 className="text-4xl font-bold tracking-[-0.045em] text-fresh-ink md:text-5xl">{active.service}</h3>
            <p className="mt-4 text-lg leading-8 text-fresh-ink/78">{active.summary}</p>
          </div>
          <a href="/contact" className="inline-flex shrink-0 rounded-full bg-fresh-ink px-5 py-3 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue">
            {copy.requestCta}
          </a>
        </div>

        {active.service === "Industriele schoonmaak" || active.service === "تنظيف صناعي" ? (
          <div className="mt-4">
            <a
              href="/diensten/industriele-schoonmaak"
              className="inline-flex items-center justify-center rounded-full border border-fresh-blue/20 bg-white px-5 py-3 text-sm font-semibold text-fresh-ink shadow-fresh transition hover:-translate-y-0.5 hover:border-fresh-ink/20"
            >
              {active.service === "Industriele schoonmaak" ? "Meer over industriele schoonmaak" : "المزيد عن التنظيف الصناعي"}
            </a>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.6rem] border border-fresh-blue/14 bg-white/94 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.idealFor}</p>
            <p className="mt-3 leading-7 text-fresh-ink/92">{active.bestFor}</p>
          </div>
          <div className="rounded-[1.6rem] border border-fresh-blue/14 bg-white/94 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.planning}</p>
            <p className="mt-3 leading-7 text-fresh-ink/92">{active.planning}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-fresh-blue/14 pt-5">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.checklistTitle}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {active.checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-fresh-blue/10 bg-white/92 p-3 text-sm font-semibold text-fresh-ink shadow-[0_10px_30px_-24px_rgba(21,86,112,0.22)]">
                <CheckCircle2 className="shrink-0 text-fresh-blue" size={18} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
