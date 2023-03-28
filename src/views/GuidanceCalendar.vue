<template>
  <div class="event h-screen w-full flex flex-row justify-center items-center">
    <button style="cursor: pointer">Add Event +</button>
    <createevent />
  </div>
</template>
<script setup lang="ts">
import createevent from "../components/Guidance/createevent.vue";
</script>

<style scoped>
button {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.event {
  display: flex;
  flex-direction: column;
}
</style>
