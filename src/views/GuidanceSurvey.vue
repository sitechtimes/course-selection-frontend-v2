<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import booleanComponent from '../components/SurveyPageComponents/Reusables/SurveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/SurveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/SurveyCheckbox.vue'
import surveyDraggable from '../components/SurveyPageComponents/Reusables/surveyDraggable.vue';
import exclamationMark from '../components/icons/ExclamationMark.vue'
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { useRouter } from 'vue-router'
import { ref, Ref, watch, reactive } from 'vue';

const userStore = useUserStore()
const surveyStore = useSurveyStore()
const router = useRouter()

const viewedStudent = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]

let currentSurvey = null
const missing: Ref<boolean> = ref(false) 
let error: Array<string> = reactive([])
const x: Ref<number> = ref(0)
const indexAll = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
const indexNote = surveyStore.currentResponse.findIndex((x) => x.id === 'noteToGuidance');
const indexGuidance = surveyStore.currentResponse.findIndex((x) => x.id === 'guidanceFinalNote');

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
  error = check
  if(check.length === 0) {
    surveyStore.saveSurvey('COMPLETE')
    // move this to store once backend is updated
    userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis === viewedStudent.osis).node.status = 'COMPLETE'
    router.push('/guidance/studentlist')
  } else {
    missing.value = true
  }
}

watch(() => surveyStore.currentResponse[indexAll].preference, (newResponse) => {
  x.value = x.value+1
}, { deep: true })
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <div class="w-2/3">
      <div class="text-2xl mb-4">
        <h1 class="font-bold text-[#37394F] text-3xl  mb-6">{{ viewedStudent.user.firstName }} {{ viewedStudent.user.lastName }}'s Survey</h1>
        <h2 v-if="viewedStudent.grade === 'SOPHOMORE'">Grade : 9</h2>
        <h2 v-if="viewedStudent.grade === 'JUNIOR'">Grade : 10</h2>
        <h2 v-if="viewedStudent.grade === 'SENIOR'">Grade : 11</h2>
      </div>
      <p v-if="surveyStore.loading">Setting things up...</p>
      <div v-else>
        <div v-for="question in currentSurvey.questions" :key="question" class="flex justify-center">
          <div v-if="missing" class="w-1/12 flex justify-center items-center">
            <exclamationMark v-if="error.includes(question.id)" class="text-red-500 h-8"></exclamationMark>
          </div>
          <div class="w-11/12">
            <booleanComponent class="mb-2" v-if="question.questionType === 'BOOLEAN'" :question="question" ></booleanComponent>
            <generalComponent class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" ></generalComponent>
            <checkboxComponent v-else class="mb-6" :question="question" :choices="getChoices(question)"
            :color="'DEE9C8'"
            ></checkboxComponent>
          </div>
          
        </div>
        <div class="my-6">
          <p class="text-lg md:text-xl xl:text-3xl my-4">Student's order of priority:</p>
          <surveyDraggable 
            :courses="surveyStore.currentResponse[indexAll].preference" 
            :index="indexAll"
            :numbered="true"
            :key="x"
            :color="'DEE9C8'"
            >
          </surveyDraggable>
        </div>
        <div class="mt-14">
          <p class="text-lg md:text-xl xl:text-3xl">Note from the student:</p>
          <input
              disabled
              class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
              type="text"
              v-model="surveyStore.currentResponse[indexNote].answer"
            />
        </div>
        <div class="my-10">
          <p class="text-lg md:text-xl xl:text-3xl">Final counselor notes:</p>
          <input
              class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
              type="text"
              v-model="surveyStore.currentResponse[indexGuidance].answer"
            />
        </div>
      </div>
      <div class="flex justify-center mb-10 flex-col items-center">
        <p v-if="missing" class="text-red-500 mb-4 text-center">Please fill in all questions before submitting.</p>
        <button @click="completeSurvey()" class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Complete</button>
      </div>
    </div>
  </section>
</template>