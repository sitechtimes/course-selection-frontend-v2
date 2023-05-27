<template>
    <div class="flex items-center justify-center w-3/4 " >
      <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-xl md:text-2xl">{{ question }}</legend>
        <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400" type="text" v-model="response">
      </fieldset>
      <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="$emit('back', [response])" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="$emit('next', [response])" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      <!-- <fieldset v-if="typeof(question) === 'object'" class="flex items-center justify-start space-y-6 ">
        <legend class="text-xl md:text-2xl lg:text-[180%] overflow-x-visible">{{ question.question }}</legend>
        <label :for="usedSurvey.indexOf(question)" class="text-xl self-center hidden" >Student Answer:</label>
        <input :id="usedSurvey.indexOf(question)" class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
      </fieldset>
      <fieldset v-else-if="typeof(question) === 'string'" class="flex items-center justify-start space-y-6 ">
        <legend class="text-xl md:text-2xl lg:text-[180%] overflow-x-visible">{{ question.question }}</legend>
        <label :for="question" class="text-xl self-center hidden" >Student Answer:</label>
        <input :id="question" class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
      </fieldset> -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    question: String,
    min: Boolean,
    max: Boolean,
    answers: Array,
  });

  import { watch } from 'vue';

  let response: String | undefined | unknown = props.answers[0]

  watch(() => props.answers, (newResponse) => {
    response = newResponse[0]
  })

  console.log(response)
  </script>
  