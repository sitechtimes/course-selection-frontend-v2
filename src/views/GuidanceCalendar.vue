<template>
  <div class="">
    <div class="flex flex-row">
      <GuidanceCalendar />
      <Upcoming />
    </div>
    <createevent />
  </div>
</template>

<script setup lang="ts">
import createevent from "../components/GuidanceComponents/CreateEvent.vue";
import GuidanceCalendar from "../components/GuidanceComponents/GuidanceCalendar.vue";
import Upcoming from "../components/GuidanceComponents/Upcoming.vue";
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}
</style>
