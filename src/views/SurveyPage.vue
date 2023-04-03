<template>
  <section class="mt-[7rem] md:text-left text-center">
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="flex">
      <surveyCheckbox :classes="classes" :question="question" :height="height" class="md:mt-8 mt-16"></surveyCheckbox>
      <div class="border-black border-[0.5px] border-solid rounded-xl w-[20%] ml-20 h-fit md:mt-8 mt-16">
        <p class="text-[1.5rem] text-black flex justify-self-center	">Drag course(s) into order of preference:</p>
        <div class="flex justify-center">
          <div class="bg-[#D6EEFF] w-[22rem] h-[5rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl ">                
            <p class="text-[#37394F] text-[1.3rem] font-bold">AP Psychology</p>
          </div>
        </div>
        <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">
          Confirm
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import pageOne from "../components/SurveyPageComponents/pages/pageOne.vue";
import nextButton from "../components/SurveyPageComponents/reusables/nextButton.vue";
import backButton from "../components/SurveyPageComponents/reusables/backButton.vue";
import surveyCheckbox from "../components/SurveyPageComponents/Reusables/surveyCheckbox.vue";


const height = "h-[40rem]"

const classes = [
  {
    id: "first-class",
    answer: "Biology (non-AP)",
  },
  {
    id: "second-class",
    answer: "AP Biology",
  },
  {
    id: "third-class",
    answer: "AP Psychology",
  },
  {
    id: "fourth-class",
    answer: "AP Chemistry",
  },
  {
    id: "fifth-class",
    answer: "AP Physics 1",
  },
  {
    id: "sixth-class",
    answer: "AP Physics 2",
  },
  {
    id: "seventh-class",
    answer: "AP Physics C",
  },
  {
    id: "eighth-class",
    answer: "Applied Physics",
  },
  {
    id: "ninth-class",
    answer: "Anatomy and Physiology",
  },
];
const question = "Select the Science course(s) you are interested in:";
</script>

<style scoped></style>
