<template>

  <div class="h-full ">
    <div class="flex p-4 justify-center text-center text-3xl h-">
      <Draggable class="p-4 mx-4 border-2 border-black w-1/3  " v-model="courses" group="courses" item-key="id">
      <template #item="{ element }">
        <div>
          {{ element.name }}
        </div>
      </template>
    </Draggable>
    <Draggable class="border-2 p-4 mx-4 border-black w-1/3 " v-model="sortedList" group="courses" item-key="id">
      <template #item="{ element }">
        <div>
          {{ element.name }}
        </div>
      </template>
    </Draggable>
    </div>

  </div>
</template>

<style></style>

<script setup lang="ts">
import SurveyButton from "../components/SurveyPageComponents/SurveyButton.vue";
import Draggable from "vuedraggable";
import { ref } from "vue"
// test stuff
let drag = false
const form = [
  {
    id: "first-question",
    answer: "Not Sure",
  },
  {
    id: "second-question",
    answer: "Yes",
  },
];
const courses = ref([
  {
    name: "A",
    id: 10
  },
  {
    name: "B",
    id: 1
  },
  {
    name: "C",
    id: 2
  },
  {
    name: "D",
    id: 3
  },
  {
    name: "E",
    id: 4
  },
  {
    name: "F",
    id: 5
  },
  {
    name: "G",
    id: 6
  },
])

const sortedList = ref([

])
</script>
