<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="12" md="12" sm="6"
        ><v-card color="primary" class="pa-1">
          <v-card rounded="xl">
            <v-card-title primary-title class="d-flex justify-center">
              {{ $t("branch_info") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent>
              <v-card-text>
                <v-row
                  ><v-col cols="6" md="6" sm="12">
                    <v-select
                      rounded
                      variant="outlined"
                      :label="$t('select') + $t('conpany_name')"
                      v-model="comType"
                      :rules="rules"
                    ></v-select>
                    <v-text-field
                      rounded="xl"
                      :label="$t('branch_name')"
                      prepend-inner-icon="mdi-home-account"
                      clearable
                      v-model="groupId"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('login_name')"
                      prepend-inner-icon="mdi-account-group"
                      clearable
                      v-model="groupId"
                      :rules="rules"
                    ></v-text-field>
                    <v-text-field
                      rounded="xl"
                      :label="$t('account')"
                      prepend-inner-icon="mdi-numeric"
                      clearable
                      v-model="comName"
                      :rules="rules"
                    ></v-text-field>

                    <v-text-field
                      rounded="xl"
                      :label="$t('account_name')"
                      prepend-inner-icon="mdi-card-account-details"
                      clearable
                      v-model="province"
                      :rules="rules"
                    ></v-text-field> </v-col
                  ><v-col cols="12" md="6" sm="12">
                    <v-select
                      rounded
                      variant="outlined"
                      :label="$t('select') + $t('user_Type')"
                      v-model="comType"
                      :rules="rules"
                    ></v-select>

                    <v-text-field
                      rounded="xl"
                      :label="$t('branch_email')"
                      prepend-inner-icon="mdi-email-box"
                      clearable
                      placeholder="yyyy@gmail.com"
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
                    ></v-text-field> </v-col
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
          <br />
          <v-card rounded="xl">
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
  { title: t("conpany_name"), key: "grounId", align: "start" },
  { title: t("branch_name"), key: "comName", align: "end" },
  { title: t("login_name"), key: "comType", align: "start" },
  { title: t("account"), key: "province", align: "start" },
  { title: t("account_name"), key: "district", align: "end" },
  { title: t("branch_email"), key: "village", align: "start" },
  { title: t("phone"), key: "phone", align: "start" },
  { title: t("user_Type"), key: "branchAtm", align: "end" },
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
