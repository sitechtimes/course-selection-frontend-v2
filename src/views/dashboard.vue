<script setup lang="ts">
import BellIcon from '../components/icons/BellIcon.vue';

let name = 'Wendy Lin'
let annoucement = 'Surveys are closing next week on 03/12/2023.'
</script>

<template>
  <div class="h-screen flex flex-row flex-wrap justify-start items-center">
    <div id="left" class="w-[60rem] flex flex-col justify-center items-start text-left text-primary ml-28 space-y-6">
      <h1 id="name" class="text-5xl font-bold">
        Welcome back, {{ name }}
      </h1>
      <div id="announcements" class="flex">
        <BellIcon />
        <h2 class="text-xl flex ml-3">
          {{ annoucement }}
        </h2>
      </div>
      <div class="flex flex-col justify-start items-center space-y-4">
        <RouterLink to="/login">
          <button class="bg-primary-s w-56 h-14 rounded text-xl font-semibold hover:bg-other-s">
          Schedule
        </button>
      </RouterLink>
      <RouterLink to="/login">
        <button class="bg-primary-s w-56 h-14 rounded text-xl font-semibold hover:bg-other-s">
          Course Survey
        </button>
      </RouterLink>
      </div>
    </div>
  </div>
</template>

