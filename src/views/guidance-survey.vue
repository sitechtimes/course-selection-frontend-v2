<script setup lang="ts">
import { useUserStore, useSurveyStore } from '../stores/user'
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';

const userStore = useUserStore()
const surveyStore = useSurveyStore()

const viewedStudent = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]

let currentSurvey = null

currentSurvey = userStore.data.allSurveys.edges.find(x => x.node.grade === viewedStudent.grade).node

const getChoices = (question) => {
  const classes = viewedStudent.coursesAvailable
  return classes.filter(x => x.subject === question.questionType)
}
</script>

<template>
  <section>
    <div class="text-3xl ml-32 mt-24 mb-4">
      <h1 class="font-bold text-[#37394F] text-5xl  mb-6">{{ viewedStudent.user.firstName }} {{ viewedStudent.user.lastName }}'s Survey</h1>
      <h2 v-if="viewedStudent.grade === 'SOPHOMORE'">Grade : 9</h2>
      <h2 v-if="viewedStudent.grade === 'JUNIOR'">Grade : 10</h2>
      <h2 v-if="viewedStudent.grade === 'SENIOR'">Grade : 11</h2>
    </div>
    <div v-for="question in currentSurvey.questions" :key="question" class="flex justify-center">
      <booleanComponent class="mb-6 " v-if="question.questionType === 'BOOLEAN'" :question="question" ></booleanComponent>
      <generalComponent class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" ></generalComponent>
      <checkboxComponent v-else :question="question" :choices="getChoices(question)"></checkboxComponent>
      <!-- <section v-else class="flex items-center justify-start w-3/4 overflow-x-visible mb-6">
        <div class=" items-center space-y-6 w-full">
          <h1 class="text-xl md:text-2xl lg:text-[180%]">{{ question.question }}</h1>
          <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
        </div>
      </section> -->
    </div>
    <div class="flex justify-center mb-6">
      <button class="bg-[#C5D4A4] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Complete</button>
    </div>
  </section>
</template>