// i18n.config.ts
// export default {
//   fallbackLocale: "en",
//   missingWarn: true,
//   fallbackWarn: true,

//   messages: {
//     en: { login: "Login", user: "User" },
//     la: { login: "ລັອກອິນ", user: "ຜູ້ໃຊ້" },
//     zh: { login: "登录", user: "用户" },
//   },
// };
export default defineI18nConfig(() => ({
  legacy: false, // composition API mode
  globalInjection: true
}))