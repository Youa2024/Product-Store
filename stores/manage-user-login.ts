import { defineStore } from "pinia";
export const useLogin = defineStore("userLogin", {
  state: () => ({
    userLogin: null,
    passWord: null,
    customerUserData: [],
  }),
});
