<script setup lang="ts">
import GoogleIcon from '../icons/GoogleIcon.vue';
import BackArrow from '../icons/BackArrow.vue';
</script>

<template>
    <div id="studentSignup" class="w-full h-full flex flex-col justify-center items-center space-y-6 relative">
      <slot></slot>
        <h1 class="text-4xl font-bold">Sign Up</h1>
        <button class="flex justify-center items-center space-x-3 bg-zinc-300 w-60 h-14 rounded text-xl font-semibold">
            <GoogleIcon />
            <p class="font-bold text-lg">Sign up with Google</p>
        </button>
        <div class="flex flex-col">
            <label class="text-lg font-semibold" for="email" id="email"
            >Email</label
          >
          <input class="w-[22rem] p-2 border rounded-md border-zinc-400" type="email" name="email" />
        </div>
        <div class="flex flex-col">
            <label class="text-lg font-semibold" for="password"
            >Password</label
          >
          <input
            class="w-[22rem] p-2 border rounded-md border-zinc-400"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold" for="retype"
            >Retype Password</label
          >
          <input
            class="w-[22rem] p-2 border rounded-md border-zinc-400"
            type="password"
            name="retype"
            id="retype"
          />
        </div>
        <button class="bg-zinc-300 w-32 h-12 rounded text-lg font-semibold hover:bg-other-s">
            Sign Up
        </button>
    </div>
</template>