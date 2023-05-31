<template>
  <survey-draggable :courses="ncourses" :numbered="true"></survey-draggable>
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

<template>
  <div class="h-screen flex flex-col justify-center items-center space-y-8">
    <div
      class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center min-h-[20rem] space-y-8 mb-10"
    >
      <h1 class="text-4xl font-semibold">
        {{ userStore.data.survey.grade }} Year Survey
      </h1>
      <generalComponent
        v-if="currentQuestion.questionType === 'GENERAL'"
        :question="currentQuestion"
        :answers="currentAnswer"
      ></generalComponent>
      <booleanComponent
        v-else-if="currentQuestion.questionType === 'BOOLEAN'"
        :question="currentQuestion"
        :answers="currentAnswer"
      ></booleanComponent>
      <checkboxComponent
        v-else
        :question="currentQuestion"
        :choices="getChoices()"
        :answers="currentAnswer"
      ></checkboxComponent>
    </div>
    <div
      class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4"
    >
      <button
        @click="previousQuestion()"
        class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400"
        :disabled="min"
      >
        Back
      </button>
      <button
        @click="nextQuestion()"
        class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:hidden"
        :disabled="max"
      >
        Next
      </button>
      <button
        class="bg-emerald-600 text-white w-auto px-3 h-10 rounded-md inline disabled:hidden"
        :disabled="!max"
      >
        Review and Submit
      </button>
    </div>
    <p class="absolute bottom-8 right-16 text-xl font-semibold">
      {{ currentIndex + 1 }}
    </p>
  </div>
</template>

<style scoped></style>
