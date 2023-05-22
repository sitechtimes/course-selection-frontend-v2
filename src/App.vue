<script setup lang="ts">
import NavBar from './components/NavbarComponents/NavBar.vue';
import { ref, watch } from 'vue';

let path = ref(window.location.pathname)

function pathChanged() {
  path.value = window.location.pathname
  console.log(path)
}

</script>

<template>
  <div id="app">
    <nav-bar :path="path" :key="path" @click="pathChanged()"></nav-bar>
    <router-view @click="pathChanged()"></router-view>
  </div>
</template>

<style scoped>
</style>