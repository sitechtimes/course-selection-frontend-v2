<template>
  <section class="lg:text-left text-center">
      <div class="flex flex-col lg:flex-row">
        <div>
      <div class="flex items-center justify-center max-w-[40rem] overflow-hidden">
      <fieldset class="flex items-center justify-start"> <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
      <legend class="text-xl md:text-2xl">{{ question }}</legend>
      <div class="flex flex-col flex-wrap justify-center items-start">
        <div v-for="choice in choices" :key="choice" class="flex flex-wrap flex-column justify-center items-center m-4 w-max">
          <input
            type="checkbox"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="choice.courseCode"
            :value="choice.courseCode"
            v-model="response"
          />
          <label :for="choice.courseCode" class="text-lg md:text-xl ml-4">{{ choice.name }}</label>
        </div>
      </div>
      </fieldset>
    </div>
    </div>
        <div class="border-black border-[0.5px] border-solid rounded-xl lg:w-[35%] w-[90%] lg:ml-28 lg:h-[50-vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll">
          <!-- <div class="flex justify-center mt-[1%]">
            <p class="text-[150%] text-black">Drag course(s) into order of preference:</p>
          </div>
          <div class="flex justify-center mt-[2%]"> 
            <div class="bg-[#D6EEFF] w-[18rem] h-[3rem] lg:w-[50%] lg:h-[5vh] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl ">                
              <p class="text-[#37394F] text-[150%] font-bold">AP Psychology</p>
            </div>
          </div>
          <div class="flex flex-row-reverse mt-6 ">
            <button class="bg-[#6A9FD1] text-white w-[30%] h-[2.5rem] lg:h-[3.5rem] text-[1.5rem] md:text-[200%] mr-5 mb-5" >
              Confirm
            </button>
          </div> -->
          <p>hmm {{ response }}</p>
        </div>
      </div>
      <div class="bottom-28 w-11/12 md:w-4/5 lg:w-3/4 absolute flex justify-between items-center px-4">
        <button @click="$emit('back', response);" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="$emit('next', response);" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md  disabled:bg-stone-400" :disabled="max">Next</button>
      </div>
    </section>
</template>
  
<script setup lang="ts">
  import { reactive, ref } from 'vue';

  defineProps({
    choices: Array,
    question: String,
    min: Boolean,
    max: Boolean
  });

  const response: Array<String | undefined> = ref([])

</script>  