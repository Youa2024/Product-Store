import { defineNuxtPlugin } from '#app'
import VueECharts from 'vue-echarts'
import * as ECharts from 'echarts/core'
import {
  TimelineComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

ECharts.use([
  TimelineComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LineChart,
  CanvasRenderer
])

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('v-chart', VueECharts)
})
