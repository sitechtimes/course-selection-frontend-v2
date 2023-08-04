<template>
  <div>
    <button
      class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      @click="allCourses">All Courses</button>
    <button
      class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      @click="courseRankings">Course Rankings</button>

    <div class="text-2xl md:text-3xl font-semibold hidden sm:flex" v-if="barChart">
      All Courses
    </div>
    <div class="text-2xl md:text-3xl font-semibold sm:flex" v-if="pieChart">Course Rankings</div>

    <div class="barChart" v-if="barChart">
      <BarChart />
    </div>
    <div class="pieChart" v-if="pieChart">
      <PieChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BarChart from '../components/StatisticComponents/BarChart.vue';
import PieChart from '../components/StatisticComponents/PieChart.vue';

const barChart = ref(true);
const pieChart = ref(false);

const allCourses = () => {
  pieChart.value = false;
  barChart.value = true;
};

const courseRankings = () => {
  pieChart.value = true;
  barChart.value = false;
};


</script>
