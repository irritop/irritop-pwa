<template>
  <div data-testid="footer-settings-drawer" class="block-footer-edit sticky h-[80vh] overflow-y-auto">
    <div v-if="!editingBlock" class="space-y-0">
      <EditorGridElementsPanel
        v-model="elementsOpen"
        :uuid="footerUuid"
        :min-items="1"
        :quick-add-options="footerQuickAddOptions"
        @edit-element="editElement"
      />



      <EditorFormPanel
        v-model="colorsOpen"
        :title="getEditorTranslation('colors-group-label')"
        data-testid="color-column-section"
      >
        <div class="py-2">
          <div class="flex justify-between mb-2">
            <UiFormLabel>{{ getEditorTranslation('colors-background-label') }}</UiFormLabel>
          </div>
          <EditorColorPicker v-model="backgroundColor" class="w-full">
            <template #trigger="{ color, toggle }">
              <label>
                <SfInput v-model="backgroundColor" type="text" data-testid="footer-bg-color-select">
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
            <UiFormLabel>{{ getEditorTranslation('colors-text-label') }}</UiFormLabel>
          </div>
          <EditorColorPicker v-model="textColor" class="w-full">
            <template #trigger="{ color, toggle }">
              <label>
                <SfInput v-model="textColor" type="text" data-testid="footer-text-color-select">
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
        data-testid="legal-options-section"
      >
        <div class="py-2">
          <div class="flex justify-between mb-2">
            <UiFormLabel class="mb-1">{{ getEditorTranslation("show-footnote") }}</UiFormLabel>
            <SfSwitch
              v-model="showFootnote"
              data-testid="show-footnote"
              class="checked:bg-editor-button checked:before:hover:bg-editor-button checked:border-gray-500 checked:hover:border:bg-gray-700 hover:border-gray-700 hover:before:bg-gray-700 checked:hover:bg-gray-300 checked:hover:border-gray-400"
            />
          </div>
        </div>
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
    <div v-else class="space-y-0">
      <component :is="blockForm" ref="innerFormRef" :uuid="editingBlock.meta.uuid" />
    </div>






  </div>
</template>

<script setup lang="ts">
import type { Block } from '@plentymarkets/shop-api';
// NK imports
import { SfInput, SfSwitch } from '@storefront-ui/vue';
import type { FooterContainerBlock } from './types';
import { FOOTER_SWITCH_DEFINITIONS } from './constants';




const { footer } = useBlocks();
const { setEditTitle, clearEditTitle } = useBlockEditTitle();

const innerFormRef = ref<{ exitEditMode?: (shouldEmit?: boolean) => void; isSubEditing?: boolean } | null>(null);

const elementsOpen = ref(true);

const colorsOpen = ref(true);
const { editingBlock, blockForm } = useNestedBlockForm();

const footerContainer = computed(() => (footer.value ?? {}) as FooterContainerBlock);
const footerUuid = computed(() => footerContainer.value.meta?.uuid);


const backgroundColor = computed({
  get: () => footerContainer.value.configuration?.colors?.background ?? '',
  set: (value: string) => {
    if (!footerContainer.value.configuration) {
      footerContainer.value.configuration = { visible: true };
    }
    if (!footerContainer.value.configuration.colors) {
      footerContainer.value.configuration.colors = {
        background: '',
        text: '',
        footnoteBackground: '',
        footnoteText: '',
      };
    }
    footerContainer.value.configuration.colors.background = value;
  },
});

const textColor = computed({
  get: () => footerContainer.value.configuration?.colors?.text ?? '',
  set: (value: string) => {
    if (!footerContainer.value.configuration) {
      footerContainer.value.configuration = { visible: true };
    }
    if (!footerContainer.value.configuration.colors) {
      footerContainer.value.configuration.colors = {
        background: '',
        text: '',
        footnoteBackground: '',
        footnoteText: '',
      };
    }
    footerContainer.value.configuration.colors.text = value;
  },
});

