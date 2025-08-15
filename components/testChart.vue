<script setup lang="ts">
// Import onMounted & ref from Vue
import { ref, onMounted } from 'vue';

// Import echarts
import * as echarts from 'echarts';

// Your data
const data = [
  {
    borderId: "R1C10",
    borderName: "ດ່ານສາກົນ ບໍ່ເຕັນ",
    descriptionName: "ລົດໂດຍສານ 9 ບ່ອນນັ່ງ",
    channel: "someChannel",
    amt: 150,
    color: "#5470C6",
    imagePath: "path/to/image1.png"
  },
  {
    borderId: "R1C11",
    borderName: "ດ່ານສາກົນ ຕົ້ນໄມ້",
    descriptionName: "ລົດໂດຍສານ 12 ບ່ອນນັ່ງ",
    channel: "someChannel2",
    amt: 200,
    color: "#91CC75",
    imagePath: "path/to/image2.png"
  }
];

// refs for the chart container and instance
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (!chartRef.value) return;

  // Initialize chart
  chartInstance = echarts.init(chartRef.value);

  // Prepare data for chart
  const labels = data.map(item => item.descriptionName);
  const values = data.map(item => item.amt);
  const colors = data.map(item => item.color);

  // Set chart option
  const option: echarts.EChartsOption = {
    title: {
      text: 'ການນຳໃຊ້ລົດໂດຍສານ',
      left: 'center',
      textStyle: { fontSize: 20 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 14
      }
    },
    yAxis: {
      type: 'value',
      name: 'ຈຳນວນ',
      minInterval: 1
    },
    series: [
      {
        name: 'ຈຳນວນ',
        type: 'bar',
        data: values,
        itemStyle: {
          color: (params) => colors[params.dataIndex]
        },
        barWidth: '40%'
      }
    ]
  };

  chartInstance.setOption(option);

  // Responsive
  window.addEventListener('resize', () => {
    chartInstance?.resize();
  });
});
</script>

<template>
  <!-- Use client-only to avoid SSR errors -->
   <div> <h1>hellow index</h1> <client-only>

    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </client-only></div>

</template>
