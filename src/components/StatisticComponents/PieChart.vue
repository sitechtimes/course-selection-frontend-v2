<template>
  <div>
    <!-- drop-down menu -->
    <select v-model="selectedCourse" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 ml-6 mt-1 w-80">
      <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
    </select>

    <div class="w-[70rem]" v-if="loaded && selectedCourse">
      <Pie :options="chartOptions" :data="getChartData" />
    </div>
    <div v-else>
      <p>Data is not available yet.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { useGuidanceStore } from '../../stores/guidance';
import { ref, onMounted, computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const loaded = ref(true);
const guidanceStore = useGuidanceStore();
const stats = JSON.parse(guidanceStore.surveyStats.edges[0].node.stats);
const courses = Object.keys(stats); //returns each course name
const selectedCourse = ref('');

const chartOptions = ref({
  responsive: true,
});


const getChartData = computed(() => { //use computed properties to recalculate on render
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#C5D4A4', //we need to find 20 shades of green :'/
        label: '# of students',
      },
    ],
  };

  if (selectedCourse.value) {
    const course = stats[selectedCourse.value];
    const ranks = course.ranks;

    for (let i = 0; i < ranks.length; i++) {
      chartData.labels.push(`Rank ${i + 1}`); //we must add 1 because index 0 should be rank 1, not 0
      chartData.datasets[0].data.push(ranks[i]);
    }
  }
  loaded.value=true
  return chartData
});


onMounted(() => {
  console.log(stats)
})
</script>
