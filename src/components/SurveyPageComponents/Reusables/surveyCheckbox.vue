<template>
  <section class="lg:text-left text-center">
      <div class="flex flex-col lg:flex-row">
        <div>
      <div class="flex items-center justify-center max-w-[40rem] overflow-hidden">
      <fieldset class="flex items-center justify-start"> <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
      <legend class="text-xl md:text-2xl">{{ question.question }}</legend>
      <div class="flex flex-col flex-wrap justify-center items-start">
        <div v-for="choice in choices" :key="choice.courseCode" class="flex flex-wrap flex-column justify-center items-center m-4 w-max">
          <input
            type="checkbox"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="choice.courseCode"
            :value="choice.name"
            v-model="surveyStore.currentResponse[index].answer[0].chosenClasses"
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
          <p>hmm {{ surveyStore.currentResponse[index].answer }}</p>
        </div>
      </div>
    </section>
</template>
  
<script setup lang="ts">
  const props = defineProps({
    choices: Array,
    question: Object,
    answers: Array,
  });

  import { useSurveyStore } from '../../../stores/user';
  import { watch, onBeforeMount } from 'vue';

  const surveyStore = useSurveyStore()
  let index: number = surveyStore.currentResponse.findIndex(x => x.id == props.question.id)

  onBeforeMount(() => {
    if(index < 0) {
      const questionAnswer = {
          id: props.question.id,
          question: props.question.question,
          answer: [{chosenClasses: []},{classPreference: []}]
      }
      surveyStore.currentResponse.push(questionAnswer)
      
      index = surveyStore.currentResponse.findIndex(x => x.id == props.question.id)
    }
  })


  watch(() => props.question, (newResponse) => {
    index = surveyStore.currentResponse.findIndex(x => x.id == newResponse.id)
  })
</script>  