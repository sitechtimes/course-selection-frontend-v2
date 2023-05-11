<script setup lang="ts">
import { useUserStore } from '../../stores/user';
import { RouterLink } from "vue-router";
import MenuIcon from '../icons/MenuIcon.vue';
import CloseMenu from "../icons/CloseMenu.vue";
import MobileNav from "./MobileNav.vue";
import UserMenu from './UserMenu.vue';
import { ref } from "vue";

const userStore = useUserStore();
let menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
};
</script>

<template>
    <nav id="navbar" class=" w-full top-0 h-24 flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible">
        <RouterLink to="/">
            <h1 class="text-3xl font-semibold">Course Selection</h1>
        </RouterLink>
        <div v-if="userStore.isLoggedIn" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base">Courses</p>
            </RouterLink>
            <RouterLink to="/survey">
                <p class="text-base">Survey</p>
            </RouterLink>
            <UserMenu />
        </div>
        <div v-else class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base">Courses</p>
            </RouterLink>
            <RouterLink to="/login">
                <p class="text-base">Login</p>
            </RouterLink>
        </div>
        <div id="menu-icon" class="flex justify-center items-center cursor-pointer z-40 md:hidden">
            <MenuIcon @click="toggleMenu" v-if="!menuOpen" />
            <CloseMenu @click="toggleMenu" v-else />
        </div>

    <MobileNav v-if="menuOpen" @e="toggleMenu" />
    </nav>
</template>