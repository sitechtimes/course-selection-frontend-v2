<template>
  <div class="h-screen">
    <div class="mt-48 p-4 flex justify-center text-center text-3xl h-screen">
      <Draggable
        class="p-4 mx-4 border-2 border-black w-1/3 h-fit grid grid-cols-2"
        v-model="courses"
        group="courses"
        item-key="id"
        @start="dragStart"
        @end="dragEnd"
        ghost-class="dragging"
      >
        <template #item="{ element }">
          <div
            class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14"
          >
            {{ element.name }}
          </div>
        </template>
      </Draggable>
      <div
        class="border-2 p-4 mx-4 border-black w-1/3 overflow-hidden"
        :style="{ 'max-height': `(${computedHeight}rem)` }"
      >
        <Draggable class="" v-model="sortedList" group="courses" item-key="id">
          <template #item="{ element }">
            <div
              class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold"
            >
              {{ element.name }}
            </div>
          </template>
        </Draggable>
        <!-- <div
          class="border-dotted border-2 m-2 p-2 rounded-lg h-14 border-black"
          v-for="course in courses"
          :key="course.name"
        ></div> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Draggable from "vuedraggable";
import { ref, computed } from "vue";

const ncourses = [
  {
    name: "A",
    id: 10,
  },
  {
    name: "B",
    id: 1,
  },
  {
    name: "C",
    id: 2,
  },
  {
    name: "D",
    id: 3,
  },
  {
    name: "E",
    id: 4,
  },
  {
    name: "F",
    id: 5,
  },
  {
    name: "G",
    id: 6,
  },
];
const courses = ref(ncourses);

const computedHeight = computed(() => {
  return ncourses.length * 16;
});

console.log(computedHeight);
const sortedList = ref([]);
</script>
