<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row h-full w-full">
        <div class="flex items-center justify-center max-w-[40rem] overflow-hidden w-full">
          <fieldset class="flex items-center justify-start w-full">
            <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
            <legend class="text-lg md:text-xl xl:text-3xl overflow-visible"> Ranked {{ question.question.replace("Select the", " ").replace("course(s) you are interested in:", " ") }} course(s)</legend> 
        <div class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400">
          <div v-if="surveyStore.currentResponse[index].answer.preference.length != 0">
            <p v-for="choice in surveyStore.currentResponse[index].answer.preference" :key="choice.rank" class="mt-2 mb-2 text-base md:text-lg xl:text-2xl">
            <strong> {{choice.rank}}.) </strong> {{choice.name}}
          </p>
          </div>
          <p v-else class="mt-2 mb-2 text-base md:text-lg xl:text-2xl">
            You have no classes chosen.
          </p>
        </div>
          </fieldset>
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

import { useSurveyStore } from "../../../../stores/survey";

const surveyStore = useSurveyStore();

let index: number = surveyStore.currentResponse.findIndex((x) => x.id == props.question.id);


if (index < 0) {
  const questionAnswer = {
    id: props.question.id,
    question: props.question.question,
    answer: [{ courses: [] }, { preference: [] }],
  };
  surveyStore.currentResponse.push(questionAnswer);

  index = surveyStore.currentResponse.findIndex(
    (x) => x.id == props.question.id
  );
}



</script>
