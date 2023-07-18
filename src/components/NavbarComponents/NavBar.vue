<script setup lang="ts">
import { useUserStore } from '../../stores/user';
import { useSurveyStore } from '../../stores/survey';
import { RouterLink } from "vue-router";
import MenuIcon from "../icons/MenuIcon.vue";
import CloseMenu from "../icons/CloseMenu.vue";
import MobileNav from "./MobileNav.vue";
import { ref, watch, Ref } from "vue";
import router from '../../router';

const userStore = useUserStore();
const surveyStore = useSurveyStore()
let menuOpen: Ref<boolean> = ref(false);
const save = ref(null)

function viewingSurvey() {
    return router.currentRoute.value.path.includes('survey') && router.currentRoute.value.path != '/survey/closed'
}

const exitSurvey = () => {
  if (userStore.isLoggedIn === true) {
    if (userStore.userType === "student") {
      router.push("/student/dashboard");
    }
    if (userStore.userType === "guidance") {
      router.push("/guidance/studentlist");
    }
  } else {
    return router.push("/");
  }
};

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

const surveyNav = () => {
    if(surveyStore.open) {
        router.push("/student/survey")
    } else if(!surveyStore.open) {
        router.push("/survey/closed")
    }
}


const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

const toggleSave = () => {
//  saved.value = true
save.value.innerHTML = "Saved"
  setTimeout(() => {
    save.value.innerHTML = "Save"
  }, 1500)
}

</script>

<template>
    <nav id="navbar" class="w-full top-0 h-[15vh] flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible">
        <div @click="redirect()" class="cursor-pointer">
            <p v-if="!viewingSurvey()" class="text-2xl md:text-3xl font-semibold z-50 hover:text-gray-600">Course Selection</p>
        </div>
        <div v-if="userStore.isLoggedIn && userStore.userType === 'student' && viewingSurvey()  === false" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base hover:text-gray-500">Courses</p>
            </RouterLink>
            <p @click="surveyNav()" class="cursor-pointer hover:text-gray-500">Survey</p>
            <RouterLink to="/">
                <p @click="userStore.$reset" id="name-link" class="text-base text-red-500 cursor-pointer hover:text-red-400">Logout</p>
            </RouterLink>
        </div>
        <div v-if="userStore.isLoggedIn && userStore.userType === 'guidance' && viewingSurvey() === false" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/guidance/studentlist">
                <p class="text-base hover:text-gray-500">Students</p>
            </RouterLink>
            <RouterLink to="/guidance/calendar">
                <p class="text-base hover:text-gray-500">Calendar</p>
            </RouterLink>
            <RouterLink to="/">
                <p @click="userStore.$reset" id="name-link" class="text-base text-red-500 cursor-pointer hover:text-red-400">Logout</p>
            </RouterLink>
        </div>
        <div v-if="!userStore.isLoggedIn && viewingSurvey() === false" class="hidden justify-center items-center space-x-12 md:flex">
            <RouterLink to="/courses">
                <p class="text-base hover:text-gray-500">Courses</p>
            </RouterLink>
            <RouterLink to="/login">
                <p class="text-base hover:text-gray-500">Login</p>
            </RouterLink>
        </div>
        <div v-if="!viewingSurvey()" id="menu-icon" class="flex justify-center items-center cursor-pointer z-40 md:hidden">
            <MenuIcon @click="toggleMenu" v-if="!menuOpen" />
            <CloseMenu @click="toggleMenu" v-else />
        </div>
        <div v-if="viewingSurvey()" class="flex flex-row w-full sm:w-1/4 md:1/6 justify-between">
            <!-- (needs change) => pass in incomplete only when survey hasn't been submitted before  -->
            <p @click="surveyStore.saveSurvey('INCOMPLETE'); toggleSave()" class="text-[#37394F] text-2xl cursor-pointer hover:text-gray-500" ref="save">Save</p>
            <!-- <p v-else @click="surveyStore.saveSurvey('INCOMPLETE')" class="text-gray-500 text-2xl cursor-pointer">Saved</p> -->
            <p @click="exitSurvey()" class="text-[#37394F] text-2xl cursor-pointer hover:text-gray-500">Exit</p>
        </div>
    <MobileNav v-if="menuOpen" @e="toggleMenu"/>
    </nav>
</template>
