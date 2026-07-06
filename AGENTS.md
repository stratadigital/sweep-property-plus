<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Sweep Property Plus

Commercial cleaning company website. B2B audience: building managers and facilities directors. Single-page marketing site — the quote form in the Contact section is the primary conversion point. Full design system and brand rules in `DESIGN.md`.

## Stack

- **Framework**: Next.js 16, App Router, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Catalyst UI Kit (Tailwind Labs) — components in `src/components/ui/`
- **Fonts**: Space Grotesk (variable font, weights 300–700) via `next/font/google` (configured in `src/app/layout.tsx`)
- **Contact Forms**: Resend — API key required in `.env.local`, sends via a verified domain
- **Code Formatting**: Prettier with `prettier-plugin-tailwindcss` (auto-sorts Tailwind class names)
- **Linting**: ESLint with Next.js rules + `eslint-config-prettier`

## Folder Structure

```
src/
  app/                  # Next.js App Router pages and layouts
  components/
    ui/                 # Catalyst UI Kit components (do not edit these)
    layout/             # Site-wide layout components (Navbar, Footer, etc.)
    sections/           # Page section components (Hero, Features, CTA, etc.)
  lib/                  # Utility functions and shared logic
  hooks/                # Custom React hooks
  types/                # TypeScript type definitions
```

## Catalyst UI Components Available

Located in `src/components/ui/`. Import from there:

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, Label } from '@/components/ui/fieldset'
```

Full list: alert, auth-layout, avatar, badge, button, checkbox, combobox,
description-list, dialog, divider, dropdown, fieldset, heading, input, link,
listbox, navbar, pagination, radio, select, sidebar, sidebar-layout,
stacked-layout, switch, table, text, textarea

Catalyst depends on: `@headlessui/react`, `motion`, `clsx` (all installed).

## Environment Variables

| Variable          | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `RESEND_API_KEY`  | Resend API key for sending contact form emails        |
| `CONTACT_FORM_TO` | Inbox where quote request notifications are delivered |

See `.env.example` for the full list. Copy to `.env.local` and fill in values.

## Dev Server

```bash
npm run dev   # http://localhost:3000
```

## Branches & Deployment

Hosted on Vercel, deployed from GitHub. Branch = environment:

| Branch      | Environment | `VERCEL_ENV` | URL                                   | Audience             |
| ----------- | ----------- | ------------ | ------------------------------------- | -------------------- |
| `main`      | Production  | `production` | live domain                           | public (post-launch) |
| `staging`   | Preview     | `preview`    | `…-git-staging-….vercel.app` (stable) | client review        |
| `feature/*` | Preview     | `preview`    | per-deploy preview URL                | dev only             |

**Flow:** `feature/*` → merge to `staging` → client reviews the stable staging URL → merge `staging` → `main` (production). Never share a `feature/*` branch with the client; `staging` is the only branch that's always presentable.

**Production branch** is set in Vercel under Settings → Environments → Production → Branch Tracking. Preview deployments are gated behind **Vercel Authentication** (Deployment Protection). `RESEND_API_KEY` and `CONTACT_FORM_TO` must both be scoped to **Preview** as well as Production, or the quote form breaks on staging.

**Indexing guard:** `src/app/robots.ts` and the `robots` field in `src/app/layout.tsx` both key off `process.env.VERCEL_ENV === 'production'`. Off-production deploys emit `Disallow: /` + `<meta name="robots" content="noindex">` so review URLs never get indexed. This is build-time, so it travels with each deployment's build.

> ⚠️ The guard only opens up on a genuine production build of `main`. **Promoting a _preview_ build to production keeps the `noindex`** — ship production by pushing to `main`, not by promoting a preview. After launch, verify on the live domain: `/robots.txt` shows `Allow: /` and the HTML has no `noindex`.

## Prettier

`.prettierrc` uses single quotes, no semicolons, 100 char print width, Tailwind class sorting.

```bash
npx prettier --write .
```

## Lighthouse Performance Standard

Target 95+ across all four Lighthouse categories (Performance, Accessibility, Best Practices, SEO). Keep this in mind during all design and build decisions.
