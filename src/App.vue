<script setup lang="ts">
import NavBar from './components/NavbarComponents/NavBar.vue';
</script>

<template>
  <button @click="thing()"> notification</button>
      <div class="fixed place-content-center items-center inset-x-0 bottom-0 w-full flex z-20 text-[#174616] bg-[#A8D480] h-[10%] lg:text-4xl md:text-3xl text-xl duration-[0.75s] translate-y-full" id="notification">
      <h1 class="">Your survey has been submitted</h1>
    </div>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
  
</template>

<style scoped>
</style>