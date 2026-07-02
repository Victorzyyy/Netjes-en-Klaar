"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import type { TranslationDictionary } from "@/data/translations";

const bubbles = [
  { id: 1, left: 7, top: 14, size: 22, delay: 0, drift: 8 },
  { id: 2, left: 18, top: 28, size: 38, delay: 0.18, drift: 12 },
  { id: 3, left: 31, top: 12, size: 24, delay: 0.35, drift: 9 },
  { id: 4, left: 46, top: 34, size: 56, delay: 0.1, drift: 13 },
  { id: 5, left: 62, top: 18, size: 30, delay: 0.28, drift: 10 },
  { id: 6, left: 81, top: 31, size: 44, delay: 0.48, drift: 11 },
  { id: 7, left: 12, top: 58, size: 32, delay: 0.55, drift: 10 },
  { id: 8, left: 27, top: 72, size: 62, delay: 0.2, drift: 14 },
  { id: 9, left: 42, top: 55, size: 24, delay: 0.68, drift: 8 },
  { id: 10, left: 58, top: 78, size: 38, delay: 0.42, drift: 12 },
  { id: 11, left: 74, top: 61, size: 48, delay: 0.12, drift: 13 },
  { id: 12, left: 91, top: 76, size: 28, delay: 0.32, drift: 9 },
  { id: 13, left: 7, top: 83, size: 54, delay: 0.6, drift: 15 },
  { id: 14, left: 22, top: 8, size: 34, delay: 0.76, drift: 10 },
  { id: 15, left: 38, top: 88, size: 30, delay: 0.24, drift: 9 },
  { id: 16, left: 53, top: 7, size: 64, delay: 0.5, drift: 14 },
  { id: 17, left: 69, top: 42, size: 22, delay: 0.82, drift: 8 },
  { id: 18, left: 86, top: 10, size: 66, delay: 0.15, drift: 16 },
];

const heroCornerBubbles = [
  { id: "corner-1", right: "1%", top: "7%", size: 136, delay: 0 },
  { id: "corner-2", right: "17%", top: "20%", size: 88, delay: 0.3 },
  { id: "corner-3", right: "7%", top: "41%", size: 68, delay: 0.6 },
  { id: "corner-4", right: "28%", top: "5%", size: 58, delay: 0.18 },
];


export function HeroSection({ copy }: { copy: TranslationDictionary["hero"] }) {
  const [poppedHeroBubbles, setPoppedHeroBubbles] = useState<Array<number | string>>([]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 18 });
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const bubbleX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const bubbleY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const cornerBubbleX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const cornerBubbleY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

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
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div style={{ x: orbX, y: orbY }} className="absolute right-[-10rem] top-[-7rem] -z-10 size-[34rem] rounded-full bg-fresh-aqua/16 blur-3xl" />
      <motion.div style={{ x: bubbleX, y: bubbleY }} className="absolute bottom-[-12rem] left-[-8rem] -z-10 size-[32rem] rounded-full bg-fresh-mint/42 blur-3xl" />

      <motion.div style={{ x: cornerBubbleX, y: cornerBubbleY }} className="pointer-events-none absolute inset-0 overflow-hidden opacity-90">
        {heroCornerBubbles.map((bubble) => {
          const isPopped = poppedHeroBubbles.includes(bubble.id);

          return (
            <motion.button
              key={bubble.id}
              type="button"
              tabIndex={-1}
              aria-label={copy.popBubbleLabel}
              onClick={() => popHeroBubble(bubble.id)}
              className="pointer-events-auto absolute rounded-full border border-white/72 bg-white/42 shadow-[inset_0_2px_20px_rgba(255,255,255,0.88),0_28px_94px_rgba(64,190,210,0.22)] backdrop-blur-[2px]"
              style={{ right: bubble.right, top: bubble.top, width: bubble.size, height: bubble.size }}
              animate={
                isPopped
                  ? { scale: [1, 1.26, 0], opacity: [0.52, 0.88, 0] }
                  : { y: [0, -13, 0], x: [0, 6, 0], opacity: [0.3, 0.48, 0.3], scale: [1, 1.03, 1] }
              }
              transition={
                isPopped
                  ? { duration: 0.3, ease: "easeOut" }
                  : { duration: 11.5, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
              }
              whileHover={isPopped ? undefined : { scale: 1.04, opacity: 0.62 }}
              whileTap={{ scale: 0.88 }}
            >
              <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/65 blur-[1px]" />
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div style={{ x: bubbleX, y: bubbleY }} className="pointer-events-none absolute inset-0 overflow-hidden opacity-95">
        {bubbles.map((bubble) => {
          const isPopped = poppedHeroBubbles.includes(bubble.id);

          return (
            <motion.button
              key={bubble.id}
              type="button"
              tabIndex={-1}
              aria-label={copy.popBubbleLabel}
              onClick={() => popHeroBubble(bubble.id)}
              className="pointer-events-auto absolute rounded-full border border-white/78 bg-white/58 shadow-[inset_0_1px_12px_rgba(255,255,255,0.72),0_20px_62px_rgba(64,190,210,0.17)] backdrop-blur-sm"
              style={{ left: bubble.left + "%", top: bubble.top + "%", width: bubble.size, height: bubble.size }}
              animate={
                isPopped
                  ? { scale: [1, 1.28, 0], opacity: [0.6, 0.94, 0], rotate: [0, 8, -10] }
                  : { y: [0, -bubble.drift, 0], opacity: [0.22, 0.52, 0.22], scale: [1, 1.04, 1] }
              }
              transition={
                isPopped
                  ? { duration: 0.28, ease: "easeOut" }
                  : { duration: 5.2 + (bubble.id % 6), delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
              }
              whileHover={isPopped ? undefined : { scale: 1.06, opacity: 0.68 }}
              whileTap={{ scale: 0.86 }}
            >
              <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/70 blur-[1px]" />
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mx-auto grid min-h-[calc(78svh-4rem)] max-w-[76rem] place-items-center text-center sm:min-h-[calc(82svh-4rem)] md:min-h-[calc(84svh-4rem)] lg:min-h-[calc(86svh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-3xl space-y-7 px-1 sm:px-0"
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
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="340 1080"
                filter="url(#heroCoolingGlow)"
                animate={{ strokeDashoffset: [0, -1340] }}
                transition={{ duration: 10.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeDasharray="150 1270"
                animate={{ strokeDashoffset: [0, -1420] }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                r="7"
                fill="url(#heroCoolingDot)"
                filter="url(#heroCoolingGlow)"
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 8.8, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: 'path("M150 444 C122 164 392 50 710 82 C1054 118 1260 300 1142 560 C1044 776 708 822 390 730 C142 658 54 518 150 444 Z")' }}
              />
            </svg>
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] text-fresh-ink sm:text-6xl lg:text-7xl xl:text-8xl">{copy.title}</h1>
            <p className="mx-auto max-w-2xl text-xl font-semibold leading-8 tracking-[-0.02em] text-fresh-ink md:text-3xl md:leading-[1.15]">{copy.subtitle}</p>
            <p className="mx-auto max-w-xl text-base leading-8 text-[hsl(var(--muted))] md:text-lg">{copy.body}</p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#planning" className="group inline-flex items-center justify-center gap-2 rounded-full bg-fresh-ink px-6 py-3.5 text-sm font-semibold text-white shadow-fresh transition hover:-translate-y-0.5 hover:bg-fresh-blue md:px-7 md:py-4 md:text-base">
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
