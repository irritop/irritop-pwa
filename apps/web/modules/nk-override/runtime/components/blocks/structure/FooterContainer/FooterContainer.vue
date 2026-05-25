<template>
  <footer
    data-testid="footer"
    class="pt-10"
    :style="{
      backgroundColor: props.configuration?.colors?.background,
      color: props.configuration?.colors?.text,
    }"
  >
    <div
      v-for="(contentBlock, index) in props.content"
      :key="contentBlock.meta?.uuid ?? `footer-default-${index}`"
      :class="{
        'px-4 md:px-6 pb-10 max-w-screen-3xl mx-auto': contentBlock.name === 'MultiGrid',
      }"
    >
      <slot name="content" :content-block="contentBlock" />

      <UiBlockPlaceholder
        v-if="contentBlock.meta?.uuid && shouldDisplayPlaceholder(contentBlock.meta.uuid, 'bottom', drawerOpen, drawerView)"
      />
    </div>
    <FooterFootnote
      :show-footnote="showFootnote"
      :colors="props.configuration?.colors"
      :legal-switches="legalSwitches"
      :locale-path="localePath"
      :nuxt-link="NuxtLink"
      :copyright-text="copyrightText"
    />
  </footer>
</template>

<script setup lang="ts">
import type { FooterContainerProps } from './types';
import { FOOTER_SWITCH_DEFINITIONS } from './constants';
import FooterFootnote from './FooterFootnote.vue';

const props = defineProps<FooterContainerProps>();

const { shouldDisplayPlaceholder } = useBlockManager();

const { siteConfigurationDrawerOpen, siteConfigurationDrawerView } = useSiteConfiguration();

const drawerOpen = computed(() => siteConfigurationDrawerOpen.value);
const drawerView = computed(() => siteConfigurationDrawerView.value);

// NK const
const NuxtLink = resolveComponent('NuxtLink');
const localePath = useLocalePath();
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const { enableContractWithdrawalButton } = runtimeConfig.public;
const copyrightText = `© ${runtimeConfig.public.storename} ${new Date().getFullYear()}`;

const showFootnote = computed(() => props.configuration?.showFootnote ?? true);
const resolvedLegalOptions = computed(() => props.configuration?.legalOptions);

const legalSwitches = computed(() => {
  const column = resolvedLegalOptions.value;
  if (!column) return [];

  return FOOTER_SWITCH_DEFINITIONS.filter((switchConfig) => {
    if (switchConfig.columnGroup !== 'legal') return false;
    if (column[switchConfig.key] !== true) return false;

    return !(enableContractWithdrawalButton && switchConfig.key === 'showCancellationForm');
  }).map((switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: t(switchConfig.shopTranslationKey),
    link: switchConfig.link,
  }));
});

</script>

<style scoped>
:deep([data-testid='multi-grid-column']) {
  @apply break-words;
}

:deep([data-testid='multi-grid-column'] .rte-prose a) {
  @apply no-underline;
}

:deep([data-testid='multi-grid-column'] .rte-prose a:hover) {
  @apply underline;
}
</style>
