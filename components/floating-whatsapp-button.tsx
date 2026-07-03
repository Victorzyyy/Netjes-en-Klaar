"use client";

import { MessageCircleMore } from "lucide-react";

import { businessInfo } from "@/data/site-content";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={businessInfo.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open WhatsApp chat met ${businessInfo.name}`}
      className="fixed bottom-4 right-4 z-[50] inline-flex size-[3.35rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_44px_-18px_rgba(37,211,102,0.58)] ring-1 ring-white/35 transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#20bd5c] sm:bottom-5 sm:right-5 sm:size-[3.65rem]"
    >
      <span className="grid size-[2.2rem] place-items-center rounded-full bg-white/14 sm:size-[2.45rem]">
        <MessageCircleMore aria-hidden="true" size={20} strokeWidth={2.25} />
      </span>
    </a>
  );
}
