<!-- <template>
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
</script> -->
<script setup lang="ts">
import checkboxComponent from "../components/SurveyPageComponents/Reusables/surveyCheckbox.vue";
import booleanComponent from "../components/SurveyPageComponents/Reusables/surveyBoolean.vue";
import generalComponent from "../components/SurveyPageComponents/Reusables/surveyGeneral.vue";
import { ref, reactive, Ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";

import { surveyQuestion, courses, surveyAnswer } from "../types/interface";
const userStore = useUserStore();
const surveyStore = useSurveyStore();

const currentIndex: Ref<number> = ref(0);
let currentQuestion: surveyQuestion = reactive(
  userStore.data.survey.questions[currentIndex.value]
);
const min: Ref<boolean> = ref(true);
const max: Ref<boolean> = ref(false);

onBeforeMount(() => {
  userStore.setSurvey(
    userStore.data.student.osis,
    userStore.data.survey.questions
  );
});

const previousQuestion = () => {
  currentIndex.value--;
  currentQuestion = userStore.data.survey.questions[currentIndex.value];

  max.value = false;
  if (currentIndex.value === 0) {
    min.value = true;
  }
};

const nextQuestion = () => {
  currentIndex.value++;
  currentQuestion = userStore.data.survey.questions[currentIndex.value];

  min.value = false;
  if (currentIndex.value === userStore.data.survey.questions.length - 1) {
    max.value = true;
  }
};

const getChoices = () => {
  const classes = userStore.data.student.coursesAvailable;
  return classes.filter((x) => x.subject === currentQuestion.questionType);
};
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center space-y-8">
    <p v-if="surveyStore.loading">Setting things up...</p>
    <div
      v-else
      class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center min-h-[20rem] space-y-8 mb-10"
    >
      <h1 class="text-4xl font-semibold">
        {{ userStore.data.survey.grade }} Year Survey
      </h1>
      <generalComponent
        v-if="currentQuestion.questionType === 'GENERAL'"
        :question="currentQuestion"
        :answers="currentAnswer"
        :key="currentQuestion.id"
      ></generalComponent>
      <booleanComponent
        v-else-if="currentQuestion.questionType === 'BOOLEAN'"
        :question="currentQuestion"
        :answers="currentAnswer"
        :key="currentQuestion.question"
      ></booleanComponent>
      <checkboxComponent
        v-else
        :question="currentQuestion"
        :choices="getChoices()"
        :answers="currentAnswer"
        :key="currentQuestion.questionType"
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
      <RouterLink to="/survey/review" v-if="max">
        <button
          class="bg-emerald-600 text-white w-auto px-3 h-10 rounded-md inline disabled:hidden"
          :disabled="!max"
        >
          Review and Submit
        </button>
      </RouterLink>
    </div>
    <p class="absolute bottom-8 right-16 text-xl font-semibold">
      {{ currentIndex + 1 }}
    </p>
  </div>
</template>

<style scoped></style>
