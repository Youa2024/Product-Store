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
            <v-form @submit.prevent v-model="isValid" ref="form">
              <v-card-text>
                <v-row
                  ><v-col cols="6" md="6" sm="12"
                    ><v-text-field
                      rounded="xl"
                      :label="$t('conpany_Id')"
                      prepend-inner-icon="mdi-account-group"
                      clearable
                      v-model="groupId"
                      @input="groupId = groupId.toUpperCase()"
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
                      :items="comTypeItem"
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
                      placeholder="020 xxxx xxxx"
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
                  @click="insert()"
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
                :items="allData"
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
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-card></v-col
      ></v-row
    >
    // loading
    <MLoading v-model="loading"></MLoading>
  </v-container>
  >
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { t } = useI18n();
const groupId = ref("");
const comName = ref(null);
const comType = ref(null);
const province = ref(null);
const district = ref(null);
const village = ref(null);
const phone = ref("020");
const branchAtm = ref(null);
const loading = ref(false);
const isValid = ref(false);
const form = ref(null);
const allData = ref([]);
const { showSuccess, showWarning, showError } = useAlert();
// role for feild
const rules = [
  (value) => {
    if (value) return true;
    return t("rule");
  },
];
const comTypeItem = ["ການຄ້າ", "ກະສິກໍາ", "ອຸດສາຫະກໍາ"];

// method
onMounted(() => {
  getData();
});
const getData = async () => {
  const res = await mainApi.get("getAllCompanies");
  if (res.data.status == "00") {
    allData.value = res.data.res;
  } else {
    showError(res.data.message);
  }
};

const clearData = () => {
  groupId.value = "";
  comName.value = "";
  comType.value = "";
  province.value = "";
  district.value = "";
  village.value = "";
  branchAtm.value = "";
  phone.value = "";
};
const insert = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;
    const body = {
      companyId: groupId.value,
      companyName: comName.value,
      comType: comType.value,
      province: province.value,
      District: district.value,
      village: village.value,
      branchAtm: branchAtm.value,
      phone: phone.value,
    };
    console.log("body============", body);

    const res = await mainApi.post("insertCompany", body);
    if (res.data.status == "00") {
      loading.value = false;
      showSuccess(res.data.message);
      clearData();
    }
  } else {
    showWarning("Please insert require feild");
  }
};

// table header

const headers = ref([
  { title: "#", key: "companyId", align: "start" },
  { title: t("conpany_Id"), key: "grounId", align: "start" },
  { title: t("conpany_name"), key: "companyName", align: "start" },
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
