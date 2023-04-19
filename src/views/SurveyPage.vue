<template>
  <section class="mt-[7rem] lg:text-left text-center">
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="flex flex-col lg:flex-row">
      <surveyCheckbox :classes="classes" :question="question" :height="height" class="md:mt-8 mt-16"></surveyCheckbox>
      <div class="border-black border-[0.5px] border-solid rounded-xl lg:w-[35%] w-[90%] lg:ml-28 h-[vh] md:mt-8 relative self-center lg:self-auto">
        <div class="flex justify-center mt-8">
          <p class="text-[1.5rem] text-black w-80">Drag course(s) into order of preference:</p>
        </div>
        <div class="flex justify-center mt-4"> <!-- This is the v-if part -->
          <div class="bg-[#D6EEFF] w-[18rem] h-[3rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl ">                
            <p class="text-[#37394F] text-[1.5rem] font-bold">AP Psychology</p>
          </div>
        </div>
        <div class="flex flex-row-reverse md:absolute mt-6 md:mt-0 md:inset-x-0 md:bottom-0">
          <button class="bg-[#6A9FD1] text-white w-[30%] h-[2.5rem] md:h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] mr-5 mb-5">
            Confirm
          </button>
        </div>
      </div>
    </div>
    <backButton class="mt-8 absolute left-10 md:left-32"></backButton>
    <nextButton class="mt-8 absolute right-10 md:right-32"></nextButton> <!-- Use a v-if here later to make it grayed out -->
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
