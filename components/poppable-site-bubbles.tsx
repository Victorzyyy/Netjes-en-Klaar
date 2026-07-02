"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Bubble = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

const initialBubbles: Bubble[] = [
  { id: 1, left: "84%", top: "10rem", size: 138, delay: 0, duration: 16.8 },
  { id: 2, left: "12%", top: "56rem", size: 112, delay: 0.22, duration: 15.6 },
  { id: 3, left: "79%", top: "102rem", size: 144, delay: 0.45, duration: 17.2 },
  { id: 4, left: "14%", top: "152rem", size: 122, delay: 0.12, duration: 16.1 },
  { id: 5, left: "72%", top: "196rem", size: 102, delay: 0.38, duration: 15.1 },
  { id: 6, left: "24%", top: "236rem", size: 132, delay: 0.58, duration: 17.6 },
];

function nextBubble(id: number): Bubble {
  return {
    id,
    left: `${8 + Math.random() * 84}%`,
    top: `${18 + Math.random() * 238}rem`,
    size: 92 + Math.round(Math.random() * 56),
    delay: Math.random() * 0.6,
    duration: 14.8 + Math.random() * 3.6,
  };
}

export function PoppableSiteBubbles() {
  const [bubbles, setBubbles] = useState(initialBubbles);
  const [popped, setPopped] = useState<number[]>([]);

  function popBubble(id: number) {
    setPopped((current) => (current.includes(id) ? current : [...current, id]));

    window.setTimeout(() => {
      setBubbles((current) => current.map((bubble) => (bubble.id === id ? nextBubble(id) : bubble)));
      setPopped((current) => current.filter((item) => item !== id));
    }, 900);
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[12] overflow-hidden opacity-[0.98] max-sm:opacity-75">
      {bubbles.map((bubble) => {
        const isPopped = popped.includes(bubble.id);

        return (
          <motion.button
            key={bubble.id}
            type="button"
            tabIndex={-1}
            onClick={() => popBubble(bubble.id)}
            className="pointer-events-auto absolute rounded-full border border-white/62 bg-white/28 shadow-[inset_0_2px_22px_rgba(255,255,255,0.74),0_28px_88px_rgba(64,190,210,0.16)] backdrop-blur-[1px] transition hover:border-white/85 max-sm:scale-[0.82]"
            style={{ left: bubble.left, top: bubble.top, width: bubble.size, height: bubble.size }}
            animate={
              isPopped
                ? { scale: [1, 1.18, 0], opacity: [0.44, 0.82, 0], rotate: [0, 6, -8] }
                : { y: [0, -10, 0], x: [0, 4, 0], opacity: [0.42, 0.7, 0.42], scale: [1, 1.025, 1] }
            }
            transition={
              isPopped
                ? { duration: 0.42, ease: "easeOut" }
                : { duration: bubble.duration, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={isPopped ? undefined : { scale: 1.03, opacity: 0.86 }}
            whileTap={{ scale: 0.86 }}
          >
            <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/78 blur-[1px]" />
          </motion.button>
        );
      })}
    </div>
  );
}
