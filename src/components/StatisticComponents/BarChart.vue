<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">All Courses</div>
    <Bar class="mt-2 w-[70rem]" v-if="loaded" :options="chartOptions" :data="chartData" />
    <div v-else>
      <p>Data is not available yet.</p>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { useGuidanceStore } from '../../stores/guidance';
import { ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const loaded = ref(false)
const guidanceStore = useGuidanceStore();
const stats = JSON.parse(guidanceStore.surveyStats.edges[0].node.stats)
const chartOptions = ref({
  responsive: true
});
const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#C5D4A4',
      label: '# of students',
    },
  ],
});

onMounted(() => {
  if (stats) {
    const data = [];

    for (const courseName in stats) {
      const course = stats[courseName];
      const { picks } = course;
      
      data.push(courseName);
      chartData.value.datasets[0].data.push(picks);
    }
    chartData.value.labels = data;
    loaded.value = true;
  }
});
</script>