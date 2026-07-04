"use client";

import { businessInfo } from "@/data/site-content";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={businessInfo.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open WhatsApp chat met ${businessInfo.name}`}
      className="fixed bottom-4 right-4 z-[50] inline-flex size-[3.35rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_44px_-18px_rgba(37,211,102,0.58)] ring-1 ring-white/45 transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#20bd5c] sm:bottom-5 sm:right-5 sm:size-[3.65rem]"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="size-7 sm:size-8">
        <path
          fill="currentColor"
          d="M16.01 4.25c-6.45 0-11.69 5.13-11.69 11.45 0 2.16.62 4.26 1.79 6.07L4.25 27.75l6.18-1.8a11.9 11.9 0 0 0 5.58 1.4c6.45 0 11.69-5.13 11.69-11.45S22.46 4.25 16.01 4.25Zm0 20.98c-1.76 0-3.49-.48-4.99-1.38l-.36-.22-3.67 1.07 1.1-3.55-.24-.37a9.18 9.18 0 0 1-1.45-4.91c0-5.14 4.31-9.32 9.61-9.32s9.61 4.18 9.61 9.32-4.31 9.36-9.61 9.36Zm5.26-6.98c-.29-.14-1.7-.82-1.96-.91-.26-.1-.45-.14-.64.14-.19.27-.74.91-.91 1.1-.17.18-.33.2-.62.07-.29-.14-1.21-.44-2.3-1.39-.85-.74-1.43-1.66-1.6-1.94-.17-.27-.02-.42.13-.56.13-.13.29-.33.43-.49.14-.16.19-.27.29-.45.1-.18.05-.34-.02-.48-.07-.14-.64-1.51-.88-2.07-.23-.54-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.34-.26.27-1 1-1 2.42s1.03 2.8 1.17 2.99c.14.18 2.03 3.04 4.93 4.26.69.29 1.23.46 1.65.59.69.21 1.32.18 1.82.11.56-.08 1.7-.68 1.94-1.34.24-.66.24-1.23.17-1.34-.07-.11-.26-.18-.55-.32Z"
        />
      </svg>
    </a>
  );
}
