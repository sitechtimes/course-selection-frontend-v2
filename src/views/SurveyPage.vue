<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-[#37394F] text-[200%] md:text-[210%] font-bold text-center">{{ userStore.data.survey.grade }} Year Survey</h1>
    <div class="w-11/12 h-2/3 flex flex-col justify-center items-center text-center">
      <div>{{ currentIndex + 1 }}</div>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" ></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question" :choices="choices"></checkboxComponent>
    </div>
    <div>
      <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] disabled:bg-stone-400" :disabled="min">Back</button>
      <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] disabled:bg-stone-400" :disabled="max">Next</button>
    </div>
  </div>
</template>

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

</script>

<style scoped></style>
