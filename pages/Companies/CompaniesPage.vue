<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="12" md="12" sm="6"
        ><v-card color="primary" class="pa-1">
          <v-card rounded="xl">
            <v-card-title primary-title class="d-flex justify-center">
              {{ $t("conpany_info") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent>
              <v-card-text>
                <v-row
                  ><v-col cols="6" md="6" sm="12"
                    ><v-text-field
                      rounded="xl"
                      :label="$t('conpany_Id')"
                      prepend-inner-icon="mdi-account-group"
                      clearable
                      v-model="groupId"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('conpany_name')"
                      prepend-inner-icon="mdi-home-account"
                      clearable
                      v-model="comName"
                      :rules="rules"
                    ></v-text-field>
                    <v-select
                      rounded
                      variant="outlined"
                      :label="$t('select_conpany_type')"
                      v-model="comType"
                      :rules="rules"
                    ></v-select>
                    <v-text-field
                      rounded="xl"
                      :label="$t('province')"
                      prepend-inner-icon="mdi-home-group"
                      clearable
                      v-model="province"
                      :rules="rules"
                    ></v-text-field> </v-col
                  ><v-col cols="12" md="6" sm="12">
                    <v-text-field
                      rounded="xl"
                      :label="$t('district')"
                      prepend-inner-icon="mdi-home-circle-outline"
                      clearable
                      v-model="district"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('village')"
                      prepend-inner-icon="mdi-home-sound-in-outline"
                      clearable
                      v-model="village"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('phone')"
                      prepend-inner-icon="mdi-phone"
                      clearable
                      type="number"
                      v-model="phone"
                      placeholder="20xxxx xxxx"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('branch_atm')"
                      prepend-inner-icon="mdi-ticket-confirmation"
                      clearable
                      type="number"
                      :rules="rules"
                      v-model="branchAtm"
                    ></v-text-field></v-col
                ></v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                >
              </v-card-actions></v-form
            >
          </v-card>
          <br>
          <v-card rounded="xl">
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="companies_list"
                hide-actions
                class="elevation-1"
               
                pagination.sync="pagination"
                item-key="id"
                loading="true"
                search="search"
              >
              </v-data-table>
            </v-card-text>
          </v-card> </v-card></v-col
    ></v-row>
  </v-container>
  >
</template>

<script setup>
import { ref } from "vue";
const { t } = useI18n();
const groupId = ref("");
const comName = ref(null);
const comType = ref(null);
const province = ref(null);
const district = ref(null);
const village = ref(null);
const phone = ref(null);
const branchAtm = ref(null);
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
// table header

const headers = ref([
  { title: "#", key: "grounId", align: "start" },
   { title: t("conpany_Id"), key: "grounId", align: "start" },
  { title: t("conpany_name"), key: "comName", align: "end" },
  { title: t("select_conpany_type"), key: "comType", align: "start" },
  { title: t("province"), key: "province", align: "start" },
  { title: t("district"), key: "district", align: "end" },
  { title: t("village"), key: "village", align: "start" },
  { title: t("phone"), key: "phone", align: "start" },
  { title: t("branch_atm"), key: "branchAtm", align: "end" },
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
