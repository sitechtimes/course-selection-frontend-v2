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

if (window.location.hostname.endsWith("netlify.app"))
  window.location.href = "https://courseselection.siths.dev";
</script>
