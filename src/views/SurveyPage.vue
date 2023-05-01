<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-[#37394F] text-[200%] md:text-[210%] font-bold text-center">{{ userStore.data.survey.grade }} Year Survey</h1>
    <div class="w-11/12 flex flex-col justify-center items-center text-center">
      <div>{{ currentIndex + 1 }}</div>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" ></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question" :choices="choices"></checkboxComponent>
    </div>
    <div>
      <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] ">Back</button>
      <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import checkboxComponent from '../components/SurveyPageComponents/pages/courseSelectionPages.vue';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import { ref, reactive } from 'vue';
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const currentIndex = ref(0)
let currentQuestion = reactive(userStore.data.survey.questions[currentIndex.value])
let choices = ref()

const previousQuestion = () => {
  currentIndex.value--
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
  console.log(currentQuestion)
}

const nextQuestion = () => {
  currentIndex.value++
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
  console.log(currentQuestion.questionType)
  getChoices()
}

const getChoices = () => {
  if (currentQuestion.questionType != "GENERAL" && currentQuestion.questionType != "BOOLEAN") {
    const classes = userStore.data.student.coursesAvailable
    choices = classes.filter(x => x.subject === currentQuestion.questionType)
  }
}

</script>

<style scoped></style>
