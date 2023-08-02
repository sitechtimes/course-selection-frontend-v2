<template>
  <div class="w-full">
    <fieldset ref="form">
      <legend class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
      <div class="flex flex-row text-lg md:text-xl xl:text-2xl justify-center sm:justify-start">
        <div class="flex justify-center items-center flex-wrap my-4">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-4 h-4 mx-2 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
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
            class="w-4 h-4 mx-2 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
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
import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount, PropType } from "vue";
import { surveyQuestion, preferences } from "../../../types/interface";

const props = defineProps({
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true
  },
  isDisabled: Boolean,
});

const surveyStore = useSurveyStore();
let index: number = surveyStore.currentResponse.findIndex(
  (x) => x.id == props.question?.id
);

// if current question's answer object does not exist (findIndex returned -1), create one
if (index < 0) {
  const questionAnswer = {
    id: props.question.id,
    question: props.question.question,
    answer: "",
  };
  //@ts-ignore
  surveyStore.currentResponse.push(questionAnswer);

  index = surveyStore.currentResponse.findIndex(
    (x) => x.id == props.question?.id
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

// watch for changes in the question's answer
watch(
  () => surveyStore.currentResponse[index].answer,
  (newResponse, oldResponse) => {
    // if the question's status is class, meaning it pertains to a course
    if(props.question?.status === 'CLASS') {
      const totalIndex = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
      //@ts-ignore
      if (newResponse === "Yes") {
        // if answer yes to the question, add the mentioned course to final preference rankings
        const overallRank = surveyStore.currentResponse[totalIndex].answer.courses.length + 1;
        const overallRankObject = {
          rank: overallRank,
          name: props.question.className,
        };

        surveyStore.currentResponse[totalIndex].answer.courses.push(props.question.className)
        surveyStore.currentResponse[totalIndex].answer.preference.push(overallRankObject)
      }
      //@ts-ignore
      if (newResponse === "No") {
        // if answer is no and user had previously chosen yes, remove the mentioned course from final rankings
        if(surveyStore.currentResponse[totalIndex].answer.courses.includes(props.question.className)) {
          const allClassIndex = surveyStore.currentResponse[totalIndex].answer.courses.findIndex((x: string) => x === props.question.className)
          const allPreferenceIndex = surveyStore.currentResponse[totalIndex].answer.preference.findIndex((x: preferences) => x.name === props.question.className)

          surveyStore.currentResponse[totalIndex].answer.preference.forEach((x: preferences) => {
          const index = surveyStore.currentResponse[totalIndex].answer.preference.indexOf(x) 
          // ranking all courses in final rankings from highest to lowest
          surveyStore.currentResponse[totalIndex].answer.preference.sort(function(a: preferences, b: preferences) {
              return a.rank - b.rank;
            })

            // if the course's ranking is lower than the removed class's, boost the course's rank by 1
            if(index > allPreferenceIndex) {
              surveyStore.currentResponse[totalIndex].answer.preference[index].rank = surveyStore.currentResponse[totalIndex].answer.preference[index].rank -1
            }
          })

          // remove the mentioned course from final rankings
          surveyStore.currentResponse[totalIndex].answer.courses.splice(allClassIndex, 1)
          surveyStore.currentResponse[totalIndex].answer.preference.splice(allPreferenceIndex, 1)
        }
      }
      
    }
    
  }
);
</script>
