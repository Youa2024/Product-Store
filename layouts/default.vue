<template>
  <client-only>
    <v-card>
      <v-layout>
        <v-app-bar class="app-bar-image" flat v-if="showToolbar">
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
            color="white"
          ></v-app-bar-nav-icon>

          <v-toolbar-title
            ><p class="text-white">{{ $t("border") }} <b>( {{ $t("user") }}: {{ route.query.user }} )</b> </p></v-toolbar-title
          >

          <!-- <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text" color="white"></v-btn>

            <v-btn icon="mdi-filter" variant="text" color="white"></v-btn>
          </template> -->
          <div class="text-white"><v-avatar size="x-large" color="white">
            <v-img
              alt="Johnfff"
              :src="data.imagePath"
             
            ></v-img> 
          </v-avatar><br>
           </div>
          
          <Mbtn
            color="white"
            icon="mdi-logout"
            label="Logout"
            @click="logout"
          ></Mbtn>
        </v-app-bar>

        <v-layout>
          <v-navigation-drawer
            :image="logo"
            theme="dark"
            permanent
            :width="400"
            v-model="drawer"
            v-if="showToolbar"
            class="custom-scroll"
            app
          >
            <br /><br /><br />
            <div>
              <v-list
                v-for="user in data.menu"
                :key="user.menuLo"
                :to="user.menuPath"
                nav
              >
                <v-list-group>
                  <template #activator="{ props }">
                    <v-list-item v-bind="props">
                      <v-list-item-title
                        ><v-icon size="30" class="mr-3">{{
                          user.iconMenu
                        }}</v-icon
                        >{{ user.menuLo }}</v-list-item-title
                      >
                    </v-list-item>
                  </template>

                  <!-- :to="child.childMenuPath"
                  link -->
                  <v-list-item
                    v-for="child in user.childMenu"
                    :key="child.childMenuId"
                  >
                    <v-list-item-title>
                      <v-icon class="mr-3">{{ child.childIconMenu }}</v-icon
                      >{{ child.childMenuLo }}</v-list-item-title
                    >

                    <!-- <template #prepend>
                      <v-icon>{{ user.iconMenu }}</v-icon>
                    </template> -->
                  </v-list-item>
                </v-list-group>
              </v-list>
            </div>
          </v-navigation-drawer>
        </v-layout>

        <v-main class="d-flex flex-column" style="min-height: 100vh">
          <NuxtPage />
        </v-main>
      </v-layout> </v-card
  ></client-only>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useUserSession } from "../composables/useUser";
const { $axios } = useNuxtApp();
const { loggedIn, clearUse, setUser } = useUserSession();
console.log("login ==============", loggedIn.value);

import logo from "@/public/bg_login_biz.png";
const drawer = ref(true);
const isGroupOpen = ref(false);
const route = useRoute();
const { locale } = useI18n();
const data = ref("");
// function load menu
let hasRun = false;

onMounted(() => {
  // if (!hasRun) {
  console.log("======response data=======", data.value);
  hasRun = true;
  getvalue();
});
const getvalue = async () => {
  const headers = {
    lng: locale.value,
  };
  const body = {
    username: route.query.user,
    password: route.query.pw,
  };

  console.log("============================header============:", headers);
  console.log("============================header============:", body);
  const res = await $axios.post("/login", body, { headers });

  if (res.data.status == "00") {
    data.value = res.data.dataResponse;
    console.log("======response data=======", data.value);
    // } else {
    // }
  }
};
const showToolbar = computed(() => {
  return loggedIn.value;
});

const logout = () => {
  setUser(null);
  return navigateTo("/login");
};

const users = [
  {
    name: "John Doe",
    route: "/users/john",
    notifications: 3,
    icon: "mdi-account",
  },
  {
    name: "Jane Smith",
    route: "/users/jane",
    notifications: 0,
    icon: "mdi-account-outline",
  },
];

const group = ref(null);
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
