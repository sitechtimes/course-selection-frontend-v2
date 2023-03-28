<template>
  <section class="mt-[7rem]"> <!-- This one is the same for every year -->
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="mt-[3rem] text-2xl md:text-4xl text-black ml-32"><label for="major">How many AP or college-level courses are you interested in taking?</label>
      <input type="text" id="major" class="mt-[2rem] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/>
    </div>
    <surveyButton :form="form" :question="question" />
    <nextButton class="mt-8 mb-8 md:absolute md:mt-16 md:right-32 "></nextButton>
  </section>
</template>

<script setup lang="ts">
import pageOne from "../components/SurveyPageComponents/pages/returnToHome.vue";
import nextButton from "../components/SurveyPageComponents/reusables/nextButton.vue";
import surveyButton from "../components/SurveyPageComponents/reusables/surveyButton.vue";

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
