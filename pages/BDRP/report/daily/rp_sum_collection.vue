<template>
  <client-only>
    <v-container fluid>
      <v-card class="pt-2 pl-1 pr-1" elevation="1" color="primary" rounded="xl">
        <v-card class="pa-8" elevation-1 rounded="xl">
          <v-form ref="formRef" v-model="valid">
            <v-row>
              <v-col cols="1"></v-col
              ><v-col cols="3" md="3" sm="3"
                ><MDate
                  v-model="date1"
                  rounded
                  :label="$t('start_date')"
                  :rules="[Rule]"
                ></MDate> </v-col
              ><v-col
                cols="1"
                md="1"
                class="d-flex align-center justify-center"
                >{{ $t("to") }}</v-col
              ><v-col cols="3" md="3" sm="3"
                ><MDate
                  v-model="date2"
                  rounded
                  :label="$t('end_date')"
                  :rules="[Rule]"
                ></MDate> </v-col
              ><v-col cols="3" md="3"
                ><v-select
                  label="Select"
                  variant="outlined"
                  rounded="xl"
                  density="comfortable"
                  :items="['California', 'Colorado']"
                ></v-select
              ></v-col>
            </v-row>
            <v-row
              ><v-col cols="2"></v-col
              ><v-col cols="8"
                ><Mbtn
                  rounded="xl"
                  label="search"
                  block
                  icon="mdi-magnify"
                  @click="submitForm"
                ></Mbtn></v-col
              ><v-col cols="2"></v-col
            ></v-row>
          </v-form>
        </v-card>
      </v-card>
      <br />
      <v-card v-if="items.length > 0">
        <v-card-title primary-title>
          <client-only>
            <v-btn @click="printTable()" class="mr-10">download pdf</v-btn>
            <v-btn @click="handleExport()">download excel</v-btn></client-only
          >
        </v-card-title>
        <v-card-text class="overflow-x-auto" id="print-section">
          <div ref="tableRef">
            <table class="corner-borders-table min-w-[10000px] border">
              <thead>
                <tr>
                  <th rowspan="3" class="text-center">ລ/ດ</th>
                  <th rowspan="3" class="text-center">ດ່ານຊາຍແດນ</th>
                  <th rowspan="3" class="text-center">ແຂວງ</th>

                  <th colspan="17" class="text-center">
                    {{ date1 }} - {{ date2 }}
                  </th>
                </tr>
                <tr>
                  <th colspan="2" class="text-center">
                    ຂະແໜງພາສີ (ບ 53, ພາຫະນະ)
                  </th>
                  <th colspan="3" class="text-center">
                    ຂະແໜງອາກອນ (Visa on Arrival)
                  </th>
                  <th colspan="2" class="text-center">
                    ຂະແໜງໂຍທາ (ຄ່າຂ້າມຂົວ)
                  </th>
                  <th colspan="2" class="text-center">
                    ຂະແໜງທ່ອງທ່ຽວ (ກອງທຶນທ່ອງທ່ຽວ)
                  </th>
                  <th colspan="2" class="text-center">
                    ຂະແໜງ ຕມ (ປື້ມຜ່ານແດນ)
                  </th>
                  <th colspan="2" class="text-center">
                    ຂະແໜງກະຊິກຳ (ກັກກັນພຶດ)
                  </th>
                  <th colspan="2" class="text-center">
                    ຂະແໜງສາທາ (ອາຫານ ແລະ ຢາ)
                  </th>
                </tr>
                <tr>
                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ (LAK)</th>
                  <th>ຈຳນວນເງິນ (USD)</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນທຸລະກຳ</th>
                  <th>ຈຳນວນເງິນ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.nameGb }}</td>
                  <td>{{ formatNumber0(item.customAmount) }}</td>
                  <td>{{ formatNumber(item.customTotal) }}</td>
                  <td>{{ formatNumber0(item.visaAmount) }}</td>
                  <td>{{ formatNumber(item.visaTotal) }}</td>
                  <td>{{ formatNumber(item.visaUsdTotal) }}</td>
                  <td>{{ formatNumber0(item.bridgeAmount) }}</td>
                  <td>{{ formatNumber(item.bridgeTotal) }}</td>
                  <td>{{ formatNumber0(item.tourismAmount) }}</td>
                  <td>{{ formatNumber(item.tourismTotal) }}</td>
                  <td>{{ formatNumber0(item.immigrationAmount) }}</td>
                  <td>{{ formatNumber(item.immigrationTotal) }}</td>
                  <td>{{ formatNumber0(item.agricultureAmount) }}</td>
                  <td>{{ formatNumber(item.agricultureTotal) }}</td>
                  <td>{{ formatNumber0(item.publicHealthAmount) }}</td>
                  <td>{{ formatNumber(item.publicHealthTotal) }}</td>
                </tr>

                <tr style="font-weight: bold">
                  <td colspan="3" class="text-right"><b>ລວມ:</b></td>
                  <td>{{ formatNumber(itemsTotal.calCustomAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calCustomTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calVisaAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calVisaTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calVisaUsdTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calBridgeAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calBridgeTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calTourismAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calTourismTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calImmigrationAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calImmigrationTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calAgricultureAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calAgricultureTotal) }}</td>
                  <td>{{ formatNumber(itemsTotal.calPublicHealthAmount) }}</td>
                  <td>{{ formatNumber(itemsTotal.calPublicHealthTotal) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
      <MLoading v-model="loading"></MLoading> </v-container
  ></client-only>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
const date1 = ref(null);
const date2 = ref(null);
const formRef = ref(null);
const loading = ref(false);
const valid = ref(false);
// const tableRef = ref(HTMLElement) | (null > null);
const tableRef = ref(null);
const items = ref([]);
const itemsTotal = ref({});
const { $axios } = useNuxtApp();
const { userData } = useAuth();
const { formatNumber, formatNumber0 } = useNumberFormat();
const Rule = (value) => !!value || "This field is required";
import * as XLSX from "xlsx";
// import { useExcelExport } from "../composables/useExcelExport";
const { showWarning } = useAlert();
const { exportBorderRevenue } = useExcelExport();

const rows = ref([]);

onMounted(() => {
  if (tableRef.value) {
    console.log("Table element:", tableRef.value);
  }
});
// function get data
function submitForm() {
  if (date1.value != null && date2.value != null) {
    searchData();
  } else {
    console.log("date1===================", valid.value);

    showWarning("Please Select start and end date!");
  }
}
const searchData = async () => {
  loading.value = true;
  let body = {
    startDate: date1.value,
    endDate: date2.value,
    borderId: "all",
  };
  const res = await $axios.post("/custom/rp_sum_collection.service", body, {
    headers: {
      Authorization: `Bearer ${userData.value.accessToken}`,
    },
  });
  console.log(
    "============================dataResponse status============:",
    res.data.status
  );
  if (res.data.status != "00") {
    showWarning(`${res.data.message}`);
    loading.value = false;
  } else {
    loading.value = false;
    console.log(
      "============================dataResponse============:",
      res.data.dataResponse
    );
    items.value = res.data.dataResponse;
    itemsTotal.value = res.data.feeColectionFooter;
  }
  if (items.value.length > 0) {
    for (var i = 0; items.value.length > i; i++) {
      rows.value.push([
        i + 1,
        items.value[i].name,
        items.value[i].nameGb,
        items.value[i].customAmount,
        items.value[i].customTotal,
        items.value[i].visaAmount,
        items.value[i].visaTotal,
        items.value[i].visaUsdTotal,
        items.value[i].bridgeAmount,
        items.value[i].bridgeTotal,
        items.value[i].tourismAmount,
        items.value[i].tourismTotal,
        items.value[i].immigrationAmount,
        items.value[i].immigrationTotal,
        items.value[i].agricultureAmount,
        items.value[i].agricultureTotal,
        items.value[i].publicHealthAmount,
        items.value[i].publicHealthTotal,
      ]);
    }
  }
  console.log("=================items===================", rows.value);
};
const handleExport = () => {
  console.log("===============export==items===================", rows.value);
  exportBorderRevenue(rows.value, date1.value, date2.value);
};

const printTable = async () => {
  await nextTick();

  if (!tableRef.value) {
    return;
  }

  const printContents = tableRef.value.innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
};
const headers = []; // we override header slot, so leave empty
</script>

<!-- pages/border-report.vue -->

<style scoped>
table,
td,
th {
  border: 1px solid;
}

table {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: center;
}
thead {
  background-color: #b3d9ff; /* light blue */
  /* text color */
}
@media print {
  body * {
    visibility: hidden;
  }
  #print-section,
  #print-section * {
    visibility: visible;
  }
  #print-section {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
