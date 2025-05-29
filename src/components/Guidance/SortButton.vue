<template>
  <div class="w-44">
    <div
      class="h-15 overflow w-max flex flex-row bg-primary-g justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <a class="m-2.5 ml-4 flex">
        <p class="font-semibold" id="sortshow">{{ selected }}</p>
      </a>

      <p class="mt-1.5 text-xl">{{ isOpen ? "⏶" : "⏷" }}</p>
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
import { ref } from "vue";
import { SortArray } from "../../types/interface";
defineProps<{ menuArray: SortArray[] }>();
const selected = ref("Sort By");
const isOpen = ref(false);
const emit = defineEmits(["filter-selected"]);

const filter = (sortBy: string, text: string) => {
  emit("filter-selected", sortBy as string);
  isOpen.value = false;
  selected.value = text;
};
</script>
