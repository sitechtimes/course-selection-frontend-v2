<template>
  <div
    class="fixed place-content-center items-center inset-x-0 bottom-0 w-full flex z-30 text-[#174616] bg-[#A8D480] h-[10%] lg:text-xl text-lg duration-[0.75s]"
    :class="surveyStore.submit || 'translate-y-full'"
  >
    <p class="">Your survey has been submitted</p>
  </div>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/Navbar/NavBar.vue";
import { useSurveyStore } from "./stores/survey";

const surveyStore = useSurveyStore();
</script>
