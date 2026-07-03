"use client";

import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/site-header";
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

  return <SiteHeader language={language} onLanguageChange={setLanguage} />;
}
