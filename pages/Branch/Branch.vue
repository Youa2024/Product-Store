<template>
  <v-row class="pa-5"
    ><v-col cols="12" md="12" sm="6"
      ><v-card class="pa-5" rounded="xl" width="100%">
        <v-card rounded="xl" elevation="2">
          <v-card-title primary-title class="d-flex bg-primary">
            {{ $t("branch_info") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-form @submit.prevent v-model="isValid" ref="form">
            <v-card-text class="px-8">
              <div class="d-flex align-center">
                <b style="white-space: nowrap; margin-right: 8px">{{
                  $t("branch_info")
                }}</b>
                <v-divider class="flex-grow-1"></v-divider>
              </div>
              <v-card
                rounded="xl"
                class="pa-5 mt-1"
                elevation="0"
                style="border: 1px solid green; border-radius: 12px"
              >
                <v-row>
                  <v-col cols="3">
                    <v-autocomplete
                      v-model="company"
                      :items="companies"
                      item-value="companyId"
                      item-title="companyName"
                      :label="$t('select') + $t('conpany_name')"
                      variant="outlined"
                      rounded
                      clearable
                    ></v-autocomplete
                  ></v-col>
                  <v-col cols="3"
                    ><v-text-field
                      rounded="xl"
                      :label="$t('branch_name')"
                      prepend-inner-icon="mdi-home-account"
                      clearable
                      v-model="branchName"
                      :rules="rules"
                    ></v-text-field> </v-col
                  ><v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('login_name')"
                      prepend-inner-icon="mdi-account-group"
                      clearable
                      v-model="userLogin"
                      :rules="rules"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('account')"
                      prepend-inner-icon="mdi-numeric"
                      clearable
                      v-model="accountNo"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('account_name')"
                      prepend-inner-icon="mdi-card-account-details"
                      clearable
                      v-model="accountName"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('branch_email')"
                      prepend-inner-icon="mdi-email-box"
                      clearable
                      placeholder="yyyy@gmail.com"
                      v-model="email"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('phone')"
                      prepend-inner-icon="mdi-phone"
                      clearable
                      type="number"
                      v-model="phone"
                      placeholder="020xxxx xxxx"
                      :rules="rules"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('province')"
                      prepend-inner-icon="mdi-home-group"
                      clearable
                      v-model="province"
                      :rules="rules"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('district')"
                      prepend-inner-icon="mdi-home-circle-outline"
                      clearable
                      v-model="district"
                      :rules="rules"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('village')"
                      prepend-inner-icon="mdi-home-sound-in-outline"
                      clearable
                      v-model="village"
                      :rules="rules"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('latLong')"
                      prepend-inner-icon="mdi-map-marker-radius"
                      clearable
                      v-model="latLong"
                    ></v-text-field
                  ></v-col>
                </v-row>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                rounded="xl"
                variant="outlined"
                type="submit"
                @click="insertBranch()"
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
  <!-- // loading -->
  <MLoading v-model="loading"></MLoading>
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { showSuccess, showWarning, showError } = useAlert();
const { t } = useI18n();
const branchName = ref("");
const userLogin = ref(null);
const phone = ref("020");
const province = ref(null);
const district = ref(null);
const village = ref(null);
const email = ref(null);
const accountNo = ref(null);
const accountName = ref(null);
const latLong = ref(null);
const companies = ref([]);
const company = ref(null);
const valid = ref(false);
const form = ref(null);
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

// Method======
onMounted(() => {
  getCompanies();
});
// insert Brach
const insertBranch = async () => {
  const { valid } = await form.value.validate();
  const body = {
    companyId: company.value,
    branchName: branchName.value,
    userLogin: userLogin.value,
    accountName: accountName.value,
    accountNo: accountNo.value,
    userType: "",
    email: email.value,
    phoneNumber: phone.value,
    province: province.value,
    district: district.value,
    village: village.value,
    latLong: latLong.value,
  };
  console.log("==============body=======:", body);

  if (valid) {
    const res = await mainApi.post("insertBranch", body);
    if (res.data.status == "00") {
      companies.value = res.data.res;
    } else {
      showError(res.data.message);
    }
  }
};
// get All companies
const getCompanies = async () => {
  const res = await mainApi.get("getAllCompanies");
  if (res.data.status == "00") {
    companies.value = res.data.res;
  } else {
    showError(res.data.message);
  }
};
</script>

<style lang="scss" scoped></style>
