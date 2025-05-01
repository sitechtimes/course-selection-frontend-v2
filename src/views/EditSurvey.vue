<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          Editing the {{ survey.grade }}th Grade Survey
        </h1>
      </div>
      <div class="justify-center flex">
        <form
          class="m-10 p-8 w-1/2 rounded-xl shadow-md bg-primary-g border-black border-2"
          @submit.prevent="
            () => {
              const isoString = `${dueDateDate}T${dueDateTime}`;
              alteredSurvey.dueDate = isoString;
              userStore.fetchData('guidance/editsurvey/', 'PUT', alteredSurvey);
              router.push('/guidance/surveylist');
            }
          "
        >
          <div class="flex flex-col items-center">
            <label for="dueDate" class="text-2xl pb-1 font-bold"
              >Due Date</label
            >
            <input
              type="date"
              v-model="dueDateDate"
              id="dueDate"
              class="border-2 border-black rounded-lg p-2 mb-4 hover:shadow-xl transition"
            />
            <label for="dueTime" class="text-2xl pb-1 font-bold"
              >Due Time</label
            >
            <input
              type="time"
              v-model="dueDateTime"
              id="dueTime"
              class="border-2 border-black rounded-lg p-2 mb-4 hover:shadow-xl transition"
            />
          </div>
          <div
            class="flex flex-col items-center"
            v-for="(questionObj, index) in alteredSurvey.questions"
            :key="questionObj.id"
          >
            <label
              :for="`question-${index}`"
              class="text-2xl pb-1 pt-1 font-bold mt-2"
            >
              Question {{ index + 1 }}
            </label>
            <textarea
              type="text"
              rows="5"
              v-model="alteredSurvey.questions[index].question"
              :placeholder="survey.questions[index].question"
              :id="`question-${index}`"
              class="border-2 border-black rounded-lg p-2 m-2 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
            />
          </div>
          <div>
            <button
              type="submit"
              class="p-5 border-2 border-black bg-white hover:bg-tertiary-g transition rounded-xl shadow-md mt-5 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Survey } from "../types/interface";
import { useUserStore } from "../stores/user";

document.title = "Course List | SITHS Course Selection";

const router = useRouter();
const route = useRoute();
const surveyGrade = route.params.grade;
const dueDateDate = ref("");
const dueDateTime = ref("");
const userStore = useUserStore();

async function findSurvey() {
  const surveys = await userStore.getSurveys();
  return surveys.find((survey: Survey) => survey.grade === Number(surveyGrade));
}

const survey = ref<Survey>({} as Survey);
const alteredSurvey = ref<Survey>({} as Survey);
onMounted(async () => {
  try {
    survey.value = await findSurvey();
    alteredSurvey.value = await findSurvey();
    const originalDate = alteredSurvey.value.dueDate;
    dueDateDate.value = originalDate.split("T")[0]; // YYYY--MM--DD
    dueDateTime.value = originalDate.split("T")[1].substring(0, 5); // HH:MM., stripped timezone
  } catch (error) {
    console.error(error);
  }
});
</script>
