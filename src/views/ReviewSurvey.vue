<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue';
import surveyDraggable from '../components/SurveyPageComponents/Reusables/surveyDraggable.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { watch, ref, Ref } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const surveyStore = useSurveyStore()
const router = useRouter()

const message: Ref<string> = ref("Once you submit, you will still be able to make changes to your survey. However, please do so before the due date.")
const indexAll = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
const indexNote = surveyStore.currentResponse.findIndex((x) => x.id === 'noteToGuidance');
const x: Ref<number> = ref(0)
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
    userStore.saveSurvey('COMPLETE')
    router.push('/student/dashboard')
  } else {
    message.value = "Please fill out all questions before submitting."
  }
  // error = check
}

const getChoices = (question:  surveyQuestion) => {
  const classes = userStore.data.student.coursesAvailable                            
  return classes.filter(x => x.subject === question.questionType)
}

// watch(() => surveyStore.currentResponse, (newReponse) => {
//   checkAnswers()
//   console.log(error)
// }, { deep: true })
watch(() => surveyStore.currentResponse[indexAll].preference, (newResponse) => {
  x.value = x.value+1
}, { deep: true })
</script>

<template>
  <section class="flex justify-center items-center flex-col">
    <div class="w-2/3">
      <div v-for="question in userStore.data.survey.questions" :key="question.id" class="flex justify-center">
        <booleanComponent class="mb-2" v-if="question.questionType === 'BOOLEAN'" :question="question" ></booleanComponent>
        <generalComponent class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" ></generalComponent>
        <checkboxComponent v-else class="mb-6" :question="question" :choices="getChoices(question)"
        :color="'D6EEFF'"
        ></checkboxComponent>
      </div>
      <div class="my-6">
        <p class="text-lg md:text-xl xl:text-3xl my-4">For the final part of the survey, please drag your classes in the order of priority, with the first choice being your top priority.</p>
        <surveyDraggable 
          :courses="surveyStore.currentResponse[indexAll].preference" 
          :index="indexAll"
          :numbered="true"
          :key="x"
          :color="'D6EEFF'"
          >
        </surveyDraggable>
      </div>
      <div class="mt-14">
        <p class="text-lg md:text-xl xl:text-3xl">Final note to your guidance counselor:</p>
        <input
            class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
            type="text"
            v-model="surveyStore.currentResponse[indexNote].answer"
          />
      </div>
      <div class="flex justify-center my-10 flex-col items-center">
        <p>{{ message }}</p>
        <button @click="checkAnswers()" class="bg-[#D6EEFF] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Submit</button>
      </div>
    </div>
  </section>
</template>