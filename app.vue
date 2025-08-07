<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
watch(locale, (newLocale) => {
  useHead({
    htmlAttrs: {
      lang: newLocale,
    },
  });
});
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@700&display=swap",
    },
  ],

  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
<style>
html[lang="la"] body {
  font-family: "Noto Sans Lao", sans-serif;
  font-weight: 700;
}

html[lang="zh"] body {
  font-family: "Noto Sans Simplified Chinese", sans-serif;
}

html[lang="en"] body {
  font-family: "Noto Serif Ottoman Siyaq", serif;
}
</style>
