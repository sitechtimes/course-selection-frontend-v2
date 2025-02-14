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
      <div class="flex justify-center my-10 flex-col items-center"></div>
    </div>
  </section>
  <ScrollPage :guidance="false" />
</template>
<script setup lang="ts">
import ClosedFinalRank from "../components/Survey/ClosedFinalRank.vue";
import SurveyDropdown from "../components/Survey/Dropdown.vue";
import ClosedRank from "../components/Survey/ClosedRank.vue";
import SurveyGeneral from "../components/Survey/General.vue";
import SurveyBoolean from "../components/Survey/Boolean.vue";
import ScrollPage from "../components/Survey/ScrollPage.vue";
import { useSurveyStore } from "../stores/survey";
import { Question } from "../types/interface";

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
