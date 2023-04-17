<template>
  <section class="mt-[7rem] md:text-left text-center">
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="flex">
      <surveyCheckbox :classes="classes" :question="question" :height="height" class="md:mt-8 mt-16"></surveyCheckbox>
      <div class="border-black border-[0.5px] border-solid rounded-xl w-[40%] ml-20 h-3/5 md:mt-8 mt-16 ">
        <div class="flex justify-center mt-8">
          <p class="text-[1.5rem] text-black w-80">Drag course(s) into order of preference:</p>
        </div>
        <div class="flex justify-center mt-4">
          <div class="bg-[#D6EEFF] w-[18rem] h-[3rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl ">                
            <p class="text-[#37394F] text-[1.5rem] font-bold">AP Psychology</p>
          </div>
        </div>
        <div class="flex flex-row-reverse">
          <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] mr-5 mb-5">
            Confirm
          </button>
        </div>
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
