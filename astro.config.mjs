// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://lailonahar.ae',
    trailingSlash: 'ignore',
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport',
    },
    integrations: [
        icon({
            iconDir: 'src/icons',
        }),
        sitemap(),
        mdx(),
    ],
    image: {
        // Allow astro:assets to generate modern formats.
        responsiveStyles: true,
    },
    vite: {
        // Cast avoids a duplicate-Vite type mismatch between the Tailwind plugin and Astro's Vite.
        plugins: [/** @type {any} */ (tailwindcss())],
        resolve: {
            dedupe: ['vite'],
        },
    },
});
