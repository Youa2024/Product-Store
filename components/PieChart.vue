<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" :width="500" :height="500" />
    <ul>
      <li
        v-for="(item, index) in legend"
        :key="index"
        :style="{ color: item.color }"
      >
        <span><v-btn outline :color="item.color"></v-btn></span>
        <span class="text">{{ totalValue }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
/**
 * @typedef {Object} chartsData
 * @property {string} borderId
 * @property {string} borderName
 * @property {string} paymentStatus
 * @property {string} amt
 * @property {number} amount
 * @property {string} color
 */

import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.defaults.font.family = "Phetsarath OT";
ChartJS.defaults.font.size = 25;
ChartJS.register(Title, Tooltip, Legend, ArcElement);
const props = defineProps({
  chartsData: { type: Array, required: true },
});
import { computed } from "vue";

const values = computed(() => props.chartsData.map((i) => i.amt).reverse());
const labels = computed(() =>
  props.chartsData.map((i) => `ຈ່າຍ ${i.amount} $ : ${i.amt} ຄົນ`).reverse()
);
//const totalValue = props.chartsData.reduce((sum, item) => sum + item.value, 0);
const allZero = values.value.every((val) => val === 0);

const colors = computed(() => props.chartsData.map((i) => i.color).reverse());

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      data: allZero == true ? [0.1] : labels.value,
      backgroundColor: allZero == true ? "#3498db" : colors.value,
      datalabels: {
        formatter: (_, context) => {
          return labels.value[context.dataIndex]; // show label text
        },

        font: {
          family: "Phetsarath OT",
          size: 25,
          weight: "bold",
        },
        color: "#000",
      },
    },
  ],
}));

const chartOptions = {
  responsive: false,
  plugins: {
    legend: { display: false },
  },
};

const legend = [{ label: "Team", icon: "👤", color: "#3498db" }];
watch(
  () => [props.labels, props.values],
  ([newLabels, newValues]) => {
    chartData.labels = newLabels;
    chartData.datasets[0].data = newValues;
  },
  { deep: true }
);
</script>

<style scoped>
.legend-list {
  list-style: none;
  padding: 0;
}
.legend-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
.text {
  font-weight: bold;
}
</style>
