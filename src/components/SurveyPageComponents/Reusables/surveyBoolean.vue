<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start">
      <legend class="text-xl md:text-2xl">{{ question }}</legend>
      <div class=" flex flex-row">
        <div v-for="choice in choices" :key="choice" class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="choice"
            :name="question"
          />
          <label :for="choice" class="text-lg md:text-xl ml-4">{{ choice }}</label>
        </div>
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  const choices = ["Yes", "No"]
  defineProps({
    question: String,
  });
  </script>
