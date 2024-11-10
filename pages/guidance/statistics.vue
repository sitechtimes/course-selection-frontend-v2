<template>
  <div>
    <div class="flex flex-row ml-12">
      <button class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]" @click="allCourses">
        All Courses
      </button>
      <button class="h-10 w-50 px-10 m-4 flex flex-col bg-primary-g text-black justify-center align-center item-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]" @click="courseRankings">
        Course Rankings
      </button>
    </div>
    <div class="barChart" v-if="barChart">
      <StatisticsBarChart />
    </div>
    <div class="pieChart" v-if="pieChart">
      <StatisticsPieChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
