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
          :finalAnswer="finalAnswer"
          :key="currentQuestion.id + '-boolean'"
        />

        <DropdownComponent
          v-else-if="currentQuestion.questionType === 'DROPDOWN'"
          :question="currentQuestion"
          :key="currentQuestion.id + '-dropdown'"
        />
        <div v-else-if="currentQuestion.questionType === 'FINAL'" class="my-6">
          <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl my-4">
            For the final part of the survey, please drag your classes in the
            order of priority, with the first choice being your top priority.
          </p>
          <SurveyDraggable
            :courses="surveyStore.selectedCourses"
            :numbered="true"
            :answer="finalAnswer"
            :color="'D6EEFF'"
          />
        </div>

        <CheckboxComponent
          v-else
          :finalAnswer="finalAnswer"
          :question="currentQuestion"
          :choices="
            surveyStore.coursesAvailable.filter(
              (x) => x.subject === currentQuestion.questionType
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
import CheckboxComponent from "../components/Survey/Checkbox.vue";
import DropdownComponent from "../components/Survey/Dropdown.vue";
import SurveyDraggable from "../components/Survey/Draggable.vue";
import BooleanComponent from "../components/Survey/Boolean.vue";
import GeneralComponent from "../components/Survey/General.vue";
import { Question, Answer } from "../types/interface";
import { useSurveyStore } from "../stores/survey";
import { onBeforeRouteLeave } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, reactive, watch } from "vue";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();
const userStore = useUserStore();

const currentIndex = ref(0);
let currentQuestion: Question = reactive(
  surveyStore.survey.questions[currentIndex.value]
);

const allCoursesQuestion = surveyStore.survey.questions.find(
  (entry) => entry.questionType === "FINAL"
) as Question;
const finalAnswer = surveyStore.answers.find(
  (entry) => entry.question === allCoursesQuestion.id
) as Answer;

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
  () => [surveyStore.answers, surveyStore.survey],
  () => {
    surveyStore.checkAnswers()
      ? window.addEventListener("beforeunload", (e) => e.preventDefault())
      : window.removeEventListener("beforeunload", (e) => e.preventDefault());
  },
  { deep: true }
);
</script>
