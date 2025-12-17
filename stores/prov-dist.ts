import { defineStore } from "pinia";
export const useProvDistStore = defineStore("prov-dist", {
  state() {
    return {
      dist_request: {
        proId: null,
      },
      Provinces: [],

      Districts: [],
    };
  },
  actions: {
    getApi() {
      const { mainApi } = useApi();
      return mainApi;
    },
    async getProvinces() {
      const response = await this.getApi().get("getProvinces");
      if (response.data.status === "00") {
        this.Provinces = response.data.dataRes;
      } else {
        CallSwal({
          icon: "error",
          title: "ຜິດພາດ",
          text: response.data.message,
        });
      }
    },
    async getDistricts() {
      if (this.dist_request.proId != null) {
        var body = {
          proId: this.dist_request.proId,
        };
        const response = await this.getApi().post(`getDistrictById`, body);
        if (response.data.status === "00") {
          this.Districts = response.data.dataRes;
        } else {
          CallSwal({
            icon: "error",
            title: "ຜິດພາດ",
            text: response.data.message,
          });
        }
      }
    },
  },
});
