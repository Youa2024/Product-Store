<template>
  <v-container fluid>
    <div class="chart-container">
      <button @click="downloadChart('png')">Download PNG</button>
      <button @click="downloadChart('jpeg')">Download JPEG</button>
      <button @click="downloadChart('svg')">Download SVG</button>
      <!-- <div ref="chartRef" style="width: 600px; height: 400px"></div> -->
    </div>
    <div class="chart-list">
      <div
        v-for="(chartData, index) in visaData"
        :key="index"
        class="chart-item"
      >
        <h3>{{ chartData.borderName }}</h3>
        <div
          :ref="(el) => (chartRefs[index] = el)"
          style="width: 400px; height: 300px"
        ></div>
      </div>
    </div>
    <!-- <v-row 
      ><v-col cols="6"
        ><v-card
          rounded="xl"
          class="pa-2"
          elevation="1"
          outlined
          v-for="(val, index) in data"
          style="margin-top: 10px;height: 660px"
        >
          <v-card-title primary-title>
            <h4>    ລາຍງານຄົນ ແລະ ລົດ ປະຈໍາວັນ
            <b class="text-red" style="font-size: 25px">(ຂາເຂົ້າ)</b>
            {{ val.borderName }}</h4>
        
          </v-card-title>
          <v-chart
            autoresize
            :option="getChartOption(val.channelIn)"
            class="chart"
          />
        </v-card> </v-col
      ><v-col cols="6"
        ><v-card
          rounded="xl"
          class="pa-5"
          elevation="1"
          outlined
          v-for="(val, index) in data"
          style="margin-top: 10px; height: 660px"
        >
          <v-card-title primary-title>
            <h4>   ລາຍງານຄົນ ແລະ ລົດ ປະຈໍາວັນ
            <b class="text-red" style="font-size: 25px">(ອອກ)</b>
            {{ val.borderName }}</h4>
         
          </v-card-title>
          <v-chart
            autoresize
            :option="getChartOption(val.channelOut)"
            class="chart"
          />
        </v-card> </v-col
    ></v-row> -->
  <v-row><v-col></v-col></v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

// import
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PictorialBarChart } from "echarts/charts";
// import type { EChartsOption } from "echarts";
/**
 * @typedef {import('echarts').EChartsOption} EChartsOption
 */
/**
 * @typedef {Object} ChartItem
 * @property {string} borderId
 * @property {string} borderName
 * @property {string} descriptionName
 * @property {string} channel
 * @property {number} amt
 * @property {string} color
 * @property {string} imagePath
 */
/**
 * @typedef {Object} chartsData
 * @property {string} borderId
 * @property {string} borderName
 * @property {string} paymentStatus
 * @property {string} amt
 * @property {number} amount
 * @property {string} color
 */
/**
 * @param {ChartItem[]} chartsData
 * @returns {EChartsOption}
 */
/**
 * @typedef {import('echarts').EChartsOption} EChartsOption
 */

/**
 * @param {ChartItem[]} itemData
 * @returns {EChartsOption}
 */
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// variable
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);
const { user, userData } = useAuth();
const { $axios } = useNuxtApp();
const visaData = ref([]);
const data = ref([]);
let chart;
const chartRefs = ref([]);
const dataItems = ref([
  { value: 10, amount: 50, color: "#99ff99" },
  { value: 5, amount: 30, color: "#66ccff" },
  { value: 8, amount: 40, color: "#ffcc66" },
]);
onMounted(async () => {
 await getData();
  await nextTick();
  chartRefs.value.forEach((el, index) => {
    const chart = echarts.init(el);
    chart.setOption(getChartOptions(visaData.value[index].groupFeeVisa));
  });
});
// Watch for changes in the array and update chart
watch(
  dataItems,
  (newItems) => {
    if (chart) chart.setOption(getChartOptions(newItems));
  },
  { deep: true }
);

