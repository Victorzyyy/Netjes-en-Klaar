"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { TranslationDictionary } from "@/data/translations";

const bubbles = [
  { id: 1, left: 8, top: 20, size: 58, delay: 0, drift: 5 },
  { id: 2, left: 20, top: 70, size: 82, delay: 0.5, drift: 6 },
  { id: 3, left: 39, top: 30, size: 68, delay: 1.1, drift: 5 },
  { id: 4, left: 58, top: 76, size: 64, delay: 0.8, drift: 5 },
  { id: 5, left: 74, top: 46, size: 88, delay: 1.4, drift: 6 },
  { id: 6, left: 90, top: 70, size: 66, delay: 0.3, drift: 5 },
];

const heroCornerBubbles = [
  { id: "corner-1", right: "3%", top: "10%", size: 142, delay: 0 },
];


export function HeroSection({ copy }: { copy: TranslationDictionary["hero"] }) {
  const [poppedHeroBubbles, setPoppedHeroBubbles] = useState<Array<number | string>>([]);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceHeroMotion = isCoarsePointer || prefersReducedMotion;
  const visibleHeroBubbles = reduceHeroMotion ? bubbles.filter((bubble) => [2, 5].includes(bubble.id)) : bubbles;
  const visibleCornerBubbles = reduceHeroMotion ? [] : heroCornerBubbles;

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsCoarsePointer(media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  function popHeroBubble(id: number | string) {
    setPoppedHeroBubbles((current) => (current.includes(id) ? current : [...current, id]));
    window.setTimeout(() => {
      setPoppedHeroBubbles((current) => current.filter((item) => item !== id));
    }, 900);
  }

  return (
    <section
      id="top"
      className="relative min-h-[78svh] overflow-hidden px-4 py-8 sm:min-h-[82svh] sm:px-6 md:min-h-[84svh] lg:min-h-[86svh] lg:px-10"
    >
      <div className="absolute right-[-10rem] top-[-7rem] -z-10 size-[34rem] rounded-full bg-fresh-aqua/16 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-[-8rem] -z-10 size-[32rem] rounded-full bg-fresh-mint/42 blur-3xl" />

      <div className={"pointer-events-none absolute inset-0 overflow-hidden " + (reduceHeroMotion ? "opacity-78" : "opacity-90")}>
        {visibleCornerBubbles.map((bubble) => {
          const isPopped = poppedHeroBubbles.includes(bubble.id);

          return (
            <motion.button
              key={bubble.id}
              type="button"
              tabIndex={-1}
              aria-label={copy.popBubbleLabel}
              onClick={() => popHeroBubble(bubble.id)}
              className="pointer-events-auto absolute rounded-full border border-white/88 bg-white/54 shadow-[inset_0_2px_18px_rgba(255,255,255,0.9),0_22px_76px_rgba(64,190,210,0.22)] backdrop-blur-0 md:backdrop-blur-[2px]"
              style={{ right: bubble.right, top: bubble.top, width: bubble.size, height: bubble.size }}
              animate={
                isPopped
                  ? { scale: [1, 1.26, 0], opacity: [0.52, 0.88, 0] }
                  : reduceHeroMotion
                    ? { y: [0, -4, 0], opacity: [0.48, 0.66, 0.48], scale: [1, 1.01, 1] }
                    : { y: [0, -6, 0], opacity: [0.5, 0.72, 0.5], scale: [1, 1.015, 1] }
              }
              transition={
                isPopped
                  ? { duration: 0.3, ease: "easeOut" }
                  : { duration: reduceHeroMotion ? 18 : 16, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
              }
              whileTap={{ scale: 0.88 }}
            >
              <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/65 blur-[1px]" />
            </motion.button>
          );
        })}
      </div>

      <div className={"pointer-events-none absolute inset-0 overflow-hidden " + (reduceHeroMotion ? "opacity-82" : "opacity-95")}>
        {visibleHeroBubbles.map((bubble) => {
          const isPopped = poppedHeroBubbles.includes(bubble.id);

          return (
            <motion.button
              key={bubble.id}
              type="button"
              tabIndex={-1}
              aria-label={copy.popBubbleLabel}
              onClick={() => popHeroBubble(bubble.id)}
              className="pointer-events-auto absolute rounded-full border border-white/84 bg-white/62 shadow-[inset_0_1px_12px_rgba(255,255,255,0.8),0_18px_54px_rgba(64,190,210,0.2)] backdrop-blur-0 md:backdrop-blur-sm"
              style={{ left: bubble.left + "%", top: bubble.top + "%", width: bubble.size, height: bubble.size }}
              animate={
                isPopped
                  ? { scale: [1, 1.28, 0], opacity: [0.6, 0.94, 0], rotate: [0, 8, -10] }
                  : reduceHeroMotion
                    ? { y: [0, -Math.max(3, bubble.drift - 3), 0], opacity: [0.42, 0.62, 0.42], scale: [1, 1.01, 1] }
                    : { y: [0, -bubble.drift, 0], opacity: [0.48, 0.76, 0.48], scale: [1, 1.015, 1] }
              }
              transition={
                isPopped
                  ? { duration: 0.28, ease: "easeOut" }
                  : { duration: (reduceHeroMotion ? 16 : 13) + (bubble.id % 4), delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
              }
              whileTap={{ scale: 0.86 }}
            >
              <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/70 blur-[1px]" />
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto grid min-h-[calc(78svh-4rem)] max-w-[76rem] place-items-center text-center sm:min-h-[calc(82svh-4rem)] md:min-h-[calc(84svh-4rem)] lg:min-h-[calc(86svh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-4xl space-y-7 px-1 sm:px-0"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 block sm:-inset-x-40 sm:-inset-y-32 md:-inset-x-60 md:-inset-y-40 lg:-inset-x-76 lg:-inset-y-48">
            <svg viewBox="0 0 1320 860" className="h-full w-full overflow-visible opacity-85">
              <defs>
                <linearGradient id="heroCoolingLine" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="18%" stopColor="#7fe9f7" stopOpacity="0.76" />
                  <stop offset="44%" stopColor="#27c7eb" stopOpacity="0.96" />
                  <stop offset="72%" stopColor="#16a985" stopOpacity="0.76" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="heroCoolingGlow" x="-24%" y="-24%" width="148%" height="148%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.26 0 0 0 0 0.78 0 0 0 0 0.88 0 0 0 0.52 0" />
                  <feBlend in="SourceGraphic" mode="screen" />
                </filter>
                <radialGradient id="heroCoolingDot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="55%" stopColor="#b3f6ff" stopOpacity="0.96" />
                  <stop offset="100%" stopColor="#27c7eb" stopOpacity="0.12" />
                </radialGradient>
              </defs>
              <path
                d="M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.34"
                strokeWidth="3"
              />
              <motion.path
                d="M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z"
                fill="none"
                stroke="url(#heroCoolingLine)"
                strokeWidth={reduceHeroMotion ? 4 : 7}
                strokeLinecap="round"
                strokeDasharray="340 1080"
                filter={reduceHeroMotion ? undefined : "url(#heroCoolingGlow)"}
                animate={{ strokeDashoffset: [0, reduceHeroMotion ? -980 : -1340] }}
                transition={{ duration: reduceHeroMotion ? 18 : 10.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth={reduceHeroMotion ? 1.5 : 2.6}
                strokeLinecap="round"
                strokeDasharray="150 1270"
                animate={{ strokeDashoffset: [0, reduceHeroMotion ? -1040 : -1420] }}
                transition={{ duration: reduceHeroMotion ? 20 : 14, repeat: Infinity, ease: "linear" }}
              />
              {reduceHeroMotion ? null : (
                <motion.circle
                  r="7"
                  fill="url(#heroCoolingDot)"
                  filter="url(#heroCoolingGlow)"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 8.8, repeat: Infinity, ease: "linear" }}
                  style={{ offsetPath: 'path("M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z")' }}
                />
              )}
            </svg>
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-fresh-ink sm:text-6xl lg:text-7xl">{copy.title}</h1>
            <p className="mx-auto max-w-3xl text-xl font-semibold leading-8 tracking-[-0.01em] text-fresh-ink md:text-2xl md:leading-[1.25]">{copy.subtitle}</p>
            <p className="mx-auto max-w-xl text-base leading-8 text-[hsl(var(--muted))] md:text-lg">{copy.body}</p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue md:px-7 md:py-4 md:text-base">
              {copy.primaryCta} <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={19} />
            </a>
            <a href="#diensten" className="inline-flex items-center justify-center rounded-full border border-fresh-blue/20 bg-white px-6 py-3.5 text-sm font-semibold text-fresh-ink shadow-fresh backdrop-blur transition hover:-translate-y-0.5 hover:border-fresh-ink/20 md:px-7 md:py-4 md:text-base">
              {copy.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
