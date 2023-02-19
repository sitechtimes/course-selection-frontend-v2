<template>
    <nav id="navbar" class="absolute w-full top-0 h-24 flex justify-center items-center px-8">
        <router-link to="/">
            <h1>Course Selection</h1>
        </router-link>
        <div v-if="userStore.isLoggedIn" class="nav-options">
            <router-link to="/courses">
                <p class="text-base">Courses</p>
            </router-link>
            <router-link to="/survey">
                <p class="text-base">Survey</p>
            </router-link>
        </div>
        <div v-else class="w-1/2">
            <router-link to="/courses">
                <p class="text-base">Courses</p>
            </router-link>
            <router-link to="/login">
                <p class="text-base">Login</p>
            </router-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user';
const userStore = useUserStore();

</script>