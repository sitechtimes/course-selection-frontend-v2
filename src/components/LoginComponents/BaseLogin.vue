<script setup lang="ts">
import GoogleIcon from '../icons/GoogleIcon.vue';
import BackArrow from '../icons/BackArrow.vue';

interface Props {
  route?: string
}
</script>

<template>
    <div id="studentLogin" class="w-full h-full flex flex-col justify-center items-center space-y-6 relative">
        <button @click="$router.go(-1)" class="absolute top-5 right-8 flex justify-center items-center space-x-1 lg:hidden">
          <BackArrow />
          <p class="text-base font-semibold">Back</p>
        </button>
        <h1 class="text-4xl font-bold">Login</h1>
        <button class="flex justify-center items-center space-x-3 bg-zinc-300 w-60 h-14 rounded text-xl font-semibold">
            <GoogleIcon />
            <p class="font-bold text-lg">Sign in with Google</p>
        </button>
        <div class="flex flex-col w-11/12 max-w-[21rem]">
            <label class="text-lg font-semibold" for="email" id="email"
            >Email</label
          >
          <input class="w-full p-2 border rounded-md border-zinc-400" type="email" name="email" />
        </div>
        <div class="flex flex-col w-11/12 mb-4 max-w-[21rem]">
            <label class="text-lg font-semibold" for="password"
            >Password</label
          >
          <input
            class="w-full p-2 border rounded-md border-zinc-400"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <RouterLink to="{{route}}">
        <button class="bg-zinc-300 w-32 h-12 rounded text-lg font-semibold hover:bg-zinc-200">
            Login
        </button>
        </RouterLink>
    </div>
</template>