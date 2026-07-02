"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import type { Language } from "@/data/translations";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const languageStorageKey = "netjes-en-klaar-language";

const content = {
  nl: {
    fields: {
      name: "Naam",
      namePlaceholder: "Voor- en achternaam",
      contact: "Telefoon of e-mail",
      contactPlaceholder: "Hoe bereiken we je het snelst?",
      city: "Woonplaats",
      cityPlaceholder: "Je woonplaats",
      availability: "Beschikbaarheid",
      experience: "Heb je ervaring?",
      experiencePlaceholder: "Bijvoorbeeld: kantoren, vakantieparken, industrie, oplevering",
      drivingLicense: "Heb je een rijbewijs?",
      hasCar: "Heb je een auto?",
      vca: "VCA",
      spokenLanguages: "Welke talen spreek je?",
      languageLevelsPlaceholder: "Schrijf erbij welk niveau je hebt, bijvoorbeeld: Nederlands goed, Engels basis, Arabisch vloeiend",
      roleInterest: "Open sollicitatie of voor een specifieke rol?",
      roleInterestPlaceholder: "Bijvoorbeeld: open sollicitatie, voorman, schoonmaakmedewerker",
      cv: "CV uploaden",
      coverLetter: "Korte sollicitatiebrief",
      coverLetterPlaceholder: "Schrijf kort wie je bent, wat voor ervaring je hebt, waarom je bij ons wilt werken en wanneer je beschikbaar bent.",
      checklist: "Checklist",
      submitIdle: "Stuur je sollicitatie",
      submitBusy: "Bezig met versturen",
      success: "Je sollicitatie is goed ontvangen.",
      error: "Versturen lukt nu even niet.",
    },
    vcaOptions: ["Geen VCA", "VCA Basis", "VCA VOL"],
    languageOptions: ["Nederlands", "Engels", "Arabisch", "Pools", "Turks", "Roemeens", "Anders"],
    availabilityOptions: ["Direct beschikbaar", "Binnen 2 weken", "Binnen 1 maand", "In overleg"],
    yes: "Ja",
    no: "Nee",
    checklistItems: [
      "Ervaring in schoonmaak of facilitair werk",
      "Woonplaats en bereikbaarheid",
      "Rijbewijs en auto als je die hebt",
      "VCA status als die er is",
      "Talen en niveau",
      "CV of korte sollicitatiebrief",
    ],
  },
  ar: {
    fields: {
      name: "الاسم",
      namePlaceholder: "الاسم الكامل",
      contact: "الهاتف أو البريد الإلكتروني",
      contactPlaceholder: "كيف نصل إليك بسرعة؟",
      city: "مكان السكن",
      cityPlaceholder: "المدينة التي تسكن فيها",
      availability: "التوفر",
      experience: "هل لديك خبرة؟",
      experiencePlaceholder: "مثلاً: مكاتب، منتجعات، قطاع صناعي، تنظيف بعد البناء",
      drivingLicense: "هل لديك رخصة قيادة؟",
      hasCar: "هل لديك سيارة؟",
      vca: "شهادة VCA",
      spokenLanguages: "ما اللغات التي تتحدثها؟",
      languageLevelsPlaceholder: "اكتب المستوى أيضاً، مثلاً: الهولندية جيد، الإنجليزية أساسي، العربية بطلاقة",
      roleInterest: "طلب مفتوح أم وظيفة محددة؟",
      roleInterestPlaceholder: "مثلاً: طلب مفتوح، مشرف ميداني، عامل نظافة",
      cv: "رفع السيرة الذاتية",
      coverLetter: "رسالة تعريف قصيرة",
      coverLetterPlaceholder: "اكتب باختصار من أنت، وما خبرتك، ولماذا تريد العمل معنا، ومتى تكون متاحاً.",
      checklist: "قائمة التحقق",
      submitIdle: "أرسل طلبك",
      submitBusy: "جاري الإرسال",
      success: "تم استلام طلبك بنجاح.",
      error: "تعذر الإرسال حالياً.",
    },
    vcaOptions: ["بدون VCA", "VCA أساسي", "VCA VOL"],
    languageOptions: ["الهولندية", "الإنجليزية", "العربية", "البولندية", "التركية", "الرومانية", "لغة أخرى"],
    availabilityOptions: ["متاح فوراً", "خلال أسبوعين", "خلال شهر", "بالاتفاق"],
    yes: "نعم",
    no: "لا",
    checklistItems: [
      "خبرة في التنظيف أو العمل الخدمي",
      "مكان السكن وإمكانية الوصول",
      "رخصة قيادة وسيارة إن وجدت",
      "حالة شهادة VCA إن وجدت",
      "اللغات والمستوى",
      "السيرة الذاتية أو رسالة تعريف قصيرة",
    ],
  },
} as const;

