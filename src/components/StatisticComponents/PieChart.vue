<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">
      Course Rankings
    </div>
    <!-- drop-down menu for years-->
    <select v-model="selectedYear" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="year in years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
    <div v-if="!selectedYear" class="mt-2">
      <p>Please select a year from the list above</p>
    </div>
    <!-- drop-down menu for courses-->
    <select v-model="selectedCourse" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="course in courses" :key="course" :value="course">
        {{ course }}
      </option>
    </select>
    <div class="w-[70rem] mt-2" v-if="loaded && selectedCourse && selectedYear">
      <Pie :options="chartOptions" :data="getChartData" />
    </div>
    <div v-else class="mt-2">
      <p>Please select a course from the list above</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Pie } from "vue-chartjs";
import { ref, onMounted, computed, Ref, ComputedRef } from "vue";
import { useUserStore } from "../../stores/user";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartStats, stats } from "../../types/interface";
ChartJS.register(ArcElement, Tooltip, Legend);

const userStore = useUserStore();
const loaded: Ref<boolean> = ref(false);
const selectedCourse: Ref<string> = ref("");
const selectedYear: Ref<string> = ref("");

const chartData: Ref<stats[]> = ref([]);
const years: Ref<number[]> = ref([]);

async function fetchStats() {
  const access_token: string = userStore.access_token;
  const statsURL: string = `${import.meta.env.VITE_URL}/guidance/stats`;
  try {
    const response = await fetch(statsURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    const fetchedYears = data.map((item: stats) => item.year);
    return {
      years: fetchedYears,
      data: data,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      years: [],
      data: [],
    };
  }
}

onMounted(async () => {
  const statsData = await fetchStats();
  years.value = statsData.years;
  chartData.value = statsData.data;
  loaded.value = true;
});

//if a new year is selected from the dropdown, find the index where the stats are located
const stats: ComputedRef<pieChartStats> = computed(() => {
  if (selectedYear !== null) {
    const indexSelectedYear = years.value.indexOf(Number(selectedYear.value));
    return chartData.value[indexSelectedYear]?.stats || {};
  }
  return {};
});

//returns each course name
const courses = computed(() => {
  //check if stats is defined before using Object.keys()
  return stats.value ? Object.keys(stats.value) : [];
});

const chartOptions = ref({
  responsive: true,
});

const getChartData = computed(() => {
  //use computed properties to recalculate on render
  const chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      label: string;
    }[];
  } = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#C5D4A4"],
        label: "# of students",
      },
    ],
  };

  for (let i = 0; i < 40; i++) {
    const randomColours =
      '#' + Math.floor(Math.random() * 16777215).toString(16); //toString(16) turns it into hexadecimal
    chartData.datasets[0].backgroundColor.push(randomColours);
  }

  if (selectedCourse.value) {
    const course = stats.value[selectedCourse.value];
    const ranks = course?.ranks || [];

    for (let i = 0; i < ranks.length; i++) {
      chartData.labels.push(`Rank ${i + 1}`); //we must add 1 because index 0 should be rank 1, not 0
      chartData.datasets[0].data.push(ranks[i]);
    }
  }

  return chartData;
});
</script>
