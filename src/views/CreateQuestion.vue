<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">New Question</h1>
      </div>
      <div class="flex justify-center">
        <form
          class="w-1/2 m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
          @submit.prevent="
            () => {
              userStore.createQuestion(newQuestion);
              router.push('/guidance/surveylist');
            }
          "
        >
          <div class="flex flex-col items-center">
            <div class="max-w-4xl">
              <input
                type="text"
                v-model="newQuestion.question"
                placeholder="Question Text"
                id="text"
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              />

              <select
                class="border-2 border-black rounded-lg p-3 pr-8 text-left mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
                v-model="newQuestion.status"
              >
                <option
                  v-for="option in potentialOptions['status']"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <select
                class="border-2 border-black rounded-lg p-3 pr-8 text-left mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
                v-model="newQuestion.questionType"
              >
                <option
                  v-for="option in potentialOptions['questionType']"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <select
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
                v-model="newQuestion.classReferenced"
              >
                <option :value="null">n/a</option>
                <option
                  v-for="course in courses"
                  :key="course.id"
                  :value="course.id"
                >
                  {{ course.name }}
                </option>
              </select>
            </div>
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
import { Question, Course } from "../types/interface";
import { useUserStore } from "../stores/user";
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const courses = ref([] as Course[]);
const newQuestion = ref({} as Question);
const potentialOptions = ref({
  questionType: [
    "FINAL",
    "GENERAL",
    "BOOLEAN",
    "DROPDOWN",
    "ENGLISH",
    "SS",
    "MATH",
    "SCIENCE",
    "LANG",
    "TECH",
    "ART",
    "PE",
  ] as Question["questionType"][],
  status: ["OPTIONAL", "STANDARD", "CLASS"] as Question["status"][],
});

onMounted(async () => {
  courses.value = await userStore.getCourses();
});
</script>
