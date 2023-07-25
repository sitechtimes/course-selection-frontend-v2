<template>
  <div class="w-full">
    <fieldset ref="form">
      <legend class="text-lg md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
      <div class="flex flex-row text-lg md:text-xl xl:text-2xl">
        <div class="flex justify-center items-center flex-wrap my-4">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'Yes'"
            value="Yes"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'Yes'">Yes</label>
        </div>
        <div class="flex justify-center items-center flex-wrap m-8">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :id="question.id + 'No'"
            value="No"
            v-model="surveyStore.currentResponse[index].answer"
          />
          <label :for="question.id + 'No'">No</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  question: Object,
  answers: Array,
  isDisabled: Boolean,
});

import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount } from "vue";

const surveyStore = useSurveyStore();
let index: number = surveyStore.currentResponse.findIndex(
  (x) => x.id == props.question.id
);


  if (index < 0) {
    const questionAnswer = {
      id: props.question.id,
      question: props.question.question,
      answer: "",
    };
    surveyStore.currentResponse.push(questionAnswer);

    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == props.question.id
    );
  }


watch(
  () => props.question,
  (newResponse) => {
    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == newResponse.id
    );
  }
);

watch(
  () => surveyStore.currentResponse[index].answer,
  (newResponse, oldResponse) => {
    if(props.question.status === 'CLASS') {
      const totalIndex = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');

      if (newResponse === "Yes") {
        const overallRank = surveyStore.currentResponse[totalIndex].answer.courses.length + 1;
        const overallRankObject = {
          rank: overallRank,
          name: props.question.className,
        };

        surveyStore.currentResponse[totalIndex].answer.courses.push(props.question.className)
        surveyStore.currentResponse[totalIndex].answer.preference.push(overallRankObject)
      }

      if (newResponse === "No") {
        if(surveyStore.currentResponse[totalIndex].answer.courses.includes(props.question.className)) {
          const allClassIndex = surveyStore.currentResponse[totalIndex].answer.courses.findIndex(x => x === props.question.className)
          const allPreferenceIndex = surveyStore.currentResponse[totalIndex].answer.preference.findIndex(x => x.name === props.question.className)

          surveyStore.currentResponse[totalIndex].answer.preference.forEach(x => {
          const index = surveyStore.currentResponse[totalIndex].answer.preference.indexOf(x) 
          surveyStore.currentResponse[totalIndex].answer.preference.sort(function(a, b) {
              return parseFloat(a.rank) - parseFloat(b.rank);
            })
            if(index > allPreferenceIndex) {
              surveyStore.currentResponse[totalIndex].answer.preference[index].rank = surveyStore.currentResponse[totalIndex].answer.preference[index].rank -1
            }
          })

          surveyStore.currentResponse[totalIndex].answer.courses.splice(allClassIndex, 1)
          surveyStore.currentResponse[totalIndex].answer.preference.splice(allPreferenceIndex, 1)
        }
      }
      
    }
    
  }
);
</script>
