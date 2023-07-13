<template>
  <div class="event h-screen w-full flex flex-row justify-center items-center">
    <createevent />
  </div>
</template>

<script setup lang="ts">
import createevent from "../components/GuidanceComponents/CreateEvent.vue";
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}
</style>
