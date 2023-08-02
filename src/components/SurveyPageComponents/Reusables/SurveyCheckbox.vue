<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row items-center w-full">
      <div class="lg:w-1/2 w-full h-full">
        <div class="flex items-center justify-center max-w-[40rem] overflow-hidden">
          <fieldset class="flex items-center justify-start w-full h-full">
            <legend class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible text-left mb-4">{{ question.question }}</legend>
            <div class="flex flex-col flex-wrap justify-center items-start">
              <div
                v-for="choice in choices"
                :key="choice.courseCode"
                class="flex flex-wrap flex-column justify-center items-center m-2 w-max"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  :id="choice.courseCode"
                  :value="choice.name"
                  v-model="surveyStore.currentResponse[index].answer.courses"
                  :disabled="notInterested"
                />
                <label
                  :for="choice.courseCode"
                  class="text-base sm:text-lg xl:text-xl ml-4"
                  >{{ choice.name }}</label
                >
              </div>
              <div v-if="props.question.status === 'OPTIONAL'"
                class="flex flex-wrap flex-column justify-center items-center m-2 w-max"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  :id="'notInterested' + index"
                  value="Not Interested"
                  v-model="surveyStore.currentResponse[index].answer.courses"
                />
                <label
                  :for="'notInterested' + index"
                  class="text-lg xl:text-xl ml-4"
                  >Not Interested</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="mt-4 border-black border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll">
        <div class="flex justify-center mt-[1%]">
            <p class="text-lg xl:leading-10 md:text-xl xl:text-2xl text-black">Drag course(s) into order of preference:</p>
          </div>
          <surveyDraggable
          class="p-6"
          :courses="surveyStore.currentResponse[index].answer.preference"
          :index="index"
          :numbered="true"
          :color="color"
          :key="x"></surveyDraggable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"> 
import surveyDraggable from "./SurveyDraggable.vue";
import { useSurveyStore } from "../../../stores/survey";
import { watch, onBeforeMount, ref, Ref, computed, PropType } from "vue";
import { surveyQuestion, preferences, checkboxAnswer, course } from "../../../types/interface";

const props = defineProps({
  choices:{
    type:  Array as PropType<Array<course>>,
    required: true
  },
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true
  },
  color: String,
});

const surveyStore = useSurveyStore();

const x: Ref<number>= ref(0)
let index: number = surveyStore.currentResponse.findIndex((x) => x.id == props.question?.id); 

// returns true or false if the answer for current question includes 'not interested'
const notInterested = computed(() =>{
  return surveyStore.currentResponse[index].answer.courses.includes('Not Interested')
})

// if answer to current question is not found (index returned -1), create new answer object
if (index < 0) {
  const questionAnswer = {
    id: props.question?.id,
    question: props.question?.question,
    answer: {
      courses: [], 
      preference: []
    },
  };
  surveyStore.currentResponse.push(questionAnswer);

  index = surveyStore.currentResponse.findIndex(
    (x) => x.id == props.question?.id
  );
}

// when user selects or deselects 'not interested' option
const toggleInterest = (interest: boolean, totalIndex: number) => {
  // if selected 'not interested'
  if(!interest) {   
    // remove any classes previously selected from rankings
    surveyStore.currentResponse[index].answer.courses.forEach((course: string) => {
      if(course !== "Not Interested") {
        const classIndex = surveyStore.currentResponse[index].answer.preference.findIndex((x: preferences) => x.name === course)
        const allClassIndex = surveyStore.currentResponse[totalIndex].answer.courses.findIndex((x: string) => x === course)
        const allPreferenceIndex = surveyStore.currentResponse[totalIndex].answer.preference.findIndex((x: preferences) => x.name === course)
        
        surveyStore.currentResponse[totalIndex].answer.preference.forEach((x: preferences) => {
          surveyStore.currentResponse[totalIndex].answer.preference.sort(function(a: preferences, b: preferences) {
            return a.rank - b.rank;
          })
        })

        // remove class from both current question rankings + final preference rankings
        surveyStore.currentResponse[index].answer.preference.splice(classIndex, 1)
        surveyStore.currentResponse[totalIndex].answer.courses.splice(allClassIndex, 1)
        surveyStore.currentResponse[totalIndex].answer.preference.splice(allPreferenceIndex, 1)
      }
    })

    // after courses are placed in order of rankings (highest to lowest), reassign correct rankings by adding 1 to index 
    surveyStore.currentResponse[totalIndex].answer.preference.forEach((rankObject: preferences, index: number) => {
      rankObject.rank = index + 1
    })

    surveyStore.currentResponse[index].answer.courses = ['Not Interested']
  }
}

