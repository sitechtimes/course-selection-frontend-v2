<template>
    <div class="flex items-center justify-center w-3/4 " >
      <fieldset v-if="typeof(question) === 'object'" class="flex items-center justify-start space-y-6 ">
        <legend class="text-xl md:text-2xl lg:text-[180%] overflow-x-visible">{{ question.question }}</legend>
        <label :for="usedSurvey.indexOf(question)" class="text-xl self-center hidden" >Student Answer:</label>
        <input :id="usedSurvey.indexOf(question)" class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400 lg:text-[180%] " type="text">
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String || Object,
    usedSurvey: Array, 
  });
  
  </script>
  