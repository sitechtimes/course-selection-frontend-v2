<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start" ref="form">
      <legend class="text-xl md:text-2xl">{{ question.question }}</legend>
      <div class=" flex flex-row">
        <div class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'Yes'"
            :value="question.id + 'Yes'"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'Yes'">Yes</label>
        </div>
        <div class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'No'"
            :value="question.id + 'No'"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'No'">No</label>
        </div>
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  import { watch } from 'vue';
  const props = defineProps({
    question: Object,
    answers: Array,
  });

  import { useSurveyStore } from '../../../stores/user';

  const surveyStore = useSurveyStore()
  let index: number = surveyStore.currentResponse.findIndex(x => x.id == props.question.id)

  watch(() => props.question, (newResponse) => {
    index = surveyStore.currentResponse.findIndex(x => x.id == newResponse.id)
  })
  </script>
