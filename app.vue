<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<!-- <script setup>
import { useI18n } from "#imports";

const { locales, setLocale, locale } = useI18n();
const saved = useCookie("app-locale").value;

// if (saved && locales.value.some((l) => l.code === saved)) {
//   setLocale(saved);
//   console.log("main lang===============", saved);
// }
import { onMounted } from "vue";

onMounted(() => {
  if (
    saved &&
    locales.value.some((l) => l.code === saved) &&
    saved !== locale.value
  ) {
    setLocale(saved);
    console.log("main lang===============", saved);
  }
});
</script> -->
<!-- <script setup>
import { useI18n, useCookie } from '#imports';

const { locales, setLocale, locale } = useI18n();
const saved = useCookie('app-locale').value;

if (saved && locales.value.some(l => l.code === saved) && saved !== locale.value) {
  setLocale(saved);
  console.log("main lang===============", saved);
}
</script> -->
