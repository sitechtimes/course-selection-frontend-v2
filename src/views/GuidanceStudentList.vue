<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
      <div class="w-1/3 flex flex-row justify-evenly">
        <div
          @click="viewAll = !viewAll"
          class="h-10 px-4 w-60 mx-10 flex flex-row bg-primary-g text-black justify-evenly font-semibold items-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
        >
          <label class="cursor-pointer">View all students</label>
          <input class="ml-2" type="checkbox" v-model="viewAll" />
        </div>
        <Sort
          class="mr-0"
          @filter-selected="(filter:string) => (sortBy = filter)"
        />
      </div>
      <div class="w-2/3">
        <div class="border-white flex justify-center items-center">
          <div class="flex justify-center items-center relative w-11/12">
            <input
              v-model="input"
              placeholder="Search by name or email"
              @input="
                $emit(
                  'update:modelValue',
                  ($event.target as HTMLInputElement).value
                )
              "
              class="border border-zinc-300 rounded w-full h-10 p-2 text-zinc-800"
            />
            <p class="absolute right-3 text-zinc-400 cursor-pointer text-xl">
              🔎︎
            </p>
          </div>
        </div>
      </div>
    </div>
    <StudentTable
      :viewAll="viewAll"
      :new-students="
        sortedAndFiltered.slice(startIndex, startIndex + pageCapacity)
      "
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
    <h5 class="mt-4">
      Page
      <span class="font-bold m-1"> {{ currentPage }}</span>
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
const allStudents = ref<GuidanceStudent[]>([]);

const viewAll = ref(false);
const input = ref("");
const sortBy = ref("az");

const startIndex = ref(0);

const currentPage = ref(1);
const pageCapacity = 10;
const currentChunk = ref(1);
const pagesPerChunk = 10;

const sortedAndFiltered = computed(() => {
  try {
    return applyFilters(sortBy.value, input.value);
  } finally {
    updatePagination(1);
  }
});

function filterByCategory(students: GuidanceStudent[], sortBy: string) {
  if (sortBy === "az")
    return students.sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "za")
    return students.sort((a, b) => b.name.localeCompare(a.name));

  if (["Not Started", "In Progress", "Completed", "Finalized"].includes(sortBy))
    return students.filter((student) => student.status === sortBy);

  if (["9", "10", "11", "12"].includes(sortBy))
    return students.filter((student) => student.grade === parseInt(sortBy));

  if (["transfer", "regents", "sports", "enl"].includes(sortBy))
    return students.filter((s) => s[sortBy as keyof GuidanceStudent]);
  return students;
}

function applyFilters(sortBy: string, search: string) {
  startIndex.value = 0;
  const filtered = filterByCategory(
    viewAll.value ? userStore.studentList : allStudents.value,
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
}

const totalChunks = computed(() => Math.ceil(totalPages.value / pagesPerChunk));

const visiblePages = computed(() => {
  const start = (currentChunk.value - 1) * pagesPerChunk + 1;
  const end = Math.min(start + pagesPerChunk - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

watch(viewAll, (newValue) => {
  input.value = "";
  if (newValue) userStore.viewedStudents = allStudents.value;
  else userStore.viewedStudents = userStore.studentList;
  updatePagination(1);
});

watch(sortedAndFiltered, () => {
  userStore.viewedStudents = sortedAndFiltered.value;
  currentChunk.value = 1;
  updatePagination(1);
});
</script>
