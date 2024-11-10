<template>
  <section class="flex justify-center items-center flex-col">
    <div class="w-2/3">
      <div v-for="question in surveyStore.currentSurvey.question" :key="question.id" class="flex justify-center">
        <SurveyBoolean class="mb-2" v-if="question.questionType === 'BOOLEAN'" :question="question" :isDisabled="true"> </SurveyBoolean>
        <SurveyGeneral class="mb-6" v-else-if="question.questionType === 'GENERAL'" :question="question" :isDisabled="true"></SurveyGeneral>
        <SurveyDropdown class="mb-2" v-else-if="question.questionType === 'DROPDOWN'" :question="question" :isDisabled="true" />
        <SurveyClosedRank v-else class="mb-6" :question="question" :choices="getChoices(question)"></SurveyClosedRank>
      </div>
      <div class="my-6">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl my-4">Your final class priority:</p>
        <SurveyClosedFinalRank :courses="(surveyStore.currentResponse[indexAll] as allCoursesAnswer).answer.preference"> </SurveyClosedFinalRank>
      </div>
      <div class="mt-14">
        <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl">Final note to your guidance counselor:</p>
        <input
          class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
          type="text"
          disabled
          v-model="surveyStore.currentResponse[indexNote].answer"
        />
      </div>
      <div class="flex justify-center my-10 flex-col items-center"></div>
    </div>
  </section>
  <SurveyScrollPage :guidance="false" />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Survey | SITHS Course Selection"
});

const surveyStore = useSurveyStore();
const userStore = useUserStore();

surveyStore.fetchSurvey(userStore.email);

const indexAll = surveyStore.currentResponse.findIndex((x) => x.id === "allChosenCourses");
const indexNote = surveyStore.currentResponse.findIndex((x) => x.id === "noteToGuidance");
const x: Ref<number> = ref(0);

const getChoices = (question: surveyQuestion) => {
  const classes = surveyStore.studentCourses.coursesAvailable;
  return classes.filter((x) => x.subject === question.questionType);
};
</script>
