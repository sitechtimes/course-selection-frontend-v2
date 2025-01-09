<template>
  <section class="flex justify-center items-center flex-col">
    <div class="w-2/3">
      <div
        v-for="question in surveyStore.survey.questions"
        :key="question.id"
        class="flex justify-center"
      >
        <SurveyBoolean
          class="mb-2"
          v-if="question.questionType === 'BOOLEAN'"
          :finalID="finalID"
          :question="question"
          :isDisabled="true"
        />
        <SurveyGeneral
          class="mb-6"
          v-else-if="question.questionType === 'GENERAL'"
          :question="question"
          :isDisabled="true"
        />
        <SurveyDropdown
          class="mb-2"
          v-else-if="question.questionType === 'DROPDOWN'"
          :question="question"
          :isDisabled="true"
        />
        <ClosedFinalRank v-else-if="question.questionType === 'FINAL'" />
        <ClosedRank
          v-else
          class="mb-6"
          :question="question"
          :choices="getChoices(question)"
        />
      </div>
      <!-- <div class="my-6">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl my-4">
          Your final class priority:
        </p>
        <closedFinalRank
          :courses="(surveyStore.currentResponse[indexAll] as allCoursesAnswer).answer.preference"
        />
      </div>
      <div class="mt-14">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl">
          Final note to your guidance counselor:
        </p>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
          type="text"
          disabled
          v-model="surveyStore.currentResponse[indexNote].answer"
        />
      </div> -->
      <div class="flex justify-center my-10 flex-col items-center"></div>
    </div>
  </section>
  <ScrollPage :guidance="false" />
</template>
<script setup lang="ts">
import ClosedFinalRank from "../components/Survey/ClosedSurvey/ClosedFinalRank.vue";
import ClosedRank from "../components/Survey/ClosedSurvey/ClosedRank.vue";
import SurveyDropdown from "../components/Survey/Dropdown.vue";
import SurveyGeneral from "../components/Survey/General.vue";
import SurveyBoolean from "../components/Survey/Boolean.vue";
import ScrollPage from "../components/Survey/ScrollPage.vue";
import { useSurveyStore } from "../stores/survey";
import { Question, Answer } from "../types/interface";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();

const finalQuestion = surveyStore.survey.questions.find(
  (x) => x.questionType === "FINAL"
);

const finalID = surveyStore.answers.findIndex(
  (x) => x.question === finalQuestion?.id
);

const getChoices = (question: Question) =>
  surveyStore.coursesAvailable.filter(
    (x) => x.subject === question.questionType
  );
</script>
