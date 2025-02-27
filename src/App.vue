<template>
  <PopUp :message="userStore.error" @cancel="userStore.error = ''" />
  <div
    class="fixed place-content-center items-center inset-x-0 bottom-0 w-full flex z-30 text-[#174616] bg-[#A8D480] h-[10%] lg:text-xl text-lg duration-[0.75s]"
    :class="surveyStore.submit || 'translate-y-full'"
  >
    <p>Your survey has been submitted</p>
  </div>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/Navbar/NavBar.vue";
import { useSurveyStore } from "./stores/survey";
import PopUp from "./components/Basic/PopUp.vue";
import { useUserStore } from "./stores/user";
import { ref, watch } from "vue";

const surveyStore = useSurveyStore();
const userStore = useUserStore();

watch(
  () => userStore.error,
  (value) => {
    if (!!value) setTimeout(() => (userStore.error = ""), 3000);
  }
);

const error = ref(true);
</script>
