<template>
  <v-container fluid>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_info") }}-{{ $t("price") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent>
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6">
                <v-text-field
                  rounded="xl"
                  :label="$t('search')"
                  clearable
                  prepend-inner-icon="mdi-magnify"
                  v-model="search"
                  :rules="rules"
                ></v-text-field>
                <v-data-table
                  :headers="headers_product"
                  :items="companies_list"
                  hide-actions
                  class="elevation-1"
                  pagination.sync="pagination"
                  item-key="id"
                  :search="search"
                >
                </v-data-table></v-col
              ><v-col cols="12" md="6" sm="6">
                <v-card variant="outlined" class="pa-10">
                  <v-select
                    rounded
                    variant="outlined"
                    :label="$t('select') + $t('conpany_name')"
                    v-model="groupId"
                    :rules="rules"
                  ></v-select>
                  <v-text-field
                    rounded="xl"
                    :label="$t('product_name')"
                    clearable
                    v-model="product_type"
                    :rules="rules"
                    disabled
                  ></v-text-field>
                  <v-text-field
                    rounded="xl"
                    :label="$t('price_unit')"
                    clearable
                    v-model="price_unit"
                    :rules="rules"
                    @input="price_unit = $formatCurrency(price_unit)"
                  ></v-text-field>
                  <v-text-field
                    rounded="xl"
                    :label="$t('price_package')"
                    clearable
                    v-model="price_package"
                    :rules="rules"
                    @input="currencyInput = $formatCurrency(currencyInput)"
                  ></v-text-field>
                </v-card> </v-col
            ></v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-btn
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  block
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
const { t } = useI18n();
const product_type = ref("");
const search = ref("");
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
</script>

<style lang="scss" scoped></style>
