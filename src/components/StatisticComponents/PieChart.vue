<template>
    <!-- bar graph component -->
    <Bar id="BarChart" :options="chartOptions" :data="chartData" />
  </template>
  
  <script>
  // imports for the chart stuff
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  // register the chart stuff (idk thats what the docs said)
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    // just the name and component
    name: 'BarChart',
    components: { Bar },
  
    // props for the chart data and chart options (w/ default settings)
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        default: () => ({
          scales: {
            y: {
              beginAtZero: true
            }
          },
        })
      }
    }
  }
  </script>