<template>
  <div class="w-44">
    <div
      class="h-10 w-full flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <div>
        <a class="mt-2.5 ml-4 flex">
          <p class="font-semibold" id="sortshow">{{ selected }}</p>
        </a>
      </div>
      <DownArrow class="mt-2.5" />
    </div>
    <div
      class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      v-if="isOpen"
    >
      <div
        v-for="x in menuArray"
        :key="x.sortBy"
        class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g"
      >
        <button @click="filter(x.sortBy, x.text)" class="ml-2">
          {{ x.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from "vue";
import { useUserStore } from "../../stores/user";
import DownArrow from "../icons/DownArrow.vue";
import { userData } from "../../types/interface";

const userStore = useUserStore();
const selected: Ref<string> = ref("Sort By");
const isOpen: Ref<boolean> = ref(false);
const emit = defineEmits(["filter-selected"]);

//default sorting is last names a-z
const defaultSort = { sortBy: "lastnameaz", text: "Sort By" };

const filter = (sortBy: string, text: string) => {
  emit("filter-selected", sortBy);
  isOpen.value = false;
  selected.value = text;
};

const menuArray = [
  {
    sortBy: "lastnameaz",
    text: "Last Name (A-Z)",
  },
  {
    sortBy: "lastnameza",
    text: "Last Name (Z-A)",
  },
  {
    sortBy: "ns",
    text: "Not Started",
  },
  {
    sortBy: "ip",
    text: "In Progress",
  },
  {
    sortBy: "com",
    text: "Completed",
  },
  {
    sortBy: "final",
    text: "Finalized",
  },
  {
    sortBy: "nine",
    text: "Grade 9",
  },
  {
    sortBy: "ten",
    text: "Grade 10",
  },
  {
    sortBy: "eleven",
    text: "Grade 11",
  },
  {
    sortBy: "transfer",
    text: "Transfer",
  },
  {
    sortBy: "regents",
    text: "Missing Regents",
  },
  {
    sortBy: "sports",
    text: "Sports Team",
  },
  {
    sortBy: "enl",
    text: "ENL",
  },
];
</script>
