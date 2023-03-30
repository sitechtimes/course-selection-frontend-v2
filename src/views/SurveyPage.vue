<template>
  <surveyCheckbox :classes="classes" :question="question" :height="height"></surveyCheckbox>
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
