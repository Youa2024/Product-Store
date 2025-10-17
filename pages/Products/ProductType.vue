<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_type") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent v-model="isValid" ref="form">
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-text-field
                  rounded="xl"
                  :label="$t('product_type')"
                  prepend-inner-icon="mdi-format-list-bulleted-type"
                  clearable
                  @click:clear="onClear"
                  v-model="product_type"
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
                  @click="insertProductType()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ id != null ? $t("btn_edit") : $t("save") }}</v-btn
                ></v-col
              ></v-row
            >
            <br /><br /> </v-card-actions
        ></v-form>
      </v-card>
      <v-card class="mt-1 pt-8 pb-8">
        <v-row justify="center" align="center"
          ><v-col cols="12" md="6" sm="6">
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
              <template #item.actions="{ item }">
                <div class="d-flex">
                  <v-btn color="grey" rounded="xl" @click="SelectItem(item)"
                    ><v-icon>mdi-pen</v-icon>{{ $t("btn_edit") }}</v-btn
                  >
                </div>
              </template>
            </v-data-table></v-col
          ></v-row
        >
      </v-card>
    </v-card>
    <MLoading v-model="loading"></MLoading>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const { t } = useI18n();
const product_type = ref("");
const isValid = ref(false);
const loading = ref(false);
const search = ref("");
const form = ref(null);
const { showSuccess, showWarning, showError } = useAlert();
const { mainApi } = useApi();
const dataShow = ref([]);
const id = ref(null);
const headers = ref([
  { title: "#", key: "id", align: "start" },
  { title: t("product_type"), key: "productType", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
onMounted(() => {
  getAllData();
});
//select item for edit
const onClear = (event) => {
  console.log("Clear icon clicked!", event);
  id.value = null;
  console.log("=============clear data:", id.value);

  id.value = null;
  product_type.value = null;
};
const SelectItem = (item) => {
  product_type.value = item.productType;
  id.value = item.id;
};
// get function
const getAllData = async () => {
  loading.value = true;
  const res = await mainApi.get("getAllProductType");
  if (res.data.status == "00") {
    loading.value = false;
    dataShow.value = res.data.dataRes;
  } else {
    loading.value = false;
    showError(res.data.message);
  }
};
//insert function
const insertProductType = async () => {
  const { valid } = await form.value.validate();
  console.log("valid=========", valid);

  if (valid) {
    loading.value = true;
    const body = {
      productType: product_type.value,
    };
    const res = await mainApi.post("insertProductType", body);
    if (res.data.status == "00") {
      showSuccess(res.data.message);
      product_type.value = "";
    }
  } else {
    showWarning("Please insert require feild");
  }
};
</script>

<style lang="scss" scoped></style>
