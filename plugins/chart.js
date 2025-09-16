import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default defineNuxtPlugin(() => {
  ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);
});
