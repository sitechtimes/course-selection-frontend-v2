<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ course.name }}
        </h1>
      </div>
      <form>
        <div class="flex flex-col" v-for="key in courseKeys" :key="key">
          <label :for="course[key]">{{ key }}</label>
          <input
            type="text"
            v-model="alteredCourse[key]"
            :placeholder="course[key]"
            :id="course[key]"
            class="border-2 border-black rounded-lg p-2 mb-4"
          />
        </div>
      </form>
    </div>
  </Suspense>
</template>
    
    <script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

const alteredCourse = ref<Course>({} as Course);

const route = useRoute();
const courseId = route.params.id;

function displayGrades(course: Course): string {
  const grades: string[] = [];

  if (course.freshman) grades.push("Freshman");
  if (course.sophomore) grades.push("Sophomore");
  if (course.junior) grades.push("Junior");
  if (course.senior) grades.push("Senior");

  return grades.join(", ");
}

async function fetchData(url: string, method?: string, body?: any) {
  const options: RequestInit = { credentials: "include" };
  if (method) {
    options["method"] = method;
    options["headers"] = { "Content-Type": "application/json" };
    options["body"] = JSON.stringify(body);
  }
  return await fetch(import.meta.env.VITE_URL + url, options);
}

async function getCourse() {
  const response: Response = await fetchData("/course", "GET");
  if (response.status === 200) {
    const data = await response.json();
    return data.find((course: Course) => course.id == courseId);
  } else {
    throw new Error("Failed to fetch courses");
  }
}

const course = ref<Course>({} as Course);
let courseKeys = [] as (keyof Course)[];

onMounted(async () => {
  try {
    course.value = await getCourse();
    courseKeys = Object.keys(course.value) as (keyof Course)[];
  } catch (error) {
    console.error(error);
  }
});

document.title = "Course List | SITHS Course Selection";
</script>