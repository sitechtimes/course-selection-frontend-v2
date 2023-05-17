<template>
    <div class="md:text-4xl lg:text-[180%] text-2xl flex flex-wrap flex-row w-3/4">
      <fieldset class="field">
      <legend class="flex flex-wrap overflow-visible" v-if="typeof(question) === 'object'">{{ question.question }}</legend>
      <legend class="flex flex-wrap overflow-visible" v-else-if="typeof(question) === 'string'">{{ question }}</legend>
      <div class="field flex flex-row">
        <div v-for="choice in choices" :key="choice" class="circle-button flex flex-wrap flex-row m-4 md:ml-8 ">
          <input v-if="typeof(question) === 'object'"
            type="radio"
            class="w-6 h-6 outline-1 self-center flex flex-wrap flex-row checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]"
            :id="usedSurvey.indexOf(question)+choice"
            :name="question.question"
          />
          <input v-else-if="typeof(question) === 'string'"
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="choice"
            :name="question"
          />
          <label v-if="typeof(question) === 'object'" :for="usedSurvey.indexOf(question)+choice" class="flex flex-wrap self-center md:ml-6 flex-row">{{ choice }}</label>
          <label v-else-if="typeof(question) === 'string'" :for="choice" class="flex flex-wrap self-center md:ml-6 flex-row">{{ choice }}</label>
        </div>
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  const choices = ["Yes", "No"]
  defineProps({
    question: Object || String,
    usedSurvey: Array, 
  });
  
  </script>
