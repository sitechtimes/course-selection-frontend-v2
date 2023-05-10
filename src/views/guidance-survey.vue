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
console.log(userStore.data)
</script>

<template>
  <section>
    <h1>{{ viewedUser.user.firstName }} {{ viewedUser.user.lastName }}'s Survey</h1>
    <div v-for="question in usedSurvey.node.questions">
      <booleanComponent v-if="question.questionType === 'BOOLEAN'" :question="question.question"></booleanComponent>
      <generalComponent v-if="question.questionType === 'GENERAL'" :question="question.question"></generalComponent>
    </div>
    <div class="flex justify-center">
      <button class="bg-[#C5D4A4] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-32 h-12 text-5xl text-[#37394F]">Complete</button>
    </div>
  </section>
</template>