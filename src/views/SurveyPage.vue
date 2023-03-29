<template>
  <pageOne></pageOne>
</template>

<script setup lang="ts">
import pageOne from "../components/SurveyPageComponents/pages/pageTwo.vue";
import nextButton from "../components/SurveyPageComponents/reusables/nextButton.vue";
import backButton from "../components/SurveyPageComponents/reusables/backButton.vue";
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
