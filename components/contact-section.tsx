"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

import { businessInfo } from "@/data/site-content";
import type { Language, TranslationDictionary } from "@/data/translations";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactSection({ copy, language }: { copy: TranslationDictionary["contactSection"]; language: Language }) {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(copy.form.error);
      }

      form.reset();
      setSubmitState({
        status: "success",
        message: copy.form.success,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.form.error;
      setSubmitState({ status: "error", message });
    }
  }

  return (
    <section id="contact" className="fresh-shell relative z-10 pb-24 pt-14">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.045em] text-fresh-ink md:text-6xl">
            {copy.title}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-[hsl(var(--muted))]">
            {copy.body}
          </p>

          <div className="rounded-[1.9rem] bg-white/44 p-4 shadow-[0_18px_55px_-42px_rgba(21,86,112,0.2)] backdrop-blur-[6px]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fresh-ink/62">{copy.regionTitle}</p>
            <p className="mt-2 text-lg font-semibold text-fresh-ink">{copy.regionValue}</p>
            <p className="mt-2 leading-7 text-[hsl(var(--muted))]">{copy.regionBody}</p>
          </div>

          <div className="grid gap-3 pt-2 text-fresh-ink sm:grid-cols-2 lg:grid-cols-1">
            <a href={businessInfo.phoneHref} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/28 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-[0_18px_45px_rgba(21,86,112,0.12)]">
              <span className="grid size-10 place-items-center rounded-full bg-fresh-ink text-white transition group-hover:bg-fresh-blue"><Phone size={18} /></span>
              <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-fresh-ink/55">{copy.callLabel}</span><span className="font-semibold">{businessInfo.phoneDisplay}</span></span>
            </a>
            <a href={`mailto:${businessInfo.email}`} className="group flex items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/28 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-[0_18px_45px_rgba(21,86,112,0.12)]">
              <span className="grid size-10 place-items-center rounded-full bg-fresh-cloud text-fresh-blue transition group-hover:bg-fresh-mint group-hover:text-fresh-ink"><Mail size={18} /></span>
              <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-fresh-ink/55">{copy.mailLabel}</span><span className="font-semibold">{businessInfo.email}</span></span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fresh-card grid gap-6 rounded-[2rem] p-5 md:p-7">
          <input type="hidden" name="lang" value={language} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.name}
              <input name="name" required placeholder={copy.form.namePlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.contact}
              <input name="contact" required placeholder={copy.form.contactPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
            </label>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-fresh-ink">{copy.form.services}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {copy.serviceOptions.map((service) => (
                <label key={service} className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-fresh-blue/20 bg-white/38 px-4 py-3 transition hover:-translate-y-0.5 hover:border-fresh-aqua/45 hover:bg-white/60">
                  <input type="checkbox" name="services" value={service} className="size-4 accent-fresh-blue" />
                  <span className="font-semibold text-fresh-ink/85 transition group-hover:text-fresh-ink">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.requestType}
              <select name="requestType" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
                {copy.requestTypeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.location}
              <input name="location" placeholder={copy.form.locationPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.timing}
              <input name="timing" placeholder={copy.form.timingPlaceholder} className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
              {copy.form.contactPreference}
              <select name="contactPreference" className="rounded-2xl border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base outline-none transition focus:border-fresh-blue focus:bg-white">
                {copy.contactPreferenceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-fresh-ink">
            {copy.form.message}
            <textarea name="message" required rows={6} placeholder={copy.form.messagePlaceholder} className="resize-none rounded-[1.4rem] border border-fresh-blue/20 bg-white/65 px-4 py-3 text-base leading-7 outline-none transition placeholder:text-fresh-ink/35 focus:border-fresh-blue focus:bg-white" />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fresh-ink/68">
                {copy.operationalNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              {submitState.status === "success" ? <p className="text-sm font-semibold text-fresh-leaf">{submitState.message}</p> : null}
              {submitState.status === "error" ? <p className="text-sm font-semibold text-red-700">{submitState.message}</p> : null}
            </div>
            <button type="submit" disabled={submitState.status === "submitting"} className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue disabled:cursor-wait disabled:opacity-70 md:text-base">
              {submitState.status === "submitting" ? copy.form.submitBusy : copy.form.submitIdle} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
