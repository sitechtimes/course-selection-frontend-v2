<template>
    <div class="border-white flex justify-center items-center">
      <div class="flex justify-center items-center relative w-11/12">
        <input
          :value="modelValue"
          placeholder="Search by name or email"
          @input="$emit('update:modelValue', $event?.target?.value)"
          class="border border-zinc-300 rounded w-full h-10 p-2 text-zinc-800"
        />
        <SearchButton class="absolute right-3 text-zinc-400 cursor-pointer" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  //@ts-nocheck
  import SearchButton from "../icons/SearchButton.vue";
defineProps({
    modelValue: String
  })   
  </script>