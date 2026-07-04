"use client";

import { ArrowUpRight, Building2, House, Mail, Phone } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { businessInfo } from "@/data/site-content";
import type { Language } from "@/data/translations";

const languageStorageKey = "netjes-en-klaar-language";
const languageChangeEvent = "netjes-en-klaar-language-change";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const content = {
  nl: {
    kicker: "Contact",
    title: "Kies de route die past bij je aanvraag.",
    body: "Zo houden we de intake helder. Zakelijke aanvragen en particuliere schoonmaak hebben allebei hun eigen vragen en aanpak.",
    cards: {
      business: {
        label: "Zakelijk",
        title: "Bedrijven en locaties",
        body: "Voor bedrijven, vakantieparken, events, bouwopleveringen en andere locaties waar schoonmaak ingepland of opgeschaald moet worden.",
      },
      private: {
        label: "Particulier",
        title: "Woning of prive locatie",
        body: "Voor particulieren die een woning, oplevering of grondige schoonmaak willen laten uitvoeren op een specifieke locatie.",
      },
    },
    directTitle: "Direct contact",
    regionTitle: "Werkgebied",
    regionValue: "Landelijk inzetbaar",
    regionBody: "Voor zakelijke locaties, woningen op aanvraag en schoonmaakwerk in heel Nederland.",
    businessForm: {
      title: "Zakelijke aanvraag",
      name: "Naam",
      namePlaceholder: "Naam of contactpersoon",
      company: "Bedrijf",
      companyPlaceholder: "Bedrijfsnaam of locatie",
      contact: "Telefoon of e-mail",
      contactPlaceholder: "Hoe bereiken we je het snelst?",
      services: "Welke dienst past het best?",
      serviceOptions: ["Kantoorschoonmaak", "Vakantieparken", "Evenementenreiniging", "Bouwschoonmaak", "Industriele schoonmaak", "Dieptereiniging"],
      requestType: "Wat zoek je precies?",
      requestTypeOptions: ["Eenmalige schoonmaak", "Vaste schoonmaak", "Wisselschoonmaak", "Spoed of korte termijn", "We willen even overleggen"],
      location: "Locatie",
      locationPlaceholder: "Plaats, regio of type locatie",
      timing: "Wanneer?",
      timingPlaceholder: "Bijvoorbeeld: volgende week, wisseldagen of vaste dagen",
      contactPreference: "Voorkeur contact",
      contactPreferenceOptions: ["Bel me even", "Mail me eerst", "Allebei is prima"],
      message: "Bericht",
      messagePlaceholder: "Vertel kort om wat voor locatie het gaat, hoeveel ruimtes of units, wat het ritme is en waar we rekening mee moeten houden.",
      submitIdle: "Verstuur zakelijke aanvraag",
      submitBusy: "Bezig met versturen",
      success: "Je zakelijke aanvraag is goed ontvangen. We nemen snel contact op.",
      error: "Versturen lukt nu even niet.",
    },
    privateForm: {
      title: "Particuliere aanvraag",
      name: "Naam",
      namePlaceholder: "Je naam",
      contact: "Telefoon of e-mail",
      contactPlaceholder: "Hoe bereiken we je het snelst?",
      propertyType: "Wat moet er schoongemaakt worden?",
      propertyTypeOptions: ["Woning", "Appartement", "Oplevering", "Dieptereiniging", "Iets anders"],
      location: "Plaats of regio",
      locationPlaceholder: "Waar is de locatie?",
      timing: "Wanneer ongeveer?",
      timingPlaceholder: "Bijvoorbeeld: zo snel mogelijk of volgende maand",
      message: "Bericht",
      messagePlaceholder: "Beschrijf kort de situatie. Bijvoorbeeld: hoeveel ruimtes, of het om oplevering gaat, of het erg vervuild is en wat je precies nodig hebt.",
      submitIdle: "Verstuur particuliere aanvraag",
      submitBusy: "Bezig met versturen",
      success: "Je aanvraag is goed ontvangen. We nemen snel contact op.",
      error: "Versturen lukt nu even niet.",
    },
  },
  ar: {
    kicker: "تواصل",
    title: "اختر المسار المناسب لطلبك.",
    body: "بهذه الطريقة تبقى البداية واضحة. الطلبات التجارية والتنظيف الخاص لكل منهما أسئلته وطريقته الخاصة.",
    cards: {
      business: {
        label: "تجاري",
        title: "شركات ومواقع",
        body: "للشركات ومنتجعات العطلات والفعاليات والتنظيف بعد البناء وغيرها من المواقع التي تحتاج إلى تخطيط أو توسيع خدمة التنظيف.",
      },
      private: {
        label: "خاص",
        title: "منزل أو موقع خاص",
        body: "للأفراد الذين يريدون تنظيف منزل أو تسليم أو تنظيف عميق في موقع محدد.",
      },
    },
    directTitle: "تواصل مباشر",
    regionTitle: "نطاق العمل",
    regionValue: "متاحون في جميع أنحاء هولندا",
    regionBody: "للمواقع التجارية والمنازل عند الطلب وأعمال التنظيف في مختلف أنحاء هولندا.",
    businessForm: {
      title: "طلب تجاري",
      name: "الاسم",
      namePlaceholder: "الاسم أو اسم الشخص المسؤول",
      company: "الشركة",
      companyPlaceholder: "اسم الشركة أو الموقع",
      contact: "الهاتف أو البريد الإلكتروني",
      contactPlaceholder: "كيف نصل إليك بسرعة؟",
      services: "ما الخدمة الأنسب؟",
      serviceOptions: ["تنظيف المكاتب", "منتجعات العطلات", "تنظيف الفعاليات", "تنظيف ما بعد البناء", "تنظيف صناعي", "تنظيف عميق"],
      requestType: "ما الذي تبحث عنه بالضبط؟",
      requestTypeOptions: ["تنظيف مرة واحدة", "تنظيف ثابت", "تنظيف تبديل", "طلب مستعجل أو قريب", "نريد التشاور أولاً"],
      location: "الموقع",
      locationPlaceholder: "المدينة أو المنطقة أو نوع الموقع",
      timing: "متى؟",
      timingPlaceholder: "مثلاً الأسبوع القادم أو أيام التبديل أو أيام ثابتة",
      contactPreference: "طريقة التواصل المفضلة",
      contactPreferenceOptions: ["اتصلوا بي", "ابدأوا بالبريد", "الطريقتان مناسبتان"],
      message: "الرسالة",
      messagePlaceholder: "اشرح باختصار نوع الموقع وعدد المساحات أو الوحدات وما هو الإيقاع المطلوب وأي نقاط يجب أن نأخذها في الاعتبار.",
      submitIdle: "أرسل الطلب التجاري",
      submitBusy: "جاري الإرسال",
      success: "تم استلام طلبك التجاري وسنتواصل معك قريباً.",
      error: "تعذر الإرسال حالياً.",
    },
    privateForm: {
      title: "طلب خاص",
      name: "الاسم",
      namePlaceholder: "اسمك",
      contact: "الهاتف أو البريد الإلكتروني",
      contactPlaceholder: "كيف نصل إليك بسرعة؟",
      propertyType: "ما الذي يجب تنظيفه؟",
      propertyTypeOptions: ["منزل", "شقة", "تسليم", "تنظيف عميق", "شيء آخر"],
      location: "المدينة أو المنطقة",
      locationPlaceholder: "أين تقع المساحة؟",
      timing: "متى تقريباً؟",
      timingPlaceholder: "مثلاً في أقرب وقت أو الشهر القادم",
      message: "الرسالة",
      messagePlaceholder: "اشرح الوضع باختصار. مثلاً عدد الغرف، هل هو تسليم، هل توجد أوساخ شديدة، وما الذي تحتاجه بالضبط.",
      submitIdle: "أرسل الطلب الخاص",
      submitBusy: "جاري الإرسال",
      success: "تم استلام طلبك وسنتواصل معك قريباً.",
      error: "تعذر الإرسال حالياً.",
    },
  },
} as const;

