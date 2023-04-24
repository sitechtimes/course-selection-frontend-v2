<template>
  <!-- Page 1 (for everyone)
    <h1>______ Year Survey</h1>     Fill in ______ with the year
    <label for="major">What college majors are you considering upon graduation from high school?</label>
    <input type="text" id="major"/>
    <label for="career">What careers are you considering upon graduation?</label>
    <input type="text" id="career"/>
    <label for="afterSchool">List after-school activities such as clubs, teams, volunteer, or paid employment.</label>
    <input type="text" id="afterSchool"/> -->

  <!-- Page 2 (for everyone) -->
  <!-- <div class="survey">
    <h1 class="text-4xl font-semibold">______ Year Survey</h1>
    <fieldset class="flex flex-col">
      <label for="AP-interested" class=""
        >How Many AP or college-level courses are you interested in
        taking?</label
      >
      <input type="text" class="border-2 border-gray-500 rounded-sm w-4/5" id="AP-interested" />
    </fieldset>

    <h2>Are you interested in a 8th academic period (1-9 schedule)?</h2>
    <fieldset>
      <input type="radio" id="eighth-yes" name="eighth" />
      <label for="eighth-yes">Yes</label>
      <input type="radio" id="eighth-no" name="eighth" />
      <label for="eighth-no">No</label>
      <input type="radio" id="eighth-ns" name="eighth" />
      <label for="eighth-ns">Not sure</label>
    </fieldset>
  </div> -->
  <div class="mt-96 height-48">
    <h1>ok</h1>
    <VueDraggableNext v-model="courses" @change="log">
      <ul v-for="course in courses" :key="course" class="text-xl">
        {{ course }}
      </ul>
    </VueDraggableNext>
  </div>
</template>

<style></style>

<script setup lang="ts">
import SurveyButton from "../components/SurveyPageComponents/SurveyButton.vue";
import {VueDraggableNext} from "vue-draggable-next";

// test stuff
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
  "A",
  "B",
  "C",
  "D",
  "E",  
  "F",
  "G",
]
const name = "eighth";

function log(){
  console.log(courses)
}
</script>
