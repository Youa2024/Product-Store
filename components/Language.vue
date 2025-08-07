<template>
  <v-select
    :style="{ color: 'white' }"
    v-model="selectedLocale"
    :items="availableLocales"
    item-title="name"
    item-value="code"
    label="Language"
    variant="outlined"
    class="w-30"
  />
</template>

<script setup>
import { useI18n } from '#imports'

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  (locales.value || []).map((l) => ({
    code: l.code,
    name: l.name,
  }))
)

const selectedLocale = computed({
  get: () => locale.value,
  set: (val) => {
    setLocale(val)
    console.log('🌍 Locale changed to:', val)
  },
})
</script>