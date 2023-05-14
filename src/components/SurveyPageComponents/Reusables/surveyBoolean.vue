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
      <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="$emit('back')" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="$emit('next')" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const choices = ["Yes", "No"]
  defineProps({
    question: String,
    min: Boolean,
    max: Boolean
  });
  </script>
