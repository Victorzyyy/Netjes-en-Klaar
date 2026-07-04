"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

const initialBubbles: Bubble[] = [
  { id: 1, left: "80%", top: "44rem", size: 142, delay: 0, duration: 24 },
  { id: 2, left: "8%", top: "104rem", size: 118, delay: 1.2, duration: 25 },
  { id: 3, left: "74%", top: "168rem", size: 150, delay: 2.4, duration: 26 },
  { id: 4, left: "14%", top: "232rem", size: 128, delay: 0.8, duration: 24 },
];

const respawnBubbles: Record<number, Bubble> = {
  1: { id: 1, left: "12%", top: "58rem", size: 128, delay: 0.6, duration: 25 },
  2: { id: 2, left: "78%", top: "118rem", size: 146, delay: 1.5, duration: 26 },
  3: { id: 3, left: "10%", top: "184rem", size: 120, delay: 2.1, duration: 24 },
  4: { id: 4, left: "72%", top: "248rem", size: 154, delay: 1, duration: 25 },
};

function nextBubble(id: number): Bubble {
  return respawnBubbles[id] || initialBubbles.find((bubble) => bubble.id === id) || initialBubbles[0];
}

export function PoppableSiteBubbles() {
  const [bubbles, setBubbles] = useState(initialBubbles);
  const [popped, setPopped] = useState<number[]>([]);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = isCoarsePointer || prefersReducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsCoarsePointer(media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  function popBubble(id: number) {
    setPopped((current) => (current.includes(id) ? current : [...current, id]));

    window.setTimeout(() => {
      setBubbles((current) => current.map((bubble) => (bubble.id === id ? nextBubble(id) : bubble)));
      setPopped((current) => current.filter((item) => item !== id));
    }, 900);
  }

  return (
    <div aria-hidden="true" className={"pointer-events-none absolute inset-0 z-[12] overflow-hidden " + (shouldReduce ? "opacity-78 max-sm:opacity-74" : "opacity-100 max-sm:opacity-90")}>
      {bubbles.slice(0, shouldReduce ? 1 : bubbles.length).map((bubble) => {
        const isPopped = popped.includes(bubble.id);

        return (
          <motion.button
            key={bubble.id}
            type="button"
            tabIndex={-1}
            onClick={() => popBubble(bubble.id)}
            className="pointer-events-auto absolute rounded-full border border-white/76 bg-white/38 shadow-[inset_0_2px_18px_rgba(255,255,255,0.82),0_22px_68px_rgba(64,190,210,0.18)] backdrop-blur-0 md:backdrop-blur-[1px] transition hover:border-white/92 max-sm:scale-[0.76]"
            style={{ left: bubble.left, top: bubble.top, width: bubble.size, height: bubble.size }}
            animate={
              isPopped
                ? { scale: [1, 1.18, 0], opacity: [0.44, 0.82, 0], rotate: [0, 6, -8] }
                : shouldReduce
                  ? { y: [0, -2.5, 0], opacity: [0.42, 0.54, 0.42], scale: [1, 1.004, 1] }
                  : { y: [0, -5, 0], opacity: [0.58, 0.82, 0.58], scale: [1, 1.01, 1] }
            }
            transition={
              isPopped
                ? { duration: 0.42, ease: "easeOut" }
                : { duration: shouldReduce ? bubble.duration + 10 : bubble.duration, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }
            }
            whileTap={{ scale: 0.86 }}
          >
            <span className="absolute left-[18%] top-[16%] size-[20%] rounded-full bg-white/78 blur-[1px]" />
          </motion.button>
        );
      })}
    </div>
  );
}
