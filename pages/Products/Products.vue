<template>
  <v-container>
    <v-card color="primary" class="pa-1">
      <v-card rounded="xl">
        <v-card-title primary-title class="d-flex justify-center">
          {{ $t("product_info") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-form @submit.prevent>
          <v-card-text>
            <v-row justify="center" align="center"
              ><v-col cols="12" md="6" sm="6">
                <v-text-field
                  rounded="xl"
                  :label="$t('product_name')"
                  clearable
                  v-model="product_type"
                  :rules="rules"
                ></v-text-field>
                <v-select
                  rounded
                  variant="outlined"
                  :label="$t('select') + $t('product_type')"
                  v-model="groupId"
                  :rules="rules"
                ></v-select>
                <v-file-input
                  :label="$t('product_image_unit')"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  rounded="xl"
                  :rules="rules"
                ></v-file-input>
                <v-file-input
                  :label="$t('product_image_package')"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  rounded="xl"
                  :rules="rules"
                ></v-file-input> </v-col
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
    
          <v-card rounded="xl" style="margin-top: 5px;">
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
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
// table header

const headers = ref([
  { title: "#", key: "1", align: "start" },
  { title: t("product_name"), key: "grounId", align: "start" },
  { title: t("product_type"), key: "comName", align: "end" },
  { title: t("product_image_unit"), key: "comType", align: "start" },
  { title: t("product_image_package"), key: "province", align: "start" },
//   { title: t("account_name"), key: "district", align: "end" },
//   { title: t("branch_email"), key: "village", align: "start" },
//   { title: t("phone"), key: "phone", align: "start" },
//   { title: t("user_Type"), key: "branchAtm", align: "end" },
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
