<script setup lang="ts">
import { useUserStore } from '../../stores/user';
import { RouterLink } from "vue-router";
import MenuIcon from '../icons/MenuIcon.vue';
import CloseMenu from "../icons/CloseMenu.vue";
import MobileNav from "./MobileNav.vue";
import { ref, watch } from "vue";
import router from '../../router';

const userStore = useUserStore();
let menuOpen = ref(false);

function viewingSurvey() {
    return router.currentRoute.value.path.includes('survey')
}

const exitSurvey = () => {
    if (userStore.isLoggedIn === true) {
        if (userStore.userType === 'student') {
            router.push('/student/dashboard')
        } 
        if (userStore.userType === 'guidance') {
            router.push('/guidance/studentlist')
        }
    } else {
        return router.push('/')
    }
}

const redirect = () => {
    if (userStore.isLoggedIn === true) {
        if (userStore.userType === 'student') {
            router.push('/student/dashboard')
        } 
        if (userStore.userType === 'guidance') {
            router.push('/guidance/dashboard')
        }
    } else {
        return router.push('/')
    }
}

</script>

<template>
    <nav id="navbar" class="w-full top-0 h-[15vh] flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible">
        <div @click="redirect()" class="cursor-pointer">
            <h1 class="text-3xl font-semibold z-50">Course Selection</h1>
        </div>
        <div v-if="userStore.isLoggedIn && userStore.userType === 'student' && viewingSurvey()  === false" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base">Courses</p>
            </RouterLink>
            <RouterLink to="/survey">
                <p class="text-base">Survey</p>
            </RouterLink>
            <RouterLink to="/">
                <p @click="userStore.$reset" id="name-link" class="text-base text-red-500 cursor-pointer">Logout</p>
            </RouterLink>
        </div>
        <div v-if="userStore.isLoggedIn && userStore.userType === 'guidance' && viewingSurvey() === false" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base">Students</p>
            </RouterLink>
            <RouterLink to="/survey">
                <p class="text-base">Calendar</p>
            </RouterLink>
            <RouterLink to="/">
                <p @click="userStore.$reset" id="name-link" class="text-base text-red-500 cursor-pointer">Logout</p>
            </RouterLink>
        </div>
        <div v-if="!userStore.isLoggedIn && viewingSurvey() === false" class="hidden justify-center items-center space-x-12 md:flex">
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
        <div v-if="viewingSurvey()" class="flex flex-row w-1/6 justify-between">
            <p @click="userStore.saveSurvey('INCOMPLETE')" class="text-[#37394F] text-2xl cursor-pointer">Save</p>
            <p @click="exitSurvey()" class="text-[#37394F] text-2xl cursor-pointer">Exit</p>
        </div>
    <MobileNav v-if="menuOpen" @e="toggleMenu" />
    </nav>
</template>