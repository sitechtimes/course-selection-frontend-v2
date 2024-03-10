<template>
  <div class="flex items-center justify-center w-full">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
          type="text"
          :disabled="isDisabled"

          v-model="surveyStore.currentResponse[index].answer"
        />
      </fieldset> 
  </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount, PropType, ref } from "vue";
import { survey, surveyAnswer, surveyQuestion, surveyStringAnswer } from "../../../types/interface";

const props = defineProps({
  question:{
    type: Object as PropType<surveyQuestion>, 
    required: true
  },
  isDisabled: Boolean
});

const surveyStore = useSurveyStore();
const index = ref(0);

const getQuestionIndex = (question: string): number => {
  return surveyStore.currentResponse.findIndex((entry) => entry.question === question);
}

function startQuestion() {
  const currentQuestion: string = props.question.question;
  index.value = getQuestionIndex(currentQuestion);
  if (index.value < 0) {
    const newQuestion = {
      //id does not exist for questions on backend yet
      id: "",
      question: currentQuestion,
      questionType: "GENERAL",
      answer: "",
    };
    //@ts-ignore
    surveyStore.currentResponse.push(newQuestion);
  }
}

startQuestion();

watch(() => props.question.question, (newResponse) => {
  startQuestion();
})
</script>