<template>
  <div class="min-h-screen flex flex-col items-center">
    <div
      class="mt-10 max-w-lg w-full bg-white sm:shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-16 sm:border-2 sm:border-primary-s text-center"
    >
      <h2 class="text-2xl font-bold text-secondary-s">Reset Your Password</h2>
      <p class="mt-4 text-primary-s">
        Enter your email to receive a reset link.
      </p>
      <form class="mt-6">
        <div class="mb-6">
          <input
            type="email"
            class="mt-1 w-full p-3 sm:p-4 md:p-5 border border-other-s rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-s"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-primary-s text-white py-4 sm:py-5 md:py-6 rounded-xl hover:bg-secondary-s transition"
        >
          Send Reset Link
        </button>
      </form>
      <p class="mt-6 text-primary-s">
        Remembered your password?
        <router-link
          to="/login"
          class="text-primary-s hover:text-secondary-s transition"
          >Login here</router-link
        >
      </p>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
</script>