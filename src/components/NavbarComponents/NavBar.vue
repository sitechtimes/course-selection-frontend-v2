<template>
    <nav id="navbar" class="absolute w-full top-0 h-24 flex justify-between items-center px-8 md:px-10 lg:px-12 overflow-visible">
        <RouterLink to="/">
            <h1 class="text-3xl font-semibold">Course Selection</h1>
        </RouterLink>
        <div v-if="userStore.isLoggedIn">
            <RouterLink to="/courses">
                <p class="text-base">Courses</p>
            </RouterLink>
            <RouterLink to="/survey">
                <p class="text-base">Survey</p>
            </RouterLink>
        </div>
        <div v-else class="hidden justify-center items-center space-x-10 md:flex">
            <RouterLink to="/courses">
                <p class="text-base">Courses</p>
            </RouterLink>
            <RouterLink to="/login">
                <button class="text-base bg-primary-s w-24 h-10 rounded">Login</button>
            </RouterLink>
        </div>
        <div id="menu-icon" class="flex justify-center items-center cursor-pointer z-40 md:hidden">
            <MenuIcon @click="toggleMenu" v-if="!menuOpen" />
            <CloseMenu @click="toggleMenu" v-else />
        </div>

    <MobileNav v-if="menuOpen" @e="toggleMenu" />
    </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user';
import { RouterLink } from "vue-router";
import MenuIcon from '../icons/MenuIcon.vue';
import CloseMenu from "../icons/CloseMenu.vue";
import MobileNav from "./MobileNav.vue";
import { ref } from "vue";

const userStore = useUserStore();
let menuOpen = ref(false);

const toggleMenu = () => {
  if (!menuOpen.value) {
    menuOpen.value = true;
  } else {
    menuOpen.value = false;
  }
};
</script>