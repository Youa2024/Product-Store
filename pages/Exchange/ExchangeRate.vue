<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("exchange_rate") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent v-model="isValid" ref="form">
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-select
                  rounded
                  variant="outlined"
                  :label="$t('select') + $t('conpany_name')"
                  v-model="groupId"
                  :rules="rules"
                ></v-select>
                <v-text-field
                  rounded="xl"
                  label="KIP"
                  prepend-inner-icon="mdi-numeric-1-box"
                  clearable
                  v-model="lak_rate"
                  :rules="rules"
                  @input="lak_rate = formatCurrency(lak_rate)"
                ></v-text-field>
                <v-text-field
                  rounded="xl"
                  label="THB"
                  prepend-inner-icon="mdi-currency-thb"
                  clearable
                  v-model="thb_rate"
                  :rules="rules"
                  @input="thb_rate = formatCurrency(thb_rate)"
                ></v-text-field>
                <v-text-field
                  rounded="xl"
                  label="USD"
                  prepend-inner-icon="mdi-currency-usd"
                  clearable
                  v-model="usd_rate"
                  @input="usd_rate = formatCurrency(usd_rate)"
                  :rules="rules"
                ></v-text-field> </v-col
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
                  @click="insertExchange()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="dataShow"
        hide-actions
        class="elevation-1"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        pagination.sync="pagination"
        item-key="id"
        :search="search"
      >
        <template #item.id="{ index, item }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-card>
    <MLoading v-model="loading"></MLoading>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import MLoading from "~/components/MLoading.vue";
const form = ref(); // form reference
const isValid = ref(false);
const { mainApi } = useApi();
const { t } = useI18n();
const groupId = ref("006");
const lak_rate = ref(null);
const thb_rate = ref(null);
const usd_rate = ref(null);
const loading = ref(false);
const dataShow = ref([]);
const search = ref(null);
const { formatCurrency } = useInputFormatNumber();
const { showSuccess } = useAlert();

//method first call when open the page
onMounted(() => {
  getAllData();
});
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("conpany_name"), key: "companyId", align: "start" },
  { title: t("thb"), key: "thb", align: "start" },
  { title: t("usd"), key: "usd", align: "end" },
  { title: t("crate_date"), key: "createDate", align: "start" },
]);
const clearData = () => {
  groupId.value = null;
  lak_rate.value = null;
  thb_rate.value = null;
  usd_rate.value = null;
};
// method insert
const insertExchange = async () => {
  const { valid } = await form.value.validate();
  console.log(valid, "✅ Form is valid!");
  if (valid) {
    loading.value = true;
    console.log("✅ Form is valid!");
    const body = {
      companyId: groupId.value,
      lak: lak_rate.value,
      thb: thb_rate.value,
      usd: usd_rate.value,
    };
    const insert = await mainApi.post("/insertExchanges", body);
    if (insert.data.status == "00") {
      showSuccess(insert.data.message);
      getAllData();
      clearData();
    }
    console.log("===========body:====", insert);
    loading.value = false;
  } else {
    console.log("❌ Form is invalid!");
  }
};
// get data
const getAllData = async () => {
  loading.value = true;
  const data = await mainApi.post("/getExchanges");
  if (data.data.status == "00") {
    loading.value = false;
    dataShow.value = data.data.dataRes;
  } else {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
