<template>
    <section class="md:mt-[4%] mt-[20%] lg:text-left text-center"> <!-- Each 1% is 15.328 pixels. 1 rem is 16 pixels. Values based off of the computer in Whalen's room-->
      <h1 class="text-[#37394F] text-[225%] md:text-[375%] font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
      <div class="flex flex-col lg:flex-row">
        <surveyCheckbox :choices="choices" :question="question" class="md:mt-[1%] mt-[4%]"></surveyCheckbox>
        <div class="border-black border-[0.5px] border-solid rounded-xl lg:w-[35%] w-[90%] lg:ml-28 lg:h-[70vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll">
          <div class="flex justify-center mt-[1%]">
            <p class="text-[150%] text-black">Drag course(s) into order of preference:</p>
          </div>
          <div class="flex justify-center mt-[2%]"> <!-- This is the v-if part -->
            <div class="bg-[#D6EEFF] w-[18rem] h-[3rem] lg:w-[50%] lg:h-[5vh] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl ">                
              <p class="text-[#37394F] text-[150%] font-bold">AP Psychology</p>
            </div>
          </div>
          <div class="flex flex-row-reverse mt-6 ">
            <button class="bg-[#6A9FD1] text-white w-[30%] h-[2.5rem] lg:h-[3.5rem] text-[1.5rem] md:text-[200%] mr-5 mb-5" >
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
  import { propsToAttrMap } from '@vue/shared';
import backButton from '../Reusables/backButton.vue'
  import nextButton from '../Reusables/nextButton.vue';
  import surveyCheckbox from "../Reusables/surveyCheckbox.vue";

  const choices = [
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

  const props = defineProps({
    userData: Object
  });
  
  console.log(props.userData.survey.questions[8].question)

  const question = props.userData.survey.questions[8].question

  </script>
  
  <style scoped></style>
  