<template>
    <div class="md:mt-32 mt-16 md:text-4xl lg:text-[200%] text-2xl flex flex-wrap flex-row md:ml-32 ">
      <fieldset class="field flex w-[100%]">
      <legend class="flex flex-wrap overflow-visible">{{ question }}</legend>
      <div class="field flex flex-row">
        <input type="text">
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    question: String,
  });
  </script>
  