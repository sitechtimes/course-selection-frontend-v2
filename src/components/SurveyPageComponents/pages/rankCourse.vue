<template>
  <div class="h-screen select-none">
    <div class="mt-48 p-4 flex justify-center text-center text-3xl h-screen">
      <div
        class="p-4 mx-4 w-1/3 h-fit grid grid-cols-2"
        @dragover.prevent=""
        @drop.prevent="(en) => bringBack(en)"
      >
        <div
          v-for="course in courses"
          :key="course.name"
          class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14 course"
          draggable="true"
          @dragover.prevent="(e) => hoverBox(e)"
          @dragstart="(e) => (dragElement = e.target)"
          @drop.prevent="(e) => hoverBox(e)"
        >
          {{ course.name }}
        </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="my-4" v-for="n in computedHeight" :key="n">{{ n }}.</div>
      </div>
      <div class="flex flex-col w-1/4">
        <div
          id="a"
          @dragover.prevent="(e) => e.target.classList.add('bg-gray-100')"
          @dragleave.prevent="(e) => e.target.classList.remove('bg-gray-100')"
          @drop.prevent="(even) => test(even)"
          class="m-2 rounded-lg h-14 shadow-deepinner"
          v-for="course in courses"
          :key="course.name"
        ></div>
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
let dragElement: HTMLElement;
const courses = ref(ncourses);
let dragging: Boolean = false;
const computedHeight = computed(() => {
  return ncourses.length;
});

const bringBack = function (e) {
  if (dragElement.classList.contains("sorted-course")) {
    dragElement.classList.add("m-2", "shadow-xl");
    dragElement.classList.remove("shadow-deepinner", "sorted-course");
    if (e.target.classList.contains("course")) {
      e.target.parentElement.appendChild(dragElement);
    } else {
      e.target.appendChild(dragElement);
    }
  }
};
const test = function (e) {
  dragElement.classList.remove("m-2", "shadow-xl");
  // if (!dragElement.classList.contains("sorted-course")) {
  dragElement.classList.add("shadow-deepinner", "sorted-course");
  // }
  e.target.classList.remove("bg-gray-100");
  if (e.target.id == "a") {
    e.target.appendChild(dragElement);
  }
};

function emptyBelow(e) {
  let currentElement = e.target.parentElement.nextElementSibling;
  while (currentElement) {
    if (currentElement.childNodes.length == 0) {
      return true;
    }
    currentElement = currentElement.nextElementSibling;
  }
  return false;
}

function fillBelow(element: any) {
  if (element.childNodes.length === 0) {
    return true;
  } else if (element.nextElementSibling === null) {
    return false;
  }
  if (fillBelow(element.nextElementSibling)) {
    element.nextSibling.appendChild(element.childNodes[0]);
  }
}
function fillAbove(element: any) {
  if (element.childNodes.length === 0) {
    return true;
  } else if (element.previousSibling === null) {
    return false;
  }
  if (fillAbove(element.previousSibling)) {
    element.previousSibling.appendChild(element.childNodes[0]);
  }
}
const hoverBox = function (e) {
  if (
    e.target.classList.contains("sorted-course") &&
    dragElement.classList.contains("sorted-course")
  ) {
    let dragParent = dragElement.parentElement;
    e.target.parentElement.appendChild(dragElement);
    dragParent.appendChild(e.target);
    dragElement.classList.remove("bg-gray-100");
    // e.target.parentElement.nextElementSibling.appendChild(dragElement);
  } else {
    fillBelow(e.target.parentElement);
    fillAbove(e.target.parentElement);
  }
};
const swap = function (e) {};
const log = function (e) {
  console.log("o");
};
const sortedList = ref([]);
</script>
