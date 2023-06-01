<script setup lang="ts">
import { useUserStore, useSurveyStore } from '../stores/user'
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { watch, ref, Ref } from 'vue';

const userStore = useUserStore()
const surveyStore = useSurveyStore()

const message: Ref<string> = ref("Once you submit, you will still be able to make changes to your survey. However, please do so before the due date.")
// let error: Array<string> = []

// surveyStore.currentResponse.forEach((x) => {
//   console.log(x)
// })

const checkAnswers = () => {
  const check: Array<string> = []
  userStore.data.survey.questions.forEach((x: surveyQuestion) => {
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
  } else {
    message.value = "Please fill out all questions before submitting."
  }
  // error = check
}

const getChoices = (question:  surveyQuestion) => {
  const classes = userStore.data.student.coursesAvailable                            
  return classes.filter(x => x.subject === question.questionType)
}

// deep watch is bad for performance :((
// watch(() => surveyStore.currentResponse, (newReponse) => {
//   checkAnswers()
//   console.log(error)
// }, { deep: true })

</script>

<template>
  <section>
    <!-- <p v-if="error.includes('27')">test</p> -->
    <div v-for="question in userStore.data.survey.questions" :key="question.id" class="flex justify-center">
      <booleanComponent class="mb-6 " v-if="question.questionType === 'BOOLEAN'" :question="question" ></booleanComponent>
      <generalComponent class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" ></generalComponent>
      <checkboxComponent v-else :question="question" :choices="getChoices(question)"></checkboxComponent>
    </div>
    <div class="flex justify-center mb-6 flex-col items-center">
      <p>{{ message }}</p>
      <button @click="checkAnswers()" class="bg-[#C5D4A4] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Submit</button>
    </div>
  </section>
</template>