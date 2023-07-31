<script setup lang="ts">
import GoogleIcon from "../icons/GoogleIcon.vue";
import BackArrow from "../icons/BackArrow.vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
</script>

<template>
  <div
    id="studentLogin"
    class="w-full h-full flex flex-col justify-center relative items-center"
  >
    <button
      @click="$router.go(-1)"
      class="absolute top-5 right-8 flex justify-center items-center space-x-1 lg:hidden"
    >
      <BackArrow />
      <p class="text-base text-zinc-600 font-semibold">Back</p>
    </button>
    <h1 class="text-4xl mb-4 font-bold">Login</h1>
    <GoogleLogin :callback="userStore.GoogleLogin" popup-type="TOKEN">
      <button
        class="flex justify-center items-center space-x-3 bg-zinc-300 w-60 h-14 rounded-md text-xl font-semibold hover:bg-zinc-200"
      >
        <GoogleIcon />
        <p class="font-bold text-lg">Sign in with Google</p>
      </button>
    </GoogleLogin>
  </div>
</template>
