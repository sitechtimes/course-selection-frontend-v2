<template></template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
document.title = "Survey List | SITHS Course Selection";

const surveys = ref<Survey[]>([]);

const userStore = useUserStore();
onMounted(async () => {
  try {
    surveys.value = await userStore.getCourses();
  } catch (error) {
    console.error(error);
  }
});
</script>