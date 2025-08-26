<template>
  <client-only>
    <v-container fluid>
      <v-card>
        <v-card-text class="overflow-x-auto" id="print-section">
          <div ref="tableRef">
            <table class="corner-borders-table min-w-[1000px] border">
              <thead>
                <tr>
                  <th rowspan="3" class="text-center">ລ/ດ</th>
                  <th rowspan="3" class="text-center">ດ່ານຊາຍແດນ</th>
                  <th rowspan="3" class="text-center">ແຂວງ</th>

                  <th colspan="17" class="text-center">21/20/2025</th>
                </tr>
                <tr>
                  <th colspan="3" class="text-center">
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
                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>
                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>
                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ (LAK)</th>
                  <th>ຈຳນວນເງິນ (USD)</th>

                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>

                  <th>ຈຳນວນຄົນ</th>
                  <th>ຈຳນວນເງິນ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.nameGb }}</td>
                  <td>{{ item.customAmount }}</td>
                  <td>{{ item.customTotal }}</td>
                  <td>{{ item.visaAmount }}</td>
                  <td>{{ item.visaTotal }}</td>
                  <td>{{ item.visaUsdTotal }}</td>
                  <td>{{ item.bridgeAmount }}</td>
                  <td>{{ item.bridgeTotal }}</td>
                  <td>{{ item.tourismAmount }}</td>
                  <td>{{ item.tourismTotal }}</td>
                  <td>{{ item.immigrationAmount }}</td>
                  <td>{{ item.immigrationTotal }}</td>
                  <td>{{ item.agricultureAmount }}</td>
                  <td>{{ item.agricultureTotal }}</td>
                  <td>{{ item.publicHealthAmount }}</td>
                  <td>{{ item.publicHealthTotal }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions>
          <client-only>
            <v-btn @click="printTable()">download pdf</v-btn>
            <v-btn @click="handleExport()">download excel</v-btn></client-only
          >
        </v-card-actions>
      </v-card>
    </v-container></client-only
  >
</template>

<script setup>
import { ref, nextTick } from "vue";

import * as XLSX from "xlsx";
import { useExcelExport } from "../composables/useExcelExport";
// const exportToExcel = () => {
//   const table = document.getElementById('print-section')
//   if (!table) return

//   // Convert HTML table to worksheet
//   const worksheet = XLSX.utils.table_to_sheet(table)

//   // Create a new workbook and append the worksheet
//   const workbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Report')

//   // Trigger download
//   XLSX.writeFile(workbook, 'Border-Transaction-Report.xlsx')
// }
const { exportBorderRevenue } = useExcelExport();
const rows = [
  [
    "1",
    "ດ່ານໜຶ່ງ",
    "ຫົວພັນ",
    1000,
    5000000,
    500,
    2000000,
    100,
    200,
    1500000,
    300,
    1200000,
    50,
    500000,
    80,
    700000,
    60,
    300000,
  ],
];
const handleExport = () => {
  exportBorderRevenue(rows);
};

const tableRef = (ref < HTMLElement) | (null > null);

const printTable = async () => {
  await nextTick();

  if (!tableRef.value) {
    console.error("Table element not found!");
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

const items = [
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
  {
    id: 1,
    border: "ດ່ານຊາຍແດນ ສະຫວັນນະເຂດ II",
    province: "ສະຫວັນນະເຂດ",
    reg_people: 970128,
    reg_money: 81415749300,
    voa_people: 3456,
    voa_lak: 867248680,
    voa_usd: 34720,
    stay_people: 258403,
    stay_money: 2584030000,
    other_people: 451379,
    other_money: 3848128000,
    pass_people: 0,
    pass_money: 0,
    temp_people: 0,
    temp_money: 0,
    foreign_people: 0,
    foreign_money: 0,
  },
];
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
