<template>
  <section class="flex flex-col items-center justify-center">
    <div class="w-2/3">
      <div class="text-2xl mb-4" v-if="studentSurvey">
        <h1 class="font-bold text-[#37394F] text-3xl mb-6">
          {{ studentName }}'s Survey
        </h1>
        <h2>Grade: {{ studentSurvey.grade }}</h2>
      </div>
      <div>
        <div
          v-for="question in surveyStore.survey.questions"
          :key="question.id"
          class="flex justify-center"
        >
          <div class="w-11/12">
            <BooleanComp
              class="mb-2"
              v-if="question.questionType === 'BOOLEAN'"
              :question="question"
              :warn="
                surveyStore.missingAnswers.filter(
                  (answer) => answer === question.id
                ).length > 0 && shouldWarn
              "
            />
            <GeneralComp
              class="mb-6"
              v-else-if="question.questionType === 'GENERAL'"
              :question="question"
              :warn="
                surveyStore.missingAnswers.filter(
                  (answer) => answer === question.id
                ).length > 0 && shouldWarn
              "
            />
            <DropDownComp
              v-else-if="question.questionType === 'DROPDOWN'"
              :question="question"
              :warn="
                surveyStore.missingAnswers.filter(
                  (answer) => answer === question.id
                ).length > 0 && shouldWarn
              "
            />
            <CheckboxComp
              v-else
              class="mb-6"
              :question="question"
              :choices="getChoices(question)"
              :color="'DEE9C8'"
              :warn="
                surveyStore.missingAnswers.filter(
                  (answer) => answer === question.id
                ).length > 0 && shouldWarn
              "
            />
          </div>
        </div>

        <div class="my-6">
          <p class="text-lg md:text-xl xl:text-3xl my-4">
            Student's order of priority:
          </p>
          <DraggableComp
            :courses="surveyStore.currentResponse[indexAll].answer.preference"
            :index="indexAll"
            :numbered="true"
            :key="x"
            :color="'DEE9C8'"
          />
        </div>
        <div class="mt-14">
          <p class="text-lg md:text-xl xl:text-3xl">Note from the student:</p>
          <input
            disabled
            class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
            type="text"
            v-model="surveyStore.currentResponse[indexNoteGuidance].answer"
          />
        </div>
        <div class="my-10">
          <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl">
            Final counselor notes:
          </p>
          <input
            class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
            type="text"
            v-model="surveyStore.currentResponse[indexGuidanceFinalNote].answer"
          />
        </div>
      </div>

      <div class="flex justify-center mb-10 flex-col items-center">
        <p
          v-if="surveyStore.missingAnswers.length > 0"
          class="text-red-500 mb-4 text-center"
        >
          Please answer all required questions before submitting.
        </p>
        <p v-else class="mb-4 text-center">
          After finalizing this survey, the student will no longer be able to
          edit their survey
        </p>
        <button
          @click="submit()"
          class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-36 h-12 text-2xl font-bold text-[#37394F]"
        >
          Finalize
        </button>
      </div>
    </div>
  </section>
  <ScrollPage :guidance="true" />
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import BooleanComp from "../components/Survey/Boolean.vue";
import GeneralComp from "../components/Survey/SurveyGeneral.vue";
import CheckboxComp from "../components/Survey/SurveyCheckbox.vue";
import DropDownComp from "../components/Survey/SurveyDropdown.vue";
import DraggableComp from "../components/Survey/SurveyDraggable.vue";
import ScrollPage from "../components/Survey/ScrollPage.vue";
import { Question, GuidanceStudent } from "../types/interface";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { ref, watch, onMounted } from "vue";

document.title = "Survey | SITHS Course Selection";

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const router = useRouter();
const studentSurvey = ref<GuidanceStudent>({} as GuidanceStudent);

const studentName = ref("");

onMounted(async () => {
  try {
    if (surveyStore.currentSurvey) {
      studentSurvey.value = surveyStore.currentSurvey;
      studentName.value = surveyStore.name.replace(",", ", ");
    }
  } catch (error) {
    console.error("Error fetching survey data:", error);
  }
});

surveyStore.missingAnswers = [];
surveyStore.checkSurveyAnswers(surveyStore.currentResponse);

const indexAll = surveyStore.currentResponse.findIndex(
  (x) => x.id === "allChosenCourses"
);
const indexNoteGuidance = surveyStore.currentResponse.findIndex(
  (x) => x.id === "noteToGuidance"
);
const indexGuidanceFinalNote = surveyStore.currentResponse.findIndex(
  (x) => x.id === "guidanceFinalNote"
);

const getChoices = (question: Question) =>
  surveyStore.coursesAvailable.filter(
    (x) => x.subject === question.questionType
  );

const shouldWarn = ref(false);

const submit = async () => {
  if (surveyStore.missingAnswers.length > 0) {
    alert("Please answer all required questions before finalizing.");
    surveyStore.checkAnswers();
    shouldWarn.value = true;
    return;
  }
  if (userStore.isGuidance) return router.push("/guidance/studentlist");
  await surveyStore.submitSurvey();
  router.push("/student/dashboard");
};

onBeforeRouteLeave((to, from, next) => {
  if (surveyStore.checkAnswers() || to.path === "/guidance/dashboard") {
    window.removeEventListener("beforeunload", (e) => e.preventDefault());
    next();
    return;
  }
  const answer = window.confirm("Changes you made might not be saved.");
  if (answer) {
    window.removeEventListener("beforeunload", (e) => e.preventDefault());
    next();
  } else next(false);
});

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
