<template>
  <PopUp />
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/Navbar/NavBar.vue";
import PopUp from "./components/Basic/PopUp.vue";
</script>
