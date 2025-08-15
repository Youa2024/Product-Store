<template>
  <ClientOnly fallback-tag="div">
    <VApp>
      <VAppBar class="app-bar-image" flat v-if="userData != null">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
          color="white"
        ></v-app-bar-nav-icon>

        <v-toolbar-title
          ><p class="text-white">
            {{ $t("border") }}
            <b>( {{ $t("user") }}: {{ user }} )</b>
          </p></v-toolbar-title
        >

        <div class="text-white">
          <v-avatar size="x-large" color="white">
            <v-img alt="Johnfff" :src="userData.imagePath"></v-img> </v-avatar
          ><br />
        </div>

        <Mbtn
          color="white"
          icon="mdi-logout"
          label="Logout"
          @click="handleLogout"
        ></Mbtn>
      </VAppBar>
      <VNavigationDrawer
        :image="logo"
        theme="dark"
        permanent
        :width="400"
        v-model="drawer"
        v-if="userData != null"
        class="custom-scroll"
        app
      >
        <div>
          <v-list
            v-for="user in userData.menu"
            :key="user.menuLo"
            :to="user.menuPath"
            nav
          >
            <v-list-group>
              <template #activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title
                    ><v-icon size="30" class="mr-3">{{ user.iconMenu }}</v-icon
                    >{{ user.menuLo }}</v-list-item-title
                  >
                </v-list-item>
              </template>

              <v-list-item
                v-for="child in user.childMenu"
                :key="child.childMenuId"
              >
                <v-list-item-title>
                  <v-icon class="mr-3">{{ child.childIconMenu }}</v-icon
                  >{{ child.childMenuLo }}</v-list-item-title
                >
              </v-list-item>
            </v-list-group>
          </v-list>
        </div>
      </VNavigationDrawer>
      <VMain class="d-flex" style="min-height: 100vh">
        <!-- <NuxtPage /> -->
        <slot />
      </VMain>
    </VApp>
  </ClientOnly>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "#imports";
import logo from "@/public/bg_login_biz.png";
const drawer = ref(true);

import { watch } from "vue";

const { user, userData, logout } = useAuth();

const { locale, setLocale } = useI18n();
onMounted(() => {
  const saved = localStorage.getItem("lang");
  if (saved) setLocale(saved);
  // console.log("default========", langCookie.value);
  if (userData.value == null) {
    if (process.client) {
      const stored = localStorage.getItem("userData");
      userData.value = stored ? JSON.parse(stored) : null;
    }
  } else {
    userData.value == null;
  }
});

const handleLogout = async () => {
  logout();
  await navigateTo("/login"); // clears everything in the browser
};

const fontLinks = {
  // la: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@700&display=swap",Saysettha OT
  la: "Saysettha OT, sans-serif",
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+Simplified+Chinese&display=swap",
  en: "https://fonts.googleapis.com/css2?family=Noto+Serif+Ottoman+Siyaq&display=swap",
  vi: "https://fonts.googleapis.com/css2?family=Noto+Serif+Ottoman+Siyaq&display=swap",
};

watch(
  locale,
  (newLocale) => {
    useHead({
      link: [
        {
          rel: "stylesheet",
          href: fontLinks[newLocale] || fontLinks.en,
        },
      ],
      htmlAttrs: {
        lang: newLocale,
        style: `font-size:20px`,
      },
    });
  },
  { immediate: true }
);

useHead({
  link: [
    {
      rel: "stylesheet",
      href: fontLinks[locale.value] || fontLinks.en,
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
<style scoped>
.app-bar-image {
  background-image: url("@/public/bg_login_biz.png");
  background-size: cover;
  background-position: center;
}
.custom-scroll {
  max-height: 100%; /* or 100% if drawer is scrollable */
  overflow-y: auto;
}

/* For WebKit browsers: Chrome, Edge, Safari */
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #6882f5;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #50cadd;
  border-radius: 4px;
  border: 2px solid #4387ec;
}

/* For Firefox */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #f6f8fa #0b3252;
}
</style>
