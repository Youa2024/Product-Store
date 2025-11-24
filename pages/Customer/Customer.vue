<template>
  <v-row class="pa-5"
    ><v-col cols="12" md="12" sm="6"
      ><v-card class="pa-5" rounded="xl" width="100%">
        <v-card rounded="xl" elevation="2">
          <v-card-title primary-title class="d-flex bg-primary">
            {{ $t("customer_info") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-form @submit.prevent v-model="isValid" ref="form">
            <v-card-text class="px-8">
              <div class="d-flex align-center">
                <b style="white-space: nowrap; margin-right: 8px">{{
                  $t("customer_info")
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
                    <v-text-field
                      rounded="xl"
                      :label="$t('customer_store_name')"
                      prepend-inner-icon="mdi-store-marker-outline"
                      clearable
                      v-model="storeName"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3"
                    ><v-text-field
                      rounded="xl"
                      :label="$t('customer_name')"
                      prepend-inner-icon="mdi-account-tie"
                      clearable
                      v-model="custName"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3"
                    ><v-text-field
                      rounded="xl"
                      :label="$t('customer_id_card')"
                      prepend-inner-icon="mdi-card-account-details"
                      clearable
                      v-model="idCard"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      rounded="xl"
                      :label="$t('login_name')"
                      prepend-inner-icon="mdi-account-group"
                      clearable
                      v-model="userLogin"
                      @input="userLogin = userLogin.toUpperCase()"
                      :rules="rules"
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
                </v-row>
              </v-card>
              <!-- tap2 -->
              <br />
              <div class="d-flex align-center">
                <b style="white-space: nowrap; margin-right: 8px">{{
                  $t("input_info")
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
                      :label="$t('customer_street')"
                      prepend-inner-icon="mdi-arrow-left-right-bold-outline"
                      clearable
                      v-model="street"
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
                v-if="id == null"
                color="primary"
                rounded="xl"
                variant="outlined"
                type="submit"
                @click="insertCustomer()"
                ><v-icon class="mr-4">mdi-content-save-all</v-icon
                >{{ $t("save") }}</v-btn
              >
              <v-btn
                v-else
                color="blue"
                rounded="xl"
                variant="outlined"
                type="submit"
                @click="updateData()"
                ><v-icon class="mr-4">mdi-content-save-all</v-icon
                >{{ $t("btn_edit") }}</v-btn
              >
            </v-card-actions></v-form
          >
        </v-card>
        <br />
        <v-card rounded="xl">
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="branchDAta"
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
                    @click="SelectItem(item)"
                    ><v-icon>mdi-pen</v-icon>{{ $t("btn_edit") }}</v-btn
                  >
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-card></v-col
    ></v-row
  >
  <!-- // loading -->
  <MLoading v-model="loading"></MLoading>
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { showSuccess, showWarning, showError } = useAlert();
const { t } = useI18n();
const custName = ref("");
const storeName = ref(null);
const phone = ref("020");
const province = ref(null);
const district = ref(null);
const village = ref(null);
const street = ref(null);
const latLong = ref(null);
const valid = ref(false);
const form = ref(null);
const branchDAta = ref([]);
const id = ref(null);
const search = ref(null);
const loading = ref(false);
const idCard=ref(false)
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
  { title: t("customer_store_name"), key: "companyId", align: "start" },
  { title: t("customer_name"), key: "branchName", align: "end" },
  { title: t("login_name"), key: "userLogin", align: "start" },
  { title: t("phone"), key: "phoneNumber", align: "start" },
  { title: t("province"), key: "province", align: "start" },
  { title: t("district"), key: "district", align: "end" },
  { title: t("village"), key: "village", align: "start" },
  { title: t("actions"), key: "actions", align: "start" },
]);

// Method======
onMounted(() => {
  getAllBranch();
});
//update data
const updateData = async () => {
  loading.value = true;
  const body = {
    id: id.value,
    companyId: company.value,
    branchName: branchName.value,
    userLogin: userLogin.value,
    accountName: accountName.value,
    accountNo: accountNo.value,
    userType: "normal user",
    email: email.value,
    phoneNumber: phone.value,
    province: province.value,
    district: district.value,
    village: village.value,
    latLong: latLong.value,
  };
  const res = await mainApi.post("updateBranch", body);

  if (res.data.status == "00") {
    loading.value = false;
    showSuccess(res.data.message);
    getAllBranch();
    cleanData();
    loading.value = false;
  } else {
    showError(res.data.message);
  }
};

//clean data
const cleanData = (item) => {
  id.value = null;
  branchName.value = null;
  userLogin.value = null;
  company.value = null;
  accountName.value = null;
  accountNo.value = null;
  email.value = null;
  phone.value = "020";
  province.value = null;
  district.value = null;
  village.value = null;
  latLong.value = null;
};
//select item===============
const SelectItem = (item) => {
  id.value = item.id;
  branchName.value = item.branchName;
  userLogin.value = item.userLogin;
  company.value = item.companyId;
  accountName.value = item.accountName;
  accountNo.value = item.accountNo;
  email.value = item.email;
  phone.value = item.phoneNumber;
  province.value = item.province;
  district.value = item.district;
  village.value = item.village;
  latLong.value = item.latLong;
};
// insert Brach
const insertCustomer = async () => {
  const { valid } = await form.value.validate();
  const body = {
    custName: custName.value,
    storeName: storeName.value,
    custTel: phone.value,
    street: street.value,
    userLogin: userLogin.value,
    province: province.value,
    district: district.value,
    village: village.value,
    latLong: latLong.value,
  };
  console.log("==============body=======:", body);

  if (valid) {
    const res = await mainApi.post("insertCustomer", body);
    if (res.data.status == "00") {
      companies.value = res.data.res;
    } else {
      showError(res.data.message);
    }
  }
};
// get All companies
const getAllBranch = async () => {
  const res = await mainApi.get("getAllBranch");
  if (res.data.status == "00") {
    branchDAta.value = res.data.dataRes;
  } else {
    showError(res.data.message);
  }
};
</script>

<style lang="scss" scoped></style>