export function ContactPageContent({
  initialAudience = "business",
}: {
  initialAudience?: "business" | "private";
}) {
  const [language, setLanguage] = useState<Language>("nl");
  const [audience, setAudience] = useState<"business" | "private">(initialAudience);
  const [businessState, setBusinessState] = useState<SubmitState>({ status: "idle" });
  const [privateState, setPrivateState] = useState<SubmitState>({ status: "idle" });

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

  useEffect(() => {
    setAudience(initialAudience);
  }, [initialAudience]);

  const copy = content[language];

  function chooseAudience(nextAudience: "business" | "private") {
    setAudience(nextAudience);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("route", nextAudience);
    window.history.replaceState({}, "", nextUrl.toString());
  }

  async function submitForm(
    event: FormEvent<HTMLFormElement>,
    setState: (state: SubmitState) => void,
    successMessage: string,
    errorMessage: string,
  ) {
    event.preventDefault();
    setState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || errorMessage);
      }

      form.reset();
      setState({ status: "success", message: successMessage });
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      setState({ status: "error", message });
    }
  }

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

      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => chooseAudience("business")}
          aria-pressed={audience === "business"}
          className={
            "premium-panel rounded-[2rem] p-6 text-left transition " +
            (audience === "business" ? "ring-2 ring-fresh-blue/30 shadow-[0_28px_88px_-44px_rgba(21,86,112,0.32)]" : "hover:-translate-y-1")
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.cards.business.label}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-fresh-ink">{copy.cards.business.title}</h2>
              <p className="mt-4 leading-7 text-[hsl(var(--muted))]">{copy.cards.business.body}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fresh-ink text-white shadow-fresh">
              <Building2 size={22} />
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => chooseAudience("private")}
          aria-pressed={audience === "private"}
          className={
            "premium-panel rounded-[2rem] p-6 text-left transition " +
            (audience === "private" ? "ring-2 ring-fresh-blue/30 shadow-[0_28px_88px_-44px_rgba(21,86,112,0.32)]" : "hover:-translate-y-1")
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/56">{copy.cards.private.label}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-fresh-ink">{copy.cards.private.title}</h2>
              <p className="mt-4 leading-7 text-[hsl(var(--muted))]">{copy.cards.private.body}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fresh-cloud text-fresh-blue shadow-[0_18px_40px_-30px_rgba(21,86,112,0.25)]">
              <House size={22} />
            </span>
          </div>
        </button>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-[1.9rem] bg-white/44 p-5 shadow-[0_18px_55px_-42px_rgba(21,86,112,0.2)] backdrop-blur-[6px]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/62">{copy.directTitle}</p>
            <div className="mt-4 grid gap-3 text-fresh-ink">
              <a href={businessInfo.phoneHref} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/28 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/45">
                <span className="grid size-10 place-items-center rounded-full bg-fresh-ink text-white transition group-hover:bg-fresh-blue"><Phone size={18} /></span>
                <span className="latin-inline font-semibold">{businessInfo.phoneDisplay}</span>
              </a>
              <a href={`mailto:${businessInfo.email}`} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/28 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/45">
                <span className="grid size-10 place-items-center rounded-full bg-fresh-cloud text-fresh-blue transition group-hover:bg-fresh-mint group-hover:text-fresh-ink"><Mail size={18} /></span>
                <span className="latin-inline font-semibold">{businessInfo.email}</span>
              </a>
            </div>
          </div>

          <div className="rounded-[1.9rem] bg-white/44 p-5 shadow-[0_18px_55px_-42px_rgba(21,86,112,0.2)] backdrop-blur-[6px]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/62">{copy.regionTitle}</p>
            <p className="mt-2 text-lg font-semibold text-fresh-ink">{copy.regionValue}</p>
            <p className="mt-2 leading-7 text-[hsl(var(--muted))]">{copy.regionBody}</p>
          </div>
        </div>

        {audience === "business" ? (
          <form
            onSubmit={(event) =>
              submitForm(event, setBusinessState, copy.businessForm.success, copy.businessForm.error)
            }
            className="fresh-card grid gap-6 rounded-[2rem] p-5 md:p-7"
          >
            <input type="hidden" name="lang" value={language} />
            <input type="hidden" name="audience" value="business" />

            <h3 className="text-3xl font-bold tracking-[-0.04em] text-fresh-ink">{copy.businessForm.title}</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.name}
                <input name="name" required placeholder={copy.businessForm.namePlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.company}
                <input name="company" placeholder={copy.businessForm.companyPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.contact}
                <input name="contact" required placeholder={copy.businessForm.contactPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.location}
                <input name="location" placeholder={copy.businessForm.locationPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
            </div>

            <div className="grid gap-3">
              <p className="text-sm font-semibold text-fresh-ink">{copy.businessForm.services}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {copy.businessForm.serviceOptions.map((service) => (
                  <label key={service} className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/38 px-4 py-3 transition hover:-translate-y-0.5 hover:border-fresh-aqua/45 hover:bg-white/60">
                    <input type="checkbox" name="services" value={service} className="size-4 accent-fresh-blue" />
                    <span className="font-semibold text-fresh-ink/85 transition group-hover:text-fresh-ink">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.requestType}
                <select name="requestType" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
                  {copy.businessForm.requestTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.businessForm.timing}
                <input name="timing" placeholder={copy.businessForm.timingPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.businessForm.contactPreference}
              <select name="contactPreference" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
                {copy.businessForm.contactPreferenceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.businessForm.message}
              <textarea name="message" required rows={6} placeholder={copy.businessForm.messagePlaceholder} className="resize-none rounded-[1.4rem] border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base leading-7 outline-none transition focus:border-fresh-blue focus:bg-white" />
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {businessState.status === "success" ? <p className="text-sm font-semibold text-fresh-leaf">{businessState.message}</p> : null}
                {businessState.status === "error" ? <p className="text-sm font-semibold text-red-700">{businessState.message}</p> : null}
              </div>
              <button type="submit" disabled={businessState.status === "submitting"} className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue disabled:cursor-wait disabled:opacity-70 md:text-base">
                {businessState.status === "submitting" ? copy.businessForm.submitBusy : copy.businessForm.submitIdle} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(event) =>
              submitForm(event, setPrivateState, copy.privateForm.success, copy.privateForm.error)
            }
            className="fresh-card grid gap-6 rounded-[2rem] p-5 md:p-7"
          >
            <input type="hidden" name="lang" value={language} />
            <input type="hidden" name="audience" value="private" />
            <input type="hidden" name="services" value={language === "ar" ? "تنظيف خاص" : "Particulier"} />

            <h3 className="text-3xl font-bold tracking-[-0.04em] text-fresh-ink">{copy.privateForm.title}</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.privateForm.name}
                <input name="name" required placeholder={copy.privateForm.namePlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.privateForm.contact}
                <input name="contact" required placeholder={copy.privateForm.contactPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.privateForm.propertyType}
                <select name="requestType" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
                  {copy.privateForm.propertyTypeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
                {copy.privateForm.location}
                <input name="location" placeholder={copy.privateForm.locationPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.privateForm.timing}
              <input name="timing" placeholder={copy.privateForm.timingPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white" />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.privateForm.message}
              <textarea name="message" required rows={6} placeholder={copy.privateForm.messagePlaceholder} className="resize-none rounded-[1.4rem] border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base leading-7 outline-none transition focus:border-fresh-blue focus:bg-white" />
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {privateState.status === "success" ? <p className="text-sm font-semibold text-fresh-leaf">{privateState.message}</p> : null}
                {privateState.status === "error" ? <p className="text-sm font-semibold text-red-700">{privateState.message}</p> : null}
              </div>
              <button type="submit" disabled={privateState.status === "submitting"} className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue disabled:cursor-wait disabled:opacity-70 md:text-base">
                {privateState.status === "submitting" ? copy.privateForm.submitBusy : copy.privateForm.submitIdle} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
