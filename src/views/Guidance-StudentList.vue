<script setup lang="ts">
import SearchBar from '../components/GeneralComponents/SearchBar.vue';
</script>

<template>
    <div class="h-screen w-full flex flex-row justify-center items-center">
        <button class="w-44 h-10 ml-20 mr-4 bg-primary-g text-black rounded cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">Sort By</button>
        <SearchBar type="text" placeholder="Search Students..." />
    </div>
</template>