const footnoteBackgroundColor = computed({
  get: () => footerContainer.value.configuration?.colors?.footnoteBackground ?? '',
  set: (value: string) => {
    if (!footerContainer.value.configuration) {
      footerContainer.value.configuration = { visible: true };
    }
    if (!footerContainer.value.configuration.colors) {
      footerContainer.value.configuration.colors = {
        background: '',
        text: '',
        footnoteBackground: '',
        footnoteText: '',
      };
    }
    footerContainer.value.configuration.colors.footnoteBackground = value;
  },
});

const footnoteTextColor = computed({
  get: () => footerContainer.value.configuration?.colors?.footnoteText ?? '',
  set: (value: string) => {
    if (!footerContainer.value.configuration) {
      footerContainer.value.configuration = { visible: true };
    }
    if (!footerContainer.value.configuration.colors) {
      footerContainer.value.configuration.colors = {
        background: '',
        text: '',
        footnoteBackground: '',
        footnoteText: '',
      };
    }
    footerContainer.value.configuration.colors.footnoteText = value;
  },
});

const editElement = (block: Block) => {
  editingBlock.value = block;
  setEditTitle(getBlockDisplayName(block.name), block.meta.uuid);
};

const exitEditMode = (shouldEmit = true): boolean => {
  if (innerFormRef.value?.isSubEditing && innerFormRef.value?.exitEditMode) {
    innerFormRef.value.exitEditMode(false);
    if (editingBlock.value) {
      setEditTitle(getBlockDisplayName(editingBlock.value.name), editingBlock.value.meta.uuid);
    }
    return false;
  }

  editingBlock.value = null;
  if (shouldEmit) {
    clearEditTitle();
  }
  return true;
};


// NK computed
const legalOptionsOpen = ref(true);
const footerLegalOptions = computed(() => footerContainer.value.configuration?.legalOptions);

const showFootnote = computed({
  get: () => footerContainer.value.configuration?.showFootnote ?? true,
  set: (value: boolean) => {
    if (!footerContainer.value.configuration) {
      footerContainer.value.configuration = { visible: true };
    }
    footerContainer.value.configuration.showFootnote = value;
  },
});

const legalSwitches = FOOTER_SWITCH_DEFINITIONS.filter((config) => config.columnGroup === 'legal').map(
  (switchConfig) => ({
    id: `${switchConfig.key}-switch`,
    translationKey: switchConfig.editorTranslationKey,
    model: computed({
      get: () => Boolean(footerLegalOptions.value?.[switchConfig.key]),
      set: (value: boolean) => {
        if (!footerContainer.value.configuration) {
          footerContainer.value.configuration = { visible: true };
        }
        if (!footerContainer.value.configuration.legalOptions) {
          footerContainer.value.configuration.legalOptions = { title: '' };
        }
        footerContainer.value.configuration.legalOptions[switchConfig.key] = value;
      },
    }),
  }),
);

defineExpose({ exitEditMode });
</script>

<i18n lang="json">
{
  "en": {
    "legal-options-group-label": "Legal options",
    "column-1-terms-and-conditions-label": "Show Terms and Conditions link",
    "column-1-cancellation-rights-label": "Show Cancellation Rights link",
    "column-1-legal-disclosure-label": "Show Legal Disclosure link",
    "column-1-privacy-policy-label": "Show Privacy Policy link",
    "column-1-declaration-of-accessibility-label": "Show Declaration of Accessibility link",
    "colors-group-label": "Colour",
    "colors-background-label": "Background colour",
    "colors-text-label": "Text colour",
    "colors-footnote-background-label": "Footnote background colour",
    "colors-footnote-text-label": "Footnote text colour",
    "show-footnote": "Show NK footnote"
  },
  "de": {
    "legal-options-group-label": "Legal options",
    "column-1-terms-and-conditions-label": "Show Terms and Conditions link",
    "column-1-cancellation-rights-label": "Show Cancellation Rights link",
    "column-1-legal-disclosure-label": "Show Legal Disclosure link",
    "column-1-privacy-policy-label": "Show Privacy Policy link",
    "column-1-declaration-of-accessibility-label": "Show Declaration of Accessibility link",
    "colors-group-label": "Colour",
    "colors-background-label": "Background colour",
    "colors-text-label": "Text colour",
    "colors-footnote-background-label": "Footnote background colour",
    "colors-footnote-text-label": "Footnote text colour",
    "show-footnote": "Show NK footnote"
  }
}
</i18n>