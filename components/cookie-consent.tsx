"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

import type { Language } from "@/data/translations";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const consentStorageKey = "netjes-en-klaar-cookie-consent";
const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";
const consentCookieName = "nk_cookie_consent";

type ConsentState = {
  analytics: boolean;
  updatedAt: string;
};

const content = {
  nl: {
    title: "Cookies en analytics",
    body: "We gebruiken functionele cookies om de website goed te laten werken. Met analytics kunnen we meten wat beter kan, maar dat zetten we alleen aan als je akkoord geeft.",
    accept: "Alles accepteren",
    reject: "Alleen noodzakelijk",
    manage: "Instellingen",
    save: "Opslaan",
    reopen: "Cookie-instellingen",
    policy: "Privacy- en cookiebeleid",
    analyticsLabel: "Analytics toestaan",
    analyticsHelp: "Hiermee kunnen we anoniemer meten hoe de website gebruikt wordt, bijvoorbeeld via Google Analytics.",
  },
  ar: {
    title: "الكوكيز والتحليلات",
    body: "نستخدم كوكيز أساسية ليعمل الموقع بشكل جيد. أما التحليلات فنفعلها فقط إذا وافقت، حتى نعرف ما الذي يمكن تحسينه.",
    accept: "قبول الكل",
    reject: "الضروري فقط",
    manage: "الإعدادات",
    save: "حفظ",
    reopen: "إعدادات الكوكيز",
    policy: "سياسة الخصوصية والكوكيز",
    analyticsLabel: "السماح بالتحليلات",
    analyticsHelp: "يساعدنا هذا على قياس استخدام الموقع بشكل أكثر خصوصية، مثلاً عبر Google Analytics.",
  },
} as const;

function persistConsent(consent: ConsentState) {
  window.localStorage.setItem(consentStorageKey, JSON.stringify(consent));
  const expires = new Date();
  expires.setDate(expires.getDate() + 180);
  document.cookie = `${consentCookieName}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function updateGoogleConsent(analytics: boolean) {
  if (!window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function CookieConsent() {
  const [language, setLanguage] = useState<Language>("nl");
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const labels = content[language];

  useEffect(() => {
    const syncLanguage = (nextLanguage: string | null) => {
      if (nextLanguage === "nl" || nextLanguage === "ar") {
        setLanguage(nextLanguage);
      }
    };

    syncLanguage(window.localStorage.getItem(languageStorageKey));

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      syncLanguage(customEvent.detail);
    };

    window.addEventListener(languageChangeEvent, handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener(languageChangeEvent, handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(consentStorageKey);

    if (!stored) {
      setShowBanner(true);
      setShowPanel(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as ConsentState;
      setAnalytics(parsed.analytics);
      updateGoogleConsent(parsed.analytics);
    } catch {
      setShowBanner(true);
      setShowPanel(true);
    }
  }, []);

  function acceptAll() {
    const consent = { analytics: true, updatedAt: new Date().toISOString() };
    setAnalytics(true);
    persistConsent(consent);
    updateGoogleConsent(true);
    setShowBanner(false);
    setShowPanel(false);
  }

  function rejectOptional() {
    const consent = { analytics: false, updatedAt: new Date().toISOString() };
    setAnalytics(false);
    persistConsent(consent);
    updateGoogleConsent(false);
    setShowBanner(false);
    setShowPanel(false);
  }

  function saveSettings() {
    const consent = { analytics, updatedAt: new Date().toISOString() };
    persistConsent(consent);
    updateGoogleConsent(analytics);
    setShowBanner(false);
    setShowPanel(false);
  }

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-[1.75rem] border border-white/75 bg-white/92 p-4 shadow-[0_28px_90px_-40px_rgba(21,86,112,0.35)] backdrop-blur-md sm:bottom-5 sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fresh-ink text-white">
                <Cookie size={20} />
              </span>
              <div>
                <p className="text-lg font-bold tracking-[-0.03em] text-fresh-ink">{labels.title}</p>
                <p className="mt-2 leading-7 text-[hsl(var(--muted))]">{labels.body}</p>
              </div>
            </div>

            {showPanel ? (
              <div className="rounded-[1.35rem] border border-fresh-blue/14 bg-fresh-cloud/40 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1 size-4 accent-fresh-blue"
                  />
                  <span>
                    <span className="block font-semibold text-fresh-ink">{labels.analyticsLabel}</span>
                    <span className="mt-1 block text-sm leading-6 text-[hsl(var(--muted))]">{labels.analyticsHelp}</span>
                  </span>
                </label>
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button onClick={acceptAll} type="button" className="rounded-full bg-fresh-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-fresh-blue">
                {labels.accept}
              </button>
              <button onClick={rejectOptional} type="button" className="rounded-full border border-fresh-blue/18 bg-white px-5 py-3 text-sm font-semibold text-fresh-ink transition hover:border-fresh-ink/20">
                {labels.reject}
              </button>
              <button onClick={() => setShowPanel((current) => !current)} type="button" className="rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-fresh-ink/72 transition hover:bg-fresh-cloud/55 hover:text-fresh-ink">
                {showPanel ? labels.save : labels.manage}
              </button>
              {showPanel ? (
                <button onClick={saveSettings} type="button" className="rounded-full border border-fresh-blue/18 bg-fresh-cloud/55 px-5 py-3 text-sm font-semibold text-fresh-ink transition hover:bg-fresh-mint">
                  {labels.save}
                </button>
              ) : null}
            </div>

            <div>
              <Link href="/privacy" className="text-sm font-semibold text-fresh-blue transition hover:text-fresh-ink">
                {labels.policy}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setShowBanner(true);
            setShowPanel(true);
          }}
          className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2.5 text-sm font-semibold text-fresh-ink shadow-[0_18px_40px_-28px_rgba(21,86,112,0.28)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white"
        >
          <Cookie size={16} />
          {labels.reopen}
        </button>
      )}
    </>
  );
}
