<template>
  <div class="w-full h-[80vh] flex justify-center items-center bg-[#fdfdfd]">
    <div
      v-if="userStore.loading"
      class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-center items-center lg:max-w-[60rem] flex-col"
    >
      <p>Loading...</p>
      <img id="loginpic" class="h-60" src="/seagull.gif" alt="fillerpic" />
    </div>
    <div
      v-if="!userStore.loading"
      id="book"
      class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]"
    >
      <div
        id="left"
        class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center lg:flex"
      >
        <img
          id="loginPic"
          class="h-60"
          src="https://pbs.twimg.com/profile_images/1478882427695210498/pSgQxw9V_400x400.jpg"
          alt="filler img"
        />
      </div>
      <div
        id="right"
        class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2"
      >
        <BaseLogin></BaseLogin>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogin from "../components/LoginComponents/BaseLogin.vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

document.title = "Login | SITHS Course Selection";
</script>

<style scoped>
#loginPic {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
