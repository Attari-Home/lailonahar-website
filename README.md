# Lail O Nahar Machinery Rentals 🏗️

A modern, ultra-fast static website for **Lail O Nahar Machinery Rentals** — a heavy equipment and
man-crane rental service operating across the UAE (Dubai, Sharjah, Ajman, Abu Dhabi, Al Ain, Fujairah, Ras Al Khaimah, Umm Al Quwain).

Engineered for **maximum local SEO performance** and lead generation. It delivers the smooth,
page-less feel of an SPA without the heavy JavaScript payload, targeting perfect Core Web Vitals.

## 🚀 Tech Stack

| Layer         | Technology                                                     |
| ------------- | -------------------------------------------------------------- |
| Framework     | [Astro 5](https://astro.build/) (SSG)                          |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) + CSS design tokens |
| Routing       | Astro View Transitions (SPA-like)                              |
| Interactivity | Vanilla JS (theme, filter, carousel, form)                     |
| Icons         | astro-icon + Phosphor (`@iconify-json/ph`)                     |
| Images        | `astro:assets` (auto WebP/AVIF, responsive)                    |
| Forms         | [Web3Forms](https://web3forms.com)                             |
| Content       | Astro Content Collections (MDX)                                |
| Hosting       | Cloudflare Pages                                               |

## 🎯 Key Features

- **Dual theme system** — light/dark with anti-flash init and `localStorage` persistence.
- **Zero-JS by default** — ships raw HTML/CSS; tiny progressive-enhancement scripts only.
- **Localized UAE SEO** — `LocalBusiness` + `Product` JSON-LD, canonical, OG/Twitter meta, sitemap.
- **Fleet content collections** — type-safe MDX with auto-optimised imagery and detail pages.
- **Lead capture** — validated contact form, floating WhatsApp widget, mobile sticky CTA bar.

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env   # then add your Web3Forms key

# 3. Start the dev server
npm run dev            # http://localhost:4321
```

### Scripts

| Command           | Action                                              |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start local dev server                              |
| `npm run build`   | Type-check (`astro check`) and build to `dist/`     |
| `npm run preview` | Preview the production build                        |
| `npm run format`  | Format source with Prettier                         |

## 🗂️ Project Structure

```
public/            Static assets served as-is (videos, robots.txt, favicon, _headers)
src/
  assets/          Images processed by astro:assets (fleet, hero, about, og, gallery)
  components/      UI components (Header, Hero, FleetCard, ContactForm, …)
  content/         Content Collections — equipment MDX entries
  data/            Site config & business data (site.ts)
  layouts/         BaseLayout.astro
  pages/           File-based routes (index, fleet/*, about, contact, 404)
  styles/          global.css — design tokens, reset, components
```

## ⚙️ Configuration

- **Business details** (phone, email, address, socials): `src/data/site.ts`
- **Equipment / fleet**: add an `.mdx` file under `src/content/equipment/`
- **Theme tokens**: `src/styles/global.css`
- **Environment variables**: see `.env.example`

## 🚢 Deployment

Pushes to `main` trigger the Cloudflare Pages deploy workflow
(`.github/workflows/deploy.yml`). Configure these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `WEB3FORMS_KEY`
- `CF_BEACON_TOKEN` (optional, Cloudflare Web Analytics)

Build command: `npm run build` · Output directory: `dist`

## 🖼️ Asset Notes

- Fleet/hero/OG images live in `src/assets/` and are optimised at build time.
- Spare imagery sits in `src/assets/gallery/` for use on detail-page galleries.
- Videos are in `public/videos/`. **Raw clips can be large** — compress hero/background
  video to <= 5 MB (e.g. HandBrake CRF 28, 720p) and consider **Git LFS** for the
  `public/videos/` directory before committing large media.

## 📄 License

MIT — see [LICENSE](LICENSE).
