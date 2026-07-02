"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import type { TranslationDictionary } from "@/data/translations";

function StepChannel({
  index,
  progress,
  reducedMotion,
  steps,
}: {
  index: number;
  progress: ReturnType<typeof useSpring>;
  reducedMotion: boolean;
  steps: TranslationDictionary["processSection"]["steps"];
}) {
  const start = Math.max(0, index / steps.length - 0.04);
  const focus = (index + 0.5) / steps.length;
  const end = Math.min(1, (index + 1) / steps.length + 0.04);

  const draw = useTransform(progress, [start, end], [0, 1]);
  const active = useTransform(progress, [start, focus, end], [0.28, 1, 0.38]);
  const cardY = useTransform(progress, [start, focus, end], reducedMotion ? [0, 0, 0] : [10, 0, 6]);
  const cardScale = useTransform(progress, [start, focus, end], [0.988, 1, 0.992]);
  const numberScale = useTransform(progress, [start, focus, end], [1, 1.08, 1.02]);
  const numberGlow = useTransform(progress, [start, focus, end], [0.16, 0.38, 0.18]);

  return (
    <li className="relative grid justify-items-center gap-5 py-1 text-center md:gap-6">
      <div className="relative h-[8.5rem] w-full max-w-[44rem] sm:h-[9rem]">
        <svg viewBox="0 0 720 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`channel-base-${index}`} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#1a88ac" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#35b7cf" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#267a5d" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id={`channel-flow-${index}`} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="18%" stopColor="#8de8ef" stopOpacity="0.64" />
              <stop offset="52%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="84%" stopColor="#8ef0d1" stopOpacity="0.64" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
            </linearGradient>
            <filter id={`channel-glow-${index}`} x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feBlend in="SourceGraphic" in2="blur" mode="screen" />
            </filter>
          </defs>

          <path
            d="M30 72 C118 72 132 38 180 38 H252 C308 38 308 112 360 112 C412 112 412 38 468 38 H540 C588 38 604 72 690 72"
            fill="none"
            stroke={`url(#channel-base-${index})`}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M30 72 C118 72 132 38 180 38 H252 C308 38 308 112 360 112 C412 112 412 38 468 38 H540 C588 38 604 72 690 72"
            fill="none"
            stroke="rgba(255,255,255,0.52)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M30 72 C118 72 132 38 180 38 H252 C308 38 308 112 360 112 C412 112 412 38 468 38 H540 C588 38 604 72 690 72"
            fill="none"
            stroke={`url(#channel-flow-${index})`}
            strokeWidth="8"
            strokeLinecap="round"
            filter={`url(#channel-glow-${index})`}
            style={{ pathLength: draw, opacity: active }}
          />
        </svg>

        <motion.div
          style={{ scale: numberScale }}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            style={{ opacity: numberGlow }}
            className="absolute inset-0 rounded-full bg-fresh-aqua blur-2xl"
          />
          <div className="relative grid size-16 place-items-center rounded-full border border-fresh-blue/18 bg-white text-sm font-semibold tracking-[0.18em] text-fresh-blue shadow-[0_18px_45px_rgba(21,86,112,0.12)] sm:size-[4.5rem]">
            {steps[index].number}
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: cardY, scale: cardScale }}
        className="relative w-full max-w-2xl rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(243,250,252,0.84))] px-6 py-6 shadow-[0_28px_80px_-56px_rgba(21,86,112,0.34)] ring-1 ring-fresh-blue/8 backdrop-blur-[6px] sm:px-7 md:px-8"
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-fresh-ink sm:text-[1.9rem]">{steps[index].title}</h3>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[hsl(var(--muted))] sm:text-[1.05rem]">
          {steps[index].text}
        </p>
      </motion.div>
    </li>
  );
}

export function ProcessTimeline({ steps }: { steps: TranslationDictionary["processSection"]["steps"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 68%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 120 : 80,
    damping: reducedMotion ? 28 : 24,
    mass: 0.55,
  });

  const spineOpacity = useTransform(progress, [0, 0.08, 1], [0.18, 0.5, 0.78]);
  const spineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="mx-auto mt-14 max-w-4xl md:mt-16">
      <div className="relative px-3 sm:px-5">
        <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-fresh-blue/10 md:block" />
        <motion.div
          style={{ height: spineHeight, opacity: spineOpacity }}
          className="absolute left-1/2 top-10 hidden w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-fresh-aqua via-fresh-blue to-fresh-leaf shadow-[0_0_22px_rgba(53,183,207,0.18)] md:block"
        />

        <ol className="grid gap-12 md:gap-14">
          {steps.map((step, index) => (
            <StepChannel
              key={step.number}
              index={index}
              progress={progress}
              reducedMotion={reducedMotion}
              steps={steps}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
