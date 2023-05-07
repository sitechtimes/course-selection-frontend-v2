<template>
    <div class="lg:text-[225%] md:text-[187.5%] text-[150%] flex flex-wrap flex-row lg:ml-[3.5%] text-black ">
      <fieldset class="field flex overflow-visible h-[40rem]"> <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
      <legend class="flex flex-wrap overflow-visible md:self-center">{{ question }}</legend>
      <div class="field flex flex-col flex-wrap w-fit ">
        <div v-for="choice in choices" :key="choice" class="square-button flex flex-wrap flex-column m-[3.43%] w-max">
          <input
            type="checkbox"
            class="w-6 h-6 outline-1 self-center flex flex-wrap flex-row checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25) "
            :id="choice.courseCode"
            :name="question"
          />
          <label :for="choice.courseCode" class="flex flex-wrap self-center ml-2 flex-row ">{{ choice.name }}</label>
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