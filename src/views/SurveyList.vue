<template>
  <Suspense>
    <template #fallback>
      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
        Loading...
      </div>
    </template>

    <div class="flex gap-4 p-10 m-10 justify-center flex-wrap">
      <RouterLink v-for="survey in surveys" :key="survey.grade" :to="'/guidance/editsurvey/' + survey.grade" class="bg-primary-g text-gray-900
               border border-gray-300 rounded-xl p-6 shadow-sm
               hover:bg-tertiary-g transition">
        <h1 class="text-2xl font-bold">
          {{ survey.grade }}th Grade
        </h1>
      </RouterLink>
    </div>
  </Suspense>

  <div class="w-full flex flex-col items-center mb-10">

    <div class="w-5/6 max-w-8xl mx-auto mb-6 flex flex-wrap items-center gap-4">

      <div class="flex items-center gap-4 flex-shrink-0">
        <Sort :menu-array="menuArray" @filter-selected="(filter) => (sortBy = filter)" class="min-w-[180px]" />

        <RouterLink to="/guidance/createquestion" class="inline-flex items-center gap-2 px-4 h-10 rounded-lg
             bg-primary-g text-gray-900 font-semibold
             border border-gray-300
             hover:bg-tertiary-g transition">
          + New Question
        </RouterLink>
      </div>

      <div class="relative flex-1">
        <input v-model="input" placeholder="Search questions..." class="w-full h-10 pl-10 pr-3 rounded-lg
             border border-gray-300 text-gray-700
             focus:outline-none focus:ring-2 focus:ring-primary-g" />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔎︎
        </span>
      </div>

    </div>

    <QuestionsTable :questions="sortedAndFiltered.slice(startIndex, startIndex + pageCapacity)" />

    <div class="max-w-[80%] overflow-x-auto mt-4 flex flex-row justify-between">
      <button v-if="currentChunk > 1" class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="if (currentChunk > 1) currentChunk--;">
        ❮❮
      </button>

      <button class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" @click="changePage(-1)"
        :disabled="currentPage === 1">
        ❮
      </button>

      <button v-for="n in visiblePages" :key="n" @click="updatePagination(n)" :class="currentPage === n
        ? 'bg-[#cdeeb4] focus:bg-[#cdeeb4]'
        : 'bg-[#ebebeb]'" class="h-8 w-8 rounded-lg hover:opacity-75
               ease-in-out duration-300 font-bold mx-2">
        {{ n }}
      </button>

      <button class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" :disabled="currentPage === totalPages"
        @click="changePage(1)">
        ❯
      </button>

      <button v-if="currentChunk < totalChunks" class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="if (currentChunk < totalChunks) currentChunk++;">
        ❯❯
      </button>
    </div>

    <p class="mt-4">
      Page
      <span class="font-bold m-1">{{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ totalPages }}</span>
    </p>

  </div>
</template>

<script setup lang="ts">
import QuestionsTable from "../components/Guidance/QuestionsTable.vue";
import Sort from "../components/Guidance/SortButton.vue";
import { RouterLink } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { Survey, Question, SortArray } from "../types/interface";
import { useUserStore } from "../stores/user";

const input = defineModel<string>();
const startIndex = ref(0);
const currentPage = ref(1);
const pageCapacity = 10;
const currentChunk = ref(1);
const pagesPerChunk = 10;
const userStore = useUserStore();
const menuArray = [
  { sortBy: "az", text: "Alphabetical (A-Z)" },
  { sortBy: "za", text: "Alphabetical (Z-A)" },
  { sortBy: "id", text: "Numerical" },
] as SortArray[];
const surveys = ref<Survey[]>([]);
const questions = ref<Question[]>([]);
const sortBy = ref<(typeof menuArray)[number]["sortBy"]>("id");

onMounted(async () => {
  try {
    surveys.value = await userStore.getSurveys();
    questions.value = await userStore.getQuestions();
  } catch (error) {
    console.error(error);
  }
});

const sortedAndFiltered = computed(() => {
  updatePagination(1);
  return applyFilters(sortBy.value, input.value ?? "");
});

function filterByCategory(questions: Question[], sortBy: string) {
  if (sortBy === "az")
    return questions.sort((a, b) => a.question.localeCompare(b.question));
  if (sortBy === "za")
    return questions.sort((a, b) => b.question.localeCompare(a.question));
  if (sortBy === "id") return questions.sort((a, b) => a.id - b.id);
  return questions;
}
function applyFilters(sortBy: string, search: string) {
  startIndex.value = 0;
  const filtered = questions.value
    ? filterByCategory(questions.value, sortBy)
    : [];
  if (!search || !search.trim().length) return filtered;
  return filtered.filter(({ question }) =>
    question.toLowerCase().includes(search.trim().toLowerCase())
  );
}

const totalPages = computed(() => {
  const numQuestions = sortedAndFiltered.value.length;
  return numQuestions < 1 ? 1 : Math.ceil(numQuestions / pageCapacity);
});

function changePage(increment: number) {
  currentPage.value += increment;
  if (increment > 0) startIndex.value += pageCapacity;
  startIndex.value += increment * pageCapacity;
  updatePagination(currentPage.value);
}

function updatePagination(page: number) {
  startIndex.value = (page - 1) * pageCapacity;
  currentPage.value = page;
}

const totalChunks = computed(() => Math.ceil(totalPages.value / pagesPerChunk));

const visiblePages = computed(() => {
  const start = (currentChunk.value - 1) * pagesPerChunk + 1;
  const end = Math.min(start + pagesPerChunk - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>
