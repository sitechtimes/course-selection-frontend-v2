<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row items-center lg:items-start w-full">
      <div class="lg:w-1/2 w-full h-full">
        <div
          class="flex items-center justify-center max-w-[40rem] overflow-hidden"
        >
          <fieldset class="flex items-center justify-start w-full h-full">
            <legend
              class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible text-left mb-4"
            >
              {{ question.question }}
            </legend>
            <div class="flex flex-col flex-wrap justify-center items-start">
              <div v-for="choice in choices" :key="choice.name">
                <label class="text-base sm:text-lg xl:text-xl ml-4 flex flex-wrap flex-column justify-center items-center m-2 w-max gap-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                    :value="choice"
                    v-model="(surveyStore.currentResponse[index].answer as checkboxAnswer).courses"
                    :disabled="notInterested"
                  />
                  {{ choice.name }}
                </label>
              </div>
              <label
                v-if="props.question.status === 'OPTIONAL'"
                class="text-base sm:text-lg xl:text-xl ml-4 flex flex-wrap flex-column justify-center items-center m-2 w-max gap-2"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  value="Not Interested"
                  v-model="(surveyStore.currentResponse[index].answer as checkboxAnswer).courses"
                />
                Not Interested
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        class="mt-4 border-black border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll"
      >
        <div class="flex justify-center mt-[1%]">
          <p class="ml-6 mt-2 text-lg xl:leading-10 md:text-xl xl:text-2xl text-black">Drag course(s) into order of preference:</p>
        </div>
        <surveyDraggable
          class="p-6"
          :courses="(surveyStore.currentResponse[index].answer as checkboxAnswer).preference"
          :index="index"
          :numbered="true"
          :color="color"
          :key="x"
        ></surveyDraggable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import surveyDraggable from "./SurveyDraggable.vue";
import { useSurveyStore } from "../../../stores/survey";
import { watch, ref, Ref, computed, PropType } from "vue";
import {
  surveyQuestion,
  preferences,
  course,
  allCoursesAnswer,
  checkboxAnswer,
} from "../../../types/interface";

const props = defineProps({
  choices: {
    type: Array as PropType<Array<course>>,
    required: true,
  },
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true,
  },
  color: String,
});

const surveyStore = useSurveyStore();
const x = ref(0);
const index = ref(0); //current question index

//finding current question index in surveyStore
const getQuestionIndex = (question: string): number => {
  return surveyStore.currentResponse.findIndex((entry) => entry.question === question);
};

//initialise current question
function startQuestion() {
  const currentQuestion: string = props.question.question;
  index.value = getQuestionIndex(currentQuestion);
  //if question does not currently exist in currentResponse, create it
  if (index.value < 0) {
    const newQuestion = {
      id: "",
      question: currentQuestion,
      questionType: props.question.questionType,
      answer: {
        courses: [],
        preference: [],
      },
    };
    surveyStore.currentResponse.push(newQuestion);
  }
}

startQuestion();

//'Not Interested' is selected
const notInterested = computed(() => {
  const currentQuestionAnswer = surveyStore.currentResponse[index.value].answer as checkboxAnswer;
  return currentQuestionAnswer.courses.includes("Not Interested");
});

//if 'Not Interested' is selected, clear the array(courses) for that question
watch(
  () => notInterested.value,
  (isNotInterested) => {
    if (isNotInterested) {
      surveyStore.currentResponse[index.value].answer = {
        courses: [],
        preference: [],
      };
    }
  }
);

function toggleInterest(interested: boolean, course: course) {
  const allCoursesIndex = surveyStore.currentResponse.findIndex((x) => x.id === "allChosenCourses");

  const allCourses = surveyStore.currentResponse[allCoursesIndex] as allCoursesAnswer;
  const currentQuestionAnswer = surveyStore.currentResponse[index.value].answer as checkboxAnswer;

  const referencedClass = course.name;

  if (!interested) {
    const filteredCourses = allCourses.answer.courses.filter(
      (course) => typeof course !== "string" && course.name !== referencedClass
    );
    const filteredPreferences = allCourses.answer.preference.filter(
      (course) => course.name !== referencedClass
    );

    const classIndex = (
      surveyStore.currentResponse[index.value].answer as checkboxAnswer
    ).preference.findIndex((x: preferences) => x.name === referencedClass);

    currentQuestionAnswer.preference.splice(classIndex, 1);

    allCourses.answer.courses = filteredCourses;
    allCourses.answer.preference = filteredPreferences;

    allCourses.answer.preference.sort((a, b) => a.rank - b.rank);

    allCourses.answer.preference.forEach(
      (rankObject: preferences, index: number) => {
        rankObject.rank = index + 1;
      }
    );
  } else {
    //add the course to allCourses
    const overallRank = allCourses.answer.courses.length + 1;
    const courseObject = {
      name: course.name,
      courseCode: course.courseCode,
      subject: course.subject,
    };
    const rankedCourseObject = {
      ...courseObject,
      rank: overallRank,
    };

    currentQuestionAnswer.preference.push(rankedCourseObject);

    allCourses.answer.courses.push(courseObject);
    allCourses.answer.preference.push(rankedCourseObject);
  }
}

function getChangedCourse(oldCourses: course[], newCourses: course[]) {
  const addedCourse = newCourses.find(
    (course: course) => !oldCourses.includes(course)
  );
  const removedCourse = oldCourses.find(
    (course: course) => !newCourses.includes(course)
  );

  return addedCourse || removedCourse;
}

watch(
  () => props.question.question,
  (newResponse) => {
    startQuestion();
  }
);

//watching for changes on selected courses
watch(
  () =>
    (surveyStore.currentResponse[index.value].answer as checkboxAnswer).courses,
  (newResponse, oldResponse) => {
    const interested = newResponse.length > oldResponse.length;
    const changedCourse = getChangedCourse(
      newResponse as course[],
      oldResponse as course[]
    );
    if (changedCourse) {
      toggleInterest(interested, changedCourse);
    }
  }
);

watch(
  () => (surveyStore.currentResponse[index.value].answer as checkboxAnswer).preference,
  (newResponse) => {
    x.value = x.value + 1;
  },
  { deep: true }
);
</script>
