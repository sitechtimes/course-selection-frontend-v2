<template>
  <section class="flex justify-center items-center flex-col">
    <div class="lg:w-2/3 w-11/12">
      <div
        v-for="question in surveyStore.survey.questions"
        :key="question.id"
        class="flex justify-center mb-8"
      >
        <div class="flex flex-col w-11/12">
          <SurveyBoolean
            v-if="question.questionType === 'BOOLEAN'"
            :question="question"
            :finalID="finalID"
            :warn="surveyStore.missingAnswers.includes(question.id) && warning"
          />
          <SurveyGeneral
            v-else-if="question.questionType === 'GENERAL'"
            :question="question"
            :warn="surveyStore.missingAnswers.includes(question.id) && warning"
          />
          <SurveyDropdown
            v-else-if="question.questionType === 'DROPDOWN'"
            :question="question"
            :warn="surveyStore.missingAnswers.includes(question.id) && warning"
          />
          <div v-else-if="question.questionType === 'FINAL'" class="my-6">
            <p class="text-lg xl:leading-10 md:text-xl xl:text-3xl my-4">
              For the final part of the survey, please drag your classes in the
              order of priority, with the first choice being your top priority.
            </p>
            <SurveyDraggable
              :courses="finalCourses"
              :numbered="true"
              :answer="(surveyStore.answers[finalID] as Answer<Rank[]>)"
              color="D6EEFF"
            />
          </div>
          <SurveyCheckbox
            v-else
            :finalID="finalID"
            :question="question"
            :choices="
              surveyStore.coursesAvailable.filter(
                (x) => x.subject === question.questionType
              )
            "
            color="D6EEFF"
            :warn="surveyStore.missingAnswers.includes(question.id) && warning"
          />
        </div>
      </div>
      <div class="mb-8 w-full block ml-12" v-if="userStore.isGuidance">
        <button
          @click="shownote = !shownote"
          class="xl:leading-10 md:text-xl xl:text-2xl my-4 block border px-4 text-sm font-semibold bg-[#D6EEFF] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] h-12 text-[#37394F] transition rounded-md"
        >
          {{ shownote ? "Hide" : "Show" }} Guidance Note
        </button>
        <textarea
          v-show="shownote"
          placeholder="Notes for guidance counselors (optional)"
          class="py-2 px-3 w-[90%] text-base md:text-lg xl:text-2xl rounded-md border border-solid focus:outline-none focus:ring-0 disabled:bg-gray-100 transition-colors duration-200 ease-linear focus:border-blue-400 border-zinc-400 bg-transparent block h-[10rem]"
          v-model="surveyStore.survey.guidanceNotes"
        ></textarea>
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
import { Question, Course, Rank, Answer } from "../types/interface";
import SurveyDraggable from "../components/Survey/Draggable.vue";
import SurveyCheckbox from "../components/Survey/Checkbox.vue";
import SurveyDropdown from "../components/Survey/Dropdown.vue";
import SurveyBoolean from "../components/Survey/Boolean.vue";
import SurveyGeneral from "../components/Survey/General.vue";
import ScrollPage from "../components/Survey/ScrollPage.vue";
import { useSurveyStore } from "../stores/survey";
import { onBeforeRouteLeave } from "vue-router";
import { useUserStore } from "../stores/user";
import { watch, ref } from "vue";

document.title = "Survey | SITHS Course Selection";

const surveyStore = useSurveyStore();
const userStore = useUserStore();

surveyStore.missingAnswers = [];
surveyStore.checkAnswers();

const allCoursesQuestion = surveyStore.survey.questions.find(
  (entry) => entry.questionType === "FINAL"
) as Question;

const finalID = surveyStore.answers.findIndex(
  (entry) => entry.question === allCoursesQuestion.id
) as number;

const warning = ref(false);
const shownote = ref(false);
const finalCourses = ref<Course[]>(
  (surveyStore.answers[finalID].answer as Rank[]).map(
    (a) =>
      surveyStore.selectedCourses.find(({ id }) => id === a.course) as Course
  )
);

function submit() {
  surveyStore.checkAnswers();
  if (!surveyStore.missingAnswers.length) return surveyStore.saveSurvey(1);
  warning.value = true;
  userStore.setPopup(
    "Please answer all required questions before submitting.",
    true
  );
}

onBeforeRouteLeave((to, from, next) => {
  if (
    surveyStore.changes.length === 0 ||
    to.path === "/student/survey/review"
  ) {
    window.removeEventListener("beforeunload", (e) => e.preventDefault());
    return next();
  }
  const save = window.confirm("Changes you made might not be saved.");
  if (!save) return next(false);
  window.removeEventListener("beforeunload", (e) => e.preventDefault());
  next();
});

watch(
  () => surveyStore.answers,
  () => {
    surveyStore.checkAnswers();
    if (surveyStore.changes.length === 0)
      window.removeEventListener("beforeunload", (e) => e.preventDefault());
    else window.addEventListener("beforeunload", (e) => e.preventDefault());
  },
  { deep: true }
);

watch(
  () => [surveyStore.answers[finalID], surveyStore.selectedCourses],
  () => {
    finalCourses.value = (surveyStore.answers[finalID].answer as Rank[]).map(
      (a) =>
        surveyStore.selectedCourses.find(({ id }) => id === a.course) as Course
    );
  }
);
</script>
