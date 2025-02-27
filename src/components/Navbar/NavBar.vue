<template>
  <nav
    id="navbar"
    class="w-full top-0 h-[13vh] md:h-[15vh] flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible"
  >
    <div @click="redirect()" class="cursor-pointer">
      <p
        class="text-lg sm:text-xl md:text-2xl font-semibold z-50 hover:text-gray-600 flex sm:flex"
        :class="viewingSurvey() && 'hidden'"
      >
        Course Selection
      </p>
    </div>
    <div
      v-if="userStore.isAuth && !userStore.isGuidance && !viewingSurvey()"
      class="hidden justify-center items-center space-x-12 md:flex"
    >
      <p>
        <a
          href="https://siths-catalog.netlify.app/"
          target="_blank"
          rel="noopener"
          >Courses</a
        >
      </p>
      <p
        v-if="!userStore.isGuidance"
        @click="router.push('/student/survey/')"
        class="cursor-pointer hover:text-gray-500"
      >
        Survey
      </p>
      <RouterLink to="/">
        <p
          @click="userStore.logout()"
          id="name-link"
          class="text-base text-red-500 cursor-pointer hover:text-red-400"
        >
          Logout
        </p>
      </RouterLink>
    </div>
    <div
      v-if="userStore.isAuth && userStore.isGuidance && !viewingSurvey()"
      class="hidden justify-center items-center space-x-12 md:flex"
    >
      <RouterLink to="/guidance/studentlist">
        <p class="text-base hover:text-gray-500">Students</p>
      </RouterLink>
      <RouterLink to="/guidance/calendar">
        <p class="text-base hover:text-gray-500">Calendar</p>
      </RouterLink>
      <RouterLink id="link" to="/guidance/statistics">
        <p class="text-base hover:text-gray-5000">Statistics</p>
      </RouterLink>
      <RouterLink to="/">
        <p
          @click="userStore.logout()"
          id="name-link"
          class="text-base text-red-500 cursor-pointer hover:text-red-400"
        >
          Logout
        </p>
      </RouterLink>
    </div>
    <!-- login page -->
    <div
      v-if="!userStore.isAuth && !viewingSurvey()"
      class="hidden justify-center items-center space-x-12 md:flex"
    >
      <p>
        <a
          href="https://siths-catalog.netlify.app/"
          target="_blank"
          rel="noopener"
          >Courses</a
        >
      </p>
      <RouterLink to="/login">
        <p class="text-base hover:text-gray-500">Login</p>
      </RouterLink>
    </div>

    <div
      v-if="!viewingSurvey()"
      id="menu-icon"
      class="flex justify-center items-center cursor-pointer z-40 md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7"
        @click="menuOpen = !menuOpen"
        v-if="!menuOpen"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <p @click="menuOpen = !menuOpen" v-else class="text-2xl">✕</p>
    </div>
    <!-- while viewing survey -->
    <div
      v-if="viewingSurvey()"
      class="flex flex-row-reverse w-full sm:w-1/4 md:1/6 justify-between text-xl md:text-xl"
    >
      <p
        @click="redirect()"
        class="text-[#37394F] cursor-pointer hover:text-gray-500"
      >
        Exit
      </p>
      <p
        v-if="surveyStore.status === 'COMPLETE' && surveyStore.open"
        @click="submit()"
        class="text-[#37394F] cursor-pointer hover:text-gray-500"
      >
        Submit
      </p>
      <p
        v-if="surveyStore.status != 'Completed' && surveyStore.open"
        @click="toggleSave()"
        class="text-[#37394F] cursor-pointer hover:text-gray-500"
        ref="save"
      >
        Save
      </p>
    </div>
    <MobileNav v-if="menuOpen" @e="menuOpen = !menuOpen" />
  </nav>
</template>
<script lang="ts" setup>
import { useSurveyStore } from "../../stores/survey";
import { useUserStore } from "../../stores/user";
import { RouterLink } from "vue-router";
import MobileNav from "./MobileNav.vue";
import router from "../../router";
import { ref } from "vue";

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const menuOpen = ref(false);
const save = ref("Save");

const viewingSurvey = () => router.currentRoute.value.path.includes("survey");

function redirect() {
  if (!userStore.isAuth) return router.push("/");
  if (userStore.isGuidance) return router.push("/guidance/studentlist");
  else router.push("/student/dashboard");
}

const toggleSave = () => {
  surveyStore.saveSurvey(0);
  save.value = "Saved";
  setTimeout(() => (save.value ? (save.value = "Save") : null), 1500);
};

async function submit() {
  surveyStore.saveSurvey(0);
  if (surveyStore.missingAnswers.length !== 0) return;
  if (userStore.isGuidance) router.push("/guidance/studentlist");
  else router.push("/student/dashboard");
}
</script>
