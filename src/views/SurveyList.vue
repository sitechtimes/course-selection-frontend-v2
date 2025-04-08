<template>
  <Suspense>
    <template #fallback>
      <div
        class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl font-bold"
      >
        Loading...
      </div>
    </template>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10"
    >
      <RouterLink
        v-for="survey in surveys"
        :key="survey.grade"
        :to="'/guidance/editsurvey/' + survey.grade"
        class="bg-primary-g border-black border-2 drop-shadow-lg rounded-lg p-6 hover:drop-shadow-xl hover:bg-other-g transition-all duration-300"
      >
        <h2 class="text-2xl font-bold">{{ survey.grade }}th Grade</h2>
      </RouterLink>
    </div>
  </Suspense>
</template>
  
  <script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { Survey } from '../types/interface'

async function fetchData(url: string, method?: string, body?: any) {
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options["method"] = method;
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = JSON.stringify(body);
  }
  return await fetch(import.meta.env.VITE_URL + url, options);
}

async function getSurveys() {
  const response: Response = await fetchData("guidance/survey", "GET");
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch courses");
  }
}

const surveys = ref<Survey[]>([]);

onMounted(async () => {
  try {
    surveys.value = await getSurveys();
  } catch (error) {
    console.error(error);
  }
});

document.title = "Course List | SITHS Course Selection";
</script>