const { locale } = useI18n();
const fontFamilies = {
  la: "Noto Sans Lao, sans-serif",
  zh: "Noto Sans Simplified Chinese, sans-serif",
  en: "Noto Serif Ottoman Siyaq, serif",
  vi: "Noto Serif Ottoman Siyaq, serif",
};
// Function to generate chart car fee
const getChartOption = (itemData) => {
  console.log("itemData============", itemData);

  const values = itemData.map((i) => i.amt).reverse();
  const labels = itemData.map((i) => i.descriptionName).reverse();

  const colors = itemData.map((i) => i.color).reverse();
  const icons = itemData.map((i) => i.imagePath).reverse();

  console.log("labels============", labels);

  return {
    grid: { left: 270, right: 0, top: 50, bottom: 50 },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
        fontFamily: fontFamilies[locale.value] || fontFamilies.en,
      },
    },
    series: [
      {
        type: "pictorialBar",
        symbolPosition: "end",
        symbolSize: [40, 40],
        symbolOffset: [40, 0],
        // data: icons.map((icon, i) => ({
        //   value: values[i],
        //   symbol: `image://${icon}`,
        // })),
      },
      {
        name: "ຈຳນວນ",
        type: "bar",
        // data: values,
        data: values.map((icon, i) => ({
          value: values[i] == 0 ? "" : values[i],
        })),
        label: {
          show: true,
          position: "top",
          color: "#333",
          fontWeight: "bold",
          formatter: "{c}",
        },
        barWidth: 15,
        itemStyle: {
          color: (params) => {
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };
};

// Dynamic array of data items

const getChartOptions = (chartsData) => {
  console.log("===============chartsData:",chartsData);
  
  // Example: amount in $
  const visibleData = chartsData.map((chartsData) => ({
    value: chartsData.amt,
    name: `ຈ່າຍ ${chartsData.amount} $ : ${chartsData.amt} ຄົນ`,
    itemStyle: { color: chartsData.color },
  }));
  // Total of values for invisible slice
  const totalValue = visibleData.reduce((sum, item) => sum + item.value, 0);

  const data = [
    ...visibleData,
    {
      value: totalValue, // invisible slice to make semicircle
      name: "",
      itemStyle: { color: "transparent" },
      tooltip: { show: false },
      label: { show: false },
    },
  ];
  return {
    title: {
      text: `ລວມ ${totalValue} ຄົນ`, // Center text
      left: "50%",
      top: "70%", // roughly center in the semicircle
      textAlign: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        fontFamily: fontFamilies[locale.value] || fontFamilies.en,
      },
    },

    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "80%"],
        center: ["50%", "70%"],
        startAngle: 180,
        hoverOffset: 0,
        data,
        label: {
          position: "inside",
          formatter: "{b}",
          color: "red",
          fontSize: 14,
          fontFamily: fontFamilies[locale.value] || fontFamilies.en,
        },
      },
    ],
  };
};
// Function to download chart
const downloadChart = (type = "png") => {
  if (!chart) return;
  const url = chart.getDataURL({
    type, // 'png', 'jpeg', or 'svg'
    pixelRatio: 2,
    backgroundColor: "#fff",
  });

  const link = document.createElement("a");
  link.href = url;
  link.download = `chart.${type}`;
  link.click();
};
// clears everything in the browser
const handleLogout = async () => {
  logout();
  await navigateTo("/login");
};
// function get data
const getData = async () => {
  const res = await $axios.post("/custom/home", null, {
    headers: {
      Authorization: `Bearer ${userData.value.accessToken}`,
    },
  });
  console.log(
    "============================dataResponse status============:",
    res.data.status
  );
  if (res.data.status != "00") {
  } else {
    console.log(
      "============================dataResponse============:",
      res.data.dataResponse
    );
    data.value = res.data.dataResponse.homeGroupFeeCar;
    visaData.value = res.data.dataResponse.homeGroupFeeVisa;

    console.log(
      "============================data============:",
      visaData.value
    );
  }
};
</script>
<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.chart-item {
  border: 1px solid #ccc;
  padding: 10px;
  background: #fafafa;
}
.chart-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
