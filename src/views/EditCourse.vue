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
            userStore.fetchData('guidance/editcourse/', 'PUT', alteredCourse);
          }
        "
      >
        <div class="flex flex-col p-3" v-for="key in courseKeys" :key="key">
          <label :for="key" class="text-2xl pb-1 font-bold">{{ key }}</label>
          <input
            type="text"
            v-model="alteredCourse[key]"
            :placeholder="String(course[key])"
            :id="key"
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-if="
              course[key] !== true &&
              course[key] !== false &&
              key !== 'description'
            "
          />
          <textarea
            type="text"
            v-model="alteredCourse[key]"
            :placeholder="course[key]"
            :id="key"
            class="border-2 border-black rounded-lg p-2 mb-4 form-textarea textarea-xl"
            v-else-if="key === 'description'"
          />
          <select
            id="key"
            class="border-2 border-black rounded-lg p-2 mb-4"
            v-else
            v-model="alteredCourse[key]"
          >
            <option :value="true">True</option>
            <option :value="false">False</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            class="p-5 border-2 border-black bg-white hover:bg-other-g"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Course } from "../types/interface";
import { useUserStore } from "../stores/user";

document.title = "Course List | SITHS Course Selection";

const alteredCourse = computed(() => course.value || ({} as Course));
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const courseId = route.params.id;

async function findCourse() {
  const courses = await userStore.getCourses();
  return courses.find((course: Course) => course.id === Number(courseId));
}

const course = ref({} as Course);
const courseKeys = ref([] as (keyof Course)[]);

onMounted(async () => {
  try {
    course.value = await findCourse();
    courseKeys.value = Object.keys(course.value).filter(
      (key) =>
        course.value &&
        key !== "id" &&
        key !== "createdAt" &&
        typeof course.value[key as keyof Course] !== "object"
    ) as (keyof Course)[];
  } catch (error) {
    console.error(error);
  }
});
</script>
