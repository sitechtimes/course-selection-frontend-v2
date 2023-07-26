<template>
  <div class="flex items-center justify-center w-full">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-lg md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
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
const props = defineProps({
  question: Object,
  answers: Array,
  isDisabled: Boolean
});

import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount } from "vue";

const surveyStore = useSurveyStore();
let index: number = surveyStore.currentResponse.findIndex(
  (x) => x.id == props.question.id
);

  if (index < 0) {
    const questionAnswer = {
      id: props.question.id,
      question: props.question.question,
      answer: "",
    };
    surveyStore.currentResponse.push(questionAnswer);

    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == props.question.id
    );
  }


watch(
  () => props.question,
  (newResponse) => {
    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == newResponse.id
    );
  }
);
</script>
