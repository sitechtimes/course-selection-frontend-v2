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
            value="Yes"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'Yes'">Yes</label>
        </div>
        <div class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
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
  });

  import { useSurveyStore } from '../../../stores/user';
  import { watch, onBeforeMount } from 'vue';

  const surveyStore = useSurveyStore()
  let index: number = surveyStore.currentResponse.findIndex(x => x.id == props.question.id)

  onBeforeMount(() => {
    if(index < 0) {
      const questionAnswer = {
          id: props.question.id,
          question: props.question.question,
          answer: []
      }
      surveyStore.currentResponse.push(questionAnswer)
      
      index = surveyStore.currentResponse.findIndex(x => x.id == props.question.id)
    }
  })

  watch(() => props.question, (newResponse) => {
    index = surveyStore.currentResponse.findIndex(x => x.id == newResponse.id)
  })
  </script>
