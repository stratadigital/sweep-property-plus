import { type Variants } from 'motion/react'

// Custom expo ease-out — fast start, buttery deceleration. Reads as intentional, not generic.
export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Standard viewport trigger for all sections
export const viewport = { once: true, amount: 0.15 } as const
// For tall stagger containers — trigger earlier so items don't appear mid-scroll
export const viewportEarly = { once: true, amount: 0.08 } as const
// For tall single elements (images, panels) — amount-based triggers fire too late on
// elements taller than the viewport threshold; fire once the top is 120px past the fold
export const viewportTall = { once: true, margin: '0px 0px -120px 0px' } as const

// ─── Hero — most dramatic entrance ─────────────────────────────────────────
export const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

// ─── Section headers ────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

// ─── Content blocks (prose, panels) ────────────────────────────────────────
export const fadeUpContent: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

// ─── Two-column slide-ins ───────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
}

// ─── Stagger containers ─────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Stagger items — feature lists, bullet points ──────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

// ─── Service rows — horizontal slide, used inside staggerContainer ──────────
export const rowItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
}

// ─── Cards — rise with subtle scale pop ─────────────────────────────────────
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
}

// ─── Subtle fade — footnotes, secondary elements ────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
}
