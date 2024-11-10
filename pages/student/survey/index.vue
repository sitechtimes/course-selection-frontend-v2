<template>
  <div class="h-[80vh] flex flex-col justify-center items-center space-y-8">
    <p v-if="surveyStore.loading">Setting things up...</p>
    <div v-else class="w-11/12 md:w-4/5 lg:w-3/4 flex flex-col items-center min-h-[20rem] h-5/6 overflow mt-6">
      <div class="mt-5">
        <h1 class="text-4xl font-semibold mb-6" v-if="surveyStore.currentSurvey.grade === 'FRESHMAN'">SOPHOMORE Year Survey</h1>
        <h1 class="text-4xl font-semibold mb-6" v-if="surveyStore.currentSurvey.grade === 'SOPHOMORE'">JUNIOR Year Survey</h1>
        <h1 class="text-4xl font-semibold mb-6" v-if="surveyStore.currentSurvey.grade === 'JUNIOR'">SENIOR Year Survey</h1>
      </div>
      <div class="h-5/6 flex items-center">
        <SurveyGeneral v-if="currentQuestion.questionType === 'GENERAL'" :question="currentQuestion" :key="currentQuestion.id + '-general'"> </SurveyGeneral>

        <SurveyBoolean v-else-if="currentQuestion.questionType === 'BOOLEAN'" :question="currentQuestion" :key="currentQuestion.id + '-boolean'"> </SurveyBoolean>

        <SurveyDropdown v-else-if="currentQuestion.questionType === 'DROPDOWN'" :question="currentQuestion" :key="currentQuestion.question + '-dropdown'"> </SurveyDropdown>

        <SurveyCheckbox v-else :question="currentQuestion" :choices="getChoices()" :key="currentQuestion.question + '-checkbox'" :color="'D6EEFF'"> </SurveyCheckbox>
      </div>
    </div>
    <div class="h-1/6 w-11/12 md:w-4/5 lg:w-3/4 justify-between items-start px-4 bg-white z-20 flex flex-col">
      <div class="flex flex-row justify-between w-full">
        <button @click="previousQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:bg-stone-400" :disabled="min">Back</button>
        <button @click="nextQuestion()" class="bg-[#6A9FD1] text-white w-24 h-10 rounded-md disabled:hidden" :disabled="max">Next</button>
        <NuxtLink to="/student/survey/review" v-if="max">
          <button class="bg-emerald-600 text-white w-auto px-3 h-10 rounded-md inline disabled:hidden" :disabled="!max">Review and Submit</button>
        </NuxtLink>
      </div>
      <p class="flex flex-row justify-center w-full text-xl font-semibold">
        {{ currentIndex + 1 }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Survey | SITHS Course Selection"
});

const surveyStore = useSurveyStore();

const currentIndex: Ref<number> = ref(0);
let currentQuestion: surveyQuestion = reactive(surveyStore.currentSurvey.question[currentIndex.value]);
const min: Ref<boolean> = ref(true);
const max: Ref<boolean> = ref(false);

async function startSurvey() {
  await surveyStore.fetchSurvey();
}
startSurvey();

const previousQuestion = () => {
  currentIndex.value--;
  currentQuestion = surveyStore.currentSurvey.question[currentIndex.value];

  max.value = false;
  if (currentIndex.value === 0) {
    min.value = true;
  }
};

const nextQuestion = () => {
  currentIndex.value++;
  currentQuestion = surveyStore.currentSurvey.question[currentIndex.value];

  min.value = false;
  if (currentIndex.value === surveyStore.currentSurvey.question.length - 1) {
    max.value = true;
  }
};

//finds what courses the student took to assign them questions
const getChoices = () => {
  const classes = surveyStore.studentCourses.coursesAvailable;
  return classes.filter((x) => x.subject === currentQuestion.questionType);
};

onBeforeRouteLeave((to, from, next) => {
  if (JSON.stringify(surveyStore.currentResponse) === surveyStore.currentAnsweredSurvey.answers || to.path === "/student/survey/review") {
    window.removeEventListener("beforeunload", reminder);
    next();
  } else {
    const answer = window.confirm("Changes you made might not be saved.");
    if (answer) {
      window.removeEventListener("beforeunload", reminder);
      next();
    } else {
      next(false);
    }
  }
});

const reminder = (e: { preventDefault: () => void; returnValue: string }) => {
  e.preventDefault();
  e.returnValue = "";
};

watch(
  () => surveyStore.currentResponse,
  (newResponse, oldResponse) => {
    if (JSON.stringify(newResponse) === surveyStore.currentAnsweredSurvey.answers) {
      window.removeEventListener("beforeunload", reminder);
    } else {
      window.addEventListener("beforeunload", reminder);
    }
  },
  { deep: true }
);

watch(
  () => surveyStore.currentAnsweredSurvey,
  (newResponse, oldResponse) => {
    if (newResponse.answers === JSON.stringify(surveyStore.currentResponse)) {
      window.removeEventListener("beforeunload", reminder);
    } else {
      window.addEventListener("beforeunload", reminder);
    }
  },
  { deep: true }
);
</script>
