<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">All Courses</div>

    <!-- drop-down menu for years -->
    <select v-model="selectedYear" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="year in years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
    <div v-if="!selectedYear" class="mt-2">
      <p>Please select a year from the list above</p>
    </div>

    <!-- drop-down menu for subjects -->
    <select v-model="selectedSubject" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="subject in subjects" :value="subject.value" :key="subject.value">
        {{ subject.subject }}
      </option>
    </select>
    <div v-if="!selectedSubject" class="mt-2">
      <p>Please select a subject from the list above</p>
    </div>

    <div class="w-[70rem] mt-2" v-if="loaded && selectedSubject && selectedYear">
      <Bar :options="chartOptions" :data="getChartData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { Bar } from 'vue-chartjs'
import { useUserStore } from '../../stores/user';
import { ref, Ref, onMounted, computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { stats } from '../../types/interface';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const userStore = useUserStore();
const loaded: Ref<boolean> = ref(false);
const selectedYear: Ref<number> = ref(0);

const chartData: Ref<stats[]> = ref([]);
const years: Ref<number[]> = ref([]);

async function fetchStats() {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/guidance/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.access_token}`,
      },
    });
    const data = await response.json();
    return {
      years: data.map((item: stats) => item.year),
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
const stats = computed(() => {
  if (selectedYear !== null) {
    const indexSelectedYear = years.value.indexOf(selectedYear.value);
    return chartData.value[indexSelectedYear].stats;
  }
});

const selectedSubject: Ref<string> = ref('')
const subjects = [
  { value: "MATH", subject: "Math" },
  { value: "ENGLISH", subject: "English" },
  { value: "SCIENCE", subject: "Science" },
  { value: "SS", subject: "Social Studies" },
  { value: "LANG", subject: "Language" },
  { value: "PE", subject: "P.E." },
  { value: "TECH", subject: "Technology" },
  { value: "ARTS", subject: "Arts" },
  { value: "OTHER", subject: "Other" },
];

const chartOptions = ref({
  responsive: true,
});

const getChartData = computed(() => {
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
        backgroundColor: ['#C5D4A4'],
        label: '# of students',
      },
    ],
  };

  if (selectedSubject.value && selectedYear.value) { //if the user has selected a subject and year from the dropdown, then do this: 
    interface targettedCourses {
      coursename: string,
      info: Object
    }
    const targettedCourses = Object.entries(stats) //take each key-value pair and filter them by !null courses that match the user's selected subject
      .filter(([courseName, info]: [string, any]) => {
        return (info && info.courseInfo && info.courseInfo.fields.subject) === (selectedSubject.value);
      });
    if (targettedCourses.length > 0) { //if the # of targetted courses exceed 0 (there is data), push to the graph
      for (const [courseName, info] of targettedCourses) {
        chartData.labels.push(courseName);
        chartData.datasets[0].data.push(info.picks);
      }
    } else {
      chartData.labels.push('No courses match this subject');
      chartData.datasets[0].data.push(0);
    }
  }
  loaded.value = true;
  return chartData;
});
</script>
