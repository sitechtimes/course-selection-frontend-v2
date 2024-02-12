<script setup lang="ts">
import checkboxComponent from "../components/SurveyPageComponents/SurveyCheckbox.vue";
import booleanComponent from "../components/SurveyPageComponents/SurveyBoolean.vue";
import generalComponent from "../components/SurveyPageComponents/SurveyGeneral.vue";
import { ref, reactive, Ref, watch } from "vue";
import { useSurveyStore } from "../stores/survey";
import { surveyQuestion } from "../types/interface";
import { onBeforeRouteLeave } from "vue-router";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();

const currentIndex: Ref<number> = ref(0);
let currentQuestion: surveyQuestion = reactive(
  surveyStore.currentSurvey.question[currentIndex.value]
);
const min: Ref<boolean> = ref(true);
const max: Ref<boolean> = ref(false);

const previousQuestion = () => {
  currentIndex.value--;
  currentQuestion = surveyStore.currentSurvey.question[currentIndex.value];

  max.value = false;
  if (currentIndex.value === 0) {
    min.value = true;
  }
};

const nextQuestion = () => {
  currentIndex.value++;
  currentQuestion = surveyStore.currentSurvey.question[currentIndex.value];

  min.value = false;
  if (currentIndex.value === surveyStore.currentSurvey.question.length - 1) {
    max.value = true;
  }
};

const getChoices = () => {
  const classes = surveyStore.student.coursesAvailable.filter(
    (x) => x["subject"] === currentQuestion.questionType
  );
  //@ts-ignore
  surveyStore.currentResponse[currentIndex.value].answer.courses = classes.map(
    (course) => course["name"]
  );
  return classes;
};

onBeforeRouteLeave((to, from, next) => {
  if (
    JSON.stringify(surveyStore.currentResponse) ===
      surveyStore.currentAnswers.answers ||
    to.path === "/student/survey/review"
  ) {
    window.removeEventListener("beforeunload", reminder);
    next();
  } else {
    const answer = window.confirm("Changes you made might not be saved.");
    if (answer) {
      window.removeEventListener("beforeunload", reminder);
      next();
    } else {
      next(false);
    }
  }
});

const reminder = (e: { preventDefault: () => void; returnValue: string }) => {
  e.preventDefault();
  e.returnValue = "";
};

watch(
  () => surveyStore.currentResponse,
  (newResponse, oldResponse) => {
    if (JSON.stringify(newResponse) === surveyStore.currentAnswers.answers) {
      window.removeEventListener("beforeunload", reminder);
    } else {
      window.addEventListener("beforeunload", reminder);
    }
  },
  { deep: true }
);

watch(
  () => surveyStore.currentAnswers,
  (newResponse, oldResponse) => {
    if (newResponse.answers === JSON.stringify(surveyStore.currentResponse)) {
      window.removeEventListener("beforeunload", reminder);
    } else {
      window.addEventListener("beforeunload", reminder);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="h-[80vh] flex flex-col justify-center items-center space-y-8">
    <p v-if="surveyStore.loading">Setting things up...</p>
    <div
      v-else
      class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col items-center min-h-[20rem] h-5/6 overflow mt-6"
    >
      <div class="mt-5">
        <h1 class="text-4xl font-semibold mb-6">
          {{ surveyStore.currentSurvey.grade }} Year Survey
        </h1>
      </div>
      <div class="h-5/6 flex items-center">
        <generalComponent
          v-if="currentQuestion.questionType === 'GENERAL'"
          :question="currentQuestion"
          :key="currentQuestion.id"
          :index="currentIndex"
        ></generalComponent>
        <booleanComponent
          v-else-if="currentQuestion.questionType === 'BOOLEAN'"
          :question="currentQuestion"
          :index="currentIndex"
          :key="currentQuestion.question"
        ></booleanComponent>
        <checkboxComponent
          v-else
          :question="currentQuestion"
          :choices="getChoices()"
          :index="currentIndex"
          :key="currentQuestion.questionType"
          :color="'D6EEFF'"
        ></checkboxComponent>
      </div>
    </div>
    <div
      class="h-1/6 w-11/12 md:w-4/5 lg:w-3/4 flex justify-between items-start px-4"
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
      <RouterLink to="/student/survey/review" v-if="max">
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
