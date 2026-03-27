import { useLogger, defineNuxtModule } from '@nuxt/kit';
//  import type { TailwindColors } from './types';
// import type { Config as TailwindConfig } from 'tailwindcss/types/config';
// import type { NuxtPage } from "@nuxt/schema";

export default defineNuxtModule({
  meta: {
    name: 'nk-blocks',
    configKey: 'nk-blocks',
  },
  async setup(options, nuxt) {
    // const { resolve } = createResolver(import.meta.url);
    const logger = useLogger('NK pwa-module-boilerplate');

    /**
     * Ready hook to log a message when the module is ready
     */
    nuxt.hook('ready', () => {
      logger.info('Blocks module is loaded');
    });

  },
});
