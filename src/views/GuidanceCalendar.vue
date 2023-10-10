<template>
  <div class="">
    <GuidanceCalendar />
    <createevent />
  </div>
</template>

<script setup lang="ts">
import CreateEvent from "../components/GuidanceComponents/CreateEvent.vue";
import GuidanceCalendar from "../components/GuidanceComponents/GuidanceCalendar.vue";

document.title = "Calendar & Events | SITHS Course Selection";
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}
</style>
