<template>
  <div class="w-44">
    <div
      class="h-10 w-full flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <a class="mt-2.5 ml-4 flex">
        <p class="font-semibold" id="sortshow">{{ selected }}</p>
      </a>

      <DownArrow class="mt-2.5" />
    </div>
    <div
      class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      v-if="isOpen"
    >
      <button
        v-for="x in menuArray"
        :key="x.sortBy"
        @click="filter(x.sortBy, x.text)"
        class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
      >
        <p class="ml-2">{{ x.text }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownArrow from "../icons/DownArrow.vue";
import { ref } from "vue";

const selected = ref("Sort By");
const isOpen = ref(false);
const emit = defineEmits(["filter-selected"]);

const filter = (sortBy: string, text: string) => {
  emit("filter-selected", sortBy);
  isOpen.value = false;
  selected.value = text;
};

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
];
</script>
