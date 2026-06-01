<template>
  <div
    class="mb-[62px] md:mb-0 inline-flex w-full flex-auto typography-text-sm flex-wrap md:flex-nowrap"
    :style="{
      color: footnoteTextColor,
      backgroundColor: footnoteBackgroundColor,
    }"
  >
    <!-- Footnote 1st column-->
    <div class="p-3 md:p-5 flex flex-row w-full justify-center items-center flex-wrap">
      <SfLink
        v-for="switchConfig in legalSwitchesResolved"
        :key="switchConfig.id"
        :tag="nuxtLinkResolved"
        class="p-4 py-2 inline-block whitespace-nowrap no-underline hover:underline active:underline"
        :style="{ color: footnoteTextColor || undefined }"
        variant="secondary"
        :to="localePathResolved(switchConfig.link)"
      >
        {{ switchConfig.translationKey }}
      </SfLink>
    </div>

    <!-- Footnote 2nd column-->
    <div class="p-3 md:p-5 flex flex-row w-full justify-center items-right flex-wrap md:justify-end">
      <div class="text-sm text-right" v-html="copyrightTextResolved + ' | ' + t('All rights reserved.')" />
      <div class="ml-4 text-sm text-right hover:cursor-pointer">
        {{ t('footer declaration') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLink } from '@storefront-ui/vue';
import type { ConcreteComponent } from 'vue';
import { FOOTER_SWITCH_DEFINITIONS } from './constants';

interface FooterFootnoteContent {
  footnoteBackgroundColor?: string;
  footnoteTextColor?: string;
  [key: string]: string | boolean | undefined;
}

interface FooterFootnoteLegalSwitch {
  id: string;
  translationKey: string;
  link: string;
}

interface FooterFootnotePropsLocal {
  content?: FooterFootnoteContent;
  colors?: {
    footnoteBackground?: string;
    footnoteText?: string;
  };
  legalSwitches?: FooterFootnoteLegalSwitch[];
  localePath?: (path: string) => string;
  nuxtLink?: string | ConcreteComponent;
  copyrightText?: string;
}

const props = defineProps<FooterFootnotePropsLocal>();

const { t } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

const localePathResolved = computed(() => props.localePath ?? localePath);
const nuxtLinkResolved = computed(() => props.nuxtLink ?? (resolveComponent('NuxtLink') as string | ConcreteComponent));

const footnoteBackgroundColor = computed(
  () => props.colors?.footnoteBackground ?? props.content?.footnoteBackgroundColor,
);

const footnoteTextColor = computed(
  () => props.colors?.footnoteText ?? props.content?.footnoteTextColor,
);

const legalSwitchesResolved = computed(() => {
  if (props.legalSwitches) {
    return props.legalSwitches;
  }

  const content = props.content;
  return FOOTER_SWITCH_DEFINITIONS.filter((switchConfig) => {
    if (switchConfig.columnGroup !== 'legal') return false;
    return content?.[switchConfig.key] !== false;
  }).map((switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: t(switchConfig.shopTranslationKey),
    link: switchConfig.link,
  }));
});

const copyrightTextResolved = computed(
  () => props.copyrightText ?? `© ${runtimeConfig.public.storename} ${new Date().getFullYear()}`,
);
</script>