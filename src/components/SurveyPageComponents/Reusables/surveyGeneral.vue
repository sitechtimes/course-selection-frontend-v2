<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start space-y-6">
        <legend class="text-xl md:text-2xl">{{ question }}</legend>
        <input class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400" type="text">
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String,
  });
  </script>
  