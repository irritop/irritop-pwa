import { createResolver, defineNuxtModule } from '@nuxt/kit';
import type { Config as TailwindConfig } from 'tailwindcss/types/config';
import type { TailwindColors } from './types';


export default defineNuxtModule({
    meta: {
        name: 'nk-override',
    },
    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        /**
         * Hook to modify the TailwindCSS configuration
         */
        nuxt.hook('tailwindcss:config', (config: Partial<TailwindConfig>) => {

        // Add the runtime components to the TailwindCSS content to enable Tailwind classes in the components
        if (config.content && Array.isArray(config.content)) {
            (config.content as string[]).push(resolve('./runtime/components/**/*.{vue,mjs,ts}'));
            (config.content as string[]).push(resolve('./runtime/**/*.{mjs,js,ts}'));
        }

        // Override the primary-500 color
        if (config?.theme?.extend?.colors) {
            (config.theme.extend.colors as TailwindColors)['primary']['500'] = '#d0d0d0';
        }
        });
    },
});