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
            :name="`question_${question.question}`"
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
            :name="`question_${question.question}`"
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
import { watch, PropType, ref } from "vue";
import { surveyQuestion, preferences } from "../../../types/interface";

const props = defineProps({
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true
  },
  isDisabled: Boolean,
});

const surveyStore = useSurveyStore();
const index = ref(0);

const getQuestionIndex = (question: string): number => {
  return surveyStore.currentResponse.findIndex((entry) => entry.question === question);
}

function startQuestion() {
  const currentQuestion: string = props.question.question;
  index.value = getQuestionIndex(currentQuestion);
  if (index.value < 0) {
    const newQuestion = {
      //id does not exist for questions on backend yet
      id: "",
      question: currentQuestion,
      questionType: "BOOLEAN",
      answer: "",
    };
    surveyStore.currentResponse.push(newQuestion);
  }
}

startQuestion();

watch(() => props.question.question, (newResponse) => {
   startQuestion();
  }
);

watch(
  () => surveyStore.currentResponse[index.value].answer,
  (newResponse, oldResponse) => {
    const allCoursesIndex = surveyStore.currentResponse.findIndex((item) => item.id === "allChosenCourses");
    if (props.question.status === "CLASS" && newResponse.toString().toUpperCase() === "YES") {
      // add interested course to array of overall rankings
      const overallRank = surveyStore.currentResponse[allCoursesIndex].answer.courses.length + 1;
      const courseObject = {
        name: props.question.classReferenced.name,
        courseCode: props.question.classReferenced.courseCode,
        subject: props.question.classReferenced.subject,
      }
      const rankedCourseObject = {
        ...courseObject,
        rank: overallRank,
      }
      surveyStore.currentResponse[allCoursesIndex].answer.courses.push(courseObject);
      surveyStore.currentResponse[allCoursesIndex].answer.preference.push(rankedCourseObject);
    }

    else if (newResponse.toString().toUpperCase() === "NO") {
      const allCourses = surveyStore.currentResponse[allCoursesIndex].answer;
      const referencedClass = props.question.classReferenced.name;

      if (allCourses.courses.includes(referencedClass)) {
        // remove interested course from overall rankings and adjust ranks
        const filteredCourses = allCourses.courses.filter((x) => x !== referencedClass);
        const filteredPreferences = allCourses.preference.filter((x) => x.name !== referencedClass);

        surveyStore.currentResponse[allCoursesIndex].answer.courses = filteredCourses;
        surveyStore.currentResponse[allCoursesIndex].answer.preference = filteredPreferences;
        
        surveyStore.currentResponse[allCoursesIndex].answer.preference.sort((a, b) => a.rank - b.rank);
      }
    }
  }  
);
</script>
