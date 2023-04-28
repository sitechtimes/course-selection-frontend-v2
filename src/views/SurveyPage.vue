<template>
  <ReturnToHome :userData="userStuff" ></ReturnToHome>
</template>

<script setup lang="ts">
import ReturnToHome from '../components/SurveyPageComponents/pages/courseSelectionPages.vue';
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const userStuff = userStore.data

</script>

<style scoped></style>
