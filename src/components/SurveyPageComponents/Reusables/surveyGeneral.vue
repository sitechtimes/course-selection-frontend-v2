<template>
    <div class="flex items-center justify-center">
      <fieldset class="w-4/5 flex items-center justify-start">
        <legend class="text-xl">{{ question }}</legend>
        <input class="block py-2 px-3 mt-3 w-3/4 text-base bg-transparent rounded-md border border-solid border-zinc-400  focus:outline-none focus:ring-0 focus:border-blue-400" type="text">
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String,
  });
  </script>
  