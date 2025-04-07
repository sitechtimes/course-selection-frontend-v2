<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ survey.grade }}
        </h1>
      </div>
      <form
        class="m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
        @submit.prevent="
          () => {
            fetchData('/guidance/editsurvey/', 'PUT', JSON.stringify(alteredSurvey));
          }
        "
      >
        <div class="flex flex-col p-3" v-for="key in surveyKeys" :key="key">
          <label :for="key" class="text-2xl pb-1 font-bold">{{ key }}</label>
          <input
            type="text"
            v-model="alteredSurvey[key]"
            :placeholder="survey[key]"
            :id="key"
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-if="survey[key] == 'grade'"
          />
<!--           <select
            name=""
            id=""
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-else
            v-model="alteredSurvey[key]"
          >
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select> -->
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
import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const alteredSurvey = ref<Survey>({} as Survey);
const route = useRoute();
const surveyGrade = route.params.grade;


async function fetchData(url: string, method?: string, body?: any) {
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options["method"] = method;
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = JSON.stringify(body);
  }
  return await fetch(import.meta.env.VITE_URL + url, options);
}

async function getSurvey() {
  const response: Response = await fetchData("guidance/survey", "GET");
  if (response.status === 200) {
    const data = await response.json();
    console.log(data, surveyGrade);
    return data.find((survey: Survey) => survey.grade == surveyGrade);
  } else {
    throw new Error("Failed to fetch surveys");
  }
}

const survey = ref<Survey>({} as Survey);
let surveyKeys = [] as (keyof Survey)[];

onMounted(async () => {
  try {
    survey.value = await getSurvey();
    console.log(survey.value.surveyGrade);
    alteredSurvey.value = { ...survey.value };
    surveyKeys = Object.keys(survey.value).filter(
      (key) =>
        key !== "id" &&
        key !== "createdAt" &&
        typeof survey.value[key] !== "object"
    ) as (keyof Survey)[];
  } catch (error) {
    console.error(error);
  }
});

document.title = "Course List | SITHS Course Selection";
</script>