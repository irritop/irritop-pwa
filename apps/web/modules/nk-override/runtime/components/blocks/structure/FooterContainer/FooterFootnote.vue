<template>
  <div
    v-if="showFootnote"
    class="mb-[62px] md:mb-2 inline-flex w-full flex-auto typography-text-sm flex-wrap md:flex-nowrap"
    :style="{
      color: colors?.footnoteText,
      backgroundColor: colors?.footnoteBackground,
    }"
  >
    <!-- Footnote 1st column-->
    <div class="p-3 md:p-5 flex flex-row w-full justify-center items-center flex-wrap">
      <SfLink
        v-for="switchConfig in legalSwitches"
        :key="switchConfig.id"
        :tag="NuxtLink"
        class="p-4 py-2 inline-block whitespace-nowrap no-underline hover:underline active:underline"
        :style="{ color: colors?.footnoteText || undefined }"
        variant="secondary"
        :to="localePath(switchConfig.link)"
      >
        {{ switchConfig.translationKey }}
      </SfLink>
    </div>

    <!-- Footnote 2nd column-->
    <div class="p-3 md:p-5 flex flex-row w-full justify-center items-right flex-wrap md:justify-end">
      <div class="text-sm text-right" v-html="copyrightText + ' | ' + t('All rights reserved.')" />
      <div class="ml-4 text-sm text-right hover:cursor-pointer">
        {{ t('footer declaration') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLink } from '@storefront-ui/vue';
import type { ConcreteComponent } from 'vue';

defineProps<{
  showFootnote: boolean;
  colors?: {
    footnoteBackground?: string;
    footnoteText?: string;
  };
  legalSwitches: Array<{
    id: string;
    translationKey: string;
    link: string;
  }>;
  localePath: (path: string) => string;
  NuxtLink: string | ConcreteComponent;
  copyrightText: string;
}>();

const { t } = useI18n();
</script>
