<template>
  <div class="min-h-screen flex flex-col items-center">
    <div
      class="mt-10 max-w-lg w-full sm:shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-16 sm:border-2 sm:border-primary-s text-center">
      <h2 class="text-2xl font-bold text-secondary-s">Reset Your Password</h2>
      <p class="mt-4 text-primary-s bg-none">
        Enter your email to receive a reset link.
      </p>
      <div class="mt-6" @submit.prevent="userStore.resetPassword(email)">
        <form class="mb-6 flex flex-col">
          <Input type="email" label="email" required :value="email" @update="(newValue) => (email = newValue)" class="h-full">Email Address</Input>
        </form>
        <button type="submit"
          class="w-full bg-primary-s text-white py-2 sm:py-3 md:py-4 rounded-lg hover:bg-secondary-s transition duration-300">
          Send Reset Link
        </button>
      </div>
      <p class="mt-6 text-primary-s">
        Remembered your password?
        <RouterLink to="/login" class="text-primary-s hover:text-secondary-s transition duration-300 underline">Login
          here</RouterLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import Input from "../components/Basic/Input.vue";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const email = ref("");
</script>
<style scoped></style>
