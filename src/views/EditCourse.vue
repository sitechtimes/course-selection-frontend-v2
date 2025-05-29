<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ course.name }}
        </h1>
      </div>
      <div class="flex justify-center">
        <form
          class="w-1/2 m-10 p-5 sm:m-0 sm:w-3/4 rounded-xl shadow-md bg-primary-g border-black border-2"
          @submit.prevent="
            () => {
              userStore.fetchData('guidance/editcourse/', 'PUT', alteredCourse);
              router.push('/guidance/courselist');
            }
          "
        >
          <div
            class="flex flex-col items-center"
            v-for="key in courseKeys"
            :key="key"
          >
            <label :for="key" class="text-2xl pb-1 font-bold"
              >{{ key[0].toUpperCase() + key.slice(1) }}
            </label>
            <div
              class="max-w-4xl"
              v-if="
                course[key] !== true &&
                course[key] !== false &&
                key !== 'description'
              "
            >
              <input
                type="text"
                v-model="alteredCourse[key]"
                :placeholder="String(course[key])"
                :id="key"
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              />
            </div>
            <textarea
              type="text"
              rows="12"
              v-model="alteredCourse[key]"
              :placeholder="course[key]"
              :id="key"
              class="border-2 border-black rounded-lg p-2 m-2 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              v-else-if="key === 'description'"
            />
          </div>
          <fieldset
            class="flex flex-row flex-wrap overflow-auto border-solid border-black rounded-xl border-2 p-2 mt-3"
          >
            <legend class="text-2xl font-bold text-center">
              Course Options
            </legend>
            <div
              v-for="bool in courseBools"
              :key="bool"
              class="items-center rounded-xl p-2 pl-3 pb-2 w-1/2"
            >
              <input
                type="checkbox"
                :id="bool"
                v-model="alteredCourse[bool]"
                class="text-secondary-g border-black rounded focus:ring-other-g focus:ring-offset-0 cursor-pointer mb-1"
              />
              <label :for="bool" class="ml-2 text-2xl transition sm:text-lg">{{
                bool[0].toUpperCase() + bool.slice(1)
              }}</label>
            </div>
          </fieldset>
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
import { Course } from "../types/interface";
import { useUserStore } from "../stores/user";

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
const courseBools = ref([] as (keyof Course)[]);
const alteredCourse = ref({} as Course);

onMounted(async () => {
  try {
    course.value = await findCourse();
    alteredCourse.value = await findCourse();
    document.title = `Editing ${course.value.name} | SITHS Course Selection`;
    courseKeys.value = Object.keys(course.value).filter(
      (key) =>
        course.value &&
        key !== "id" &&
        key !== "createdAt" &&
        typeof course.value[key as keyof Course] !== "boolean" &&
        typeof course.value[key as keyof Course] !== "object"
    ) as (keyof Course)[];
    courseBools.value = Object.keys(course.value).filter(
      (key) =>
        course.value &&
        key !== "id" &&
        key !== "createdAt" &&
        typeof course.value[key as keyof Course] === "boolean" &&
        typeof course.value[key as keyof Course] !== "object"
    ) as (keyof Course)[];
  } catch (error) {
    console.error(error);
  }
});
</script>
