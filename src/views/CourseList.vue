<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
      <div class="w-1/3 flex flex-row justify-evenly">
        <Sort
          class="mr-0"
          :menu-array="menuArray"
          @filter-selected="(filter) => (sortBy = filter)"
        />
      </div>
      <div class="w-2/3">
        <div class="border-white flex justify-center items-center">
          <div class="flex justify-center items-center relative w-11/12">
            <input
              v-model="input"
              placeholder="Search by name"
              class="border border-zinc-300 rounded w-full h-10 p-2 text-zinc-800"
            />
            <p class="absolute right-3 text-zinc-400 cursor-pointer text-xl">
              🔎︎
            </p>
          </div>
        </div>
      </div>
    </div>
    <CourseTable
      :courses="sortedAndFiltered.slice(startIndex, startIndex + pageCapacity)"
    />
    <div class="max-w-[80%] overflow-x-auto mt-4 flex flex-row justify-between">
      <button
        v-if="currentChunk > 1"
        class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="if (currentChunk > 1) currentChunk--;"
      >
        ❮❮
      </button>
      <button
        class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="changePage(-1)"
        :disabled="currentPage === 1"
      >
        ❮
      </button>
      <button
        v-for="n in visiblePages"
        :key="n"
        @click="updatePagination(n)"
        :class="
          currentPage === n ? 'bg-[#cdeeb4] focus:bg-[#cdeeb4]' : 'bg-[#ebebeb]'
        "
        class="h-8 w-8 rounded-lg hover:opacity-75 ease-in-out duration-300 font-bold mx-2"
      >
        {{ n }}
      </button>
      <button
        class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        :disabled="currentPage === totalPages"
        @click="changePage(1)"
      >
        ❯
      </button>
      <button
        v-if="currentChunk < totalChunks"
        class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="if (currentChunk < totalChunks) currentChunk++;"
      >
        ❯❯
      </button>
    </div>
    <p class="mt-4">
      Page
      <span class="font-bold m-1"> {{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ totalPages }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import CourseTable from "../components/Guidance/CourseTable.vue";
import Sort from "../components/Guidance/SortButton.vue";
import { Course } from "../types/interface";
import { useUserStore } from "../stores/user";
import { ref, computed, onMounted } from "vue";
import { SortArray } from "../types/interface";
document.title = "Course List | SITHS Course Selection";

const userStore = useUserStore();
const courses = ref<Course[]>([]);
const input = defineModel<string>();
const sortBy = ref<(typeof menuArray)[number]["sortBy"]>("az");
const startIndex = ref(0);
const currentPage = ref(1);
const pageCapacity = 10;
const currentChunk = ref(1);
const pagesPerChunk = 10;
const menuArray = [
  { sortBy: "az", text: "Alphabetical (A-Z)" },
  { sortBy: "za", text: "Alphabetical (Z-A)" },
  { sortBy: "freshman", text: "Grade 9" },
  { sortBy: "sophomore", text: "Grade 10" },
  { sortBy: "junior", text: "Grade 11" },
  { sortBy: "senior", text: "Grade 12" },
  { sortBy: "ap", text: "AP" },
  { sortBy: "honors", text: "Honors" },
] as SortArray[];

onMounted(async () => {
  try {
    courses.value = await userStore.getCourses();
  } catch (error) {
    console.error(error);
  }
});

const sortedAndFiltered = computed(() => {
  updatePagination(1);
  return applyFilters(sortBy.value, input.value ?? "");
});

function filterByCategory(courses: Course[], sortBy: string) {
  if (sortBy === "az")
    return courses.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "za")
    return courses.sort((a, b) => b.name.localeCompare(a.name));
  if (["freshman", "sophomore", "junior", "senior"].includes(sortBy))
    return courses.filter((course) => course[sortBy as keyof Course] === true);
  if (sortBy === "honors" || sortBy === "ap") {
    return courses.filter((course) => course[sortBy] === true);
  }

  return courses;
}

function applyFilters(sortBy: string, search: string) {
  startIndex.value = 0;
  const filtered = courses.value ? filterByCategory(courses.value, sortBy) : [];
  if (!search || !search.trim().length) return filtered;
  return filtered.filter(({ name }) =>
    name.toLowerCase().includes(search.trim().toLowerCase())
  );
}

const totalPages = computed(() => {
  const numCourses = sortedAndFiltered.value.length;
  return numCourses < 1 ? 1 : Math.ceil(numCourses / pageCapacity);
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

/* watch(viewAll, (newValue) => {
  input.value = "";
  if (newValue) userStore.viewedStudents = courses.value;
  else userStore.viewedStudents = userStore.studentList;
  updatePagination(1);
});

watch(sortedAndFiltered, () => {
  userStore.viewedStudents = sortedAndFiltered.value;
  currentChunk.value = 1;
  updatePagination(1);
}); */
</script>
