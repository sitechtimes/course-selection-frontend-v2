<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">

    <div class="w-5/6 max-w-8xl mx-auto mb-6 flex flex-wrap items-center gap-4">

      <div class="flex items-center gap-4 flex-shrink-0">

        <div @click="viewAll = !viewAll" class="flex items-center gap-2 px-4 h-10 rounded-lg
                 bg-primary-g text-gray-900 font-semibold
                 cursor-pointer shadow-sm
                 hover:bg-tertiary-g transition">
          <label class="cursor-pointer">View all students</label>
          <input type="checkbox" v-model="viewAll" class="w-4 h-4" />
        </div>

        <Sort :menu-array="menuArray" @filter-selected="(filter: string) => (sortBy = filter)" class="min-w-[180px]" />

      </div>

      <div class="relative flex-1">
        <input v-model="input" placeholder="Search by name or email"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" class="w-full h-10 pl-10 pr-3 rounded-lg
         border border-gray-300 text-gray-700
         focus:outline-none focus:ring-2 focus:ring-primary-g" />

        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔎︎
        </span>
      </div>

    </div>

    <StudentTable :viewAll="viewAll" :new-students="sortedAndFiltered.slice(startIndex, startIndex + pageCapacity)" />

    <div class="max-w-[80%] overflow-x-auto mt-4 flex flex-row justify-between">
      <button v-if="currentChunk > 1" class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="if (currentChunk > 1) currentChunk--;">
        ❮❮
      </button>
      <button class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" @click="changePage(-1)"
        :disabled="currentPage === 1">
        ❮
      </button>
      <button v-for="n in visiblePages" :key="n" @click="updatePagination(n)"
        :class="currentPage === n ? 'bg-[#cdeeb4] focus:bg-[#cdeeb4]' : 'bg-[#ebebeb]'"
        class="h-8 w-8 rounded-lg hover:opacity-75 ease-in-out duration-300 font-bold mx-2">
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

    <h5 class="mt-4">
      Page
      <span class="font-bold m-1">{{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ totalPages }}</span>
    </h5>

  </div>
</template>

<script setup lang="ts">
import StudentTable from "../components/Guidance/StudentTable.vue";
import Sort from "../components/Guidance/SortButton.vue";
import { GuidanceStudent } from "../types/interface";
import { useUserStore } from "../stores/user";
import { ref, computed, watch } from "vue";

document.title = "Student List | SITHS Course Selection";

const userStore = useUserStore();

const viewAll = ref(false);
const input = ref("");
const sortBy = ref("az");

const startIndex = ref(0);

const currentPage = ref(1);
const pageCapacity = 10;
const currentChunk = ref(1);
const pagesPerChunk = 10;
const menuArray = [
  { sortBy: "az", text: "Last Name (A-Z)" },
  { sortBy: "za", text: "Last Name (Z-A)" },
  { sortBy: "Not Started", text: "Not Started" },
  { sortBy: "In Progress", text: "In Progress" },
  { sortBy: "Completed", text: "Completed" },
  { sortBy: "Finalized", text: "Finalized" },
  { sortBy: "9", text: "Grade 9" },
  { sortBy: "10", text: "Grade 10" },
  { sortBy: "11", text: "Grade 11" },
  { sortBy: "12", text: "Grade 12" },
  { sortBy: "transfer", text: "Transfer" },
  { sortBy: "regents", text: "Missing Regents" },
  { sortBy: "sports", text: "Sports Team" },
  { sortBy: "enl", text: "ENL" },
  { sortBy: "ib", text: "IB" },
];
const sortedAndFiltered = computed(() => {
  updatePagination(1);
  return applyFilters(sortBy.value, input.value);
});

function getLastName(name: string) {
  return name.trim().split(/\s+/).slice(-1)[0].toLowerCase();
}

function getFirstName(name: string) {
  return name.trim().split(/\s+/).slice(0, -1).join(" ").toLowerCase();
}

function filterByCategory(students: GuidanceStudent[], sortBy: string) {
  if (sortBy === "az")
    return [...students].sort((a, b) => {
      const lastCompare =
        getLastName(a.name).localeCompare(getLastName(b.name));
      return lastCompare !== 0
        ? lastCompare
        : getFirstName(a.name).localeCompare(getFirstName(b.name));
    });

  if (sortBy === "za")
    return [...students].sort((a, b) => {
      const lastCompare =
        getLastName(b.name).localeCompare(getLastName(a.name));
      return lastCompare !== 0
        ? lastCompare
        : getFirstName(b.name).localeCompare(getFirstName(a.name));
    });

  if (["Not Started", "In Progress", "Completed", "Finalized"].includes(sortBy))
    return students.filter((student) => student.status === sortBy);

  if (["9", "10", "11", "12"].includes(sortBy))
    return students.filter((student) => student.grade === parseInt(sortBy));

  if (["transfer", "regents", "sports", "enl", "ib"].includes(sortBy))
    return students.filter((s) => s[sortBy as keyof GuidanceStudent]);

  return students;
}

function applyFilters(sortBy: string, search: string) {
  startIndex.value = 0;
  const filtered = filterByCategory(
    viewAll.value
      ? userStore.allStudents
      : userStore.allStudents.filter(({ id }) =>
        userStore.students.includes(id)
      ),
    sortBy
  );
  if (!search.trim().length) return filtered;
  return filtered.filter(({ name, email }) =>
    (name + email).toLowerCase().includes(search.trim().toLowerCase())
  );
}

const totalPages = computed(() => {
  const numStudents = sortedAndFiltered.value.length;
  return numStudents < 1 ? 1 : Math.ceil(numStudents / pageCapacity);
});

function changePage(increment: number) {
  currentPage.value += increment;
  if (increment > 0) startIndex.value += pageCapacity;
  else if (increment < 0) startIndex.value -= pageCapacity;
  else return;
  updatePagination(currentPage.value);
}

function updatePagination(page: number) {
  startIndex.value = (page - 1) * pageCapacity;
  currentPage.value = page;
  currentChunk.value = Math.ceil(page / pagesPerChunk);
}

const totalChunks = computed(() => Math.ceil(totalPages.value / pagesPerChunk));

const visiblePages = computed(() => {
  const start = (currentChunk.value - 1) * pagesPerChunk + 1;
  const end = Math.min(start + pagesPerChunk - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

watch(viewAll, () => {
  input.value = "";
  updatePagination(1);
});

watch(sortedAndFiltered, () => updatePagination(1));
</script>