export function JobApplicationForm() {
  const [language, setLanguage] = useState<Language>("nl");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const copy = content[language];

  useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "nl" || stored === "ar") {
      setLanguage(stored);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(copy.fields.error);
      }

      form.reset();
      setSubmitState({ status: "success", message: copy.fields.success });
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.fields.error;
      setSubmitState({ status: "error", message });
    }
  }

  return (
    <form dir={language === "ar" ? "rtl" : "ltr"} onSubmit={handleSubmit} className="fresh-card grid gap-6 rounded-[2rem] p-5 md:p-7" encType="multipart/form-data">
      <input type="hidden" name="lang" value={language} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.name}
          <input name="name" required placeholder={copy.fields.namePlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.contact}
          <input name="contact" required placeholder={copy.fields.contactPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.city}
          <input name="city" required placeholder={copy.fields.cityPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.availability}
          <select name="availability" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            {copy.availabilityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.experience}
          <input name="experience" placeholder={copy.fields.experiencePlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.drivingLicense}
          <select name="drivingLicense" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            <option>{copy.yes}</option>
            <option>{copy.no}</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.hasCar}
          <select name="hasCar" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            <option>{copy.yes}</option>
            <option>{copy.no}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.vca}
          <select name="vca" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            {copy.vcaOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-semibold text-fresh-ink">{copy.fields.spokenLanguages}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {copy.languageOptions.map((language) => (
            <label key={language} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/38 px-4 py-3 transition hover:border-fresh-aqua/45 hover:bg-white/60">
              <input type="checkbox" name="languages" value={language} className="size-4 accent-fresh-blue" />
              <span className="font-semibold text-fresh-ink/85">{language}</span>
            </label>
          ))}
        </div>
        <input name="languageLevels" placeholder={copy.fields.languageLevelsPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.roleInterest}
          <input name="roleInterest" placeholder={copy.fields.roleInterestPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          {copy.fields.cv}
          <input name="cv" type="file" accept=".pdf,.doc,.docx" className="rounded-2xl border border-dashed border-fresh-blue/28 bg-white/55 px-4 py-3 text-sm text-fresh-ink file:mr-4 file:rounded-full file:border-0 file:bg-fresh-ink file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-fresh-blue" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
        {copy.fields.coverLetter}
        <textarea name="message" rows={6} placeholder={copy.fields.coverLetterPlaceholder} className="resize-none rounded-[1.4rem] border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base leading-7 outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
      </label>

      <div className="rounded-[1.6rem] border border-fresh-blue/14 bg-white/58 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/58">{copy.fields.checklist}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {copy.checklistItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/78 p-3 text-sm font-medium text-fresh-ink">
              <CheckCircle2 className="shrink-0 text-fresh-blue" size={18} />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          {submitState.status === "success" ? <p className="text-sm font-semibold text-fresh-leaf">{submitState.message}</p> : null}
          {submitState.status === "error" ? <p className="text-sm font-semibold text-red-700">{submitState.message}</p> : null}
        </div>
        <button type="submit" disabled={submitState.status === "submitting"} className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue disabled:cursor-wait disabled:opacity-70 md:text-base">
          {submitState.status === "submitting" ? copy.fields.submitBusy : copy.fields.submitIdle} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
        </button>
      </div>
    </form>
  );
}
