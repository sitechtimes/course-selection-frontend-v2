<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start" ref="form">
      <legend class="text-xl md:text-2xl">{{ question }}</legend>
      <div class=" flex flex-row">
        <div class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            id="Yes"
            value="Yes"
            :name="question"
            v-model="response"
          />
          <label for="Yes">Yes</label>
        </div>
        <div class="flex justify-center items-center flex-wrap m-4">
          <input
            type="radio"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            id="No"
            value="No"
            :name="question"
            v-model="response"
          />
          <label for="No">No</label>
        </div>
      </div>
      <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="$emit('back', [response]); clear()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" type="reset" :disabled="min">Back</button>
        <button @click="$emit('next', [response]); clear()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      </div>
      </fieldset>
    </div>
  </template>
  
  <script setup lang="ts">
  import { watch } from 'vue';
  const props = defineProps({
    question: String,
    min: Boolean,
    max: Boolean,
    answers: Array,
  });

  let response: String | undefined | unknown = props.answers[0] // check if undefined on mount

  console.log(response, 'oo')

  watch(() => props.answers, (newResponse) => {
    response = newResponse[0]
  })


  const clear = () => {
    response = ''
  }
  </script>