// watch for changes in question to make sure the correct answer object is shown
watch(
  () => props.question,
  (newResponse) => {
    index = surveyStore.currentResponse.findIndex(
      (x) => x.id == newResponse?.id
    );
  }
);

// when user selects/deselects courses
watch(
  () => surveyStore.currentResponse[index].answer.courses,
  (newResponse, oldResponse) => {
    const preference = surveyStore.currentResponse[index].answer.preference;
    const totalIndex = surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses');
  
    // if a new course was selected
    if (newResponse.length > oldResponse.length) {
      const spreaded = [...newResponse, ...oldResponse];

      // find class not common between new and old response
      const newClass = spreaded.filter((x) => {
        return !(newResponse.includes(x) && oldResponse.includes(x));
      });

      // if the newly selected choice is 'not interested', call toggle interest
      if (newClass[0] === 'Not Interested') {
        toggleInterest(false, totalIndex)
      } else {
        // else create new rank object for new course and rank it as the bottom of the list
        const rank = newResponse.length;
        const rankObject = {
          rank: rank,
          name: newClass[0],
        };

        const overallRank = surveyStore.currentResponse[totalIndex].answer.courses.length + 1;
        const overallRankObject = {
          rank: overallRank,
          name: newClass[0],
        };

        surveyStore.currentResponse[index].answer.preference.push(rankObject);
        surveyStore.currentResponse[totalIndex].answer.courses.push(newClass[0])
        surveyStore.currentResponse[totalIndex].answer.preference.push(overallRankObject)
        surveyStore.currentResponse[index].answer.preference = preference;
      }

      // if course was deselected
    } else if (newResponse.length < oldResponse.length) {
      const spreaded = [...newResponse, ...oldResponse];
      // find class no common beween old and new responses
      const removeClass = spreaded.filter((x) => {
        return !(newResponse.includes(x) && oldResponse.includes(x));
      });

      // if the removed choice was 'not interested', toggle interest
      if (removeClass[0] === 'Not Interested') {
        toggleInterest(true, totalIndex)
      } else if (!surveyStore.currentResponse[index].answer.courses.includes('Not Interested')){
        // else remove course from rankings and update other courses' rankings to fill in the gap
        const classIndex = surveyStore.currentResponse[index].answer.preference.findIndex((x: preferences) => x.name === removeClass[0])
        const allClassIndex = surveyStore.currentResponse[totalIndex].answer.courses.findIndex((x: string) => x === removeClass[0])
        const allPreferenceIndex = surveyStore.currentResponse[totalIndex].answer.preference.findIndex((x: preferences) => x.name === removeClass[0])

        preference.forEach((x: preferences) => {
          const index = preference.indexOf(x) 
          // sort courses from highest to lowest ranks
          preference.sort(function(a: preferences, b: preferences) {
            return a.rank - b.rank;
          })

          // if course's rank is lower than the removed class's, then boost the course's rank by one
          if(index > classIndex) {
            preference[index].rank = preference[index].rank -1
          }
        })
        
        // same as above, but this time this is for the final preference ranking, not the current question's answer
        surveyStore.currentResponse[totalIndex].answer.preference.forEach((x: preferences) => {
          const index = surveyStore.currentResponse[totalIndex].answer.preference.indexOf(x) 
          surveyStore.currentResponse[totalIndex].answer.preference.sort(function(a: preferences, b: preferences) {
            return a.rank - b.rank;
          })
          if(index > allPreferenceIndex) {
            surveyStore.currentResponse[totalIndex].answer.preference[index].rank = surveyStore.currentResponse[totalIndex].answer.preference[index].rank -1
          }
        })

        surveyStore.currentResponse[index].answer.preference.splice(classIndex, 1)
        surveyStore.currentResponse[totalIndex].answer.courses.splice(allClassIndex, 1)
        surveyStore.currentResponse[totalIndex].answer.preference.splice(allPreferenceIndex, 1)
        surveyStore.currentResponse[index].answer.preference = preference;
      }
    }
  }
);

watch(() => surveyStore.currentResponse[index].answer.preference, (newResponse) => {
  x.value = x.value+1
}, { deep: true })
</script>
