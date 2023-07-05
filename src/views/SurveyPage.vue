<script setup lang="ts">
import checkboxComponent from "../components/SurveyPageComponents/Reusables/surveyCheckbox.vue";
import booleanComponent from "../components/SurveyPageComponents/Reusables/surveyBoolean.vue";
import generalComponent from "../components/SurveyPageComponents/Reusables/surveyGeneral.vue";
import { ref, reactive, Ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import { surveyQuestion, courses, surveyAnswer } from "../types/interface";

const date = new Date();
let openMeeting = false
let usedSurvey = []
const userStore = useUserStore();
const surveyStore = useSurveyStore();

const currentIndex: Ref<number> = ref(0);
let currentQuestion: surveyQuestion = reactive(
  userStore.data.survey.questions[currentIndex.value]
);
const min: Ref<boolean> = ref(true);
const max: Ref<boolean> = ref(false);

userStore.setSurvey(
  userStore.data.student.osis,
  userStore.data.survey.questions
);

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

if (userStore.data.survey.dueDate != undefined && userStore.data.survey.dueDate != null) {
const SplitDate = userStore.data.survey.dueDate.substring(0,10).split("-")
console.log(SplitDate, 'o')
  if (Number(SplitDate[0]) > date.getFullYear()) {
    openMeeting = true
  }
  else if (Number(SplitDate[0]) === date.getFullYear()) {
    if (Number(SplitDate[1]) > date.getMonth() + 1) { // Get month starts at 0, not 1
      openMeeting = true
    }
    else if (Number(SplitDate[1]) === date.getMonth() + 1) {
      if (Number(SplitDate[2]) > date.getDate()) {
        openMeeting = true
      }
    }
  }
  }

const getChoices = () => {
  const classes = userStore.data.student.coursesAvailable;
  return classes.filter((x) => x.subject === currentQuestion.questionType);
};
</script>

<template>
  <div class="h-[80vh] flex flex-col justify-center items-center space-y-8">
    <p v-if="surveyStore.loading">Setting things up...</p>
    <div
      v-else
      class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col items-center min-h-[20rem] space-y-8 h-5/6"
    >
      <div class="mt-5">
        <h1 class="text-4xl font-semibold">
        {{ userStore.data.survey.grade }} Year Survey
        </h1>
      </div>
      <div class="h-5/6 flex items-center">
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
  <section v-else>
    <div class="text-3xl ml-32 mt-24 mb-4">
      <h1 class="font-bold text-[#37394F] text-5xl  mb-6">Your Survey</h1>
      <h2 v-if="userStore.data.survey.grade === 'SOPHOMORE'">Grade : 9</h2>
      <h2 v-if="userStore.data.survey.grade === 'JUNIOR'">Grade : 10</h2>
      <h2 v-if="userStore.data.survey.grade === 'SENIOR'">Grade : 11</h2>
    </div>
  <div v-for="question in userStore.data.survey.questions" class="flex justify-center">
      <booleanComponent class="mb-6 " v-if="question.questionType === 'BOOLEAN'" :question="question" :usedSurvey="userStore.data.survey.questions"></booleanComponent>
      <generalComponent class="mb-6" v-if="question.questionType === 'GENERAL'" :question="question" :usedSurvey="userStore.data.survey.questions"></generalComponent>
      <section v-if="question.questionType != 'BOOLEAN' && question.questionType != 'GENERAL'" class="flex items-center justify-start w-3/4 overflow-x-visible mb-6">
        <div class=" items-center space-y-6 w-full">
          <h1 class="text-xl md:text-2xl lg:text-[180%]">{{ question.question }}</h1>
          <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
