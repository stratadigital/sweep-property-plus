# Sweep Property Plus — Design System

## Brand

**Client**: Sweep Property Plus — commercial cleaning company, Union, NJ.
**Positioning**: Professional, modern, trustworthy. B2B audience (building managers, facilities directors). Not a consumer brand — no playful or decorative energy.

---

## Colors

Defined as Tailwind v4 CSS variables in `globals.css`. Never use raw hex values in components.

| Token | Hex | Use |
|---|---|---|
| `--color-teal` | `#337068` | Primary — CTAs, section fills, navbar |
| `--color-gold` | `#F2BD71` | Accent — highlight CTAs, badges, motif underlines |
| `--color-teal-dark` | `#1C4A43` | Footer, dark sections |
| `--color-cream` | `#F7F2EA` | Alternate section backgrounds |
| `--color-neutral-dark` | `#1A1A1A` | Body text |
| `--color-neutral-mid` | `#6B7280` | Subtext, captions |

Section background rotation: white → cream → teal → white → cream → teal-dark.

---

## Typography

Single typeface: **Space Grotesk** (variable font, weights 300–700). Chosen over Geist for its distinctive geometric terminal cuts on `a`, `g`, `r` — visible character at large display sizes without feeling loud. Variety comes from weight and scale, not font mixing.

| Role | Weight | Tailwind size |
|---|---|---|
| Hero headline | 700 (`font-bold`) | `text-5xl` → `text-7xl` |
| Section headings | 700 (`font-bold`) | `text-3xl` → `text-4xl` |
| Card titles | 600 (`font-semibold`) | `text-xl` |
| Body | 400 (`font-normal`) | `text-base` |
| Pre-heading labels | 600, uppercase, tracked | `text-xs tracking-widest` |

Max weight is 700 — never use `font-extrabold` (800) or `font-black` (900), they will silently clamp.

### Type scale in full

| Role | Class string | Notes |
|---|---|---|
| Hero headline | `text-5xl font-bold tracking-tight lg:text-7xl` | One per page, always `<h1>` |
| Section heading | `text-3xl font-bold tracking-tight sm:text-4xl` | `<h2>`, one per section |
| Card / sub-heading | `text-xl font-semibold` | `<h3>` |
| Body | `text-base font-normal leading-7` | Default prose |
| Small body / caption | `text-sm font-normal text-neutral-mid` | Supporting copy |
| Pre-heading label | `text-xs font-semibold uppercase tracking-widest text-gold` | Above every section `<h2>` |
| Button | `text-sm font-semibold` | All CTAs |
| Nav link | `text-sm font-semibold` | Navbar items |

### Letter-spacing rules
- Headlines (`text-3xl`+): `tracking-tight` — tightens the default spacing, makes large type feel purposeful
- Pre-heading labels: `tracking-widest` — the contrast with tight headlines creates hierarchy
- Body and UI: default tracking (no class) — Space Grotesk's default spacing is well-calibrated at small sizes

### Line-height rules
- Headlines: default (Tailwind's `leading-tight` is baked into `text-5xl`+)
- Body paragraphs: `leading-7` — slightly open for readability
- UI elements (buttons, nav, labels): default

**Pre-heading label pattern** — used above every section title:
```
COMMERCIAL CLEANING SERVICES   ← gold, uppercase, wide tracking
Your space, in our care.        ← large, bold, dark teal
```
This is the primary typographic signature of the site.

---

## Spacing

- Section vertical padding: `py-20` mobile / `py-28` desktop
- Container: `max-w-6xl mx-auto px-6`
- Generous whitespace is intentional — it signals premium quality

---

## Signature Motif: Diagonal Slice

A diagonal wedge at the bottom of each section transitions into the next. Rises left-to-right (forward motion). This is the visual thread that runs through the page — the one element that makes it feel designed rather than generated.

**Implementation** — inline SVG, absolutely positioned at section bottom. Never use `clip-path` on sections (clips content). Never use a plain div with clip-path (sub-pixel rendering issues cross-browser).

```tsx
{/* Section must have: relative, pb-32 lg:pb-40 to clear the wedge */}
<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
  <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-20 w-full fill-[NEXT_SECTION_COLOR]">
    <polygon points="0,80 1440,0 1440,80" />
  </svg>
</div>
```

Replace `fill-[NEXT_SECTION_COLOR]` with the Tailwind fill class matching the section that follows: `fill-white`, `fill-cream`, `fill-teal-dark`, etc.

---

## Border Radius

Two-tier system — tight on interactive elements, softer on containers:

| Element | Tailwind class | Value |
|---|---|---|
| Buttons, inputs, badges | `rounded` | 4px |
| Cards, panels, modals | `rounded-xl` | 12px |

No pill-shaped buttons. Tight radius signals precision and professionalism; the contrast between interactive elements (4px) and content containers (12px) creates hierarchy.

## Section Headers

Left-aligned by default. Centered headers on every section is the universal template signal. Structure:
```
[gold label — xs, semibold, uppercase, tracking-widest]
[h-0.5 w-10 bg-gold bar — visual connector, mt-3]
[h2 — bold, tracking-tight, mt-4]
```

## Section Backgrounds

Alternate to create visual rhythm and prevent a flat surface. Colors do structural work — not just accents.
- Hero: teal image overlay
- Services: `bg-teal-dark`
- Why Us: `bg-white`
- Industries: `bg-cream`
- How It Works: `bg-teal`
- Testimonials: `bg-white`
- Contact / Footer: `bg-teal-dark`

## Services Layout

**Not a card grid.** Bold horizontal rows on `bg-teal-dark`:
- Large gold number (01–06) left, low opacity at rest
- Service name in white at `text-2xl font-semibold`
- Description in `text-white/60`
- Rows separated by `divide-white/10`
- Day Porter: `border-l-2 border-gold pl-6` — the gold border does the work, no badge needed
- Subtle `hover:bg-white/[0.03]` on each row

## Cards

Used outside the services section (testimonials, industries, etc.):
- White background on cream section, `rounded-xl`, `shadow-sm`
- On hover: `translateY(-2px)` + slightly deeper shadow
- Cards always on cream — never white cards on white background

---

## Animations

Philosophy: animations should be invisible when working correctly. The goal is considered, not impressive.

| Pattern | Details |
|---|---|
| Scroll reveal | `opacity 0→1` + `translateY 20px→0`, `400ms ease-out` |
| Card grid stagger | 50ms delay between each card |
| Stat counters | Count up from 0 on scroll-into-view |
| Card hover | `translateY(-2px)` + shadow |
| Nav link hover | Gold underline slides in from left |
| Gold button hover | Subtle background shimmer |

**Rules:**
- Animate `transform` and `opacity` only — never layout properties
- Use `motion` (Framer Motion, already installed) with `whileInView` + `once: true`
- No parallax — kills Lighthouse Performance and CLS
