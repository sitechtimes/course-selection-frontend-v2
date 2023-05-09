<script setup lang="ts">
import { useUserStore } from '../stores/user'
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'

const userStore = useUserStore()
const viewedUser = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]
const surveyAnswers = userStore.data.allAnsweredSurveys.edges.filter(survey => survey.node.osis === viewedUser.osis)
let usedSurvey = null

if (viewedUser.homeroom[1] === "5") {
  usedSurvey = userStore.data.allSurveys.edges[1]
} else if (viewedUser.homeroom[1] === "4") {
  usedSurvey = userStore.data.allSurveys.edges[0]
} else if (viewedUser.homeroom[1] === "6") {
  usedSurvey = userStore.data.allSurveys.edges[2]
}
console.log(userStore.data)
</script>

<template>
  <section v-for="question in usedSurvey.node.questions">
    <booleanComponent v-if="question.questionType === 'BOOLEAN'" :question="question.question"></booleanComponent>
    <generalComponent v-if="question.questionType === 'GENERAL'" :question="question.question"></generalComponent>
  </section>
</template>
