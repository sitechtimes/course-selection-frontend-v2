<template>
  <div class="h-screen select-none">
    <div class="mt-48 p-4 flex justify-center text-center text-3xl h-screen">
      <div class="p-4 mx-4 w-1/3 h-fit grid grid-cols-2">
        <div v-for="course in courses" :key="course.name"
            class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14" draggable="true"
          >
            {{ course.name }}
          </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="my-4" v-for="n in computedHeight" :key="n">{{ n }}.</div>
      </div>
      <div class="flex flex-col w-1/4">
         <div
         @dragover="e => e.target.classList.add('border-dotted')"
         @dragleave="e => e.target.classList.remove('border-dotted')"
          class=" border-2 m-2 p-2 rounded-lg h-14 border-black"
          v-for="course in courses"
          :key="course.name"
        ></div>
      </div>
     
      <!-- <Draggable
        class="p-4 mx-4 w-1/3 h-fit grid grid-cols-2"
        v-model="courses"
        group="courses"
        item-key="id"
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

      <div class="flex flex-col mt-4">
        <div class="my-3" v-for="n in computedHeight" :key="n">{{ n }}.</div>
      </div>

      <Draggable
        class="p-4 mx-4 w-1/4"
        v-model="sortedList"
        group="courses"
        item-key="id"
      >
        <template #item="{ element }">
          <div
            class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold"
          >
            {{ element.name }}
          </div>
        </template>
      </Draggable> -->
      <!-- <div
          class="border-dotted border-2 m-2 p-2 rounded-lg h-14 border-black"
          v-for="course in courses"
          :key="course.name"
        ></div> -->
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
  }
];
const courses = ref(ncourses);
let dragging: Boolean = false;
const computedHeight = computed(() => {
  return ncourses.length;
});

console.log(computedHeight);
const sortedList = ref([]);
</script>
