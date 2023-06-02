<template>
  <div class="flex items-center justify-center w-3/4">
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-xl md:text-2xl">{{ question.question }}</legend>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
          type="text"
          v-model="surveyStore.currentResponse[index].answer"
        />
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  question: Object,
  answers: Array,
});

import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount } from "vue";

const surveyStore = useSurveyStore();
let index: number = surveyStore.currentResponse.findIndex(
  (x) => x.id == props.question.id
);

onBeforeMount(() => {
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
});

watch(
  () => props.question,
  (newResponse) => {
    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == newResponse.id
    );
  }
);
</script>
