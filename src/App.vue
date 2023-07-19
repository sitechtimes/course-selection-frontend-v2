<script setup lang="ts">
import NavBar from './components/NavbarComponents/NavBar.vue';
import ReviewSurvey from './views/ReviewSurvey.vue';
import { ref } from 'vue'

const forReviewPage = ref(null)
const submit = () => {
  forReviewPage.value.checkAnswers()
}

</script>

<template>
  <div id="app">
    <nav-bar @submit="submit"></nav-bar>
    <!-- <review-survey ref="forReviewPage"></review-survey> -->
    <router-view ref="forReviewPage"></router-view>
  </div>
</template>

<style scoped>
</style>