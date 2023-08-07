<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">Course Rankings</div>
    <!-- drop-down menu -->
    <select v-model="selectedCourse" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
    </select>

    <div class="w-[70rem] mt-2" v-if="loaded && selectedCourse">
      <Pie :options="chartOptions" :data="getChartData" />
    </div>
    <div v-else class="mt-2">
      <p>Please select a course from the list above</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { useGuidanceStore } from '../../stores/guidance';
import { ref, onMounted, computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { random } from 'gsap';
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
        backgroundColor: [],
        label: '# of students',
      },
    ],
  };

  for (let i = 0; i < 40; i++) {
    const randomColours = "#" + Math.floor(Math.random() * 16777215).toString(16); //toString(16) turns it into a hexadecimal
    chartData.datasets[0].backgroundColor.push(randomColours)
  }

  if (selectedCourse.value) {
    const course = stats[selectedCourse.value];
    const ranks = course.ranks;

    for (let i = 0; i < ranks.length; i++) {
      chartData.labels.push(`Rank ${i + 1}`); //we must add 1 because index 0 should be rank 1, not 0
      chartData.datasets[0].data.push(ranks[i]);
    }
  }
  loaded.value = true
  return chartData
});


onMounted(() => {
  console.log(stats)
})
</script>