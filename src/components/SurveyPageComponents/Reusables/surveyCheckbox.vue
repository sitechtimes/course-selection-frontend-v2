<template>
    <div class="flex items-center justify-center">
      <fieldset class="flex items-center justify-start"> <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
      <legend class="text-xl">{{ question }}</legend>
      <div class="field flex flex-col flex-wrap w-fit ">
        <div v-for="choice in choices" :key="choice" class="flex flex-wrap flex-column m-4 w-max">
          <input
            type="checkbox"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="choice.courseCode"
            :name="question"
          />
          <label :for="choice.courseCode" class="ml-4">{{ choice.name }}</label>
        </div>
      </div>
      </fieldset>
    </div>
</template>
  
<script setup lang="ts">
  defineProps({
    choices: Array,
    question: String,
  });
</script>  