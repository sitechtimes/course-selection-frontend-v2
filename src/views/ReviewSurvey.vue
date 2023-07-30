<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import { useStudentStore } from '../stores/student';
import booleanComponent from '../components/SurveyPageComponents/Reusables/SurveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/SurveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/SurveyCheckbox.vue';
import surveyDraggable from '../components/SurveyPageComponents/Reusables/SurveyDraggable.vue';
import exclamationMark from '../components/icons/ExclamationMark.vue'
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { watch, ref, Ref, reactive, defineExpose } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router'

document.title = 'Survey | SITHS Course Selection'

const userStore = useUserStore()
const surveyStore = useSurveyStore()
const studentStore = useStudentStore()
const router = useRouter()

surveyStore.missingAnswers = []

if(studentStore.answeredSurvey[0].status === 'COMPLETE') {
  surveyStore.setSurvey(
    studentStore.user.email,
    studentStore.survey.question,
    studentStore.student.grade
  );
}

const indexAll: number = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
const indexNote: number = surveyStore.currentResponse.findIndex((x) => x.id === 'noteToGuidance');
const x: Ref<number> = ref(0)

const getChoices = (question:  surveyQuestion) => {
  const classes = studentStore.student.coursesAvailable                            
  return classes.filter(x => x.subject === question.questionType)
}

const submit = async () => {
    await surveyStore.checkAnswers()
    if(surveyStore.missingAnswers.length === 0) {
        if(userStore.userType === "student") {
          router.push('/student/dashboard')
          document.getElementById('notification')?.classList.remove('translate-y-full')
          setTimeout(function(){
            document.getElementById('notification')?.classList.add('translate-y-full')
          }, 2000);
        } else if(userStore.userType === "guidance") {
          router.push('/guidance/studentlist')
        }
    }
}


onBeforeRouteLeave((to, from, next) => {
    if(JSON.stringify(surveyStore.currentResponse) === studentStore.answeredSurvey[0].answers || to.path === '/student/survey/review') {
      next()
    } else {
      const answer = window.confirm('Changes you made might not be saved.')
      if (answer) {
        next()
      } else {
        next(false)
    }
    }
})

const reminder  =  (e) => {
    e.preventDefault(); 
    e.returnValue = '';
};

watch(() => surveyStore.currentResponse, (newResponse, oldResponse) => {
  if(JSON.stringify(newResponse) === studentStore.answeredSurvey[0].answers) {
    window.removeEventListener('beforeunload', reminder)
  } else {
    window.addEventListener('beforeunload', reminder);
  }
}, { deep:true })

watch(() => studentStore.answeredSurvey[0].answers, (newResponse, oldResponse) => {
  if(newResponse === JSON.stringify(surveyStore.currentResponse)) {
    window.removeEventListener('beforeunload', reminder)
  } else {
    window.addEventListener('beforeunload', reminder);
  }
}, { deep:true })

watch(() => surveyStore.currentResponse[indexAll].answer.preference, (newResponse) => {
  x.value = x.value+1
}, { deep: true })
</script>

<template>
  <section class="flex justify-center items-center flex-col">
    <div class="w-2/3">
      <div v-for="question in surveyStore.currentSurvey.question" :key="question.id" class="flex justify-center">
        <div v-if="surveyStore.missingAnswers.length > 0" class="w-1/12 flex justify-center items-center">
          <exclamationMark v-if="surveyStore.missingAnswers.includes(question.id)" class="text-red-500 h-8"></exclamationMark>
        </div>
        <div class="w-11/12">
          <booleanComponent class="mb-2" v-if="question.questionType === 'BOOLEAN'" :question="question" ></booleanComponent>
          <generalComponent class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" ></generalComponent>
          <checkboxComponent v-else class="mb-6" :question="question" :choices="getChoices(question)"
          :color="'D6EEFF'"
          ></checkboxComponent>
        </div>
      </div>
      <div class="my-6">
        <p class="text-lg md:text-xl xl:text-3xl my-4">For the final part of the survey, please drag your classes in the order of priority, with the first choice being your top priority.</p>
        <surveyDraggable 
          :courses="surveyStore.currentResponse[indexAll].answer.preference" 
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
        <p v-if="surveyStore.missingAnswers.length === 0" class="mb-4 text-center">Once you submit, you will still be able to make changes to your survey. However, please do so before the due date.</p>
        <p v-else class="mb-4 text-center text-red-500">Please answer all questions before submitting.</p>
        <button @click="submit()" class="bg-[#D6EEFF] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]">Submit</button>
      </div>
    </div>
  </section>
</template>