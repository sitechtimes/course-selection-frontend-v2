<template>
  <div class="relative w-44">
    <div
      class="h-10 flex w-max items-center justify-between px-4 rounded-lg bg-primary-g text-gray-900 font-semibold cursor-pointer hover:bg-tertiary-g transition"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <p>{{ selected }}</p>
      <span class="text-xl">{{ isOpen ? "⏶" : "⏷" }}</span>
    </div>

    <div
      v-if="isOpen"
      class="absolute mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-sm z-10"
    >
      <button
        v-for="x in menuArray"
        :key="x.sortBy"
        @click="
          filter(x.sortBy, x.text);
          isOpen = false;
        "
        class="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
      >
        {{ x.text }}
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
