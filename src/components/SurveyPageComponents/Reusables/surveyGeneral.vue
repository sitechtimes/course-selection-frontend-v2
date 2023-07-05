<template>
    <!-- <div class="flex items-center justify-center w-3/4 " >
      <fieldset v-if="typeof(question) === 'object'" class="flex items-center justify-start space-y-6 ">
        <legend class="md:text-4xl lg:text-[180%] text-2xl  lg:text-[180%] overflow-x-visible">{{ question.question }}</legend>
        <label :for="usedSurvey.indexOf(question)" class="text-xl self-center hidden" >Student Answer:</label>
        <input :id="usedSurvey.indexOf(question)" class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
      </fieldset>
      <fieldset v-else-if="typeof(question) === 'string'" class="flex items-center justify-start space-y-6 ">
        <legend class="text-xl md:text-2xl lg:text-[180%] overflow-x-visible">{{ question }}</legend>
        <label :for="question" class="text-xl self-center hidden" >Student Answer:</label>
        <input :id="question" class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String || Object,
    usedSurvey: Array, 
  });
  
  </script> -->
  
  <div class="flex items-center justify-center w-full">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-lg md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
          type="text"
          v-model="surveyStore.currentResponse[index].answer"
        />
      </fieldset> 
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
