"use client";

import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

export function SubpageHeader() {
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

  return <SiteHeader language={language} onLanguageChange={setLanguage} />;
}
