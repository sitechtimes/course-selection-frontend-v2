<script setup lang="ts">
import { useUserStore } from '../stores/user'
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'

const userStore = useUserStore()
const viewedUser = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]
const surveyAnswers = userStore.data.allAnsweredSurveys.edges.filter(survey => survey.node.osis === viewedUser.osis)
let usedSurvey = null

if (viewedUser.grade === "JUNIOR") {
  usedSurvey = userStore.data.allSurveys.edges[1]
} else if (viewedUser.grade === "SENIOR") {
  usedSurvey = userStore.data.allSurveys.edges[0]
} else if (viewedUser.grade === "SOPHOMORE") {
  usedSurvey = userStore.data.allSurveys.edges[2]
}
console.log(usedSurvey.node.questions[1].question)
</script>

<template>
  <section>
    <div class="text-3xl ml-32 mt-24 mb-4">
      <h1 class="font-bold text-[#37394F] text-5xl  mb-6">{{ viewedUser.user.firstName }} {{ viewedUser.user.lastName }}'s Survey</h1>
      <h2 v-if="viewedUser.grade === 'SOPHOMORE'">Grade : 9</h2>
      <h2 v-if="viewedUser.grade === 'JUNIOR'">Grade : 10</h2>
      <h2 v-if="viewedUser.grade === 'SENIOR'">Grade : 11</h2>
    </div>
    <div v-for="question in usedSurvey.node.questions" class="flex justify-center">
      <booleanComponent class="mb-6 " v-if="question.questionType === 'BOOLEAN'" :question="question" :usedSurvey="usedSurvey.node.questions"></booleanComponent>
      <generalComponent class="mb-6" v-if="question.questionType === 'GENERAL'" :question="question" :usedSurvey="usedSurvey.node.questions"></generalComponent>
      <section v-if="question.questionType != 'BOOLEAN' && question.questionType != 'GENERAL'" class="flex items-center justify-start w-3/4 overflow-x-visible ">
        <div class="flex items-center space-y-6">
          <h1 class="text-xl md:text-2xl lg:text-[180%]">{{ question.question }}</h1>
          <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
        </div>
      </section>
    </div>
    <div class="flex justify-center mb-6">
      <button class="bg-[#C5D4A4] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Complete</button>
    </div>
  </section>
</template>