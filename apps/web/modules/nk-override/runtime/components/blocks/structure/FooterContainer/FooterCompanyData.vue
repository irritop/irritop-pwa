<template>
  <div>
    <NuxtImg
      class="h-[37px]"
      src="https://cdn1.irritop.com/frontend/images/logo/Logo22_black.svg"
      alt="Irritop GmbH"
      height="37"
    />
    <div class="text-lg font-medium my-2">{{ t('Join Our Social Network:') }}</div>
    <div class="text-sm inline-flex gap-2">
      <Icon name="fa6-brands:square-facebook" size="35px" />
      <Icon name="fa6-brands:square-x-twitter" size="35px" />
    </div>
    <div class="text-lg mt-2">{{ t('Contact Informations') }}</div>
    <div class="text-sm mt-1">
      <p>Irritop GmbH</p>
      <p>{{ t('Ohmstraße 7, 10179 Berlin, Germany') }}</p>
      <p><a href="mailto:info@irritop.com">info@irritop.com</a></p>
    </div>
  </div>
  <div class="text-lg font-medium mt-3">
    <span>Hotline: &nbsp;</span> <a href="tel:+493030806982">+49 (0) 30 30806982</a>
  </div>
  <div class="text-sm mt-1">
    <span>{{ t('Montag - Freitag, 09:00 - 15:00') }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
