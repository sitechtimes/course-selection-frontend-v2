<template>
  <div>
    <select
      class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
      v-model="selectedValue">
      <option v-for="value in options" :key="value" :value="value">{{ value }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref('')
const options = [1, 2, 3, 4]
</script>