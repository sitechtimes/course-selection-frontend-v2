<template>
  <survey-draggable :courses="ncourses" :numbered="false"></survey-draggable>
</template>

<script setup lang="ts">
import surveyDraggable from "../components/SurveyPageComponents/Reusables/surveyDraggable.vue";

const ncourses = [
  {
    name: "A",
  },
  {
    name: "B",
    id: 1,
  },
  {
    name: "C",
    id: 2,
  },
  {
    name: "D",
    id: 3,
  },
  {
    name: "E",
    id: 4,
  },
  {
    name: "F",
    id: 5,
  },
  {
    name: "G",
    id: 6,
  },
];
</script>

<style scoped></style>
