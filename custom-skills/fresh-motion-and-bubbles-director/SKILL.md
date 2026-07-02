---
name: fresh-motion-and-bubbles-director
description: Motion direction for water, bubbles, liquid loops, hover effects, Framer Motion, and playful interaction on modern websites. Use when adding, tuning, or reviewing animations, interactive bubbles, pointer-follow effects, scroll effects, shape dividers, or performance-sensitive motion for desktop and mobile.
---

# Fresh Motion And Bubbles Director

Use this skill to make motion feel premium, fluid, and lightweight.

## Motion Principles
- Motion should feel attracted, floating, flowing, or gently breathing.
- Avoid effects that feel like elements run away from the user unless explicitly requested.
- Prefer slow, smooth, water-like movement over fast micro-jitter.
- Use fewer motion systems at once.
- Keep interactions reversible and non-blocking.

## Bubble Rules
- Spread bubbles manually or with well-spaced deterministic positions.
- Mix large bubbles with small companion bubbles.
- Poppable bubbles should use scale/opacity only. No heavy physics engine unless explicitly needed.
- Respawn popped bubbles away from the exact same position.
- On mobile, reduce size/opacity and avoid covering key CTAs/forms.

## Framer Motion Defaults
- Floating duration: 6-12s.
- Hover lift: 1-4px max for premium UI.
- Tap scale: 0.86-0.95 for poppable items.
- Pointer follow should use springs with moderate damping.
- Respect reduced motion when adding complex loops or scroll-linked movement.

## Cooling / Water Loop Effects
- If a loop surrounds content, it must be visible enough to read as intentional.
- Put decorative loops behind text but allow them to visually pass around/under CTA areas.
- On mobile, keep a mobile-sized loop instead of hiding the effect entirely, unless readability suffers.

## Performance Guardrails
- Prefer transform and opacity.
- Keep DOM bubble count modest: roughly 12-30 active decorative bubbles.
- Do not place a high z-index interactive overlay over forms unless only bubble elements receive pointer events.
