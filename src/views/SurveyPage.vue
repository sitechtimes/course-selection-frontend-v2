<template>
  <div class="h-screen flex flex-col justify-center items-center space-y-8">
    <div class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center min-h-[20rem] space-y-8 mb-10">
      <h1 class="text-4xl font-semibold">{{ userStore.data.survey.grade }} Year Survey</h1>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" :max="max" :min="min" @back="previousQuestion()" @next="nextQuestion()"></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question" :max="max" :min="min" @back="previousQuestion()" @next="nextQuestion()"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question" :choices="choices" :max="max" :min="min" @back="previousQuestion()" @next="nextQuestion()"></checkboxComponent>
    </div>
    <!-- <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
    </div> -->
    <p class="absolute bottom-8 right-16 text-xl font-semibold">{{ currentIndex + 1 }}</p>
  </div>
</template>

<script setup lang="ts">
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import { ref, reactive, Ref } from 'vue';
import { useUserStore } from "../stores/user";
import { surveyQuestion, courses, surveyAnswer } from '../types/interface';
const userStore = useUserStore();

const currentIndex: Ref<number> = ref(0)
let currentQuestion: surveyQuestion = reactive(userStore.data.survey.questions[currentIndex.value])
let choices: Ref<courses | undefined> = ref() 
const min: Ref<boolean> = ref(true)
const max: Ref<boolean> = ref(false)
let answers: Array<object> = [JSON.parse(userStore.data.answeredSurvey.answers)] // find way to fix when answers is returned as object
let currentAnswer: surveyAnswer | undefined = reactive(answers.find(x => x.id == currentQuestion.id))

const previousQuestion = (x) => {  
  currentIndex.value--
  currentQuestion = userStore.data.survey.questions[currentIndex.value]
  console.log(userStore.data.survey.questions)
  console.log(x)
  max.value = false
  if(currentIndex.value === 0) {
    min.value = true
  }
}

const nextQuestion = (x) => {
  currentAnswer = answers.find(x => x.id == currentQuestion.id)
  console.log(userStore.data.survey.questions)
  console.log(x)
  const questionAnswer = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: []
  }
  //different question types are saved differently
  if(currentQuestion.questionType === "GENERAL") {
    if (currentAnswer) {
      // update answer
    } else {   
      // create new answer object  
      answers.push(questionAnswer)
    } 
  } else if (currentQuestion.questionType === "BOOLEAN") {
    if (currentAnswer) {
      // update answer
    } else {   
      // create new answer object  
      answers.push(questionAnswer)
    } 
  } else {
    if (currentAnswer) {
      // update answer
    } else {   
      // create new answer object  
      answers.push(questionAnswer)
    } 
  }

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
