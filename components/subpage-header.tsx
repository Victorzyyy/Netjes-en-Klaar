"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { businessInfo } from "@/data/site-content";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";

export function SubpageHeader() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "nl" || stored === "ar") {
      setLanguage(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
  }

  return (
    <header className="fresh-shell sticky top-3 z-40 pt-3">
      <div className="fresh-card flex flex-wrap items-center justify-between gap-3 rounded-[2rem] px-4 py-3 md:flex-nowrap md:px-5">
        <Link href="/" className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] text-fresh-ink">
          <span className="grid size-9 place-items-center rounded-full bg-fresh-ink text-white shadow-glow">N</span>
          <span className="hidden sm:inline">Netjes & Klaar</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-fresh-blue/18 bg-white/78 p-1 shadow-[0_16px_40px_-28px_rgba(21,86,112,0.24)]">
            <button
              type="button"
              onClick={() => changeLanguage("nl")}
              className={
                "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
                (language === "nl" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
              }
            >
              NL
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("ar")}
              className={
                "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
                (language === "ar" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
              }
            >
              العربية
            </button>
          </div>

          <a href={businessInfo.phoneHref} className="hidden rounded-full bg-fresh-ink px-4 py-2 text-sm font-black text-white transition hover:bg-fresh-blue sm:inline-flex">
            {language === "ar" ? "اتصل الآن" : "Bel direct"}
          </a>
        </div>
      </div>
    </header>
  );
}
