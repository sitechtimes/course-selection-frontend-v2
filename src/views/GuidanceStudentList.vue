<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
      <div class="w-1/3 flex flex-row justify-evenly">
        <div v-if="loading">Loading students...</div>
        <div
          @click="viewAll = !viewAll"
          class="h-10 px-4 w-60 mx-10 flex flex-row bg-primary-g text-black justify-evenly font-semibold items-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
        >
          <label class="cursor-pointer">View all students</label>
          <input class="ml-2" type="checkbox" v-model="viewAll" />
        </div>
        <Sort class="mr-0" @filter-selected="(filter) => (sortBy = filter)" />
      </div>
      <SearchBar
        class="w-2/3"
        type="text"
        v-model="input"
        placeholder="Search Students..."
      />
    </div>
    <StudentTable
      :viewall="viewAll"
      :new-students="sortedAndFilteredStudents.slice(startIndex, endIndex)"
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
        @click="updatePagination(n)"
        :class="{
          'bg-[#cdeeb4] focus:bg-[#cdeeb4]': currentPage === n,
          'bg-[#ebebeb]': currentPage !== n,
        }"
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
    <h5 class="mt-4">
      Page
      <span class="font-bold m-1"> {{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ totalPages }}</span>
    </h5>
  </div>
</template>

<script setup lang="ts">
import SearchBar from "../components/Guidance/SearchBar.vue";
import Sort from "../components/Guidance/SortButton.vue";
import StudentTable from "../components/Guidance/StudentTable.vue";
import { useUserStore } from "../stores/user";
import { GuidanceStudent } from "../types/interface";
import { ref, computed, watch } from "vue";

document.title = "Student List | SITHS Course Selection";

const userStore = useUserStore();
const allStudents = ref<GuidanceStudent[]>([]);

const loading = ref(false);
const viewAll = ref(false);
const input = ref("");
const sortBy = ref("lastnameaz");

const startIndex = ref(0);
const endIndex = ref(10);

const currentPage = ref(1);
const pageCapacity = 10;
const currentChunk = ref(1);
const pagesPerChunk = 10;

const sortedAndFilteredStudents = computed(() => {
  try {
    if (!viewAll.value)
      return applyFilters(allStudents.value, sortBy.value, input.value);
    return applyFilters(userStore.studentList, sortBy.value, input.value);
  } finally {
    updatePagination(1);
  }
});

function filterByCategory(students: GuidanceStudent[], sortBy: string) {
  console.log(sortBy);
  if (sortBy === "lastnameaz")
    return students.sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "lastnameza")
    return students.sort((a, b) => b.name.localeCompare(a.name));

  if (["Not Started", "In Progress", "Completed", "Finalized"].includes(sortBy))
    return students.filter((student) => student.status === sortBy);

  if (["9", "10", "11", "12"].includes(sortBy))
    return students.filter((student) => student.grade === parseInt(sortBy));

  if (["transfer", "regents", "sports", "enl"].includes(sortBy))
    return students.filter(
      (student) => student[sortBy as keyof GuidanceStudent]
    );
  return students;
}

function applyFilters(
  students: GuidanceStudent[],
  sortBy: string,
  search: string
) {
  const filtered = filterByCategory(students, sortBy);
  if (!search.length) return filtered;

  const lowerCaseQuery = search.toLowerCase();
  return filtered.filter(
    (student) =>
      student.name.toLowerCase().includes(lowerCaseQuery) ||
      student.email.toLowerCase().includes(lowerCaseQuery)
  );
}

function handleViewAllChange(isEnabled: boolean) {
  input.value = "";
  if (isEnabled) userStore.viewedStudents = allStudents.value;
  else userStore.viewedStudents = userStore.studentList;
  updatePagination(1);
}

const totalPages = computed(() => {
  const numStudents = sortedAndFilteredStudents.value.length;
  if (numStudents < 1) return 1;
  else return Math.ceil(numStudents / pageCapacity);
});

function changePage(increment: number) {
  currentPage.value += increment;
  if (increment > 0) {
    startIndex.value += pageCapacity;
    endIndex.value += pageCapacity;
  } else if (increment < 0) {
    startIndex.value -= pageCapacity;
    endIndex.value -= pageCapacity;
  } else return console.error("Invalid increment; Unable to change pages.");
  updatePagination(currentPage.value);
}

function updatePagination(page: number) {
  startIndex.value = (page - 1) * pageCapacity + 1;
  endIndex.value = page * pageCapacity;
  currentPage.value = page;
}

const totalChunks = computed(() => Math.ceil(totalPages.value / pagesPerChunk));

const visiblePages = computed(() => {
  const start = (currentChunk.value - 1) * pagesPerChunk + 1;
  const end = Math.min(start + pagesPerChunk - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }).map((_, i) => start + i);
});

watch(viewAll, (newValue) => handleViewAllChange(newValue));

watch(
  [sortedAndFilteredStudents],
  () => {
    userStore.viewedStudents = sortedAndFilteredStudents.value;
    currentChunk.value = 1;
    updatePagination(1);
  },
  { deep: true }
);
</script>
