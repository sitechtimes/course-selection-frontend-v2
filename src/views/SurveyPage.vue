<template>
  <div class="mt-32 height-48 text-2xl ">
    <fieldset class="field">
    <legend >{{ question }}</legend>
    <div v-for="choice in form" :key="choice" class="circle-button flex flex-wrap w-[30%] p-[0%] m-[0%]">
      <input
        type="radio"
        class="w-6 h-6 m-2 outline-1 checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]"
        :id="choice.id"
        :name="question"
      />
      <label :for="choice.id">{{ choice.answer }}</label>
    </div>
  </fieldset>
  </div>
</template>

<script setup lang="ts">
import pageOne from "../components/SurveyPageComponents/pages/returnToHome.vue";
import SurveyButton from "../components/SurveyPageComponents/reusables/surveyButton.vue";

const form = [
  {
    id: "first-question",
    answer: "Yes",
  },
  {
    id: "second-question",
    answer: "No",
  },
  {
    id: "third-question",
    answer: "Not Sure",
  },
];
const question = "Are you interested in a 8th academic period (1-9 schedule)?";
</script>

<style scoped></style>
