<template>
  <div class="w-full flex row variation-property-text">
    <span v-if="productPropertyGetters.getPropertyValue(variationProperty)" class="mr-1 min-w-5">
      {{ label }}
    </span> 
    <span v-if="productPropertyGetters.getPropertyValue(variationProperty)">
      {{ productPropertyGetters.getPropertyValue(variationProperty) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { productPropertyGetters } from '@plentymarkets/shop-api';
import type { VariationPropertyTextProps } from '~/components/VariationPropertyText/types';
defineProps<VariationPropertyTextProps>();

const label = '- ';
</script>