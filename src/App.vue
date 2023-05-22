<script setup lang="ts">
import NavBar from './components/NavbarComponents/NavBar.vue';
import { ref, watch } from 'vue';

let path = null
console.log(path.value)

function pathChanged() {
  path = window.location.pathname
}

</script>

<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view @click="pathChanged()"></router-view>
  </div>
</template>

<style scoped>
</style>