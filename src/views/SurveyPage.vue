<template>
  <div class="mt-96 height-48">
    <SurveyButton :form="form" :name="question" />
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
