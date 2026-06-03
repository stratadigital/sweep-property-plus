<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Next.js Starter Template

> **When starting a new project from this template:** replace this section with project-specific details — what the site is, what it does, any key decisions made for that project.

## Template Stack

- **Framework**: Next.js 16, App Router, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Catalyst UI Kit (Tailwind Labs) — components in `src/components/ui/`
- **Fonts**: Geist / Geist Mono via `next/font/google` (configured in `src/app/layout.tsx`)
- **Contact Forms**: Web3Forms — access key required in `.env.local`
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

| Variable | Purpose |
|---|---|
| `WEB3FORMS_ACCESS_KEY` | Web3Forms contact form key |

See `.env.example` for the full list. Copy to `.env.local` and fill in values.

## Dev Server

```bash
npm run dev   # http://localhost:3000
```

## Prettier

`.prettierrc` uses single quotes, no semicolons, 100 char print width, Tailwind class sorting.

```bash
npx prettier --write .
```

## Lighthouse Performance Standard

Target 95+ across all four Lighthouse categories (Performance, Accessibility, Best Practices, SEO). Keep this in mind during all design and build decisions.
