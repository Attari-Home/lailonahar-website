/**
 * Filesystem-driven media discovery.
 *
 * Drop files into the managed folders and they appear automatically — no code
 * changes needed:
 *   • Hero images  → src/assets/hero/*       (optimized via astro:assets)
 *   • Hero videos  → public/hero/*           (served as-is)
 *   • Gallery imgs → src/assets/gallery/*    (optimized via astro:assets)
 *   • Gallery vids → public/videos/*         (served as-is, first-frame preview)
 */
import fs from 'node:fs';
import path from 'node:path';
import type { ImageMetadata } from 'astro';

export type HeroSlide =
  | { type: 'image'; image: ImageMetadata; alt: string }
  | { type: 'video'; src: string; alt: string };

// Eagerly import + optimize every image in the managed src/assets folders.
// (import.meta.glob requires inline string literals, so the patterns are repeated.)
const heroImageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/hero/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true }
);
const galleryImageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true }
);

/** List files in a /public subfolder at build time (sorted, filtered by extension). */
function listPublicFiles(subdir: string, exts: RegExp): string[] {
  const abs = path.join(process.cwd(), 'public', subdir);
  try {
    return fs
      .readdirSync(abs)
      .filter((file) => exts.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function sortedImages(modules: Record<string, { default: ImageMetadata }>): ImageMetadata[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod]) => mod.default);
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/** Hero slides: optimized images first (fast LCP), then videos. */
export function getHeroSlides(): HeroSlide[] {
  const images: HeroSlide[] = sortedImages(heroImageModules).map((image) => ({
    type: 'image',
    image,
    alt: 'Lail O Nahar crane fleet operating across the UAE',
  }));

  const videos: HeroSlide[] = listPublicFiles('hero', VIDEO_EXT).map((file) => ({
    type: 'video',
    src: `/hero/${file}`,
    alt: 'Lail O Nahar crane operation',
  }));

  return [...images, ...videos];
}

export function getGalleryImages(): ImageMetadata[] {
  return sortedImages(galleryImageModules);
}

export function getGalleryVideos(): string[] {
  return listPublicFiles('videos', VIDEO_EXT).map((file) => `/videos/${file}`);
}
