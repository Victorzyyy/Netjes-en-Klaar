"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const vcaOptions = ["Geen VCA", "VCA Basis", "VCA VOL"] as const;
const languageOptions = ["Nederlands", "Engels", "Arabisch", "Pools", "Turks", "Roemeens", "Anders"] as const;
const availabilityOptions = ["Direct beschikbaar", "Binnen 2 weken", "Binnen 1 maand", "In overleg"] as const;

export function JobApplicationForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

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
        throw new Error(data.message || "Versturen lukt nu even niet.");
      }

      form.reset();
      setSubmitState({ status: "success", message: data.message || "Je sollicitatie is goed ontvangen." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Versturen lukt nu even niet.";
      setSubmitState({ status: "error", message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="fresh-card grid gap-6 rounded-[2rem] p-5 md:p-7" encType="multipart/form-data">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Naam
          <input name="name" required placeholder="Voor- en achternaam" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Telefoon of e-mail
          <input name="contact" required placeholder="Hoe bereiken we je het snelst?" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Woonplaats
          <input name="city" required placeholder="Je woonplaats" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Beschikbaarheid
          <select name="availability" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            {availabilityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Heb je ervaring?
          <input name="experience" placeholder="Bijvoorbeeld: kantoren, vakantieparken, industrie, oplevering" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Heb je een rijbewijs?
          <select name="drivingLicense" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            <option>Ja</option>
            <option>Nee</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Heb je een auto?
          <select name="hasCar" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            <option>Ja</option>
            <option>Nee</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          VCA
          <select name="vca" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
            {vcaOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-semibold text-fresh-ink">Welke talen spreek je?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {languageOptions.map((language) => (
            <label key={language} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/38 px-4 py-3 transition hover:border-fresh-aqua/45 hover:bg-white/60">
              <input type="checkbox" name="languages" value={language} className="size-4 accent-fresh-blue" />
              <span className="font-semibold text-fresh-ink/85">{language}</span>
            </label>
          ))}
        </div>
        <input name="languageLevels" placeholder="Schrijf erbij welk niveau je hebt, bijvoorbeeld: Nederlands goed, Engels basis, Arabisch vloeiend" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          Open sollicitatie of voor een specifieke rol?
          <input name="roleInterest" placeholder="Bijvoorbeeld: open sollicitatie, voorman, schoonmaakmedewerker" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
          CV uploaden
          <input name="cv" type="file" accept=".pdf,.doc,.docx" className="rounded-2xl border border-dashed border-fresh-blue/28 bg-white/55 px-4 py-3 text-sm text-fresh-ink file:mr-4 file:rounded-full file:border-0 file:bg-fresh-ink file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-fresh-blue" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
        Korte sollicitatiebrief
        <textarea name="message" rows={6} placeholder="Schrijf kort wie je bent, wat voor ervaring je hebt, waarom je bij ons wilt werken en wanneer je beschikbaar bent." className="resize-none rounded-[1.4rem] border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base leading-7 outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
      </label>

      <div className="rounded-[1.6rem] border border-fresh-blue/14 bg-white/58 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/58">Checklist</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {["Ervaring in schoonmaak of facilitair werk", "Woonplaats en bereikbaarheid", "Rijbewijs en auto als je die hebt", "VCA status als die er is", "Talen en niveau", "CV of korte sollicitatiebrief"].map((item) => (
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
          {submitState.status === "submitting" ? "Bezig met versturen" : "Stuur je sollicitatie"} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
        </button>
      </div>
    </form>
  );
}
