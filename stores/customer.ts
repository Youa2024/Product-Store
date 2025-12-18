import { defineStore } from "pinia";
export const useCustomerStore = defineStore("customer", {
  state() {
    return {
      id: null,
      custName: null,
      storeName: null,
      phone: "020",
      province: null,
      district: null,
      village: null,
      street: null,
      latLong: null,
      search: null,
      loading: false,
      idCard: null,
      userLogin: null,
      response_data: [],
      branchDAta: [],
      pro: { id: null, proName: null },
      dist: { id: null, disName: null },
    };
  },
  actions: {
    callapi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    
    cleanData() {
      this.id = null;
      this.custName = null;
      this.storeName = null;
      this.street = null;
      this.idCard = null;
      this.userLogin = null;
      this.phone = "020";
      this.province = null;
      this.district = null;
      this.village = null;
      this.latLong = null;
      this.response_data = [];
      this.branchDAta = [];
    },
    async getCustomers() {
      const res = await this.callapi().get("getCustomers");
      if (res.data.status == "00") {
        this.branchDAta = res.data.dataRes;
      } else {
        CallSwal({ icon: "error", title: "ຜິດພາດ", text: res.data.message });
      }
    },
      async updateCustomer() {
      console.log("pro===============", this.pro);

      const body = {
        id:this.id,
        custName: this.custName,
        storeName: this.storeName,
        custTel: this.phone,
        street: this.street,
        userLogin: this.userLogin,
        province: this.pro.proName,
        district: this.dist.disName,
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
    async insertCustomer() {
      console.log("pro===============", this.pro);

      const body = {
        custName: this.custName,
        storeName: this.storeName,
        custTel: this.phone,
        street: this.street,
        userLogin: this.userLogin,
        province: this.pro.proName,
        district: this.dist.disName,
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
