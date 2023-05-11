<template>
    <div class="md:text-4xl lg:text-[200%] text-2xl flex  flex-row md:ml-32 items-center justify-center">
      <fieldset class="field flex w-[100%]">
      <legend class="flex flex-wrap overflow-visible">{{ question }}</legend>
      <div class="field flex flex-row w-[100%]">
        <input type="text" class="w-[90%]">
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String,
  });
  </script>
  