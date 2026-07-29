# Sweep Property Plus — Design System

## Brand

**Client**: Sweep Property Plus — commercial cleaning company, NJ.
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
[ghost text — oversized word, absolute, top-0 left-0, 5% opacity, 7-9rem]
[relative z-[1] content wrapper]
  [gold label — xs, semibold, uppercase, tracking-widest]
  [h-0.5 w-10 bg-gold bar — visual connector, mt-3]
  [h2 — bold, tracking-tight, mt-4]
```

**Ghost text pattern** — oversized background word, section-level, acting as a massive typographic backdrop behind the entire section header area. Translates the brochure's oversized-text motif to web. Section gets `overflow-hidden` to clip bleed naturally.

```tsx
{/* Ghost text is a direct child of <section>, before the content div */}
<span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-[color] lg:text-[20rem]">
  WORD
</span>

{/* Content wrapper sits above ghost text */}
<div className="relative z-1 mx-auto max-w-6xl px-6">
  {/* label, bar, heading — no extra wrapper needed */}
</div>

{/* Diagonal SVG gets z-2 to stack above ghost text */}
<div className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none" aria-hidden="true">
```

- Dark sections (Services): `text-white/5`
- White sections (WhyUs, Contact): `text-teal/7`
- Cream sections (About, Industries): `text-teal-dark/6`
- Keywords per section: Services → CLEAN, About → ABOUT, WhyUs → TRUST, Industries → SERVE, Contact → CONTACT
- Size: `text-[10rem] lg:text-[20rem]` — 8–9× the heading font size at desktop

## Cards

Used outside the services section (testimonials, industries, etc.):
- White background on cream section, `rounded-xl`, `shadow-sm`
- On hover: `translateY(-2px)` + slightly deeper shadow
- Cards always on cream — never white cards on white background

---

## Animations

All animation variants live in **`src/lib/animations.ts`** — single source of truth. Never define ad-hoc Framer Motion variants in components.

Philosophy: animations should feel intentional and purposeful. Bold enough to notice as the page reveals, professional enough to never distract.

| Export | Use | Key values |
|---|---|---|
| `heroContainer` / `heroItem` | Hero page load stagger | `y: 40`, `duration: 0.7`, stagger `0.15s` |
| `fadeUp` | Section headers | `y: 32`, `duration: 0.65` |
| `fadeUpContent` | Prose blocks, panels | `y: 24`, `duration: 0.6` |
| `slideInLeft` / `slideInRight` | Two-column layouts | `x: ±40`, `duration: 0.65` |
| `staggerContainer` | Stagger wrappers | `staggerChildren: 0.1` |
| `staggerItem` | List/feature items | `y: 20`, `duration: 0.5` |
| `rowItem` | Service rows | `x: -24`, `duration: 0.45` |
| `cardItem` | Cards | `y: 28`, `scale: 0.97→1`, `duration: 0.5` |
| `fadeIn` | Footnotes, secondary | `opacity 0→1`, `duration: 0.5` |
| `viewport` | Standard trigger | `once: true, amount: 0.15` |
| `viewportEarly` | Tall stagger containers | `once: true, amount: 0.08` |

Easing: custom expo-out `[0.16, 1, 0.3, 1]` on all variants — fast start, buttery deceleration.

| Pattern | Details |
|---|---|
| Card hover | `translateY(-2px)` + deeper shadow |
| Nav link hover | Gold underline slides in from left |
| Gold button hover | `brightness-110` on hover |

**Rules:**
- Animate `transform` and `opacity` only — never layout properties
- Use `motion` (Framer Motion, already installed) with `whileInView` + `once: true`
- No parallax — kills Lighthouse Performance and CLS
- Hero uses `animate=` not `whileInView` (loads immediately, not scroll-triggered)
