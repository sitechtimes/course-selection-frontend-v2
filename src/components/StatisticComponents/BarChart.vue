<template>
    <Pie id="PieChart" :options="chartOptions" :data="chartData" />
  </template>
  
  <script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    props: { //register options and data as objects, required; standard default setup
      chartOptions: {
        type: Object,
        required: true,
        default: () => ({
          responsive: true,
        })
      },
      chartData: {
        type: Object,
        required: true
      }
    }
  }
  </script>