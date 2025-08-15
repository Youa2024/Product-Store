<!-- components/TimelineChart.vue
<script setup>
const option = {
  baseOption: {
    timeline: {
      axisType: 'category',
      autoPlay: true,
      playInterval: 2000,
      data: ['2021', '2022', '2023', '2024']
    },
    tooltip: {},
    grid: { top: 80, bottom: 100 },
    title: {
      subtext: 'Dynamic Timeline Chart'
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: { type: 'value' },
    series: []
  },
  options: [
    {
      title: { text: '2021 Data' },
      series: [
        {
          type: 'line',
          data: [10, 20, 30, 40]
        }
      ]
    },
    {
      title: { text: '2022 Data' },
      series: [
        {
          type: 'line',
          data: [15, 25, 35, 45]
        }
      ]
    },
    {
      title: { text: '2023 Data' },
      series: [
        {
          type: 'line',
          data: [20, 30, 40, 50]
        }
      ]
    },
    {
      title: { text: '2024 Data' },
      series: [
        {
          type: 'line',
          data: [25, 35, 45, 55]
        }
      ]
    }
  ]
}
</script>

<template>
  <v-chart :option="option" style="width: 100%; height: 400px" />
</template> -->
