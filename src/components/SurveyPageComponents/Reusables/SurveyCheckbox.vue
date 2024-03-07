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
                  :value="choice"
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
            <p class="ml-6 mt-2 text-lg xl:leading-10 md:text-xl xl:text-2xl text-black">Drag course(s) into order of preference:</p>
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
//@ts-nocheck
import surveyDraggable from "./SurveyDraggable.vue";
import { useSurveyStore } from "../../../stores/survey";
import { watch, ref, Ref, computed, PropType } from "vue";
import { surveyQuestion, preferences, course } from "../../../types/interface";

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
const x = ref(0);
const index = ref(0);

const getQuestionIndex = (question: string): number => {
  return surveyStore.currentResponse.findIndex((entry) => entry.question === question);
}

function startQuestion() {
  const currentQuestion: string = props.question.question;
  index.value = getQuestionIndex(currentQuestion);
  if (index < 0) {
    const newQuestion = {
      id: "",
      question: currentQuestion,
      questionType: props.question.questionType,
      answer: ""
    }
    surveyStore.currentResponse.push(newQuestion);
  }
}

startQuestion();

const notInterested = computed(() =>{
  return surveyStore.currentResponse[index.value].answer.courses.includes('Not Interested');
})

function toggleInterest(interested: boolean, course: course) {
  const allCoursesIndex = surveyStore.currentResponse.findIndex((x) => x.id === "allChosenCourses");
  const allCourses = surveyStore.currentResponse[allCoursesIndex].answer;
  console.log("allCourses", allCourses)
  console.log("course", course)
  const currentQuestionPreferences = surveyStore.currentResponse[index.value].answer.preference;
  const referencedClass = course.name;
  // adjust course rankings if not interested
  if (!interested) {
    //SOMETHING IS AFOOT HERE
    allCourses.courses.forEach((course: string) => {
      if (course !== "Not Interested") {
        console.log(allCourses);
        const filteredCourses = allCourses.courses.filter((x) => x.name !== referencedClass);
        const filteredPreferences = allCourses.preference.filter((x) => x !== referencedClass);

        surveyStore.currentResponse[allCoursesIndex].answer.courses = filteredCourses;
        surveyStore.currentResponse[allCoursesIndex].answer.preference = filteredPreferences;
        
        surveyStore.currentResponse[allCoursesIndex].answer.preference.sort((a, b) => a.rank - b.rank);

        const classIndex = currentQuestionPreferences.findIndex((x: preferences) => x.name === course);
        surveyStore.currentResponse[index.value].answer.preference.splice(classIndex, 1);
      }
    })
    const adjustedPreferenceRankings = allCourses.preference.forEach((rankObject: preferences, index: number) => {
      rankObject.rank = index + 1;
    })
    surveyStore.currentResponse[allCoursesIndex].answer.preference = adjustedPreferenceRankings;

    surveyStore.currentResponse[index.value].answer.courses = ["Not Interested"];
  } else {
    //courses is just preference but without the rank
    const overallRank = surveyStore.currentResponse[allCoursesIndex].answer.courses.length + 1;
    const courseObject = {
      name: course.name,
      courseCode: course.courseCode,
      subject: course.subject,
    }
    const rankedCourseObject = {
      ...courseObject,
      rank: overallRank,
    }
    surveyStore.currentResponse[index.value].answer.preference.push(rankedCourseObject);

    surveyStore.currentResponse[allCoursesIndex].answer.courses.push(courseObject);
    surveyStore.currentResponse[allCoursesIndex].answer.preference.push(rankedCourseObject);
    console.log("User added a course");
  }
}

function getChangedCourse(oldCourses, newCourses) {
  const addedCourse = newCourses.find((x) => !oldCourses.includes(x));
  const removedCourse = oldCourses.find((x) => !newCourses.includes(x));

  return addedCourse || removedCourse;
}

watch(() => props.question.question, (newResponse) => {
    startQuestion();
  }
);

watch(
  // watching for changes on selected courses
  () => surveyStore.currentResponse[index.value].answer.courses,
  (newResponse, oldResponse) => {
    const interested = newResponse.length > oldResponse.length;
    console.log(interested);
    const changedCourse = getChangedCourse(newResponse, oldResponse);
    toggleInterest(interested, changedCourse);
  }
);

watch(() => surveyStore.currentResponse[index.value].answer.preference, 
  (newResponse) => {
    x.value = x.value+1
  }, 
  { deep: true }
);

</script>
