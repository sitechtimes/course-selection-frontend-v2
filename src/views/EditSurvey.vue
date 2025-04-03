<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ course.name }}
        </h1>
      </div>
      <form
        class="m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
        @submit.prevent="
          () => {
            fetchData('/editcourse/', 'PUT', JSON.stringify(alteredCourse));
          }
        "
      >
        <div class="flex flex-col p-3" v-for="key in surveyKeys" :key="key">
          <label :for="key" class="text-2xl pb-1 font-bold">{{ key }}</label>
          <input
            type="text"
            v-model="alteredCourse[key]"
            :placeholder="survey[key]"
            :id="key"
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-if="
              survey[key] !== true &&
              survey[key] !== false &&
              key !== 'description'
            "
          />
          <textarea
            type="text"
            v-model="alteredSurvey[key]"
            :placeholder="survey[key]"
            :id="key"
            class="border-2 border-black rounded-lg p-2 mb-4 form-textarea textarea-xl"
            v-else-if="key == 'description'"
          />
          <select
            name=""
            id=""
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-else
            v-model="alteredCourse[key]"
          >
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
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

const alteredCourse = ref<Survey>({} as Survey);
const route = useRoute();
const surveyId = route.params.id;

function displayGrades(survey: Survey): string {
  const grades: string[] = [];
  if (survey.freshman) grades.push("Freshman");
  if (survey.sophomore) grades.push("Sophomore");
  if (survey.junior) grades.push("Junior");
  if (survey.senior) grades.push("Senior");
  return grades.join(", ");
}

async function fetchData(url: string, method?: string, body?: any) {
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options["method"] = method;
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = body;
  }
  return await fetch(import.meta.env.VITE_URL + url, options);
}

async function getCourse() {
  const response: Response = await fetchData("/surveys", "GET");
  if (response.status === 200) {
    const data = await response.json();
    return data.find((survey: Survey) => survey.id == surveyId);
  } else {
    throw new Error("Failed to fetch surveys");
  }
}

const survey = ref<Survey>({} as Survey);
let surveyKeys = [] as (keyof Survey)[];

onMounted(async () => {
  try {
    survey.value = await getsurvey();
    // Initialize alteredsurvey with a copy of the current survey data
    alteredSurvey.value = { ...survey.value };
    surveyKeys = Object.keys(survey.value).filter(
      (key) =>
        // Optionally filter out keys you don't want to edit
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