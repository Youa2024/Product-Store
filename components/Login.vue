<template>
  <div class="bg d-flex" style="width: 100vw; height: 100vh">
    <v-row justify="end" style="margin-top: 10px; margin-right: 20px">
      <v-col cols="2" color="white"
        ><div color="blue"><Language></Language></div>
      </v-col>
      <v-col cols="12" md="12">
        <v-row justify="center">
          <v-col cols="12"
            ><h1 class="text-center" :style="{ color: 'white' }">
              {{ $t("border") }}
            </h1></v-col
          >
          <v-col cols="3">
            <v-card class="pa-10" d-flex rounded="xl" elevation="0">
              <v-card-title
                style="justify-content: center; display: flex"
                class=""
              >
                <br />
              </v-card-title>
              <v-card-text>
                <v-row style="justify-content: center; display: flex">
                  <img src="../assets/images/ldb-logo.png" width="100" cover />
                  <v-col cols="12" md="12">
                    <h2 class="text-center">{{ $t("welcome") }}</h2>
                    <br />
                    <br />

                    <v-text-field
                      :label="$t('user')"
                      v-model="user"
                      rounded
                    ></v-text-field>
                    <v-text-field
                      name="name"
                      :label="$t('pw')"
                      v-model="password"
                      rounded
                      id="id"
                    ></v-text-field>
                    <v-checkbox
                      :label="$t('remember')"
                      model-value="true"
                      value="value"
                      color="primary"
                    ></v-checkbox>
                    <Mbtn
                      :label="$t('login')"
                      @click="login"
                      rounded
                      block
                    ></Mbtn></v-col
                ></v-row>
              </v-card-text> </v-card></v-col
        ></v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});
const { showSuccess, showError, showWarning, showConfirm } = useAlert();
import { ref } from "vue";

const { $axios } = useNuxtApp();

const { locale } = useI18n();
const password = ref(null);
const user = ref(null);
const remober = ref(true);
const { setUser } = useUserSession();
const headers = {
  lng: locale.value,
};

watch([user, password], ([newUser, newPass]) => {
  console.log("User changed:", newUser);
  console.log("Password changed:", newPass);
});
watch(user, (val) => {
  console.log("user changed:", val);
});

/// login function
const login = async () => {
  // try {
  const body = {
    username: user.value,
    password: password.value,
  };
  console.log("======body=======", body);
  console.log("============================header============:", headers);
  const res = await $axios.post("/login", body, { headers });
  console.log(
    "============================login data============:",
    res.data.status
  );
  if (res.data.status != "00") {
    showWarning(res.data.message);
  } else {
    // const userStore = useUserStore();
    // userStore.username = user.value;
    // userStore.pw = password.value;
    // userStore.lng = locale.value;
    // userStore.setUserData(res.data.dataResponse);
    // console.log(
    //   "============================login data============:",
    //   res.data.status
    // );
    const { setUser } = useUserSession();
    setUser(body);
    await navigateTo("/home");
    console.log(
      "============================login data2223332============:",
      setUser.username
    );
  }
  // } catch (err) {
  // console.error("Login error:", err);
  //  console.error("Login error:", error?.message ?? error)
  // }
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/images/bg_login_biz.png");
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 1s infinite;
}
.custom-select .v-field {
  background-color: transparent !important;
}
</style>
