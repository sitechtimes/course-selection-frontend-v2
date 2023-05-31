<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useUserStore } from '../../stores/user';
import DownArrow from '../icons/DownArrow.vue';
const students = useUserStore().data.guidance.students;
const input = ref("");
const props = ["title"];
const selected = ref("Sort By");
const isOpen = ref(false);
const menuarray = ref([
  "Last Name (A-Z)",
  "Last Name (Z-A)",
  "Not Started",
  "In Progress",
  "Complete",
  "Grade 9",
  "Grade 10",
  "Grade 11",
])

const LastNameInc = computed(() => {
  function compare(a: { user: { lastName: any; }; }, b: { user: { lastName: any; }; }) {
    if (a.user.lastName < b.user.lastName) return -1;
    if (a.user.lastName > b.user.lastName) return 1;
    return 0;
  }
  return (students.sort(compare));
});
const LastNameDec = computed(() => {
  function compare(a: { user: { lastName: any; }; }, b: { user: { lastName: any; }; }) {
    if (a.user.lastName > b.user.lastName) return -1;
    if (a.user.lastName < b.user.lastName) return 1;
    return 0;
  }
  return (students.sort(compare));
});

function show() {
  onMounted(() => {
    return {
      input,
      props,
      isOpen,
    };
  });
}
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
      <div class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)]" v-if="isOpen" >
        <div v-for="menu in menuarray" :key="menu" class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="LastNameInc()" class="ml-2">{{ menu }}</button>
        </div>
      </div>
    </div>
</template>