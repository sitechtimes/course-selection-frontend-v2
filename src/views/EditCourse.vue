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
          class="w-1/2 m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
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
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition"
              />
            </div>
            <textarea
              type="text"
              rows="12"
              v-model="alteredCourse[key]"
              :placeholder="course[key]"
              :id="key"
              class="border-2 border-black rounded-lg p-2 m-2 w-full hover:shadow-xl transition"
              v-else-if="key === 'description'"
            />
            <div
              class="flex items-center hover:shadow-xl w-min transition rounded-xl p-2 pl-3"
              v-else
            >
              <input
                type="checkbox"
                :id="key"
                v-model="alteredCourse[key]"
                class="form-checkbox h-5 w-5 text-secondary-g border-black rounded focus:ring-other-g focus:ring-offset-0 cursor-pointer transition"
              />
              <label :for="key" class="ml-2 text-lg">{{
                key[0].toUpperCase() + key.slice(1)
              }}</label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="p-5 border-2 border-black bg-white hover:bg-other-g ransition rounded-xl shadow-md mt-2"
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
