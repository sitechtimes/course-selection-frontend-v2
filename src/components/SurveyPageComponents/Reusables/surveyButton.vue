<template>
  <fieldset class="field">
    <legend>{{ question }}</legend>
    <div v-for="choice in form" :key="choice" class="circle-button">
      <input
        type="radio"
        class="w-6 h-6 m-2 outline-1 checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1] shadow-inner"
        :id="choice.id"
        :name="question"
      />
      <label :for="choice.id">{{ choice.answer }}</label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  form: Array,
  question: String,
});
</script>
