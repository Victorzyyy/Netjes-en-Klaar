"use client";

import { motion, useReducedMotion } from "framer-motion";

const bubbles = [
  { cx: "9%", cy: 64, r: 7, delay: 0 },
  { cx: "17%", cy: 44, r: 3, delay: 0.15 },
  { cx: "27%", cy: 76, r: 5, delay: 0.25 },
  { cx: "41%", cy: 46, r: 8, delay: 0.05 },
  { cx: "53%", cy: 82, r: 4, delay: 0.2 },
  { cx: "68%", cy: 52, r: 6, delay: 0.1 },
  { cx: "82%", cy: 72, r: 3, delay: 0.3 },
  { cx: "93%", cy: 48, r: 7, delay: 0.18 },
];

export function CleanWaveDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative z-10 -mt-8 mb-2 overflow-hidden py-4 sm:-mt-10 md:-mt-12">

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto h-28 w-[118%] -translate-x-[9%] sm:h-36 md:h-44"
      >
        <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="dividerRibbon" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f8fdff" stopOpacity="0.68" />
              <stop offset="45%" stopColor="#bfe7f5" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#c9edd9" stopOpacity="0.64" />
            </linearGradient>
            <linearGradient id="dividerLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#155f7a" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#1a88ac" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#1d7d5a" stopOpacity="0.16" />
            </linearGradient>
            <filter id="dividerGlow" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.36 0 0 0 0 0.78 0 0 0 0 0.86 0 0 0 0.26 0" />
              <feBlend in="SourceGraphic" mode="screen" />
            </filter>
          </defs>

          <motion.path
            d="M-90 116 C90 48 184 168 350 96 C516 24 598 104 708 86 C832 66 912 0 1086 52 C1248 100 1334 132 1530 62 L1530 158 C1328 222 1238 144 1086 126 C902 104 838 184 710 158 C570 130 506 180 356 160 C206 140 84 96 -90 174 Z"
            fill="url(#dividerRibbon)"
            filter="url(#dividerGlow)"
            animate={prefersReducedMotion ? undefined : { x: [-10, 10, -10] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-80 142 C82 194 206 72 358 124 C504 174 578 80 722 118 C862 154 930 224 1092 148 C1254 72 1356 92 1520 130"
            fill="none"
            stroke="url(#dividerLine)"
            strokeWidth="7"
            strokeLinecap="round"
            animate={prefersReducedMotion ? undefined : { x: [8, -8, 8] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-70 103 C104 40 190 145 350 78 C510 12 600 96 710 70 C850 38 914 18 1080 70 C1228 116 1330 122 1510 70"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.72"
            strokeWidth="6"
            strokeLinecap="round"
            animate={prefersReducedMotion ? undefined : { x: [-6, 6, -6] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-50 164 C122 116 202 190 356 148 C520 104 604 162 736 142 C894 118 930 74 1084 114 C1236 154 1330 184 1500 124"
            fill="none"
            stroke="#6cbfd8"
            strokeOpacity="0.36"
            strokeWidth="3"
            strokeLinecap="round"
            animate={prefersReducedMotion ? undefined : { x: [6, -6, 6] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.g animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
            {bubbles.map((bubble) => (
              <motion.circle
                key={bubble.cx + bubble.cy}
                cx={bubble.cx}
                cy={bubble.cy}
                r={bubble.r}
                fill="#ffffff"
                fillOpacity="0.62"
                stroke="#1b7595"
                strokeOpacity="0.18"
                animate={prefersReducedMotion ? undefined : { y: [0, -7, 0], opacity: [0.42, 0.82, 0.42] }}
                transition={{ duration: 4.5, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
