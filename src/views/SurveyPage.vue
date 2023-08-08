<script setup lang="ts">
import checkboxComponent from "../components/SurveyPageComponents/Reusables/SurveyCheckbox.vue";
import booleanComponent from "../components/SurveyPageComponents/Reusables/SurveyBoolean.vue";
import generalComponent from "../components/SurveyPageComponents/Reusables/SurveyGeneral.vue";
import { ref, reactive, Ref, onBeforeMount, watch } from "vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import { useStudentStore } from "../stores/student";
import { surveyQuestion, courses, surveyAnswer } from "../types/interface";
import { onBeforeRouteLeave } from "vue-router";
import SurveyModal from "../components/SurveyPageComponents/Reusables/SurveyModal.vue";

document.title = 'Survey | SITHS Course Selection'

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const studentStore = useStudentStore();

const currentIndex: Ref<number> = ref(0);
let currentQuestion: surveyQuestion = reactive(
  surveyStore.currentSurvey.question[currentIndex.value]
);
const min: Ref<boolean> = ref(true);
const max: Ref<boolean> = ref(false);

surveyStore.setSurvey(
  studentStore.user.email,
  surveyStore.currentSurvey.question,
  studentStore.student.grade
);

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
  const classes = studentStore.student.coursesAvailable;
  return classes.filter((x) => x.subject === currentQuestion.questionType);
};

onBeforeRouteLeave((to, from, next) => {
    if(JSON.stringify(surveyStore.currentResponse) === studentStore.answeredSurvey[0].answers || to.path === '/student/survey/review') {
      next() //if the current responses are the same as the previous responses, proceed to go
    } else {
      const answer = window.confirm('Changes you made might not be saved.')
      if (answer) {
        next()
      } else {
        next(false)
    }
    }
})

const reminder = (e) => {
    e.preventDefault(); 
    e.returnValue = '';
};

watch(() => surveyStore.currentResponse, (newResponse, oldResponse) => {
  if(JSON.stringify(newResponse) === studentStore.answeredSurvey[0].answers) {
    window.removeEventListener('beforeunload', reminder)
  } else {
    window.addEventListener('beforeunload', reminder);
  }
}, { deep:true })

watch(() => studentStore.answeredSurvey[0], (newResponse, oldResponse) => {
  if(newResponse.answers === JSON.stringify(surveyStore.currentResponse)) {
    window.removeEventListener('beforeunload', reminder)
  } else {
    window.addEventListener('beforeunload', reminder);
  }
}, { deep:true })
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
        {{ surveyStore.currentSurvey.gradeo }} Year Survey
        </h1>
      </div>
      <div class="h-5/6 flex items-center">
        <generalComponent
          v-if="currentQuestion.questionType === 'GENERAL'"
          :question="currentQuestion"
          :key="currentQuestion.id"
        ></generalComponent>
        <booleanComponent
          v-else-if="currentQuestion.questionType === 'BOOLEAN'"
          :question="currentQuestion"
          :key="currentQuestion.question"
        ></booleanComponent>
        <checkboxComponent
          v-else
          :question="currentQuestion"
          :choices="getChoices()"
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

<style scoped></style>
