<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row h-full">
      <div class="w-1/2">
        <div class="flex items-center justify-center max-w-[40rem] overflow-hidden">
          <fieldset class="flex items-center justify-start">
            <!-- I did this because I have no idea how to make it fill the rest of the page, so this will let the page decide how long it should be.  -->
            <legend class="text-lg md:text-xl xl:text-3xl overflow-visible">{{ question.question }}</legend>
            <div class="flex flex-col flex-wrap justify-center items-start">
              <div
                v-for="choice in choices"
                :key="choice.courseCode"
                class="flex flex-wrap flex-column justify-center items-center m-4 w-max"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  :id="choice.courseCode"
                  :value="choice.name"
                  v-model="surveyStore.currentResponse[index].answer[0].chosenClasses"
                />
                <label
                  :for="choice.courseCode"
                  class="text-lg md:text-xl xl:text-2xl ml-4"
                  >{{ choice.name }}</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="border-black border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll">
        <div class="flex justify-center mt-[1%]">
            <p class="text-lg md:text-xl xl:text-2xl text-black">Drag course(s) into order of preference:</p>
          </div>
          <surveyDraggable
          :courses="surveyStore.currentResponse[index].answer[1].classPreference"
          :index="index"
          :numbered="true"
          :color="color"
          :key="x"></surveyDraggable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  choices: Array,
  question: Object,
  answers: Array,
  color: String,
});

import surveyDraggable from "./closedDraggable.vue";
import { useSurveyStore } from "../../../../stores/survey";
import { watch, onBeforeMount, onbeforeC, ref, Ref } from "vue";

const surveyStore = useSurveyStore();

const x: Ref<number>= ref(0)
let index: number = surveyStore.currentResponse.findIndex((x) => x.id == props.question.id);


if (index < 0) {
  const questionAnswer = {
    id: props.question.id,
    question: props.question.question,
    answer: [{ chosenClasses: [] }, { classPreference: [] }],
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
  () => surveyStore.currentResponse[index].answer[0].chosenClasses,
  (newResponse, oldResponse) => {
    const preference = surveyStore.currentResponse[index].answer[1].classPreference;
    const totalIndex = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
  
    if (newResponse.length > oldResponse.length) {
      const spreaded = [...newResponse, ...oldResponse];
      const newClass = spreaded.filter((x) => {
        return !(newResponse.includes(x) && oldResponse.includes(x));
      });

      const rank = newResponse.length;
      const rankObject = {
        rank: rank,
        name: newClass[0],
      };

      const overallRank = surveyStore.currentResponse[totalIndex].courses.length + 1;
      const overallRankObject = {
        rank: overallRank,
        name: newClass[0],
      };

      surveyStore.currentResponse[index].answer[1].classPreference.push(rankObject);
      surveyStore.currentResponse[totalIndex].courses.push(newClass[0])
      surveyStore.currentResponse[totalIndex].preference.push(overallRankObject)

    } else if (newResponse.length < oldResponse.length) {
      const spreaded = [...newResponse, ...oldResponse];
      const removeClass = spreaded.filter((x) => {
        return !(newResponse.includes(x) && oldResponse.includes(x));
      });
      const classIndex = surveyStore.currentResponse[index].answer[1].classPreference.findIndex(x => x.name === removeClass[0])
      const allClassIndex = surveyStore.currentResponse[totalIndex].courses.findIndex(x => x === removeClass[0])
      const allPreferenceIndex = surveyStore.currentResponse[totalIndex].preference.findIndex(x => x.name === removeClass[0])

      preference.forEach(x => {
        const index = preference.indexOf(x) 
        preference.sort(function(a, b) {
          return parseFloat(a.rank) - parseFloat(b.rank);
        })
        if(index > classIndex) {
          preference[index].rank = preference[index].rank -1
        }
      })
      
      surveyStore.currentResponse[totalIndex].preference.forEach(x => {
        const index = surveyStore.currentResponse[totalIndex].preference.indexOf(x) 
        surveyStore.currentResponse[totalIndex].preference.sort(function(a, b) {
          return parseFloat(a.rank) - parseFloat(b.rank);
        })
        if(index > allPreferenceIndex) {
          surveyStore.currentResponse[totalIndex].preference[index].rank = surveyStore.currentResponse[totalIndex].preference[index].rank -1
        }
      })

      surveyStore.currentResponse[index].answer[1].classPreference.splice(classIndex, 1)
      surveyStore.currentResponse[totalIndex].courses.splice(allClassIndex, 1)
      surveyStore.currentResponse[totalIndex].preference.splice(allPreferenceIndex, 1)
    }
    surveyStore.currentResponse[index].answer[1].classPreference = preference;
  }
);
// console.log(surveyStore.currentResponse[14].preference)
watch(() => surveyStore.currentResponse[index].answer[1].classPreference, (newResponse) => {
  x.value = x.value+1
}, { deep: true })
</script>
