<script setup lang="ts">

</script>

<template>
  <div class="h-screen w-full flex flex-row justify-center items-center">
    <div id="left" class="w-11/12 flex flex-col justify-center items-center text-center lg:items-start lg:text-left lg:w-4/5 space-y-6">
      <h1 id="heading" class="text-4xl font-bold lg:text-5xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, consequuntur!

      </h1>
      <h2 class="text-lg lg:text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus deleniti doloremque nisi at.
      </h2>
      <div class="flex justify-start items-center space-x-4">
        <RouterLink to="/login">
          <button class="bg-primary-s w-32 h-12 rounded text-lg font-semibold hover:bg-other-s">
          Sign Up
        </button>
      </RouterLink>
      <RouterLink to="/login">
        <button class="bg-primary-s w-32 h-12 rounded text-lg font-semibold hover:bg-other-s">
          Login
        </button>
      </RouterLink>
      </div>
    </div>
  </div>
</template>

