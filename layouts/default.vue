<template>
  <div>
    <header>
      <nav class="w-full top-0 h-[13vh] md:h-[15vh] flex justify-between items-center px-8 md:px-12 lg:px-16 overflow-visible">
        <div @click="router.push('/')" class="cursor-pointer">
          <p class="text-lg sm:text-xl md:text-2xl font-semibold z-50 hover:text-gray-600 flex sm:flex">Course Selection</p>
        </div>
        <div class="hidden justify-center items-center space-x-12 md:flex">
          <a href="https://siths-catalog.netlify.app/" target="_blank" rel="noopener">
            <p>Courses</p>
          </a>
          <NuxtLink to="/login">
            <p class="text-base hover:text-gray-500">Login</p>
          </NuxtLink>
        </div>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
