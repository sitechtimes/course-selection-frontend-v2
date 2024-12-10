<template>
  <div class="">
    <GuidanceCalendar />
  </div>
</template>

<script setup lang="ts">
import GuidanceCalendar from "../components/Guidance/GuidanceCalendar.vue";

document.title = "Calendar & Events | SITHS Course Selection";
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}
</style>
