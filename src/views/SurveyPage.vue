<template>

  <div class="mt-96 height-48">
    <h1>ok</h1>

    <draggable v-model="courses" group="courses" item-key="name" @start="log" @end="log">
      <template #item="{ element }">
        <div>
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<style></style>

<script setup lang="ts">
import SurveyButton from "../components/SurveyPageComponents/SurveyButton.vue";
import draggable from "vuedraggable";

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
const courses = [
  {
    name: "A",
    order: 0
  },
  {
    name: "B",
    order: 1
  },
  {
    name: "C",
    order: 2
  },
  {
    name: "D",
    order: 3
  },
  {
    name: "E",
    order: 4
  },
  {
    name: "F",
    order: 5
  },
  {
    name: "G",
    order: 6
  },
]
console.log(courses)
const name = "eighth";

function log(){
  console.log(courses)
}

function onChange() {
    reorder()
}
function reorder() {
    courses.forEach((item, index) => (item.order = index))
}
</script>
