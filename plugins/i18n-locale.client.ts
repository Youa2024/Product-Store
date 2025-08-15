// plugins/i18n-init.global.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    setup() {
      const { locales, setLocale, locale } = useI18n();
      const savedLocale = useCookie('app-locale').value;
      if (savedLocale && locales.value.some(l => l.code === savedLocale)) {
        setLocale(savedLocale as typeof locale.value);
      }
    }
  });
});
