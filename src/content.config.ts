import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const equipment = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/equipment' }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            category: z.enum(['crane', 'man-crane']),
            slug: z.string(),
            mainImage: image(),
            galleryImages: z.array(image()).optional(),
            specs: z.object({
                maxLoad: z.string().optional(),
                maxHeight: z.string().optional(),
                boomLength: z.string().optional(),
                powerSource: z.enum(['diesel', 'electric', 'hybrid']).optional(),
                workArea: z.string().optional(),
            }),
            availability: z.enum(['available', 'limited', 'contact']),
            featured: z.boolean().default(false),
            sortOrder: z.number(),
            description: z.string(),
            useCases: z.array(z.string()),
        }),
});

export const collections = { equipment };
