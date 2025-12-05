<template>
  <v-container fluid>
    <v-card color="" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex bg-primary">
          {{ $t("product_info") }}-{{ $t("price") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent>
          <v-card-text>
            <div class="d-flex align-center">
              <b style="white-space: nowrap; margin-right: 8px">{{
                $t("conpany_info")
              }}</b>
              <v-divider class="flex-grow-1"></v-divider>
            </div>
            <v-card
              elevation="0"
              variant="outlined"
              class="pa-5"
              style="
                border: 2px solid green;
                border-radius: 12px;
                margin-top: 5px;
              "
            >
              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="branch"
                    :items="branches"
                    item-value="id"
                    item-title="branchName"
                    :label="$t('select') + $t('branch_name')"
                    variant="outlined"
                    rounded
                    :rules="rules"
                    clearable
                  ></v-autocomplete></v-col
                ><v-col cols="4">
                  <v-autocomplete
                    v-model="product"
                    :items="products"
                    :rules="rules"
                    item-value="id"
                    item-title="productName"
                    :label="$t('select') + $t('product_name')"
                    variant="outlined"
                    rounded
                    clearable
                  ></v-autocomplete></v-col
              ></v-row>
            </v-card>
            <br />
            <div class="d-flex align-center">
              <b style="white-space: nowrap; margin-right: 8px"
                >{{ $t("input") }} {{ $t("info") }} {{ $t("price") }}</b
              >
              <v-divider class="flex-grow-1"></v-divider>
            </div>
            <v-card
              elevation="0"
              variant="outlined"
              class="pa-5"
              style="
                border: 2px solid green;
                border-radius: 12px;
                margin-top: 5px;
              "
            >
              <v-row>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_unit") }} <b class="text-blue">LAK</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="lak_unit"
                    :rules="rules"
                    @input="lak_unit = $formatCurrency(lak_unit)"
                  ></v-text-field
                ></v-col>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_package") }} <b class="text-blue">LAK</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="lak_package"
                    :rules="rules"
                    @input="lak_package = $formatCurrency(lak_package)"
                  ></v-text-field
                ></v-col>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_unit") }} <b class="text-red">THB</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="thb_unit"
                    :rules="rules"
                    @input="thb_unit = $formatCurrency(thb_unit)"
                  ></v-text-field
                ></v-col>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_package") }} <b class="text-red">THB</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="thb_package"
                    :rules="rules"
                    @input="thb_package = $formatCurrency(thb_package)"
                  ></v-text-field
                ></v-col>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_unit") }} <b class="text-green">USD</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="usd_unit"
                    :rules="rules"
                    @input="usd_unit = $formatCurrency(usd_unit)"
                  ></v-text-field
                ></v-col>
                <v-col cols="3">
                  <span
                    ><p>
                      {{ $t("price_package") }} <b class="text-green">USD</b>
                    </p></span
                  >
                  <v-text-field
                    rounded="xl"
                    clearable
                    v-model="usd_package"
                    :rules="rules"
                    @input="usd_package = $formatCurrency(usd_package)"
                  ></v-text-field></v-col
              ></v-row>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-row justify="start" align="start"
              ><v-col cols="12" md="6" sm="6">
                <v-btn
                  color="grey"
                  class="mr-2"
                  rounded="xl"
                  variant="outlined"
                  @click="cloarData()"
                  ><v-icon class="mr-4">mdi-cancel</v-icon
                  >{{ $t("btn_cancel") }}</v-btn
                >
                <v-btn
                  v-if="edit == false"
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  @click="insertPrict()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                >
                <v-btn
                  v-else
                  color="purple"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  @click="updatePrice()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("btn_edit") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
      </v-card>

      <v-card rounded="xl" style="margin-top: 5px">
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="allData"
            :search="search"
            hide-actions
            class="elevation-1"
            pagination.sync="pagination"
            item-key="id"
          >
            <template #item.id="{ index, item }">
              {{ index + 1 }}
            </template>
            <template #item.actions="{ item }">
              <div class="d-flex">
                <v-btn
                  color="blue"
                  rounded="xl"
                  variant="outlined"
                  @click="showEdit(item)"
                  ><v-icon>mdi-pen</v-icon>{{ $t("btn_edit") }}</v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card>
    <MLoading v-model="loading"></MLoading>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { t } = useI18n();
const products = ref([]);
const product = ref(null);
const branches = ref([]);
const branch = ref(null);
const lak_unit = ref(null);
const lak_package = ref(null);
const thb_unit = ref(null);
const thb_package = ref(null);
const usd_unit = ref(null);
const usd_package = ref(null);
const search = ref(null);
const allData = ref([]);
const key_id = ref(null);
const edit = ref(false);
const loading = ref(false);
const { showSuccess, showWarning, showError } = useAlert();
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];

// table header

const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("product_name"), key: "productName", align: "start" },
  { title: t("price_unit") + " " + "LAK", key: "lakUnit", align: "start" },
  {
    title: t("price_package") + " " + "LAK",
    key: "lakPackage",
    align: "start",
  },
  { title: t("price_unit") + " " + "THB", key: "thbUnit", align: "start" },
  {
    title: t("price_package") + " " + "THB",
    key: "thbPackage",
    align: "start",
  },
  {
    title: t("price_package") + " " + "USD",
    key: "usdPackage",
    align: "start",
  },
  { title: t("price_unit") + " " + "USD", key: "usdUnit", align: "start" },
  { title: t("branch_name"), key: "branchName", align: "start" },
  { title: t("crate_date"), key: "createDate", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);

