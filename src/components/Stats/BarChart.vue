<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">
      All Courses
    </div>

    <!-- drop-down menu for years -->
    <select
      v-model="selectedYear"
      class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80"
    >
      <option v-for="year in years" :value="year" :key="year.toString()">
        {{ year }}
      </option>
    </select>
    <div v-if="!selectedYear" class="mt-2">
      <p>Please select a year from the list above</p>
    </div>

    <!-- drop-down menu for subjects -->
    <select
      v-model="selectedSubject"
      class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80"
    >
      <option
        v-for="subject in subjects"
        :value="subject.value"
        :key="subject.value"
      >
        {{ subject.subject }}
      </option>
    </select>
    <div v-if="!selectedSubject" class="mt-2">
      <p>Please select a subject from the list above</p>
    </div>

    <div
      class="w-[70rem] mt-2"
      v-if="loaded && selectedSubject && selectedYear"
    >
      <Bar :options="chartOptions" :data="getChartData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bar } from "vue-chartjs";
import { useUserStore } from "../../stores/user";
import { ref, onMounted, computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Stats, ChartData } from "../../types/interface";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const userStore = useUserStore();
const loaded = ref(false);
const selectedYear = ref(0);

const chartData = ref<Stats[]>([]);
const years = ref<Number[]>([]);

onMounted(async () => {
  const statsData = await userStore.fetchStats();
  years.value = statsData.years;
  chartData.value = statsData.data;
  loaded.value = true;
});

//if a new year is selected from the dropdown, find the index where the stats are located
const stats = computed(
  () => chartData.value[years.value.indexOf(selectedYear.value)].stats || []
);

const selectedSubject = ref("");
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

const chartOptions = ref({ responsive: true });

const getChartData = computed(() => {
  const chartData: ChartData = {} as ChartData;

  if (selectedSubject.value && selectedYear.value) {
    const targettedCourses = Object.entries(stats).filter(
      ([_, info]) => info.courseInfo.fields.subject === selectedSubject.value
    );
    if (targettedCourses.length > 0) {
      for (const [courseName, info] of targettedCourses) {
        chartData.labels.push(courseName);
        chartData.datasets[0].data.push(info.picks);
      }
    } else {
      chartData.labels.push("No courses match this subject");
      chartData.datasets[0].data.push(0);
    }
  }
  loaded.value = true;
  return chartData;
});
</script>
