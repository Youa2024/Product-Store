// plugins/vuetify.ts
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import colors from "vuetify/util/colors";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "#app";
import "vuetify/styles";
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "myCustomTheme",

      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
          },
        },
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi },
    },
    defaults: {
      global: {
        ripple: false, // example global override
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
        clearable: true,
        color: "primary",
      },
      VBtn: {
        variant: "flat",
        color: "primary",
        rounded: "lg",
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
