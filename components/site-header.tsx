"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { businessInfo } from "@/data/site-content";
import { Language, translations } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

type SiteHeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  isHome?: boolean;
};

export function SiteHeader({ language, onLanguageChange, isHome = false }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const copy = translations[language];
  const navItems = [
    { label: copy.nav.services, href: isHome ? "#diensten" : "/#diensten" },
    { label: copy.nav.process, href: isHome ? "#werkwijze" : "/#werkwijze" },
    { label: copy.nav.contact, href: isHome ? "#contact" : "/#contact" },
    { label: copy.nav.careers, href: "/werken-bij" },
  ];

  function changeLanguage(nextLanguage: Language) {
    onLanguageChange(nextLanguage);
    setIsMenuOpen(false);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    window.dispatchEvent(new CustomEvent(languageChangeEvent, { detail: nextLanguage }));
    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
  }

  return (
    <header className="fresh-shell sticky top-3 z-40 pt-3">
      <div className="fresh-card flex items-center justify-between gap-3 rounded-[1.75rem] px-4 py-3 sm:px-5 lg:gap-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <a href={isHome ? "#top" : "/"} className="flex min-w-0 items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-fresh-ink">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fresh-ink text-white shadow-glow">N</span>
            <span className="truncate">Netjes & Klaar</span>
          </a>
        </div>

        <nav aria-label="Hoofdnavigatie" className="hidden min-w-0 items-center gap-1 text-sm font-bold text-[hsl(var(--muted))] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 py-2.5 transition hover:bg-white/62 hover:text-fresh-ink"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitch language={language} onChange={changeLanguage} label={copy.nav.switchLabel} />
          <a href={businessInfo.phoneHref} className="rounded-full bg-fresh-ink px-4 py-2.5 text-sm font-black text-white transition hover:bg-fresh-blue">
            {copy.nav.callNow}
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageSwitch language={language} onChange={changeLanguage} label={copy.nav.switchLabel} />
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
            className="grid size-10 place-items-center rounded-full bg-fresh-ink text-white shadow-fresh transition hover:bg-fresh-blue"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div
        className={
          "fixed inset-0 z-40 bg-fresh-ink/14 transition lg:hidden " +
          (isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-menu"
        className={
          "fixed right-3 top-24 z-50 w-[min(22rem,calc(100vw-1.5rem))] rounded-[1.6rem] border border-white/70 bg-white/90 p-3 shadow-[0_28px_90px_-45px_rgba(21,86,112,0.45)] backdrop-blur-md transition lg:hidden " +
          (isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none")
        }
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-fresh-ink/55">Menu</p>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Menu sluiten"
            className="grid size-9 place-items-center rounded-full bg-fresh-cloud text-fresh-ink transition hover:bg-fresh-ink hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Mobiele navigatie" className="grid gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-[1.1rem] px-4 py-3.5 text-base font-bold text-fresh-ink transition hover:bg-fresh-cloud"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={businessInfo.phoneHref}
          onClick={() => setIsMenuOpen(false)}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-5 py-3 text-sm font-black text-white transition hover:bg-fresh-blue"
        >
          <Phone size={17} />
          {copy.nav.callNow}
        </a>
      </aside>
    </header>
  );
}

function LanguageSwitch({
  language,
  onChange,
  label,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-fresh-blue/18 bg-white/78 p-1 shadow-[0_16px_40px_-28px_rgba(21,86,112,0.24)]">
      <span className="sr-only">{label}</span>
      <button
        type="button"
        onClick={() => onChange("nl")}
        className={
          "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
          (language === "nl" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
        }
      >
        NL
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        className={
          "rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 " +
          (language === "ar" ? "bg-fresh-ink text-white shadow-fresh" : "text-fresh-ink/70 hover:bg-white hover:text-fresh-ink")
        }
      >
        العربية
      </button>
    </div>
  );
}
