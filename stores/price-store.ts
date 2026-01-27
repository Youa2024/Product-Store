defineStore("price", () => {
    const usePriceStore = defineStore("priceStore", {
        state() {
            return {
                prices: [],
                loading: false,
                search: null,
                request: {
                    priceId: 0,
                    branchId: null,
                    productId: null,
                    lakUnit: null,
                    lakPackage: null,
                    thbUnit: null,
                    thbPackage: null,
                    usdUnit: null,
                    usdPackage: null,
                    updateBy: null,
                    lak: null,
                    thb: null,
                    usd: null,
                }
            };
        },
        actions: {
            callapi() {
                const { mainApi } = useApi();
                return mainApi;
            },
            async insertPrice() {
                var body = {
                    branchId: this.request.branchId,
                    productId: this.request.productId,
                    lakUnit: this.request.lakUnit,
                    lakPackage: this.request.lakPackage,
                    thbUnit: this.request.thbUnit,
                    thbPackage: this.request.thbPackage,
                    usdUnit: this.request.usdUnit,
                    usdPackage: this.request.usdPackage,
                    createBy: 'youaadmin',
                    lak: this.request.lak,
                    thb: this.request.thb,
                    usd: this.request.usd,
                };
                console.log("insert ===========:", body);

                const res = await this.callapi().post("insertPrice", body);
                if (res.data.status == "00") {
                    this.loading = false;
                    this.cleanData();
                    this.fetchPrices();
                } else {
                    showError(res.data.message);
                }
            },
            cleanData() {
                this.prices = [];
                this.search = null;
            },
            async getPricesByBranch(branchId: any) {
                var body = { branchId: branchId };
                const res = await this.callapi().post("getPricesByBranch", body);
                console.log("===========prices by branch id===========:", res.data.dataRes);

                if (res.data.status == "00") {
                    this.prices = res.data.dataRes;
                } else {
                    CallSwal({ icon: "error", title: "Error", text: res.data.message });
                }
            },
            async fetchPrices() {
                const res = await this.callapi().get("getPrices");
                console.log("===========prices===========:", res.data);

                if (res.data.status == "00") {
                    this.prices = res.data.dataRes;
                } else {
                    CallSwal({ icon: "error", title: "Error", text: res.data.message });
                }
            },
        },
    });
    return { usePriceStore };
});                                                                                                       