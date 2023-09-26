<template>
  <div class="flex flex-col justify-center align-center items-center">
    <div class="text-2xl md:text-3xl font-semibold sm:flex text-center">All Courses</div>
    <!-- drop-down menu -->
    <select v-model="selectedYear" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="one in years" :value="one.value" :key="one.value" >
        {{ one }}
      </option>
    </select>
    <h1>selected:{{ selectedYear.prop }}</h1>

    <select v-model="selectedSubject" class="space rounded-md border border-solid border-zinc-400 h-10 p-2 mt-2 w-80">
      <option v-for="subject in subjects" :value="subject.value" :key="subject.value">
        {{ subject.subject }}
      </option>
    </select>
    <div class="w-[70rem] mt-2" v-if="loaded && selectedSubject">
      <Bar :options="chartOptions" :data="getChartData" />
    </div>
    <div v-else class="mt-2">
      <p>Please select a subject from the list above</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { useGuidanceStore } from '../../stores/guidance';
import { ref, onMounted, computed } from 'vue';
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

const loaded = ref(true);
const guidanceStore = useGuidanceStore();

const years = []
const arr = guidanceStore.surveyStats.edges
let selectedYear = {}
arr.forEach((el)=>{
  const eachYear = el.node
  years.push(selectedYear.year)
  Object.defineProperty(selectedYear, 'prop',{
    value: eachYear.year,
    writable: false
  })
  console.log(selectedYear.prop)
})  

const i = years.indexOf(selectedYear.prop)
console.log(i)
const stats = JSON.parse(guidanceStore.surveyStats.edges[0].node.stats);
const selectedSubject = ref('');
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
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#C5D4A4'],
        label: '# of students',
      },
    ],
  };

  if (selectedSubject.value) {   //if the user has selected a subject from the dropdown, then do this: 
    const targettedCourses =
      Object.entries(stats) //take each key-value pair and filter them by !null courses that match the user's selected subject
        .filter(([courseName, info]) => {
          return (info.courseInfo !== null && info.courseInfo.fields.subject) === (selectedSubject.value);
        });

    if (targettedCourses.length > 0) { //if the # of targetted courses exceed 1 (there is data), push to the graph
      for (const [courseName, info] of targettedCourses) {
        chartData.labels.push(courseName);
        chartData.datasets[0].data.push(info.picks);
      }
    } else { //if the number of targetted courses DO NOT exceed 1 (there is no data), push 0 to the graph
      chartData.labels.push('No courses match this subject'); 
      chartData.datasets[0].data.push(0);
    }
  }
  loaded.value = true;
  return chartData;
});
</script>
