<template>
  <client-only>
    <!-- <v-chart class="chart" :option="chartOptions" autoresize /> -->
 <MyChart 
  :labels="labels"
  :values="values"
  :colors="colors"
  :icons="colors"
/>
  </client-only>
</template>

<script setup lang="ts">
import VChart from "vue-echarts"; // use this as your chart component
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PictorialBarChart } from "echarts/charts";
import type { EChartsOption } from "echarts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import ldbLogo from "~/assets/images/ldb-logo.png";
defineProps<{
  labels: { descriptionName: string }[];
  values: { amt: number }[];
  colors: { color: string }[];
  icons: { imagePath: string }[];
}>();
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);
const labelss = [
  { descriptionName: "ລົດໂດຍສານ 9 ບ່ອນນັ່ງ" },
  { descriptionName: "ລົດໂດຍສານ 10-35 ບ່ອນນັ່ງ" },
];
const labels = ["ລົດໂດຍສານ 9 ບ່ອນນັ່ງ", "ລົດໂດຍສານ 10-35 ບ່ອນນັ່ງ"];
const valuess = [{ amt: 2 }, { amt: 4 }];

const colors = [{ color: "#91cc75" }, { color: "#5470c6" }];
const iconss = [{ imagePath: "" }, { imagePath: "" }];
// const values = [100, 45, 78, 2, 37, 0, 0, 37, 5, 24, 9, 0, 19];
// const icons = [
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo, // 9 seats
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
//   ldbLogo,
// ];
// Function to generate chart option dynamically
const getChartOption = (
  labels: { descriptionName: string }[],
  values: { amt: number }[],
  colors: { color: String }[],
  icons: { imagePath: String }[]
): EChartsOption => {
  return {
    grid: { left: 300, right: 50, top: 50, bottom: 50 },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: labels.map((l) => l.descriptionName), // Extract names
      axisLabel: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
      },
    },

    series: [
      {
        type: "pictorialBar",
        symbolPosition: "end",
        symbolSize: [40, 40],
        symbolOffset: [40, 0],
        data: icons.map((icon, i) => ({
          value: values[i].amt,
          symbol: `image://${icon.imagePath}`,
        })),
      },
      {
        name: "ຈຳນວນ",
        type: "bar",
        data: values.map((l, i) => ({
          value: l.amt,
          itemStyle: { color: colors[i % colors.length].color },
        })) as any,
        label: {
          show: true,
          position: "top",
          color: "#333",
          fontWeight: "bold",
          formatter: "{c}",
        },
        barWidth: 20,
      },
    ],
  };
};
// const chartOptions = {
//   grid: { left: 300, right: 50, top: 50, bottom: 50 },
//   tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
//   xAxis: { type: "value" },
//   yAxis: {
//     type: "category",
//     data: labels,
//     axisLabel: {
//       fontSize: 16,
//       color: "#333",
//       fontWeight: "bold",
//     },
//   },
//   series: [
//     {
//       type: "pictorialBar",
//       symbolPosition: "end",
//       symbolSize: [40, 40],
//       symbolOffset: [40, 0],
//       data: icons.map((icon, i) => ({
//         value: values[i],
//         symbol: `image://${icon}`,
//       })),
//     },
//     {
//       name: "ຈຳນວນ",
//       type: "bar",
//       data: values,
//       label: {
//         show: true,
//         position: "top",
//         color: "#333",
//         fontWeight: "bold",
//         formatter: "{c}",
//       },
//       barWidth: 20,
//       itemStyle: {
//         color: (params: any) => {
//           const colors = [
//             "#91cc75",
//             "#5470c6",
//             "#fac858",
//             "#ee6666",
//             "#73c0de",
//           ];
//           return colors[params.dataIndex % colors.length];
//         },
//       },
//     },
//   ],
// };
</script>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
</style>
