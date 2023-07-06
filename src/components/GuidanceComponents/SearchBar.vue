<template>
    <div id="search" class="border-white w-full flex justify-center items-center">
      <div id="search-bar" class="flex justify-center items-center relative">
        <input
          :value="modelValue"
          placeholder="Search by name or OSIS number"
          @input="$emit('update:modelValue', $event?.target?.value)"
          class="border border-zinc-300 rounded w-112 h-10 p-2 text-zinc-800"
          id="search-input"
        />
        <SearchButton class="absolute right-3 text-zinc-400 cursor-pointer" />
      </div>
    </div>
  </template>
  <script lang="ts">
  import SearchButton from "../icons/SearchButton.vue";
  export default {
    components: {
      SearchButton,
    },
    props: ["modelValue"],
    emits: ["update:modelValue"],
  };
  </script>
  <style scoped>
  #search-input {
    border-radius: 0.5rem;
  }
  </style>