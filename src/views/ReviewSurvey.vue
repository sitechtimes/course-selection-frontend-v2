<template>
  <section class="flex justify-center items-center flex-col">
    <div class="lg:w-2/3 w-11/12">
      <div
        v-for="question in surveyStore.survey.questions"
        :key="question.id"
        class="flex justify-center mb-8"
      >
        <div class="flex flex-col w-11/12">
          <booleanComponent
            v-if="question.questionType === 'BOOLEAN'"
            :question="question"
            :warn="question.id in surveyStore.missingAnswers && shouldWarn"
          />
          <generalComponent
            v-else-if="question.questionType === 'GENERAL'"
            :question="question"
            :warn="question.id in surveyStore.missingAnswers && shouldWarn"
          />
          <dropdownComponent
            v-else-if="question.questionType === 'DROPDOWN'"
            :question="question"
            :warn="question.id in surveyStore.missingAnswers && shouldWarn"
          />
          <checkboxComponent
            v-else
            :question="question"
            :choices="getChoices(question)"
            :color="'D6EEFF'"
            :warn="question.id in surveyStore.missingAnswers && shouldWarn"
          />
        </div>
      </div>
      <div class="my-6">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl my-4">
          For the final part of the survey, please drag your classes in the
          order of priority, with the first choice being your top priority.
        </p>
        <surveyDraggable
          :courses="surveyStore.selectedCourses"
          :numbered="true"
          :answer="finalAnswer"
          :color="'D6EEFF'"
        />
      </div>
      <div class="mt-14">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl">
          Final note to your guidance counselor:
        </p>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
          type="text"
          v-model="counselorNotes.answer"
        />
      </div>
      <div class="flex justify-center my-10 flex-col items-center">
        <p
          v-if="surveyStore.missingAnswers.length === 0"
          class="mb-4 text-center"
        >
          Once you submit, you will still be able to make changes to your survey
          before the due date. Once your guidance counselor finalizes your
          survey, you will not be able to edit.
        </p>
        <p v-else class="mb-4 text-center text-red-500">
          Please answer all required questions before submitting.
        </p>
        <button
          @click="submit()"
          class="bg-[#D6EEFF] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]"
        >
          Submit
        </button>
      </div>
    </div>
  </section>
  <ScrollPage :guidance="false" />
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import booleanComponent from "../components/SurveyPageComponents/SurveyBoolean.vue";
import generalComponent from "../components/SurveyPageComponents/SurveyGeneral.vue";
import checkboxComponent from "../components/SurveyPageComponents/SurveyCheckbox.vue";
import surveyDraggable from "../components/SurveyPageComponents/SurveyDraggable.vue";
import dropdownComponent from "../components/SurveyPageComponents/SurveyDropdown.vue";
import ScrollPage from "../components/SurveyPageComponents/ScrollPage.vue";
import { Answer, Question } from "../types/interface";
import { watch, ref } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";

document.title = "Survey | SITHS Course Selection";

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const router = useRouter();

surveyStore.missingAnswers = [];
surveyStore.checkAnswers();

let allCoursesQuestion = {} as Question;
let finalAnswer = {} as Answer;
let guidanceQuestion = {} as Question;
let counselorNotes = {} as Answer;

const getChoices = (question: Question) =>
  surveyStore.coursesAvailable.filter(
    (x) => x.subject === question.questionType
  );

const shouldWarn = ref(false);

const submit = async () => {
  surveyStore.checkAnswers();
  if (surveyStore.missingAnswers.length > 0) {
    alert("Please answer all required questions before submitting.");
    shouldWarn.value = true;
    return;
  }
  if (!userStore.isGuidance) {
    await surveyStore.saveSurvey(true);
    router.push("/student/dashboard");
  } else {
    router.push("/guidance/studentlist");
  }
};

onBeforeRouteLeave((to, from, next) => {
  surveyStore.checkAnswers();
  if (
    surveyStore.changes.length === 0 ||
    to.path === "/student/survey/review"
  ) {
    window.removeEventListener("beforeunload", reminder);
    return next();
  }
  const save = window.confirm("Changes you made might not be saved.");
  if (!save) return next(false);
  window.removeEventListener("beforeunload", reminder);
  next();
});

const reminder = (e: Event) => {
  e.preventDefault();
};

watch(
  surveyStore.survey,
  () => {
    console.log(surveyStore.survey);
    allCoursesQuestion = surveyStore.survey.questions.find(
      (question) => question.questionType === "FINAL"
    ) as Question;
    finalAnswer = surveyStore.answers.find(
      (answer) => answer.question === allCoursesQuestion.id
    ) as Answer;

    guidanceQuestion = surveyStore.survey.questions.find(
      (question) => question.questionType === "NOTE"
    ) as Question;

    counselorNotes = surveyStore.answers.find(
      (answer) => answer.question === guidanceQuestion.id
    ) as Answer;
  },
  { deep: true }
);

watch(
  () => surveyStore.answers,
  (newResponse, oldResponse) => {
    surveyStore.checkAnswers();
    if (surveyStore.changes.length === 0)
      return window.removeEventListener("beforeunload", reminder);
    window.addEventListener("beforeunload", reminder);
  },
  { deep: true }
);
</script>
