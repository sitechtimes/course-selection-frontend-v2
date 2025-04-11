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
import { Stats, ChartData, CourseStat } from "../../types/interface";
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
const years = ref<number[]>([]);

onMounted(async () => {
  const statsData = await userStore.fetchStats();
  years.value = statsData.years;
  chartData.value = statsData.data;
  loaded.value = true;
});

//if a new year is selected from the dropdown, find the index where the stats are located
const stats = computed(
  () => chartData.value.find(item => item.year === selectedYear.value)
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
  const labels: string[] = [];
  const data: number[] = [];

  if (selectedSubject.value && selectedYear.value && stats.value) {
    const targettedCourses = stats.value.courses.filter(
      (item) => item.course.subject === selectedSubject.value
    );
    if (targettedCourses.length > 0) {
      targettedCourses.forEach((item) => {
        labels.push(item.course.name);
        data.push(item.picks);
      });
    } else {
      labels.push(`No courses in ${selectedSubject.value} for ${selectedYear.value}`);
      data.push(0);
    }
  }

  const chartResult: ChartData = {
    labels: labels,
    datasets: [{ label: "Number of Picks", data: data }],
  };

  loaded.value = true;
  return chartResult;
});
</script>
