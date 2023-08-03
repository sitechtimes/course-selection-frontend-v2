<template>
    <div id="search" class="border-white flex justify-center items-center">
      <div id="search-bar" class="flex justify-center items-center relative w-5/6">
        <input
          :value="modelValue"
          placeholder="Search by name or email"
          @input="$emit('update:modelValue', $event?.target?.value)"
          class="border border-zinc-300 rounded w-full h-10 p-2 text-zinc-800"
          id="search-input"
        />
        <SearchButton class="absolute right-3 text-zinc-400 cursor-pointer" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  //@ts-nocheck
  import SearchButton from "../icons/SearchButton.vue";
  
  const props = defineProps({
    modelValue: String
  })   
  
  </script>