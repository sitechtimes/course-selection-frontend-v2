<template>
  <div class="mt-32 text-4xl flex flex-wrap flex-row ml-6 ">
    <fieldset class="field flex w-[100%] h-[100%]">
    <legend class="flex flex-wrap overflow-visible">{{ question }}</legend>
    <div class="field flex flex-row">
      <div v-for="choice in form" :key="choice" class="circle-button flex flex-wrap flex-row m-4 ml-8 ">
        <input
          type="radio"
          class="w-6 h-6 outline-1 self-center flex flex-wrap flex-row checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]"
          :id="choice.id"
          :name="question"
        />
        <label :for="choice.id" class="flex flex-wrap self-center ml-6 flex-row">{{ choice.answer }}</label>
      </div>
    </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
defineProps({
  form: Array,
  question: String,
});
</script>
