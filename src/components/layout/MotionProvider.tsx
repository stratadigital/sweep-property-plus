'use client'

import { MotionConfig } from 'motion/react'

// Framer Motion does not respect prefers-reduced-motion on its own —
// reducedMotion="user" disables transform animations for users who opt out.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
