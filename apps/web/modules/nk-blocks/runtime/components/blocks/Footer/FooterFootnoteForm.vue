<template>
  <div class="block-footer-footnote-edit">
    <EditorFormPanel
      v-model="colorsOpen"
      :title="getEditorTranslation('colors-group-label')"
      data-testid="footer-footnote-colors-section"
    >
      <div class="py-2">
        <div class="flex justify-between mb-2">
          <UiFormLabel>{{ getEditorTranslation('colors-footnote-background-label') }}</UiFormLabel>
        </div>
        <EditorColorPicker v-model="footnoteBackgroundColor" class="w-full">
          <template #trigger="{ color, toggle }">
            <label>
              <SfInput v-model="footnoteBackgroundColor" type="text" data-testid="footer-footnote-background-color-select">
                <template #suffix>
                  <button
                    type="button"
                    class="border border-[#a0a0a0] rounded-lg cursor-pointer w-10 h-8"
                    :style="{ backgroundColor: color }"
                    @mousedown.stop
                    @click.stop="toggle"
                  />
                </template>
              </SfInput>
            </label>
          </template>
        </EditorColorPicker>
      </div>

      <div class="py-2">
        <div class="flex justify-between mb-2">
          <UiFormLabel>{{ getEditorTranslation('colors-footnote-text-label') }}</UiFormLabel>
        </div>
        <EditorColorPicker v-model="footnoteTextColor" class="w-full">
          <template #trigger="{ color, toggle }">
            <label>
              <SfInput v-model="footnoteTextColor" type="text" data-testid="footer-footnote-text-color-select">
                <template #suffix>
                  <button
                    type="button"
                    class="border border-[#a0a0a0] rounded-lg cursor-pointer w-10 h-8"
                    :style="{ backgroundColor: color }"
                    @mousedown.stop
                    @click.stop="toggle"
                  />
                </template>
              </SfInput>
            </label>
          </template>
        </EditorColorPicker>
      </div>
    </EditorFormPanel>

    <EditorFormPanel
      v-model="legalOptionsOpen"
      :title="getEditorTranslation('legal-options-group-label')"
      data-testid="footer-footnote-legal-options-section"
    >
      <div v-for="switchConfig in legalSwitches" :key="switchConfig.id" class="py-2">
        <div class="flex justify-between mb-2">
          <UiFormLabel class="mb-1">{{ getEditorTranslation(switchConfig.translationKey) }}</UiFormLabel>
          <SfSwitch
            v-model="switchConfig.model.value"
            :data-testid="switchConfig.id"
            class="checked:bg-editor-button checked:before:hover:bg-editor-button checked:border-gray-500 checked:hover:border:bg-gray-700 hover:border-gray-700 hover:before:bg-gray-700 checked:hover:bg-gray-300 checked:hover:border-gray-400"
          />
        </div>
      </div>
    </EditorFormPanel>
  </div>
</template>

<script setup lang="ts">
import { SfInput } from '@storefront-ui/vue';
import type { FooterFootnoteBlock, FooterFootnoteFormProps } from './types';
import { FOOTER_SWITCH_DEFINITIONS } from './constants';

const props = defineProps<FooterFootnoteFormProps>();

const { blockUuid } = useSiteConfiguration();
const { allBlocks: data } = useBlocks();
const { findOrDeleteBlockByUuid } = useBlockManager();

const colorsOpen = ref(true);
const legalOptionsOpen = ref(true);

const footnoteBlock = computed(
  () => (findOrDeleteBlockByUuid(data.value, props.uuid || blockUuid.value) || {}) as FooterFootnoteBlock,
);

const ensureContent = () => {
  if (!footnoteBlock.value.content) {
    footnoteBlock.value.content = {};
  }
};

const footnoteBackgroundColor = computed({
  get: () => footnoteBlock.value.content?.footnoteBackgroundColor ?? '',
  set: (value: string) => {
    ensureContent();
    footnoteBlock.value.content.footnoteBackgroundColor = value;
  },
});

const footnoteTextColor = computed({
  get: () => footnoteBlock.value.content?.footnoteTextColor ?? '',
  set: (value: string) => {
    ensureContent();
    footnoteBlock.value.content.footnoteTextColor = value;
  },
});

const legalSwitches = FOOTER_SWITCH_DEFINITIONS.filter((config) => config.columnGroup === 'legal').map(
  (switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: switchConfig.editorTranslationKey,
    model: computed({
      get: () => footnoteBlock.value.content?.[switchConfig.key] !== false,
      set: (value: boolean) => {
        ensureContent();
        footnoteBlock.value.content[switchConfig.key] = value;
      },
    }),
  }),
);
</script>

<i18n lang="json">
{
  "en": {
    "colors-group-label": "Colors",
    "colors-footnote-background-label": "Footnote background color",
    "colors-footnote-text-label": "Footnote text color",
    "legal-options-group-label": "Legal options",
    "column-1-terms-and-conditions-label": "Show Terms and Conditions link",
    "column-1-cancellation-rights-label": "Show Cancellation Rights link",
    "column-1-legal-disclosure-label": "Show Legal Disclosure link",
    "column-1-privacy-policy-label": "Show Privacy Policy link",
    "column-1-declaration-of-accessibility-label": "Show Declaration of Accessibility link"
  },
  "de": {
    "colors-group-label": "Farben",
    "colors-footnote-background-label": "Footnote-Hintergrundfarbe",
    "colors-footnote-text-label": "Footnote-Textfarbe",
    "legal-options-group-label": "Rechtliche Optionen",
    "column-1-terms-and-conditions-label": "AGB-Link anzeigen",
    "column-1-cancellation-rights-label": "Widerrufsrecht-Link anzeigen",
    "column-1-legal-disclosure-label": "Impressum-Link anzeigen",
    "column-1-privacy-policy-label": "Datenschutz-Link anzeigen",
    "column-1-declaration-of-accessibility-label": "Erklärung zur Barrierefreiheit anzeigen"
  }
}
</i18n>
