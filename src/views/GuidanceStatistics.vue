<template>
  <button
    class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">All
    Courses</button>
  <button
    class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">Course
    Rankings</button>

  <div class="text-2xl md:text-3xl font-semibold hidden sm:flex" v-if="barChart">
    All Courses
  </div>
  <div class="text-2xl md:text-3xl font-semibold sm:flex" v-if="pieChart">Course Ranking
  </div>
  <div class="barChart">
    <BarChart v-if="loaded" :chartData="chartData" :chartOptions="chartOptions" />
    <div v-else>
      <p>Data is not available yet.</p>
    </div>
  </div>

  <!-- <div class="pieChart">
    <PieChart v-if="loaded" :chartData="chartData" :chartOptions="chartOptions" />
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGuidanceStore } from '../stores/guidance';
import BarChart from '../components/StatisticComponents/BarChart.vue';

const guidanceStore = useGuidanceStore();

const pieChart = ref(true)
const barChart = ref(true)
const loaded = ref(false)
const stats = JSON.parse(guidanceStore.surveyStats.edges[0].node.stats)

const chartOptions = ref({
  responsive: true
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#8e4d4d',
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