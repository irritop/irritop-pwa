<template>
  <div v-for="(group, groupIndex) in variationPropertyGroups" :key="`group-${groupIndex}`">
    <template v-for="(variationProperty, propIndex) in group.properties" :key="`group-prop-${propIndex}`">
      <div v-if="propertyHasNameOrValue(variationProperty)" class="flex items-center variation-properties">
        <ClientOnly>
          <Component
            :is="componentsMapper[mapTemplate(variationProperty)]"
            v-if="componentsMapper[mapTemplate(variationProperty)]"
            :variation-property="variationProperty"
          />
        </ClientOnly>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productPropertyGetters } from '@plentymarkets/shop-api';
import type { Product, VariationProperty } from '@plentymarkets/shop-api';
import type { VariationPropertiesProps, ComponentsMapper } from './types';
import VariationPropertyText from '~/components/VariationPropertyText/VariationPropertyText.vue';
import VariationPropertyHtml from '~/components/VariationPropertyHtml/VariationPropertyHtml.vue';
import VariationPropertyDate from '~/components/VariationPropertyDate/VariationPropertyDate.vue';
import VariationPropertyFile from '~/components/VariationPropertyFile/VariationPropertyFile.vue';
import VariationPropertyValue from './VariationPropertyValue.vue';
const props = defineProps<VariationPropertiesProps>();

// NK We exclude 'Variation Title' from properties that will be printed with Variation properties.
// Use VariationPropertyValue template if Bullet Points
const bulletPointNames = new Set([
  'Bullet Point 1',
  'Bullet Point 2',
  'Bullet Point 3',
  'Bullet Point 4',
  'Bullet Point 5',
]);

// mapTemplate will get the template name for the variation property. If the property is a bullet point, it will return 'value' to use the VariationPropertyValue template, otherwise it will return the cast of the property.
const mapTemplate = (variationProperty: VariationProperty) => {
  const propertyName = productPropertyGetters.getPropertyName(variationProperty);

  if (bulletPointNames.has(propertyName ?? '')) {
    return 'value';
  }

  return productPropertyGetters.getPropertyCast(variationProperty);
};

const propertyHasNameOrValue = (variationProperty: VariationProperty) => {
  const name = productPropertyGetters.getPropertyName(variationProperty);
  const value = productPropertyGetters.getPropertyValue(variationProperty);

  if (name !== "Variation Title") {
    return name || value;
  }

  return null;
};
// NK end

const variationPropertyGroups = computed(() => productGetters.getPropertyGroups(props.product ?? ({} as Product)));

const componentsMapper: ComponentsMapper = {
  text: VariationPropertyText,
  int: VariationPropertyText,
  float: VariationPropertyText,
  file: VariationPropertyFile,
  string: VariationPropertyText,
  html: VariationPropertyHtml,
  date: VariationPropertyDate,
  value: VariationPropertyValue,
};
</script>
