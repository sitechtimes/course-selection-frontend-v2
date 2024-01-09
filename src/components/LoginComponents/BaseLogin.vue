<template>
    <div id="studentLogin" class="w-full h-full flex flex-col justify-center relative items-center">
        <button @click="$router.go(-1)" class="absolute top-5 right-8 flex justify-center items-center space-x-1 lg:hidden">
            <BackArrow />
            <p class="text-base text-zinc-600 font-semibold">Back</p>
        </button>
        <h1 class="text-4xl mb-4 font-bold">Login</h1>
        <div class="flex flex-col w-11/12 max-w-[21rem] space-y-5 rounded-md">
            <LoginInput id="email" label="email" name="email" type="email" required :value="username"
                @update="newValue => username = newValue">Username</LoginInput>
            <LoginInput id="password" label="password" name="password" type="password" required :value="password"
                @update="newValue => password = newValue" @keyup.enter="userStore.EmailLogin(username, password)">Password
            </LoginInput>

        </div>

        <button id="button" class="bg-zinc-300 w-32 h-12 mt-4 rounded-md text-lg font-semibold hover:bg-zinc-200"
            @click="userStore.EmailLogin(username, password)">
            Login
        </button>
    </div>
</template>
  
<script setup lang="ts">
import BackArrow from "../icons/BackArrow.vue";
import LoginInput from "./LoginInput.vue";
import { useUserStore } from "../../stores/user";
import { ref } from "vue"
const userStore = useUserStore();

const username = ref("")
const password = ref("")
</script>
