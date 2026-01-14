<template>
  <Suspense>
    <div class="mt-6 flex justify-center">
      <div class="w-5/6 max-w-4xl">
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-semibold text-gray-800">
            New Question
          </h1>
          <p class="text-gray-500 mt-1">
            Add a question to the survey
          </p>
        </div>

        <form class="bg-primary-g border border-gray-300 rounded-xl shadow-sm p-8" @submit.prevent="
          () => {
            userStore.createQuestion(newQuestion);
            router.push('/guidance/surveylist');
          }
        ">
          <div class="grid grid-cols-1 gap-6">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input v-model="newQuestion.question" type="text" placeholder="Enter question text" class="w-full rounded-lg border border-gray-300 p-3
                       focus:outline-none focus:ring-2 focus:ring-primary-g
                       focus:border-primary-g transition" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select v-model="newQuestion.status" class="w-full rounded-lg border border-gray-300 p-3
                       focus:outline-none focus:ring-2 focus:ring-primary-g
                       focus:border-primary-g transition">
                <option v-for="option in potentialOptions.status" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <select v-model="newQuestion.questionType" class="w-full rounded-lg border border-gray-300 p-3
                       focus:outline-none focus:ring-2 focus:ring-primary-g
                       focus:border-primary-g transition">
                <option v-for="option in potentialOptions.questionType" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Class (optional)
              </label>
              <select v-model="newQuestion.classReferenced" class="w-full rounded-lg border border-gray-300 p-3
                       focus:outline-none focus:ring-2 focus:ring-primary-g
                       focus:border-primary-g transition">
                <option :value="null">Not applicable</option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button type="submit" class="px-6 py-3 rounded-lg font-semibold
                     bg-white text-black
                     hover:bg-tertiary-g/100 transition">
              Create Question
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
