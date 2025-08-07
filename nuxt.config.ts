// https://nuxt.com/docs/api/configuration/nuxt-config

import tsconfigPaths from "vite-tsconfig-paths";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "vuetify/styles",
    "@/assets/css/fonts.css",
    "@/assets/css/main.css",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [tsconfigPaths()],
    define: {
      "process.env.DEBUG": false,
    },
  },

  modules: ["@nuxtjs/i18n", "@nuxt/fonts", "nuxt-auth-utils", "@pinia/nuxt"],
  i18n: {
    langDir: "locales/",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "la", name: "Lao", file: "la.json" },
      { code: "zh", name: "Chinese", file: "zh.json" },
      { code: "vn", name: "Vietnamese", file: "vn.json" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },

  app: {
    head: {
      title: "LDB Border",
      link: [
        {
          rel: "icon",
          type: "image/png", // or 'image/x-icon' for .ico
          href: "/ldb-logo.png",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000", // accessible on client + server
    },
  },
});
