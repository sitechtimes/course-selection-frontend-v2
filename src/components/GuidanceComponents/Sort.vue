<script setup lang="ts">
import { ref } from "vue";
import DownArrow from '../icons/DownArrow.vue';

const name = ref("courseSort");
const input = ref("");
const props = ["title"];
const selected = ref("Sort By");
const isOpen = ref(false);
const subject = ref("Subject");
const atoz = ref("Course Name (A-Z)");
const ztoa = ref("Course Name (Z-A)");

/* const SubjectSort = computed(() => {
  function compare(a, b) {
    if (a.subject < b.subject) return -1;
    if (a.subject > b.subject) return 1;
    return 0;
  }
  let sortshow = document.getElementById("sortshow");
  sortshow.innerHTML = "Subject";
  return courses.value.sort(compare);
});
const IncNameSort = computed(() => {
  function compare(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  let sortshow = document.getElementById("sortshow");
  sortshow.innerHTML = "Course Name (A-Z)";
  return courses.value.sort(compare);
});
const DecNameSort = computed(() => {
  function compare(a, b) {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
  }
  let sortshow = document.getElementById("sortshow");
  sortshow.innerHTML = "Course Name (Z-A)";
  return courses.value.sort(compare);
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
          @click="SubjectSort()"
          class="flex justify-left h-10 w-44 p-1 border border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">
            {{ subject }}
          </button>
        </div>
        <div
          @click="IncNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ atoz }}</button>
        </div>
        <div
          @click="DecNameSort()"
          class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
        >
          <button class="ml-2">{{ ztoa }}</button>
        </div>
      </div>
    </div>
</template>