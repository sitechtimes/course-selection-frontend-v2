<script setup lang="ts">
import checkboxComponent from '../components/SurveyPageComponents/pages/courseSelectionPages.vue';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import { ref, reactive, Ref } from 'vue';
import { useUserStore } from "../stores/user";
import { surveyQuestion, courses } from '../types/interface';
const userStore = useUserStore();

const currentIndex: Ref<number> = ref(0)
let currentQuestion: surveyQuestion = reactive(userStore.data.survey.questions[currentIndex.value])
let choices: Ref<courses | undefined> = ref() 
const min: Ref<boolean> = ref(true)
const max: Ref<boolean> = ref(false)
const date = new Date();
let openMeeting = false
let usedSurvey = []

const previousQuestion = () => {
  currentIndex.value--
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
  
  max.value = false
  if(currentIndex.value === 0) {
    min.value = true
  }
}

const nextQuestion = () => {
  currentIndex.value++
  currentQuestion = userStore.data.survey.questions[currentIndex.value]

  min.value = false
  if(currentIndex.value === userStore.data.survey.questions.length - 1) {
    max.value = true
  }

  if (currentQuestion.questionType != "GENERAL" && currentQuestion.questionType != "BOOLEAN") {
    getChoices()
  }
}

const getChoices = () => {
    const classes = userStore.data.student.coursesAvailable
    choices = classes.filter(x => x.subject === currentQuestion.questionType)
}

if (userStore.data.survey.dueDate != undefined && userStore.data.survey.dueDate != null) {
const SplitDate = userStore.data.survey.dueDate.substring(0,10).split("-")
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

</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center space-y-8" v-if="openMeeting">
    <div class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center min-h-[20rem] space-y-8 mb-10">
      <h1 class="text-4xl font-semibold">{{ userStore.data.survey.grade }} Year Survey</h1>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" ></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question" :choices="choices"></checkboxComponent>
    </div>
    <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      </div>
    <p class="absolute bottom-8 right-16 text-xl font-semibold">{{ currentIndex + 1 }}</p>
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
