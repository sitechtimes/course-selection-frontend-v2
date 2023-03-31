<template>
  <surveyCheckbox :classes="classes" :question="question" :height="height"></surveyCheckbox>
  <div class="border-black border-[0.5px] border-solid rounded-xl w-[40%]">
    <p>Drag course(s) into order of preference:</p>
    <div class="bg-[#D6EEFF] w-[22rem] h-[5rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl">                
      <p class="text-black text-[1.3rem]">Basketball Elective</p>
    </div>
    <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">
      Confirm
    </button>
  </div>
</template>

<script setup lang="ts">
import pageOne from "../components/SurveyPageComponents/pages/pageOne.vue";
import nextButton from "../components/SurveyPageComponents/reusables/nextButton.vue";
import backButton from "../components/SurveyPageComponents/reusables/backButton.vue";
import surveyCheckbox from "../components/SurveyPageComponents/Reusables/surveyCheckbox.vue";


const height = "h-[30rem]"

const classes = [
  {
    id: "first-class",
    answer: "class 1",
  },
  {
    id: "second-class",
    answer: "class 2",
  },
  {
    id: "third-class",
    answer: "class 3",
  },
  {
    id: "first-class",
    answer: "class 1",
  },
  {
    id: "second-class",
    answer: "class 2",
  },
  {
    id: "third-class",
    answer: "class 3",
  },
  {
    id: "first-class",
    answer: "class 1",
  },
  {
    id: "second-class",
    answer: "class 2",
  },
  {
    id: "third-class",
    answer: "class 3",
  },
  {
    id: "first-class",
    answer: "class 1",
  },
  {
    id: "second-class",
    answer: "class 2",
  },
  {
    id: "third-class",
    answer: "class 3",
  },
];
const question = "Are you interested in a 8th academic period (1-9 schedule)?";
</script>

<style scoped></style>
