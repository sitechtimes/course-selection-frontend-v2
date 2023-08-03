<script lang="ts" setup>
import { useUserStore } from '../../stores/user';
import { useSurveyStore } from '../../stores/survey';
import { useResetStore } from '../../stores/reset'
import { useStudentStore } from '../../stores/student';
import { RouterLink } from "vue-router";
import MenuIcon from "../icons/MenuIcon.vue";
import CloseMenu from "../icons/CloseMenu.vue";
import MobileNav from "./MobileNav.vue";
import { ref, watch, Ref, computed } from "vue";
import router from '../../router';

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const resetStore = useResetStore();
const studentStore = useStudentStore()
let menuOpen: Ref<boolean> = ref(false);
const save = ref()

const viewingSurvey = () => {
    return router.currentRoute.value.path.includes('survey')
}

const redirect = () => {
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

const surveyNav = () => {
    if(surveyStore.open) {
        router.push("/student/survey")
    } else if(!surveyStore.open) {
        router.push("/student/survey/closed")
    }
}


const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

const toggleSave = () => {
save.value.innerHTML = "Saved"
  setTimeout(() => {
    save.value.innerHTML = "Save"
  }, 1500)
}

const logout = async () => {
    await resetStore.all()
    router.push('/')
}

const submit = async () => {
    await surveyStore.checkAnswers()
    if(surveyStore.missingAnswers.length === 0) {
        if(userStore.userType === "student") {
          router.push('/student/dashboard')
        } else if(userStore.userType === "guidance") {
          router.push('/guidance/studentlist')
        }
    }
}

</script>

<template>
    <nav id="navbar" class="w-full top-0 h-[15vh] flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible">
        <div @click="redirect()" class="cursor-pointer">
            <p class="text-2xl md:text-3xl font-semibold z-50 hover:text-gray-600 hidden sm:flex">Course Selection</p>
        </div>
        <div v-if="userStore.isLoggedIn && userStore.userType === 'student' && viewingSurvey()  === false" class="hidden justify-center items-center space-x-12 md:flex">
            <p><a href="https://siths-catalog.netlify.app/" target="_blank" rel="noopener">Courses</a></p>
            <p v-if="studentStore.student.homeroom != ''" @click="surveyNav()" class="cursor-pointer hover:text-gray-500">Survey</p>
            <RouterLink to="/">
                <p @click="logout()" id="name-link" class="text-base text-red-500 cursor-pointer hover:text-red-400">Logout</p>
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
                <p @click="logout()" id="name-link" class="text-base text-red-500 cursor-pointer hover:text-red-400">Logout</p>
            </RouterLink>
        </div>
        <div v-if="!userStore.isLoggedIn && viewingSurvey() === false" class="hidden justify-center items-center space-x-12 md:flex">
            <p><a href="https://siths-catalog.netlify.app/" target="_blank" rel="noopener">Courses</a></p>
            <RouterLink to="/login">
                <p class="text-base hover:text-gray-500">Login</p>
            </RouterLink>
        </div>
        <div v-if="!viewingSurvey()" id="menu-icon" class="flex justify-center items-center cursor-pointer z-40 md:hidden">
            <MenuIcon @click="toggleMenu" v-if="!menuOpen" />
            <CloseMenu @click="toggleMenu" v-else />
        </div>
        <div v-if="viewingSurvey()" class="flex flex-row-reverse w-full sm:w-1/4 md:1/6 justify-between">
            <p @click="redirect()" class="text-[#37394F] text-2xl cursor-pointer hover:text-gray-500">Exit</p>
            <p v-if="surveyStore.currentAnsweredSurvey.status === 'COMPLETE' && surveyStore.open === true" @click="submit()" class="text-[#37394F] text-2xl cursor-pointer hover:text-gray-500">Submit</p>
            <p v-if="surveyStore.currentAnsweredSurvey.status != 'COMPLETE' && surveyStore.open === true" @click="surveyStore.saveSurvey(surveyStore.currentAnsweredSurvey.status, surveyStore.currentAnsweredSurvey.grade); toggleSave()" class="text-[#37394F] text-2xl cursor-pointer hover:text-gray-500" ref="save">Save</p>
        </div>
    <MobileNav v-if="menuOpen" @e="toggleMenu"/>
    </nav>
</template>
