<template>
  <div>
    <h1 class="text-[#37394F] text-[225%] md:text-[375%] font-bold text-center">______ Year Survey</h1>
    <div>
      <div>{{ currentIndex + 1 }}</div>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" ></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question"></checkboxComponent>
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

const previousQuestion = () => {
  currentIndex.value--
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
}

const nextQuestion = () => {
  currentIndex.value++
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
}

</script>

<style scoped></style>
