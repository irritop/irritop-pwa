<template>
  <footer
    v-if="resolvedContent"
    class="pt-10"
    :style="{
      backgroundColor: resolvedContent.colors?.background,
      color: resolvedContent.colors?.text,
    }"
    data-testid="footer"
  >
  <!-- Footer -->
    <div class="px-4 md:px-6 pb-10 max-w-screen-3xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Footer 1rst column -->
        <div v-if="getColumnSwitches(resolvedContent.column1).length" class="max-w-[280px] break-words">
          <div class="ml-4 text-lg font-medium leading-7">
            {{ resolvedContent.column1?.title }}
          </div>
        </div>
        <!-- Footer 2nd, 3rd, 4th columns with a loop -->
        <div
          v-for="(column, i) in [resolvedContent.column2, resolvedContent.column3, resolvedContent.column4]"
          :key="i"
          class="max-w-[280px] break-words"
        >
          <div class="ml-4 text-lg font-medium leading-7">
            {{ column?.title }}
          </div>
          <div v-if="getColumnSwitches(column).length" class="text-sm">
            <ul>
              <SfListItem
                v-for="switchConfig in getColumnSwitches(column)"
                :key="switchConfig.id"
                class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 px-4 py-2 !bg-transparent typography-text-sm"
              >
                <SfLink
                  :tag="NuxtLink"
                  variant="secondary"
                  class="no-underline text-neutral-900 hover:cursor-pointer hover:underline active:underline"
                  :style="{ color: resolvedContent.colors?.text }"
                  :to="localePath(switchConfig.link)"
                >
                  {{ switchConfig.translationKey }}
                </SfLink>
              </SfListItem>
            </ul>
          </div>
          <div
            v-if="column?.description"
            class="custom-html ml-4 text-sm hover:cursor-pointer"
            v-html="column.description"
          />
        </div>
      </div>
    </div>
  <!-- Footnote -->
    <div
      class="mb-[62px] md:mb-2 inline-flex w-full flex-auto typography-text-sm flex-wrap md:flex-nowrap"
      :style="{
        color: resolvedContent.colors?.footnoteText,
        backgroundColor: resolvedContent.colors?.footnoteBackground,
      }"
    >
      <!-- Footnote 1st column-->
      <div class="p-5 flex flex-row w-full justify-center items-center flex-wrap">
        <SfLink
          v-for="switchConfig in getColumnSwitches(resolvedContent.column1)"
          :key="switchConfig.id"

          :tag="NuxtLink"
          :style="{ color: resolvedContent.colors?.text || undefined }"
          class="p-4 py-2 inline-block whitespace-nowrap no-underline hover:underline active:underline"
          variant="secondary"
          :to="localePath(switchConfig.link)"
        >
          {{ switchConfig.translationKey }}
        </SfLink>
      </div>
      <!-- Footnote 2nd column-->
      <div class="w-full p-3">
        <div
        v-if="resolvedContent.footnote && resolvedContent.footnote.trim() !== ''"
        class="text-sm py-10 md:py-6 px-10 text-right"
        :class="{
          'text-left': resolvedContent.footnoteAlign === 'left',
          'text-center': resolvedContent.footnoteAlign === 'center',
          'text-right': resolvedContent.footnoteAlign === 'right',
        }"
        v-html="resolvedContent.footnote"
        />
        <div
            v-if="resolvedContent.footnoteDescription && resolvedContent.footnoteDescription.trim() !== ''"
            class="custom-html ml-4 text-sm hover:cursor-pointer"
            v-html="resolvedContent.footnoteDescription"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SfLink, SfListItem } from '@storefront-ui/vue';
import type { FooterProps, FooterSettingsColumn } from './types';
import type { ExtendedFooterSettings } from './../../../composables/useExtendedFooterSettings';
import { mapExtendedFooterData } from './../../../composables/useExtendedFooterSettings';

const props = defineProps<FooterProps>();
const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
const { getFooterSettings, footerCache, FOOTER_SWITCH_DEFINITIONS } = useFooter();
const resolvedContent = ref<ExtendedFooterSettings | null>(null);
let stopWatch: (() => void) | null = null;

onMounted(() => {
  stopWatch = watch(
    [() => props.content, footerCache],
    () => {
      const content = props.content ?? getFooterSettings();
      resolvedContent.value = mapExtendedFooterData(content);
    },
    { immediate: true, deep: true },
  );
});

onBeforeUnmount(() => {
  stopWatch?.();
});

const getColumnSwitches = (column: FooterSettingsColumn) => {
  return FOOTER_SWITCH_DEFINITIONS.filter((switchConfig) => column[switchConfig.key] === true).map((switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: t(switchConfig.shopTranslationKey),
    link: switchConfig.link,
    state: true,
  }));
};
</script>

<style scoped>
::v-deep(.custom-html li) {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

::v-deep(.custom-html li:hover) {
  text-decoration: underline;
}
</style>
