<script setup lang="ts">
import { useUserStore, useSurveyStore } from '../stores/user'
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { useRouter } from 'vue-router'
import { ref, Ref } from 'vue';

const userStore = useUserStore()
const surveyStore = useSurveyStore()
const router = useRouter()

const viewedStudent = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]

let currentSurvey = null
const missing: Ref<boolean> = ref(false) 

currentSurvey = userStore.data.allSurveys.edges.find(x => x.node.grade === viewedStudent.grade).node

const getChoices = (question) => {
  const classes = viewedStudent.coursesAvailable
  return classes.filter(x => x.subject === question.questionType)
}

const completeSurvey = async () => {
  const check: Array<string> = []
  currentSurvey.questions.forEach((x: surveyQuestion) => {
    const answer = surveyStore.currentResponse.find(y => y.id === x.id)
    if(x.questionType === 'GENERAL' || x.questionType === 'BOOLEAN') {
      if(answer.answer.trim()[0] === undefined) {
        check.push(x.id)
      } 
    } else {
      if(answer.answer[0].chosenClasses.length === 0){
        check.push(x.id)
      }
    }
  })
  if(check.length === 0) {
    userStore.saveSurvey()
    // move this to store once backend is updated
    userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis === viewedStudent.osis).node.status = 'COMPLETE'
    router.push('/guidance/studentlist')
  } else {
    missing.value = true
  }
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
    <p v-if="surveyStore.loading">Setting things up...</p>
    <div v-else v-for="question in currentSurvey.questions" :key="question" class="flex justify-center">
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
    <div class="flex justify-center mb-6 flex-col items-center">
      <p v-if="missing">Please fill out all questions before submitting.</p>
      <button @click="completeSurvey()" class="bg-[#C5D4A4] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Complete</button>
    </div>
  </section>
</template>