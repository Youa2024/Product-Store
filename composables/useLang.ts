// // import { useI18n } from "#imports";
// // export const useLocale = () => {
// //   type LocaleCode = "en" | "la" | "zh" | "vn";
// //   const { locale, setLocale } = useI18n();
// //   const langCookie = useCookie<LocaleCode>("app-locale");

// //   // Apply cookie value on init (only client)
// //   if (process.client && langCookie.value&& langCookie.value !== locale.value) {
// //     setLocale(langCookie.value);
// //   }

// //   const changeLang = (val: LocaleCode) => {
// //     setLocale(val);
// //     langCookie.value = val;
// //     console.log("locale com========", langCookie.value);

// //   };
// //   return {
// //     locale,n
// //     langCookie,
// //     changeLang,
// //   };
// // };
// import { useI18n } from "#imports";

// Define allowed locales
// export type LocaleCode = "en" | "la" | "zh" | "vn";
//  const locoleLang = useCookie<string | null>("lang");
// export const useLocale = () => {
//   const { locale, setLocale } = useI18n();
//   const langCookie = useCookie<LocaleCode>("app-locale");

//   // Apply cookie on client init
//   if (process.client && langCookie.value && langCookie.value !== locale.value) {
//     setLocale(langCookie.value);
//   }
//   // Restore session from cookie
// //   const restoreSessiion = async () => {
// //     if (!locale.value && langCookie.value !== locale.value) {
// //       const lang = langCookie.value;
// //       locale.value = lang;
// //       console.log("lang cookie======",locale.value);
      
// //     }
// //   };
//   const changeLocale = (val: LocaleCode) => {
//     setLocale(val);
//     langCookie.value = val;
//     locoleLang.value=val;
//     console.log("locoleLang.value==========",locoleLang.value);
    
//   };

//   return {
//     locale,
//     langCookie,
//     changeLocale,
    
//     locoleLang
//   };
// };
