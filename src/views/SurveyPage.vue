<template>
  <div class="h-[80vh] flex flex-col justify-center items-center space-y-8">
    <p v-if="userStore.loading">Setting things up...</p>
    <div
      v-else
      class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col items-center min-h-[20rem] h-5/6 overflow mt-6"
    >
      <div class="mt-5">
        <h1 class="text-4xl font-semibold mb-6">
          {{
            { 9: "Sophomore", 10: "Junior", 11: "Senior" }[
              userStore.student.grade as number
            ]
          }}
          Year Survey
        </h1>
      </div>
      <div class="h-5/6 flex items-center">
        <GeneralComponent
          v-if="currentQuestion.questionType === 'GENERAL'"
          :question="currentQuestion"
          :key="currentQuestion.id + '-general'"
        />

        <BooleanComponent
          v-else-if="currentQuestion.questionType === 'BOOLEAN'"
          :question="currentQuestion"
          :finalID="finalID"
          :key="currentQuestion.id + '-boolean'"
        />

        <DropdownComponent
          v-else-if="currentQuestion.questionType === 'DROPDOWN'"
          :question="currentQuestion"
          :key="currentQuestion.id + '-dropdown'"
        />

        <CheckboxComponent
          v-else
          :finalID="finalID"
          :question="currentQuestion"
          :choices="
            surveyStore.coursesAvailable.filter(
              (x:Course) => x.subject === currentQuestion.questionType
            )
          "
          :key="currentQuestion.id + '-checkbox'"
          :color="'D6EEFF'"
        />
      </div>
    </div>
    <div
      class="h-1/6 w-11/12 md:w-4/5 lg:w-3/4 justify-between items-start px-4 bg-white z-20 flex flex-col"
    >
      <div class="flex flex-row justify-between w-full">
        <button
          @click="currentIndex--"
          class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400"
          :disabled="currentIndex === 0"
        >
          Back
        </button>
        <button
          @click="currentIndex++"
          class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:hidden"
          :disabled="currentIndex === surveyStore.survey.questions.length - 3"
        >
          Next
        </button>
        <RouterLink
          to="/student/survey/review"
          v-if="currentIndex === surveyStore.survey.questions.length - 3"
        >
          <button
            class="bg-emerald-600 text-white w-auto px-3 h-10 rounded-md inline disabled:hidden"
          >
            Review and Submit
          </button>
        </RouterLink>
      </div>
      <p class="flex flex-row justify-center w-full text-xl font-semibold">
        {{ currentIndex + 1 }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckboxComponent from "../components/Survey/Checkbox.vue";
import DropdownComponent from "../components/Survey/Dropdown.vue";
import BooleanComponent from "../components/Survey/Boolean.vue";
import GeneralComponent from "../components/Survey/General.vue";
import { useSurveyStore } from "../stores/survey";
import { onBeforeRouteLeave } from "vue-router";
import { Question, Course } from "../types/interface";
import { useUserStore } from "../stores/user";
import { ref, reactive, watch } from "vue";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();
const userStore = useUserStore();

const currentIndex = ref(0);
let currentQuestion = reactive(
  surveyStore.survey.questions[currentIndex.value]
);

const allCoursesQuestion = surveyStore.survey.questions.find(
  (entry) => entry.questionType === "FINAL"
) as Question;

const finalID = surveyStore.answers.findIndex(
  (entry) => entry.question === allCoursesQuestion.id
) as number;

onBeforeRouteLeave((to, from, next) => {
  if (
    !surveyStore.checkAnswers() ||
    to.path === "/student/survey/review" ||
    window.confirm("Changes you made might not be saved.")
  ) {
    window.removeEventListener("beforeunload", (e) => e.preventDefault());
    return next();
  }
  next(false);
});

watch(
  () => currentIndex.value,
  () => (currentQuestion = surveyStore.survey.questions[currentIndex.value])
);

watch(
  () => surveyStore.answers,
  () => {
    surveyStore.checkAnswers()
      ? window.addEventListener("beforeunload", (e) => e.preventDefault())
      : window.removeEventListener("beforeunload", (e) => e.preventDefault());
  },
  { deep: true }
);
</script>
