<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import DownArrow from '../icons/DownArrow.vue';

defineProps({
  students: Array,
})

const students = [
    {
        lastname: "Lin",
        firstname: "Wendy",
        grade: 10,
        osis: 93453927859,
        email: "wendyl26@nycstudents.net",
        progress: "Not Started",
    },
    {
        lastname: "Chen",
        firstname: "Jason",
        grade: 12,
        osis: 828471831,
        email: "jasonc2801@nycstudents.net",
        progress: "In Progress",
    },
    {
        lastname: "Yang",
        firstname: "Jessie",
        grade: 11,
        osis: 93453927859,
        email: "jessiey2@nycstudents.net",
        progress: "Complete",
    },
    {
        lastname: "Whalen",
        firstname: "Michael",
        grade: 9,
        osis: 828471831,
        email: "mwhalen21@nycdoe.gov",
        progress: "Not Started",
    },
]
const name = ref("courseSort");
const input = ref("");
const props = ["title"];
const selected = ref("Sort By");
const isOpen = ref(false);
const atoz = ref("Last Name (A-Z)");
const ztoa = ref("Last Name (Z-A)");
const notStarted = ref("Not Started");
const inProgress = ref("In Progress");
const complete = ref("Complete");
const grade9 = ref("Grade 9")
const grade10 = ref("Grade 10")
const grade11 = ref("Grade 11")

const IncNameSort = computed(() => {
  function compare(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  return students.value.sort(compare);
});

function show() {
  onMounted(() => {
    return {
      name,
      input,
      props,
      isOpen,
    };
  });
}

/* const IncNameSort = computed(() => {
  function compare(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  return students.value.sort(compare);
});
const DecNameSort = computed(() => {
  function compare(a, b) {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
  }
  return students.value.sort(compare);
});
function show() {
  onMounted(() => {
    return {
      name,
      input,
      props,
      isOpen,
    };
  });
} */
</script>

<template>
  <div class="w-[16.4rem]">
     <div
      class="h-10 mr-4 flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <div>
        <a class="mt-2.5 ml-4 flex">
          <p class="font-semibold" id="sortshow">{{ selected }}</p>
        </a>
      </div>
      <DownArrow class="mt-2.5"/>
      </div>
      <div class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)]" v-if="isOpen">
        <div
          @click="IncNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ atoz }}</button>
        </div>
        <div
          @click="IncNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ ztoa }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ notStarted }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ inProgress }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ complete }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ grade9 }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ grade10 }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ grade11 }}</button>
        </div>
      </div>
    </div>
</template>