import { defineStore } from "pinia";
export const useCustomerStore = defineStore("customer", {
  state() {
    return {
      custName: null,
      storeName: null,
      phone: "020",
      province: null,
      district: null,
      village: null,
      street: null,
      latLong: null,
      id: null,
      search: null,
      loading: false,
      idCard: null,
      userLogin: null,
      response_data: [],
      branchDAta: [],
    };
  },
  actions: {
    callapi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    async getCustomers() {
      const res = await this.callapi().get("getCustomers");
      if (res.data.status == "00") {
        this.branchDAta = res.data.dataRes;
      } else {
        CallSwal({ icon: "error", title: "ຜິດພາດ", text: res.data.message });
      }
    },
    async insertCustomer() {
      const body = {
        custName: this.custName,
        storeName: this.storeName,
        custTel: this.phone,
        street: this.street,
        userLogin: this.userLogin,
        province: this.province,
        district: this.district,
        village: this.village,
        latLong: this.latLong,
        idCard: this.idCard,
      };
      console.log("=================body================:", body);

      const res = await this.callapi().post("insertCustomer", body);
      if (res.data.status == "00") {
        this.response_data = res.data.res;
      } else {
        CallSwal({ icon: "error", title: "ຜິດພາດ", text: res.data.message });
      }
    },
  },
});
