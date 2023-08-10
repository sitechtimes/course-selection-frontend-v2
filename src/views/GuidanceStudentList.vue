<script setup lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/SortButton.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { useGuidanceStore } from '../stores/guidance';
import { studentGuidance } from '../types/interface'
import { ref, Ref, computed, watch } from 'vue'

document.title = "Student List | SITHS Course Selection";

const guidanceStore = useGuidanceStore();
guidanceStore.currentlyViewing = guidanceStore.guidance.students;
let allStudents: studentGuidance[] = [];

guidanceStore.allStudents.edges.forEach((el) => {
  allStudents.push(el.node);
});

const input: Ref<string> = ref("");
const viewAll = ref(false);
let x = ref(0);
let y = ref(10);
const pageCapacity = 10;
const currentPage = ref(1);

//sorting students to view
const newStudents = computed(() => {
  viewAll.value;
  return guidanceStore.currentlyViewing.filter(
    (student: studentGuidance) =>
      (student.user.firstName + " " + student.user.lastName)
        .toLowerCase()
        .indexOf(input.value.toLowerCase()) != -1 ||
      student.user.email.indexOf(input.value) != -1
  );
});

const pages = computed(() => {
  return Math.ceil(guidanceStore.currentlyViewing.length / pageCapacity);
});

const add = () => {
    currentPage.value++;
    x.value = x.value + pageCapacity;
    y.value = y.value + pageCapacity;
};

const subtract = () => {
    currentPage.value--;
    x.value = x.value - pageCapacity;
    y.value = y.value - pageCapacity;
};

const updatePage = (pageNumber: number) => {
  x.value = pageNumber * pageCapacity - pageCapacity;
  y.value = pageNumber * pageCapacity;
  currentPage.value = pageNumber;
};

watch(
  () => viewAll.value,
  (newResponse) => {
    if (viewAll.value === true) {
      guidanceStore.currentlyViewing = allStudents;
    }
    if (viewAll.value === false) {
      guidanceStore.currentlyViewing = guidanceStore.guidance.students;
    }

    updatePage(1);
  }
);
</script>

<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
          <div class="w-1/3 flex flex-row justify-evenly">
            <div @click="viewAll = !viewAll" class="h-10 px-4 w-60 mx-10 flex flex-row bg-primary-g text-black justify-evenly  font-semibold items-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)] ">
              <label class="cursor-pointer">View all students</label>
              <input class="ml-2" type="checkbox" v-model="viewAll"/>
            </div>
            <Sort class="mr-0"/>
          </div>
          <SearchBar class="w-2/3" type="text" v-model="input" placeholder="Search Students..." />
        </div>
    <StudentTable  :newstudents="newStudents.slice(x, y)" />
    <div class="mt-4 flex flex-row justify-between ">
      <button class=" mx-2  bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" @click="subtract" :disabled="currentPage === 1">
        ❮
      </button>
      <button v-for="n in pages" @click="updatePage(n)" :class="{'bg-[#cdeeb4] focus:bg-[#cdeeb4]': currentPage === n, 'bg-[#ebebeb]': currentPage !== n}" class=" h-8 w-8 rounded-lg hover:opacity-75 ease-in-out duration-300 font-bold mx-2" > {{ n }} </button>
      <button class=" mx-2  bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" :disabled="currentPage === pages" @click="add">❯</button>
    </div>
    <h5 class="mt-4">
      Page
      <span class="font-bold m-1"> {{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ pages }}</span>
    </h5>
  </div>
</template>

