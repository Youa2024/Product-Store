import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const pw = ref("");
  const lng = ref("");
  const userData = ref({});
  function setUserData(data: object) {
    userData.value = data;
  }
  return { username, pw, lng, setUserData, userData };
});