// Method========================
onMounted(() => {
  getAllPrices();
  getProducts();
  getBranches();
});
const cloarData = () => {
  edit.value = false;
  key_id.value = null;
  branch.value = null;
  product.value = null;
  lak_unit.value = null;
  lak_package.value = null;
  thb_unit.value = null;
  thb_package.value = null;
  usd_unit.value = null;
  usd_package.value = null;
};
const updatePrice = async () => {
  loading.value = true;
  var body = {
    priceId: key_id.value,
    branchId: branch.value,
    productId: product.value,
    lakUnit: lak_unit.value,
    lakPackage: lak_package.value,
    thbUnit: thb_unit.value,
    thbPackage: thb_package.value,
    usdUnit: usd_unit.value,
    usdPackage: usd_package.value,
    updateBy: localStorage.getItem("user"),
  };
  const res = await mainApi.put("updatePrice", body);
  if (res.data.status == "00") {
    loading.value = false;
    cloarData();
    getAllPrices();
    showSuccess(res.data.message);
  } else {
    showError(res.data.message);
  }
};
const showEdit = (item) => {
  edit.value = true;
  key_id.value = item.priceId;
  branch.value = item.branchId;
  product.value = item.productId;
  lak_unit.value = item.lakUnit;
  lak_package.value = item.lakPackage;
  thb_unit.value = item.thbUnit;
  thb_package.value = item.thbPackage;
  usd_unit.value = item.usdUnit;
  usd_package.value = item.usdPackage;
};
const getAllPrices = async () => {
  const res = await mainApi.post("getPrices");
  if (res.data.status == "00") {
    allData.value = res.data.dataRes;
    console.log("allData=============", allData.value);
  } else {
    showError(res.data.message);
  }
};
const insertPrict = async () => {
  var body = {
    branchId: branch.value,
    productId: product.value,
    lakUnit: lak_unit.value,
    lakPackage: lak_package.value,
    thbUnit: thb_unit.value,
    thbPackage: thb_package.value,
    usdUnit: usd_unit.value,
    usdPackage: usd_package.value,
    createBy: localStorage.getItem("user"),
  };
  const res = await mainApi.post("insertPrice", body);
  if (res.data.status == "00") {
    loading.value = false;
    cloarData();
    getAllPrices();
  } else {
    showError(res.data.message);
  }
};
const getProducts = async () => {
  const res = await mainApi.get("getProducts");
  if (res.data.status == "00") {
    products.value = res.data.dataRes;
  } else {
    showError(res.data.message);
  }
};
const getBranches = async () => {
  const res = await mainApi.get("getAllBranch");
  if (res.data.status == "00") {
    branches.value = res.data.dataRes;
  } else {
    showError(res.data.message);
  }
};
</script>

<style lang="scss" scoped></style>
