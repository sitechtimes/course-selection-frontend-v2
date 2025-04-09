<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ survey.grade }}th Grade
        </h1>
      </div>
      <form
        class="m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
        @submit.prevent="
          () => {
            const isoString = new Date(`${dueDateDate}T${dueDateTime}`).toISOString();
            alteredSurvey.dueDate = isoString;
            fetchData('guidance/editsurvey/', 'PUT', JSON.stringify(alteredSurvey));
            router.push(`/guidance/surveylist`);
          }
        "
      >
      <div class="flex flex-col p-3">
  <label class="text-2xl pb-1 font-bold" for="dueDate">Due Date</label>
  <input
    type="date"
    v-model="dueDateDate"
    id="dueDate"
    class="border-2 border-black rounded-lg p-2 mb-4"
  />
  <input
    type="time"
    v-model="dueDateTime"
    class="border-2 border-black rounded-lg p-2 mb-4"
  />
</div>
          <div
          class="flex flex-col p-3"
          v-for="(questionObj, index) in alteredSurvey.questions"
          :key="questionObj.id"
        >
          <label :for="`question-${index}`" class="text-2xl pb-1 font-bold">
            Question {{ index + 1 }}
          </label>
          <input
            type="text"
            v-model="alteredSurvey.questions[index].question"
            :id="`question-${index}`"
            class="border-2 border-black rounded-lg p-2 mb-4"
          />
        </div>
        <div>
          <button class="p-5 border-2 border-black bg-white hover:bg-other-g">
            Submit
          </button>
        </div>
      </form>
    </div>
  </Suspense>
</template>
     
  <script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {Survey} from '../types/interface';
const alteredSurvey = ref<Survey>({} as Survey);
const router = useRouter();
const route = useRoute();
const surveyGrade = route.params.grade;
const dueDateDate = ref("");
const dueDateTime = ref("");

async function fetchData(url: string, method?: string, body?: any) {
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options["method"] = method;
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = body
  }
  return await fetch(import.meta.env.VITE_URL + url, options);
}

async function getSurvey() {
  const response: Response = await fetchData("guidance/survey", "GET");
  if (response.status === 200) {
    const data = await response.json();
    return data.find((survey: Survey) => survey.grade == Number(surveyGrade));
  } else {
    throw new Error("Failed to fetch surveys");
  }
}

const survey = ref<Survey>({} as Survey);
let surveyKeys = [] as (keyof Survey)[];

onMounted(async () => {
  try {
    survey.value = await getSurvey();
    alteredSurvey.value = { ...survey.value };
    surveyKeys = Object.keys(survey.value).filter(
      (key) =>
        key !== "id" &&
        key !== "createdAt" &&
        typeof survey.value[key as keyof Survey] !== "object"
    ) as (keyof Survey)[];
    const originalDate = new Date(alteredSurvey.value.dueDate);
    dueDateDate.value = originalDate.toISOString().split("T")[0]; // YYYY--MM--DD
    dueDateTime.value = originalDate.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
  } catch (error) {
    console.error(error);
  }
});

document.title = "Course List | SITHS Course Selection";
</script>