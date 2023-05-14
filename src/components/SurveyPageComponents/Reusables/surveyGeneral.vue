<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-xl md:text-2xl">{{ question }}</legend>
        <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400" type="text" v-model="response">
      </fieldset>
      <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="$emit('back', [response]); clear()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="$emit('next', [response]); clear()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String,
    min: Boolean,
    max: Boolean
  });

  let response: String | undefined

  const clear = () => {
    response = ''
  }
  </script>
  