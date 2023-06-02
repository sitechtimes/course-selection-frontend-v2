<template>
  <div class="h-screen select-none">
    <div class="mt-48 p-4 flex justify-center text-center text-3xl h-screen">
      <div v-if="numbered" class="flex flex-col mt-2">
        <div class="mt-5 mb-4" v-for="n in computedHeight" :key="n">
          {{ n }}.
        </div>
      </div>
      <div class="flex flex-col mt-2 w-1/3">
        <div
          id="a"
          @dragleave.prevent="(e) => e.target.classList.remove('bg-gray-100')"
          class="m-2 rounded-lg h-14 shadow-deepinner placeholder"
          v-for="course in ref_courses"
          :key="course"
        >
          <div
            class="bg-[#D6EEFF] p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14 course"
            draggable="true"
            @dragover.prevent="(e) => hoverBox(e)"
            @dragstart="(e) => (dragElement = e.target)"
            @drop.prevent="(e) => hoverBox(e)"
          >
            {{ course }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  courses: Array,
  numbered: Boolean,
});

let dragElement: HTMLElement;

const computedHeight = computed(() => {
  return props.courses.length;
});

const ref_courses = ref(props.courses);

const hoverBox = function (e) {
  let dragParent = dragElement.parentElement;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
};
</script>
