# Product Requirements Document (PRD) — Enhanced

## Lail O Nahar Machinery Rentals Website

**Version:** 2.0 | **Date:** June 2026 | **Status:** Ready for Development

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design System & Theming](#2-design-system--theming)
3. [Site Architecture & Navigation](#3-site-architecture--navigation)
4. [Component Library Specifications](#4-component-library-specifications)
5. [Asset Management Strategy](#5-asset-management-strategy)
6. [Content Architecture](#6-content-architecture)
7. [SEO & Performance Strategy](#7-seo--performance-strategy)
8. [Functional Requirements](#8-functional-requirements)
9. [Accessibility & Internationalisation](#9-accessibility--internationalisation)
10. [Analytics & Tracking](#10-analytics--tracking)
11. [Deployment & DevOps](#11-deployment--devops)
12. [Testing Strategy](#12-testing-strategy)
13. [Phase Roadmap](#13-phase-roadmap)
14. [Folder Structure Reference](#14-folder-structure-reference)

---

## 1. Project Overview

### 1.1 Business Context

**Client:** Lail O Nahar Machinery Rentals
**Market:** UAE — Dubai, Sharjah, Ajman, Abu Dhabi
**Primary Goal:** Generate high-quality B2B leads for crane and man-crane rentals
**Secondary Goal:** Establish brand credibility against established UAE competitors

### 1.2 Technical Philosophy
>
> "Statically fast, visually premium."

The site must feel like a premium SPA while remaining a 100% statically generated site — achieving perfect Core Web Vitals for competitive UAE search rankings. No backend, no runtime server, no JS bundle bloat.

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 98 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| LCP (Largest Contentful Paint) | < 1.5s |
| CLS (Cumulative Layout Shift) | < 0.05 |
| FID / INP (Interaction to Next Paint) | < 100ms |

### 1.3 Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Astro 5.x** | Zero-JS by default, View Transitions, Content Collections |
| Styling | **Tailwind CSS v4** | Utility-first, JIT, CSS variable-based theming |
| Interactivity | **Vanilla JS** | No framework overhead; 2–3KB max for all interactions |
| Icons | **Astro Icon + Phosphor Icons** | SVG sprite system, zero layout shift |
| Forms | **Web3Forms** | Free tier, no backend, email delivery with spam filtering |
| Images | **astro:assets** | Auto WebP/AVIF conversion, responsive srcsets, lazy loading |
| Deployment | **Cloudflare Pages** | UAE-close CDN edge nodes, free SSL, instant cache purge |
| CMS (Optional Phase 2) | **Astro Content Collections (local MDX)** | Zero-cost, type-safe fleet management |

---

## 2. Design System & Theming

### 2.1 Theme Architecture

The site will support **Light** and **Dark** themes using CSS custom properties on the `<html>` element. Theme preference is:

1. Auto-detected from `prefers-color-scheme` on first visit
2. Persisted to `localStorage` for returning users
3. Togglable via a sticky toggle button in the header

```css
/* ============================================
   DESIGN TOKENS — LIGHT THEME (Default)
   ============================================ */
:root,
[data-theme="light"] {
  /* --- Backgrounds --- */
  --bg-base:        #F8F9FA;   /* Page background — Off-White Slate */
  --bg-surface:     #FFFFFF;   /* Cards, modals, dropdowns */
  --bg-elevated:    #EFF0F2;   /* Subtle elevated surfaces */
  --bg-nav:         rgba(26, 26, 26, 0.92); /* Glassmorphism nav */

  /* --- Typography --- */
  --text-primary:   #121212;   /* Headings — Onyx Black */
  --text-secondary: #4A4A4A;   /* Body — Dark Steel Grey */
  --text-muted:     #6B7280;   /* Captions, placeholders */
  --text-inverse:   #FFFFFF;   /* Text on dark backgrounds */
  --text-on-accent: #121212;   /* Text on yellow accent */

  /* --- Brand Accent --- */
  --accent-primary:         #FFCC00; /* Industrial Yellow — CTAs */
  --accent-primary-hover:   #E6B800; /* Darker on hover */
  --accent-primary-subtle:  rgba(255, 204, 0, 0.12); /* Tinted bg */
  --accent-secondary:       #1A1A1A; /* Deep Carbon */

  /* --- Status Colors --- */
  --color-success:  #16A34A;
  --color-warning:  #D97706;
  --color-error:    #DC2626;
  --color-info:     #2563EB;

  /* --- Borders & Dividers --- */
  --border-default: rgba(0, 0, 0, 0.08);
  --border-strong:  rgba(0, 0, 0, 0.18);
  --border-accent:  #FFCC00;

  /* --- Shadows --- */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg:  0 10px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-accent: 0 4px 20px rgba(255, 204, 0, 0.35);

  /* --- Interactive States --- */
  --focus-ring: 0 0 0 3px rgba(255, 204, 0, 0.5);
}

/* ============================================
   DESIGN TOKENS — DARK THEME
   ============================================ */
[data-theme="dark"] {
  /* --- Backgrounds --- */
  --bg-base:        #0E0E0E;   /* Page background — Near Black */
  --bg-surface:     #1A1A1A;   /* Cards, modals — Deep Carbon */
  --bg-elevated:    #242424;   /* Elevated surfaces */
  --bg-nav:         rgba(14, 14, 14, 0.92); /* Glassmorphism nav */

  /* --- Typography --- */
  --text-primary:   #F0F0F0;   /* Headings — Soft White */
  --text-secondary: #A0A0A0;   /* Body — Medium Grey */
  --text-muted:     #6B7280;   /* Captions, placeholders */
  --text-inverse:   #121212;   /* Text on light backgrounds */
  --text-on-accent: #121212;   /* Text on yellow accent */

  /* --- Brand Accent (same — anchor point) --- */
  --accent-primary:         #FFCC00;
  --accent-primary-hover:   #FFD633;  /* Brighter on dark bg */
  --accent-primary-subtle:  rgba(255, 204, 0, 0.10);
  --accent-secondary:       #F0F0F0;

  /* --- Status Colors (adjusted for contrast on dark) --- */
  --color-success:  #22C55E;
  --color-warning:  #F59E0B;
  --color-error:    #EF4444;
  --color-info:     #3B82F6;

  /* --- Borders & Dividers --- */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong:  rgba(255, 255, 255, 0.16);
  --border-accent:  #FFCC00;

  /* --- Shadows (glow-based in dark mode) --- */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.40);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.50);
  --shadow-lg:  0 10px 40px rgba(0,0,0,0.60);
  --shadow-accent: 0 4px 24px rgba(255, 204, 0, 0.25);

  /* --- Interactive States --- */
  --focus-ring: 0 0 0 3px rgba(255, 204, 0, 0.45);
}
```

### 2.2 Typography System

```css
/* Google Fonts import — subset for performance */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap');

:root {
  /* --- Font Families --- */
  --font-display:  'Montserrat', system-ui, sans-serif;
  --font-body:     'Inter', system-ui, sans-serif;

  /* --- Type Scale (1.25 Major Third) --- */
  --text-xs:   0.75rem;    /* 12px — Labels, badges */
  --text-sm:   0.875rem;   /* 14px — Captions */
  --text-base: 1rem;       /* 16px — Body */
  --text-lg:   1.125rem;   /* 18px — Lead text */
  --text-xl:   1.25rem;    /* 20px — Subheadings */
  --text-2xl:  1.5rem;     /* 24px — Section subtitles */
  --text-3xl:  1.875rem;   /* 30px — Section titles */
  --text-4xl:  2.25rem;    /* 36px — Page headings */
  --text-5xl:  3rem;       /* 48px — Hero heading */
  --text-6xl:  4rem;       /* 64px — Hero headline (desktop) */

  /* --- Line Heights --- */
  --leading-tight:  1.2;
  --leading-snug:   1.35;
  --leading-normal: 1.6;
  --leading-relaxed:1.75;
}
```

### 2.3 Spacing & Layout Tokens

```css
:root {
  /* --- Spacing Scale (8pt grid) --- */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* --- Border Radius --- */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;

  /* --- Transitions --- */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base:   250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* --- Breakpoints (used in Tailwind config) --- */
  /* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */

  /* --- Max widths --- */
  --max-w-content: 1200px;
  --max-w-prose:   680px;
}
```

### 2.4 Theme Toggle Component Logic

```javascript
// src/scripts/theme.js — Injected via <script is:inline> in BaseLayout
(function () {
  const STORAGE_KEY = 'lon-theme';
  const ROOT = document.documentElement;

  function applyTheme(theme) {
    ROOT.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update ARIA label on toggle button
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved || system);
  }

  // Prevent flash of wrong theme — runs synchronously before paint
  initTheme();

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

  // Expose toggle function for the button
  window.toggleTheme = function () {
    const current = ROOT.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };
})();
```

---

## 3. Site Architecture & Navigation

### 3.1 Page Map

```
/ (Home)
├── /fleet (Fleet Overview)
│   ├── /fleet/cranes          (Standard Cranes)
│   │   └── /fleet/cranes/[slug]  (Individual crane detail)
│   └── /fleet/man-cranes      (Aerial Work Platforms)
│       └── /fleet/man-cranes/[slug]
├── /about   (About & Safety Certifications)
├── /contact (Lead Form + Map + WhatsApp)
└── /ar/     (Arabic mirror — Phase 2)
    ├── /ar/fleet
    ├── /ar/about
    └── /ar/contact
```

### 3.2 Navigation Behaviour

| State | Behaviour |
|---|---|
| Default (scrolled to top) | Transparent background, logo + links visible |
| Scrolled > 60px | Glassmorphism blur backdrop (`backdrop-filter: blur(12px)`) with `--bg-nav` |
| Mobile | Hamburger menu → full-screen overlay with slide-down animation |
| Active Link | Yellow left border (LTR) or underline accent |
| Theme Toggle | Icon button — Sun/Moon, placed right of nav links |

### 3.3 View Transitions Configuration

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <!-- Anti-flash theme script MUST be first in head -->
  <script is:inline src="/scripts/theme.js"></script>

  <ViewTransitions />
  <!-- ... rest of head -->
</head>
```

```css
/* Page slide transitions — direction-aware */
@keyframes slide-from-right {
  from { transform: translateX(30px); opacity: 0; }
}
@keyframes slide-to-left {
  to   { transform: translateX(-30px); opacity: 0; }
}

::view-transition-old(root) {
  animation: var(--transition-base) slide-to-left;
}
::view-transition-new(root) {
  animation: var(--transition-base) slide-from-right;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

---

## 4. Component Library Specifications

### 4.1 BaseLayout

**File:** `src/layouts/BaseLayout.astro`

**Slot interface:**

- `title` — string, injected into `<title>` and `og:title`
- `description` — string for meta description
- `image` — OG image URL (defaults to site default)
- `schema` — optional JSON-LD object passed per-page

**Includes:** GlobalStyles, Fonts (preconnect), ViewTransitions, ProgressBar, WhatsAppWidget, Footer

---

### 4.2 Header / Navigation

**File:** `src/components/Header/Header.astro`

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo + Arabic sub-label]    [Fleet] [About] [Contact]  [☀️] [📞 CTA] │
└──────────────────────────────────────────────────────────────┘
```

- Logo: SVG inline (< 2KB), colour adapts to `--text-inverse` on dark nav
- CTA button: `+971 XX XXX XXXX` styled with `--accent-primary` background
- Theme toggle: icon button with smooth sun↔moon CSS morph animation
- Mobile: hamburger → overlay with links stacked, phone CTA at bottom

---

### 4.3 Hero Section

**File:** `src/components/Hero/Hero.astro`

Two modes (config-driven):

1. **Video Hero** — looping `.mp4`/`.webm` with a dark gradient overlay
2. **Image Hero** — static `<Image/>` with a parallax-on-scroll effect via CSS

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [VIDEO / IMAGE BACKGROUND]                                │
│                                                             │
│   ┌─────────────────────────────────────────┐              │
│   │  Heavy Machinery.          [Badge: 24/7] │              │
│   │  Cranes & Aerial Work                   │              │
│   │  Platforms in the UAE.                  │              │
│   │                                         │              │
│   │  [🟡 Get a Free Quote]  [📋 View Fleet] │              │
│   │                                         │              │
│   │  Serving Dubai • Sharjah • Ajman • AD   │              │
│   └─────────────────────────────────────────┘              │
│                                                             │
│  ▼  Scroll indicator (animated chevron)                     │
└─────────────────────────────────────────────────────────────┘
```

**Dark mode behaviour:** Overlay opacity increases from 0.5 to 0.7, text stays `--text-inverse` (always white on hero regardless of theme)

---

### 4.4 Fleet Card (Bento Grid Item)

**File:** `src/components/FleetCard/FleetCard.astro`

**Props interface:**

```typescript
interface FleetCardProps {
  name: string;           // e.g. "50 Ton Mobile Crane"
  category: 'crane' | 'man-crane';
  image: ImageMetadata;   // astro:assets type
  maxLoad?: string;       // e.g. "50 Ton"
  maxHeight?: string;     // e.g. "N/A" | "28m"
  availability: 'available' | 'limited' | 'contact';
  slug: string;
  featured?: boolean;     // spans 2 columns in bento grid
}
```

**Visual spec:**

```
┌──────────────────────────────┐
│  [Image with lazy fade-in]   │  ← aspect-ratio: 4/3, object-fit: cover
│  [🟢 Available badge]        │  ← top-right, status colour
├──────────────────────────────┤
│  50 Ton Mobile Crane         │  ← --font-display, --text-primary
│  ⬆ Max Load: 50T   📐 N/A   │  ← spec row, --text-secondary
│                              │
│  [View Details →]            │  ← accent link
└──────────────────────────────┘
```

**Theme transitions:** `background: var(--bg-surface)`, `border: 1px solid var(--border-default)`, shadow uses `var(--shadow-md)` — all auto-adapt.

---

### 4.5 Fleet Grid (Bento Layout)

**File:** `src/components/FleetGrid/FleetGrid.astro`

```
┌──────────┬──────────┬──────────┐
│ FEATURED │  Card 2  │  Card 3  │  ← Row 1: featured spans 2 cols on lg
│  (2 col) │          │          │
├──────────┴──────────┼──────────┤
│  Card 4  │  Card 5  │  Card 6  │  ← Row 2
└──────────┴──────────┴──────────┘

Mobile: Single column stack
Tablet: 2-column grid
Desktop: 3-column bento with featured variant
```

Filter tabs: All / Cranes / Man-Cranes / Available Now
(Implemented with Vanilla JS class toggling — no JS framework)

---

### 4.6 Stats/Trust Bar

**File:** `src/components/StatsBar/StatsBar.astro`

Displayed between Hero and Fleet sections.

```
┌─────────┬─────────┬─────────┬─────────┐
│  500+   │  24/7   │  4      │  15+    │
│ Projects│ Service │ Emirates│  Years  │
└─────────┴─────────┴─────────┴─────────┘
```

**Dark mode:** Container uses `--bg-surface` with `--accent-primary` numbers.

---

### 4.7 Testimonials Carousel

**File:** `src/components/Testimonials/Testimonials.astro`

- Auto-advance every 5 seconds (pauses on hover / focus)
- Keyboard navigable (left/right arrows)
- Dots indicator with `--accent-primary` active state
- Quotes in Arabic script supported (direction: rtl on `.quote-ar`)

---

### 4.8 Contact Form

**File:** `src/components/ContactForm/ContactForm.astro`

**Fields:**

- Full Name*
- Company Name*
- Phone (UAE format: +971 XX XXX XXXX)*
- Email
- Emirates (select: Dubai / Sharjah / Ajman / Abu Dhabi / Other)*
- Equipment Needed (multi-select: Crane / Man-Crane / Not Sure)*
- Project Duration (select: Daily / Weekly / Monthly / Long-term)
- Message / Notes

**Validation:** Client-side with Vanilla JS (no library); server-side handled by Web3Forms

**Success state:** Inline success card replaces form with animated checkmark

**Dark mode:** Inputs use `--bg-elevated` background, `--border-default` border, `--text-primary` colour

---

### 4.9 WhatsApp Floating Widget

**File:** `src/components/WhatsApp/WhatsAppWidget.astro`

```
                         ╔═══════════════════════╗
                         ║ Chat with us on        ║  ← Tooltip (appears on hover)
                         ║ WhatsApp for quick     ║
                         ║ quotes!                ║
                         ╚═══════════════════════╝
                                        [🟢 WhatsApp icon]  ← bottom-right
```

**Pre-filled message:** `Hello Lail O Nahar! I'm interested in renting [crane/man-crane] in [Emirate]. Please send me a quote.`

**Dark mode:** Widget background `--bg-surface`, icon always WhatsApp green.

---

### 4.10 Progress Bar (Page Load Indicator)

**File:** `src/components/ProgressBar/ProgressBar.astro`

- Thin (3px) bar at the very top of the viewport
- Colour: `--accent-primary` (#FFCC00)
- Triggered on `astro:before-preparation` event, completed on `astro:page-load`
- Eased animation — fast initial to 80%, slow to 100% on completion

---

### 4.11 Theme Toggle Button

**File:** `src/components/ThemeToggle/ThemeToggle.astro`

```astro
---
// No props needed — reads from data-theme on <html>
---
<button
  id="theme-toggle"
  onclick="toggleTheme()"
  aria-label="Switch to dark mode"
  class="theme-toggle"
>
  <!-- Sun icon (visible in light mode) -->
  <svg class="icon-sun" ...>...</svg>
  <!-- Moon icon (visible in dark mode) -->
  <svg class="icon-moon" ...>...</svg>
</button>

<style>
  [data-theme="light"] .icon-moon { display: none; }
  [data-theme="dark"]  .icon-sun  { display: none; }

  .theme-toggle {
    width: 40px; height: 40px;
    border-radius: var(--radius-full);
    background: var(--bg-elevated);
    border: 1px solid var(--border-default);
    transition: background var(--transition-fast), transform var(--transition-spring);
    cursor: pointer;
  }
  .theme-toggle:hover {
    transform: rotate(20deg) scale(1.05);
    background: var(--accent-primary-subtle);
  }
</style>
```

---

## 5. Asset Management Strategy

### 5.1 Image Workflow

**Source → Optimised Pipeline:**

```
Google Drive (Raw JPG/PNG)
        ↓
  Download to local machine
        ↓
  Compress with Squoosh (target < 200KB for cards, < 400KB for hero)
        ↓
  Place in src/assets/<section>/<filename>.jpg
        ↓
  Astro <Image/> auto-converts → WebP + AVIF with responsive srcsets
        ↓
  Deployed to CDN (Cloudflare Pages)
```

### 5.2 Image Component Usage

```astro
---
import { Image } from 'astro:assets';
import cranImg from '../../assets/fleet/cranes/100-ton-mobile-crane.jpg';
---

<!-- For fleet cards (lazy-loaded below fold) -->
<Image
  src={cranImg}
  alt="100 Ton Mobile Crane available for rent in Dubai, UAE"
  width={600}
  height={450}
  loading="lazy"
  decoding="async"
  class="fleet-card__image"
/>

<!-- For hero (eager-loaded, LCP element) -->
<Image
  src={heroImg}
  alt="Lail O Nahar crane fleet operating in Dubai"
  width={1920}
  height={1080}
  loading="eager"
  fetchpriority="high"
  class="hero__image"
/>
```

### 5.3 Video Hero Guidelines

| Attribute | Value |
|---|---|
| Format | `.mp4` (H.264) + `.webm` (VP9) — both provided |
| Max file size | 5MB compressed (use HandBrake CRF 28) |
| Resolution | 1280×720 (720p sufficient for background) |
| Folder | `public/videos/` (no Astro processing) |
| Attributes | `autoplay muted loop playsinline preload="none"` |
| Fallback | Static hero image if video fails or on mobile < 768px |

```html
<video autoplay muted loop playsinline preload="none" class="hero__video">
  <source src="/videos/crane-hero.webm" type="video/webm" />
  <source src="/videos/crane-hero.mp4"  type="video/mp4"  />
</video>
```

### 5.4 Asset Naming Convention

```
src/assets/
├── fleet/
│   ├── cranes/
│   │   ├── 50t-mobile-crane-main.jpg        ← [capacity]-[type]-[view].ext
│   │   ├── 50t-mobile-crane-side.jpg
│   │   └── 100t-crawler-crane-main.jpg
│   └── man-cranes/
│       ├── 12m-scissor-lift-main.jpg
│       └── 20m-boom-lift-main.jpg
├── about/
│   ├── team-photo.jpg
│   └── safety-cert-dnv.png
└── og/
    └── og-default.jpg                       ← 1200×630, used as OG default
```

---

## 6. Content Architecture

### 6.1 Astro Content Collections Schema

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const equipmentCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name:         z.string(),
    category:     z.enum(['crane', 'man-crane']),
    slug:         z.string(),
    mainImage:    image(),          // Processed by astro:assets
    galleryImages:z.array(image()).optional(),
    specs: z.object({
      maxLoad:     z.string().optional(),  // "50 Ton"
      maxHeight:   z.string().optional(),  // "28m"
      boomLength:  z.string().optional(),
      powerSource: z.enum(['diesel', 'electric', 'hybrid']).optional(),
      workArea:    z.string().optional(),  // "360° rotation"
    }),
    availability: z.enum(['available', 'limited', 'contact']),
    featured:     z.boolean().default(false),
    sortOrder:    z.number(),
    description:  z.string(),           // For SEO meta description
    useCases:     z.array(z.string()),   // e.g. ["construction", "oil & gas"]
  }),
});

export const collections = { equipment: equipmentCollection };
```

### 6.2 Sample Equipment MDX File

```mdx
---
name: "50 Ton Mobile Crane"
category: crane
slug: 50-ton-mobile-crane
mainImage: ../../assets/fleet/cranes/50t-mobile-crane-main.jpg
specs:
  maxLoad: "50 Ton"
  maxHeight: "N/A"
  boomLength: "38m"
  powerSource: diesel
availability: available
featured: true
sortOrder: 1
description: "Rent a 50 Ton Mobile Crane in UAE. Available 24/7 across Dubai, Sharjah, and Ajman for construction and industrial projects."
useCases: ["construction", "oil & gas", "port operations"]
---

Our 50 Ton Mobile Crane is the workhorse of our fleet...
```

---

## 7. SEO & Performance Strategy

### 7.1 On-Page SEO Requirements

Every page MUST include:

```astro
<!-- Title pattern: [Primary Keyword] in [Location] | Lail O Nahar -->
<title>Crane Rentals in Dubai & Sharjah | Lail O Nahar Machinery</title>

<!-- Meta description: 150-160 chars, includes location + CTA -->
<meta name="description" content="Rent cranes and man-cranes across UAE. 24/7 service in Dubai, Sharjah, Ajman & Abu Dhabi. Get a free quote from Lail O Nahar Machinery Rentals today." />

<!-- Canonical -->
<link rel="canonical" href="https://lailonahar.ae/fleet/cranes" />

<!-- Hreflang (Phase 2, when Arabic added) -->
<link rel="alternate" hreflang="en" href="https://lailonahar.ae/fleet" />
<link rel="alternate" hreflang="ar" href="https://lailonahar.ae/ar/fleet" />

<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://lailonahar.ae/og/og-default.jpg" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_AE" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

### 7.2 JSON-LD Schema (Home Page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lail O Nahar Machinery Rentals",
  "description": "Crane and aerial work platform rentals across the UAE",
  "url": "https://lailonahar.ae",
  "telephone": "+971-XX-XXX-XXXX",
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "$$",
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Ajman" },
    { "@type": "City", "name": "Abu Dhabi" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Equipment Rental Catalogue",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Crane Rental" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Man Crane / Boom Lift Rental" } }
    ]
  }
}
```

### 7.3 Equipment Detail Page Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "50 Ton Mobile Crane Rental",
  "description": "...",
  "image": "https://lailonahar.ae/assets/fleet/50t-crane.webp",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "seller": { "@type": "LocalBusiness", "name": "Lail O Nahar Machinery Rentals" }
  }
}
```

### 7.4 Performance Budget

| Resource | Budget |
|---|---|
| Total page weight (Home) | < 500KB |
| Hero image (WebP) | < 150KB |
| All JS (combined) | < 10KB |
| Google Fonts (subset) | < 30KB |
| Above-fold CSS (inlined) | < 14KB |
| LCP image | Preloaded via `<link rel="preload">` |

### 7.5 Critical Rendering Path

```astro
<!-- In BaseLayout <head> — order matters -->
1. <script is:inline> theme init (prevents flash)
2. <link rel="preconnect" href="https://fonts.googleapis.com">
3. <link rel="preload" as="image" href={heroImageUrl}>     ← LCP image
4. <link rel="preload" as="font" href="montserrat.woff2">
5. <style> /* Critical above-fold CSS inlined */ </style>
6. <link rel="stylesheet" href="/styles/global.css" media="print" onload="this.media='all'">
```

---

## 8. Functional Requirements

### 8.1 Floating WhatsApp CTA

```javascript
// Pre-filled message with UTM context
const phone = '971XXXXXXXXX';
const message = encodeURIComponent(
  `Hello Lail O Nahar! I found your website and I'm interested in equipment rental in the UAE. Can you send me a quote?`
);
const url = `https://wa.me/${phone}?text=${message}`;
```

- Visible on all pages
- Hidden on `/contact` page (avoids distraction from the form)
- Pulse animation on the green dot every 3 seconds (draws attention)
- Tooltip shows on hover (desktop) / tap (mobile)

### 8.2 Lead Form (Web3Forms Integration)

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
  <input type="hidden" name="subject" value="New Lead — Lail O Nahar Website">
  <input type="hidden" name="redirect" value="false">
  <!-- Honeypot anti-spam -->
  <input type="checkbox" name="botcheck" class="hidden" style="display:none">
  <!-- Form fields ... -->
</form>
```

**Lead notifications:** Email to sales inbox + optional Telegram bot notification (for instant mobile alerts)

### 8.3 Google Maps Embed (Contact Page)

- Embed API-free iframe of company location
- Custom styled map matching brand colours
- Dark map variant loaded automatically in dark theme via Google Maps `color_scheme` param

### 8.4 Equipment Filter System

```javascript
// Vanilla JS filter — no dependencies
class FleetFilter {
  constructor(gridEl, filterBtns) {
    this.grid = gridEl;
    this.cards = [...gridEl.querySelectorAll('[data-category]')];
    this.bindFilters(filterBtns);
  }

  filter(category) {
    this.cards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? '' : 'none';
      // CSS View Transition for smooth hide/show
      card.classList.toggle('filtered-out', !match);
    });
  }

  bindFilters(btns) {
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filter(btn.dataset.filter);
      });
    });
  }
}
```

### 8.5 Call-to-Action Strategy

| Location | CTA Text | Action |
|---|---|---|
| Header (desktop) | `📞 +971 XX XXX XXXX` | `tel:` link |
| Hero (primary) | `Get a Free Quote` | → `/contact` |
| Hero (secondary) | `View Our Fleet` | → `/fleet` |
| Fleet Cards | `Enquire About This Equipment` | WhatsApp pre-fill |
| Footer | `Available 24/7 — Call or WhatsApp Now` | Both links |
| Mobile sticky footer | `Call Now` + `WhatsApp` | Two action buttons |

### 8.6 Mobile Sticky Footer CTA Bar

On screens < 768px, a fixed bottom bar provides persistent access:

```
┌──────────────────────────────┐
│  [📞 Call Now] [💬 WhatsApp] │  ← always visible on mobile
└──────────────────────────────┘
```

---

## 9. Accessibility & Internationalisation

### 9.1 Accessibility Targets (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Colour contrast ≥ 4.5:1 (normal text) | Light: #121212 on #F8F9FA = **15.6:1** ✅ |
| Colour contrast ≥ 3:1 (large text/UI) | Yellow on dark: #FFCC00 on #1A1A1A = **9.1:1** ✅ |
| Keyboard navigation | All interactive elements have visible `:focus-visible` ring using `--focus-ring` |
| Skip link | First focusable element links to `#main-content` |
| ARIA labels | All icon-only buttons have `aria-label` |
| Image alt text | All `<Image/>` components require descriptive alt text |
| Form labels | All inputs have associated `<label>` elements |
| Motion | All animations respect `prefers-reduced-motion: reduce` |
| Screen reader | Semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`) |

### 9.2 Language & RTL Support (Phase 2)

```astro
---
// src/layouts/BaseLayout.astro
const { lang = 'en', dir = 'ltr' } = Astro.props;
---
<html lang={lang} dir={dir} data-theme="light">
```

**Arabic page routing:**

- `/ar/*` routes mirror all English pages
- `dir="rtl"` applied at `<html>` level
- Tailwind's `rtl:` variant handles mirrored padding/margins
- Fonts: Add `Cairo` or `Noto Naskh Arabic` for Arabic content

---

## 10. Analytics & Tracking

### 10.1 Analytics Stack

```html
<!-- Cloudflare Web Analytics (privacy-first, no cookie banner needed) -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>

<!-- Optional: Google Analytics 4 (if client requires Google Search Console data) -->
<!-- Add only after obtaining cookie consent per UAE PDPL requirements -->
```

### 10.2 Conversion Events to Track

| Event | Trigger |
|---|---|
| `quote_form_submit` | Successful Web3Forms submission |
| `whatsapp_click` | WhatsApp widget click |
| `phone_click` | `tel:` link click in header/footer |
| `fleet_filter_use` | Category filter tab click |
| `equipment_detail_view` | Individual equipment page visit |
| `cta_hero_click` | Hero primary CTA click |

---

## 11. Deployment & DevOps

### 11.1 Hosting: Cloudflare Pages

```bash
# Build command
npm run build

# Output directory
dist/

# Environment variables (set in Cloudflare dashboard)
WEB3FORMS_KEY=xxxx
SITE_URL=https://lailonahar.ae
```

**Why Cloudflare Pages:**

- Free tier: unlimited requests, 500 builds/month
- UAE-adjacent CDN edge nodes (Bahrain, Dubai PoPs)
- Automatic HTTPS, HTTP/2 push, Brotli compression
- Instant rollbacks to any previous deployment

### 11.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: lail-o-nahar
          directory: dist
```

### 11.3 Environment Branches

| Branch | Environment | URL |
|---|---|---|
| `main` | Production | `https://lailonahar.ae` |
| `develop` | Staging | `https://staging.lailonahar.ae` |
| `feature/*` | Preview | `https://<branch>.lailonahar.pages.dev` |

---

## 12. Testing Strategy

### 12.1 Lighthouse CI (Automated on every PR)

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance":    ["error", { "minScore": 0.95 }],
        "categories:accessibility":  ["error", { "minScore": 1.00 }],
        "categories:seo":            ["error", { "minScore": 1.00 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

### 12.2 Manual Testing Checklist (Pre-launch)

**Theme Testing:**

- [ ] Light theme renders correctly on all pages
- [ ] Dark theme renders correctly on all pages
- [ ] Theme persists across page navigation (View Transitions)
- [ ] System preference detected correctly on first visit
- [ ] No flash of wrong theme on load
- [ ] All text meets WCAG contrast ratios in both themes
- [ ] Images readable in both themes (overlay/tint if needed)

**Device Testing:**

- [ ] iPhone 14 Pro (390px) — Safari
- [ ] Samsung Galaxy S23 (360px) — Chrome
- [ ] iPad Air (820px) — Safari
- [ ] MacBook 1440px — Chrome, Firefox, Safari
- [ ] Windows 1920px — Chrome, Edge

**Functional Testing:**

- [ ] Contact form submits and sends email
- [ ] WhatsApp link opens correct pre-filled message
- [ ] Fleet filter works without JS errors
- [ ] View Transitions between all pages
- [ ] Progress bar appears/disappears correctly
- [ ] Mobile sticky footer CTAs work
- [ ] All external links open in `_blank` with `rel="noopener"`

---

## 13. Phase Roadmap

### Phase 1 — MVP Launch (Weeks 1–4)

**Goal:** Live, indexed, lead-generating site

- [ ] Astro project setup + Tailwind v4 configuration
- [ ] Light/Dark theme system with CSS variables
- [ ] BaseLayout with ViewTransitions + ProgressBar
- [ ] Header (sticky, glassmorphism, theme toggle)
- [ ] Hero (image variant + video variant)
- [ ] FleetCard + FleetGrid (static data, no CMS)
- [ ] StatsBar + Testimonials
- [ ] Contact form (Web3Forms)
- [ ] WhatsApp floating widget
- [ ] Footer
- [ ] JSON-LD schemas on Home + Fleet pages
- [ ] Cloudflare Pages deployment + custom domain
- [ ] Google Search Console submission

### Phase 2 — Content & Conversion (Weeks 5–8)

- [ ] Astro Content Collections for fleet management
- [ ] Individual equipment detail pages (`/fleet/[slug]`)
- [ ] Image gallery lightbox on detail pages
- [ ] About page with team photos + safety certifications
- [ ] UAE coverage map (SVG-based, no Google Maps dependency)
- [ ] Testimonials with company logos (B2B trust signals)
- [ ] Blog section (Astro MDX) for SEO content
- [ ] Google Analytics 4 + conversion tracking
- [ ] Arabic language pages (`/ar/*`) with RTL layout

### Phase 3 — Authority & Growth (Weeks 9–12)

- [ ] Case studies section (project portfolio)
- [ ] Live availability calendar (lightweight)
- [ ] WhatsApp Business API integration (auto-response templates)
- [ ] Performance audit + Core Web Vitals optimisation pass
- [ ] Google Business Profile integration
- [ ] Structured data for all equipment pages
- [ ] Hreflang implementation for EN/AR

---

## 14. Folder Structure Reference

```
lail-o-nahar/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml               ← Auto-generated by @astrojs/sitemap
│   └── videos/
│       ├── crane-hero.mp4
│       └── crane-hero.webm
│
├── src/
│   ├── assets/                   ← Processed by astro:assets
│   │   ├── fleet/
│   │   │   ├── cranes/
│   │   │   └── man-cranes/
│   │   ├── about/
│   │   └── og/
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.astro
│   │   ├── Hero/
│   │   │   ├── Hero.astro
│   │   │   └── HeroVideo.astro
│   │   ├── FleetCard/
│   │   │   └── FleetCard.astro
│   │   ├── FleetGrid/
│   │   │   └── FleetGrid.astro
│   │   ├── StatsBar/
│   │   │   └── StatsBar.astro
│   │   ├── Testimonials/
│   │   │   └── Testimonials.astro
│   │   ├── ContactForm/
│   │   │   └── ContactForm.astro
│   │   ├── WhatsApp/
│   │   │   └── WhatsAppWidget.astro
│   │   ├── ProgressBar/
│   │   │   └── ProgressBar.astro
│   │   ├── ThemeToggle/
│   │   │   └── ThemeToggle.astro
│   │   └── Footer/
│   │       └── Footer.astro
│   │
│   ├── content/
│   │   ├── config.ts             ← Content Collections schema
│   │   └── equipment/
│   │       ├── 50t-mobile-crane.mdx
│   │       └── 12m-scissor-lift.mdx
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro           ← Home
│   │   ├── fleet/
│   │   │   ├── index.astro       ← Fleet overview
│   │   │   ├── cranes.astro
│   │   │   ├── man-cranes.astro
│   │   │   └── [slug].astro      ← Dynamic equipment detail
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   │
│   ├── scripts/
│   │   ├── theme.js              ← Anti-flash theme init
│   │   ├── filter.js             ← Fleet filter
│   │   └── form.js               ← Contact form handling
│   │
│   └── styles/
│       ├── global.css            ← CSS variables + reset + base styles
│       ├── typography.css
│       └── utilities.css
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```

---

*PRD v2.0 — Enhanced by analysis of v1.0 with additions: dual theme system (CSS custom properties), dark/light theme toggle with anti-flash strategy, full design token system, Astro Content Collections schema, equipment detail pages, mobile sticky CTA bar, analytics events, CI/CD pipeline, Lighthouse CI gates, 3-phase roadmap, and complete component interface specifications.*
