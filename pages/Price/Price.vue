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
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
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
            :items="companies_list"
            hide-actions
            class="elevation-1"
            pagination.sync="pagination"
            item-key="id"
            search="search"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card>
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
const userName = ref(null);
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
// format as user types
const price_package = ref("");
const price_unit = ref("");
const formatCurrency = () => {
  let value = currencyInput.value.replace(/[^\d.]/g, ""); // allow only numbers & dot
  if (value) {
    const [intPart, decimalPart] = value.split(".");
    // add commas to integer part
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    currencyInput.value = decimalPart
      ? `${withCommas}.${decimalPart.slice(0, 2)}`
      : withCommas;
  }
};
// table header
const headers_product = ref([
  { title: "#", key: "1", align: "start" },
  { title: t("product_name"), key: "grounId", align: "start" },
  { title: t("product_type"), key: "comName", align: "end" },
  { title: t("product_type"), key: "comName", align: "end" },
]);
const headers = ref([
  { title: "#", key: "1", align: "start" },
  { title: t("product_name"), key: "grounId", align: "start" },

  { title: t("product_type"), key: "comName", align: "end" },
  { title: t("price_unit"), key: "comType", align: "start" },
  { title: t("price_package"), key: "province", align: "start" },
  { title: t("conpany_name"), key: "grounId", align: "start" },
  { title: t("branch_name"), key: "grounId", align: "start" },
]);
const companies_list = [
  {
    groupId: "Ford Mustang",
    comName: 450,
    comType: "Gasoline",
    province: "USA",
    district: 55000,
    village: "Gasoline",
    phone: "USA",
    branchAtm: 55000,
  },
];
// Method========================
onMounted(() => {
  getProducts();
  getBranches();
});
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
