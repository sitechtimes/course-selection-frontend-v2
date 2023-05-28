<script setup lang="ts">
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import { ref, reactive, Ref, onMounted, onBeforeMount} from 'vue';
import { useUserStore, useSurveyStore } from "../stores/user";
import { surveyQuestion, courses, surveyAnswer } from '../types/interface';
const userStore = useUserStore();
const surveyStore = useSurveyStore();

const currentIndex: Ref<number> = ref(0)
let currentQuestion: surveyQuestion = reactive(userStore.data.survey.questions[currentIndex.value])
let choices: Ref<courses | undefined> = ref() 
const min: Ref<boolean> = ref(true)
const max: Ref<boolean> = ref(false)
let answers: Array<object> = JSON.parse(userStore.data.answeredSurvey.answers) 
let currentAnswer: Array<string>

onBeforeMount(() => {
  surveyStore.currentSurvey = userStore.data.answeredSurvey // move this elsewhere
  surveyStore.currentResponse = JSON.parse(userStore.data.answeredSurvey.answers) // move this elsewhere
  console.log(surveyStore.currentResponse)
  const answer = surveyStore.currentResponse.find(x => x.id == currentQuestion.id)
  currentAnswer = answer.answer
})

const previousQuestion = (response: Array<string> | undefined) => {  
  const questionAnswer = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: response
  }
 
  updateAnswers(questionAnswer)

  currentIndex.value--
  currentQuestion = userStore.data.survey.questions[currentIndex.value]

  // check if answer exists, if not, then set empty array
  const answer = surveyStore.currentResponse.find(x => x.id == currentQuestion.id)
  if(answer) {
    currentAnswer = answer.answer
  } else {
    currentAnswer = []
  }

  max.value = false
  if(currentIndex.value === 0) {
    min.value = true
  }

  if (currentQuestion.questionType != "GENERAL" && currentQuestion.questionType != "BOOLEAN") {
    getChoices()
  }
}

const nextQuestion = (response: Array<string> | undefined) => {
  const questionAnswer = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        answer: response
  }

  updateAnswers(questionAnswer)

  currentIndex.value++
  currentQuestion = userStore.data.survey.questions[currentIndex.value]

  // const answerId = surveyStore.currentResponse.findIndex(x => x.id == currentQuestion.id)
  const answer = surveyStore.currentResponse.find(x => x.id == currentQuestion.id)
  if(answer) {
    currentAnswer = answer.answer
  } else {
    currentAnswer = []
  }

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

const updateAnswers = (questionAnswer: surveyAnswer) => {
  const currentAnswerIndex = surveyStore.currentResponse.findIndex(x => x.id == currentQuestion.id)
  if(currentAnswerIndex < 0) {
    surveyStore.currentResponse.push(questionAnswer)
    console.log(surveyStore.currentResponse ,'added')
  } else {
    surveyStore.currentResponse[currentAnswerIndex].answer = questionAnswer.answer
    console.log(surveyStore.currentResponse, 'updated')
  }
}

</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center space-y-8">
    <div class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center min-h-[20rem] space-y-8 mb-10">
      <h1 class="text-4xl font-semibold">{{ userStore.data.survey.grade }} Year Survey</h1>
      <generalComponent v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion.question" :max="max" :min="min" :answers="currentAnswer" @back="previousQuestion" @next="nextQuestion"></generalComponent>
      <booleanComponent v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion.question" :max="max" :min="min" :answers="currentAnswer" @back="previousQuestion" @next="nextQuestion"></booleanComponent>
      <checkboxComponent v-else :question="currentQuestion.question" :choices="choices" :max="max" :min="min"   @back="previousQuestion" :answers="currentAnswer" @next="nextQuestion"></checkboxComponent>
    </div>
    <!-- <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
    </div> -->
    <p class="absolute bottom-8 right-16 text-xl font-semibold">{{ currentIndex + 1 }}</p>
  </div>
</template>

<style scoped></style>
