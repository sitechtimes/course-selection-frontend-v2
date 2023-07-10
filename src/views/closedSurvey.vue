<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import surveyBoolean from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import surveyGeneral from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import closedCheckbox from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedCheckbox.vue';
import closedDraggable from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedDraggable.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { watch, ref, Ref } from 'vue';

const userStore = useUserStore()
const surveyStore = useSurveyStore()
console.log(userStore)
console.log(surveyStore)

const indexAll = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
const indexNote = surveyStore.currentResponse.findIndex((x) => x.id === 'noteToGuidance');
const x: Ref<number> = ref(0)




const getChoices = (question:  surveyQuestion) => {
  const classes = userStore.data.student.coursesAvailable                            
  return classes.filter(x => x.subject === question.questionType)
}

</script>

<template>
  <section class="flex justify-center items-center flex-col">
    <div class="w-2/3">
      <div v-for="question in userStore.data.survey.questions" :key="question.id" class="flex justify-center">
        <surveyBoolean class="mb-2" v-if="question.questionType === 'BOOLEAN'" :question="question" :isDisabled="true"></surveyBoolean>
        <surveyGeneral class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" :isDisabled="true"></surveyGeneral>
        <closedCheckbox v-else class="mb-6" :question="question" :choices="getChoices(question)"
        :color="'D6EEFF'"
        ></closedCheckbox>
      </div>
      <div class="my-6">
        <p class="text-lg md:text-xl xl:text-3xl my-4">For the final part of the survey, please drag your classes in the order of priority, with the first choice being your top priority.</p> <!-- Have to change what this says. surveyCheckbox probably also needs to be changed-->
        <closedDraggable 
          :courses="surveyStore.currentResponse[indexAll].preference" 
          :index="indexAll"
          :numbered="true"
          :key="x"
          :color="'D6EEFF'"
          >
        </closedDraggable>
      </div>
      <div class="mt-14">
        <p class="text-lg md:text-xl xl:text-3xl">Final note to your guidance counselor:</p>
        <input
            class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
            type="text"
            disabled
            v-model="surveyStore.currentResponse[indexNote].answer"
          />
      </div>
      <div class="flex justify-center my-10 flex-col items-center">
      </div>
    </div>
  </section>
</template>