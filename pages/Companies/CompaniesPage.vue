<template>
  <div>
    <v-row
      ><v-col cols="12" md="12" sm="6"
        ><v-card color="" class="pa-5">
          <v-card rounded="xl" elevation="2">
            <v-card-title primary-title class="d-flex bg-primary">
              {{ $t("conpany_info") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent v-model="isValid" ref="form">
              <v-card-text class="px-8">
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
                  style="border: 2px solid green; border-radius: 12px"
                >
                  <v-row
                    ><v-col cols="3"
                      ><v-text-field
                        rounded="xl"
                        :label="$t('conpany_Id')"
                        prepend-inner-icon="mdi-account-group"
                        clearable
                        :disabled="edit == true"
                        v-model="groupId"
                        @input="groupId = groupId.toUpperCase()"
                        :rules="rules"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="3">
                      <v-text-field
                        rounded="xl"
                        :label="$t('conpany_name')"
                        prepend-inner-icon="mdi-home-account"
                        clearable
                        v-model="comName"
                        :rules="rules"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="3">
                      <v-select
                        rounded
                        variant="outlined"
                        :label="$t('select_conpany_type')"
                        v-model="comType"
                        :rules="rules"
                        :items="comTypeItem"
                      ></v-select
                    ></v-col>
                    <v-col cols="3"
                      ><v-text-field
                        rounded="xl"
                        :label="$t('branch_atm')"
                        prepend-inner-icon="mdi-ticket-confirmation"
                        clearable
                        type="number"
                        :rules="rules"
                        v-model="branchAtm"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-card>
                <div class="d-flex align-center" style="margin-top: 2%">
                  <b style="white-space: nowrap; margin-right: 8px">
                    ຂໍ້ມູນທີ່ຢູ່
                  </b>
                  <v-divider class="flex-grow-1"></v-divider>
                </div>
                <v-card
                  elevation="0"
                  variant="outlined"
                  class="pa-5"
                  style="border: 2px solid green; border-radius: 12px"
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
                      ></v-text-field> </v-col
                    ><v-col cols="3">
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
                        :label="$t('phone')"
                        prepend-inner-icon="mdi-phone"
                        clearable
                        type="number"
                        v-model="phone"
                        placeholder="020 xxxx xxxx"
                        :rules="rules"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="edit == false"
                  color="primary"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  @click="insert()"
                  ><v-icon class="mr-4">mdi-content-save-all</v-icon
                  >{{ $t("save") }}</v-btn
                >
                <v-btn
                  v-else
                  color="purple"
                  rounded="xl"
                  variant="outlined"
                  type="submit"
                  @click="updateDate()"
                  ><v-icon class="mr-4">mdi-pen</v-icon
                  >{{ $t("btn_edit") }}</v-btn
                >
              </v-card-actions></v-form
            >
          </v-card>
          <br />
          <v-card rounded="xl">
            <v-card-text>
              <v-text-field
                v-model="search"
                rounded="xl"
                flat
                clearable
                prepend-inner-icon="mdi-magnify"
                placeholder="ຄົ້ນຫາລູກຄ້າ..."
              ></v-text-field>
              <v-data-table
                :headers="headers"
                :items="allData"
                :search="search"
                hide-actions
                class="elevation-1 "
                pagination.sync="pagination"
                item-key="id"
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
    <!-- // loading -->
    <MLoading v-model="loading"></MLoading>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
const { mainApi } = useApi();
const { t } = useI18n();
const search = ref(null);
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
const edit = ref(false);
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
const updateDate = async () => {
  loading.value = true;
  const body = {
    companyId: groupId.value,
    companyName: comName.value,
    comType: comType.value,
    province: province.value,
    distict: district.value,
    village: village.value,
    branchAtm: branchAtm.value,
    phone: phone.value,
  };
  console.log("body============", body);

  const res = await mainApi.post("updateCompany", body);
  if (res.data.status == "00") {
    loading.value = false;
    showSuccess(res.data.message);
    getData();
    clearData();
  }
};
const getData = async () => {
  const res = await mainApi.get("getAllCompanies");
  if (res.data.status == "00") {
    allData.value = res.data.res;
  } else {
    showError(res.data.message);
  }
};
const SelectItem = (item) => {
  edit.value = true;
  groupId.value = item.companyId;
  comName.value = item.companyName;
  comType.value = item.comType;
  province.value = item.province;
  district.value = item.distict;
  village.value = item.village;
  branchAtm.value = item.branchAtm;
  phone.value = item.phone;
};
const clearData = () => {
  groupId.value = "";
  comName.value = "";
  comType.value = "";
  province.value = "";
  district.value = "";
  village.value = "";
  branchAtm.value = "";
  phone.value = "020";
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
      distict: district.value,
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
  { title: "#", key: "id", align: "start", class: "v-data-table__thead" },
  { title: t("conpany_Id"), key: "companyId", align: "start" },
  { title: t("conpany_name"), key: "companyName", align: "start" },
  { title: t("select_conpany_type"), key: "comType", align: "start" },
  { title: t("province"), key: "province", align: "start" },
  { title: t("district"), key: "distict", align: "end" },
  { title: t("village"), key: "village", align: "start" },
  { title: t("phone"), key: "phone", align: "start" },
  { title: t("branch_atm"), key: "branchAtm", align: "end" },
  { title: t("actions"), key: "actions", align: "start", sort: false },
]);
</script>

<style lang="scss" scoped></style>
