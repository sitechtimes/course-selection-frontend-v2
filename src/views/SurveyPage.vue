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
              userStore.student.grade
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
          :key="currentQuestion.id + '-boolean'"
        />

        <DropdownComponent
          v-else-if="currentQuestion.questionType === 'DROPDOWN'"
          :question="currentQuestion"
          :key="currentQuestion.question + '-dropdown'"
        />

        <CheckboxComponent
          v-else
          :question="currentQuestion"
          :choices="surveyStore.coursesAvailable.filter(
    (x: Course) => x.subject === currentQuestion.questionType
  )"
          :key="currentQuestion.question + '-checkbox'"
          :color="'D6EEFF'"
        />
      </div>
    </div>
    <div
      class="h-1/6 w-11/12 md:w-4/5 lg:w-3/4 justify-between items-start px-4 bg-white z-20 flex flex-col"
    >
      <div class="flex flex-row justify-between w-full">
        <button
          @click="
            currentQuestion = surveyStore.survey.questions[--currentIndex]
          "
          class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400"
          :disabled="currentIndex === 0"
        >
          Back
        </button>
        <button
          @click="
            currentQuestion = surveyStore.survey.questions[++currentIndex]
          "
          class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:hidden"
          :disabled="currentIndex === surveyStore.survey.questions.length - 2"
        >
          Next
        </button>
        <RouterLink
          to="/student/survey/review"
          v-if="currentIndex === surveyStore.survey.questions.length - 2"
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
import CheckboxComponent from "../components/SurveyPageComponents/SurveyCheckbox.vue";
import BooleanComponent from "../components/SurveyPageComponents/SurveyBoolean.vue";
import GeneralComponent from "../components/SurveyPageComponents/SurveyGeneral.vue";
import DropdownComponent from "../components/SurveyPageComponents/SurveyDropdown.vue";
import { ref, reactive, watch } from "vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import { Question, Course, Answer } from "../types/interface";
import { onBeforeRouteLeave } from "vue-router";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();
const userStore = useUserStore();

const currentIndex = ref(0);
let currentQuestion: Question = reactive(
  surveyStore.survey.questions[currentIndex.value]
);

//finds what courses the student took to assign them questions
onBeforeRouteLeave((to, from, next) => {
  if (
    !surveyStore.checkAnswers() ||
    to.path === "/student/survey/review" ||
    window.confirm("Changes you made might not be saved.")
  ) {
    window.removeEventListener("beforeunload", reminder);
    return next();
  }
  next(false);
});

const reminder = (e: { preventDefault: () => void; returnValue: string }) => {
  e.preventDefault();
  e.returnValue = "";
};

watch(
  () => [surveyStore.answers, surveyStore.survey],
  () => {
    surveyStore.checkAnswers()
      ? window.addEventListener("beforeunload", reminder)
      : window.removeEventListener("beforeunload", reminder);
  },
  { deep: true }
);
</script>
