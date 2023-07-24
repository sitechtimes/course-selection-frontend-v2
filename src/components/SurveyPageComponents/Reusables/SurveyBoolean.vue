<template>
  <div class="w-full">
    <fieldset ref="form">
      <legend class="text-lg md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
      <div class="flex flex-row text-lg md:text-xl xl:text-2xl">
        <div class="flex justify-center items-center flex-wrap my-4">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'Yes'"
            value="Yes"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'Yes'">Yes</label>
        </div>
        <div class="flex justify-center items-center flex-wrap m-8">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'No'"
            value="No"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'No'">No</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  question: Object,
  answers: Array,
  isDisabled: Boolean,
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