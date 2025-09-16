<!-- <script setup>
import { reactive } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

// Register Chart.js modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// ✅ Correct Nuxt public paths
const iconPaths = [
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
  "/icons/ldb-logo.png",
];

// ✅ Preload icons (wait until loaded)
const icons = iconPaths.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

// Chart data
const chartData = reactive({
  labels: [
    "ລົດຂົນສົ່ງເກີນ 12 ລໍ້ ແລະ ຫົວລົດລາກ",
    "ລົດຂົນສົ່ງເກີນ 13 ລໍ້ ",
    "ລົດຂົນສົ່ງ",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ],
  datasets: [
    {
      label: "Values",
      data: [5, 4, 3, 3, 4, 5, 6, 7, 8, 9],
      backgroundColor: [
        "#8e2c86",
        "#f44336",
        "#ffb74d",
        "#8bc34a",
        "#b2dfdb",
        "#4db6ac",
        "#26a69a",
        "#00acc1",
        "#0288d1",
        "#263238",
      ],
      borderRadius: 25,
    },
  ],
});

// Chart options
const chartOptions = reactive({
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      min: 0,
      max: 12,
      ticks: {
        stepSize: 2,
        font: {
          size: 14, // 🔹 X-axis label font size
          weight: "bold",
          family: "Phetsarath OT, sans-serif",
        },
      },
    },
  },
  x: {
    ticks: {
      font: {
        size: 18, // 🔹 X-axis label font size
        weight: "bold",
        family: "Phetsarath OT, sans-serif",
      },
    },
  },
});

// ✅ Custom plugin for icons + values
const iconPlugin = {
  id: "iconPlugin",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((bar, index) => {
      const img = icons[index];
      const value = dataset.data[index];
      if (!bar) return;

      const { x, y } = bar.tooltipPosition();

      // 🖼️ Draw icon only if loaded
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, x - 15, y - 40, 30, 30);
      }

      // 🔢 Draw number above icon
      ctx.save();
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(value, x, y - 50);
      ctx.restore();
    });
  },
};
</script>

<template>
  <div
    class="chart-container"
    style="width: 150%; max-width: 1000px; height: 500px"
  >
    <Bar :data="chartData" :options="chartOptions" :plugins="[iconPlugin]" />
  </div>
</template> -->

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
/**
 * @param {ChartItem[]} chartsData
 * @returns {EChartsOption}
 */
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  chartsData: { type: Array, required: true },

});
const values = props.chartsData.map((i) => i.amt).reverse();
const labels = props.chartsData.map((i) => i.descriptionName).reverse();

const colors = props.chartsData.map((i) => i.color).reverse();
const iconss = props.chartsData.map((i) => i.imagePath).reverse();
// ✅ Props
console.log("====================iconss:==============", iconss);
console.log("====================chart:==============", props.chartsData);
// ✅ Preload icons
const icons = iconss.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

// ✅ Chart data (reactive to props)
const chartData = reactive({
  labels: labels,
  datasets: [
    {
      label: "ຈໍານວນ",
      data: values.map((icon, i) => (values[i] == 0 ? "" : values[i])),
      backgroundColor: colors,
      borderColor: "#000000",
      borderRadius: 0,
      borderWidth: 1,
      datalabels: {
        font: {
          family: "Times New Roman", // 👈 custom font family
          size: 14, // 👈 font size
          weight: "normal", // 👈 font weight (normal, bold, 300, etc.)
        },
        color: "red", // 👈 label color
        anchor: "end", // 👈 position relative to bar
        align: "top", // 👈 move label above bar
        formatter: (v) => v, // 👈 always show value (even 0)
      },
    },
  ],
});

// ✅ Chart options
const chartOptions = reactive({
  responsive: true,
  plugins: {
    datalabels: {
      color: "#00000000", // text color
      anchor: "end", // position relative to bar
      align: "top", // above the bar
      font: {
        size: 10,
        weight: 300,
        clamp: true, // 👈 not bold
      },
      // don’t show empty strings
    },
  },
  scales: {
    y: {
      min: 0,
      max: 80,
      ticks: {
        stepSize: 2,
        font: {
          size: 14,
          weight: "",
          family: "Times New Roman, sans-serif",
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
          weight: "normal",
          family: "Phetsarath OT, sans-serif",
        },
      },
    },
  },
});

// ✅ Custom plugin (icons + numbers)
const iconPlugin = {
  id: "iconPlugin",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((bar, index) => {
      const img = icons[index];
      const value = dataset.data[index];
      if (!bar) return;

      const { x, y } = bar.tooltipPosition();

      // Draw icon
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, x - 15, y - 40, 30, 30);
      }

      // Draw value
      ctx.save();
      ctx.font = "bold 18px 'Phetsarath OT', sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(value, x, y - 40);
      ctx.restore();
    });
  },
};

// ✅ Update chart data when props change
watch(
  () => [props.labels, props.values],
  ([newLabels, newValues]) => {
    chartData.labels = newLabels;
    chartData.datasets[0].data = newValues;
  },
  { deep: true }
);
</script>

<template>
  <div
    class="chart-container"
    style="width: 100%; max-width: 1000px; height: 500px"
  >
    <Bar :data="chartData" :options="chartOptions" :plugins="[iconPlugin]" />
  </div>
</template>
