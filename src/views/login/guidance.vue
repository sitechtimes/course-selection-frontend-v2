<script setup lang="ts">
import BaseLogin from '../../components/LoginComponents/BaseLogin.vue';
</script>

<template>
    <div id="guidance" class="w-full h-screen flex justify-center items-center bg-[#fff]">
        <div id="book" class="mt-12 w-11/12 max-w-[32rem] max-h-[45rem] h-4/5 border-primary-g border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]">
          <div id="left" class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center flex-col space-y-6 lg:flex">
            <h1 class="text-4xl font-bold
              ">Guidance</h1>
              <button @click="$router.go(-1)" class="bg-primary-g w-32 h-12 rounded-md text-lg font-semibold hover:bg-[#d5debf]">
                Back
              </button>
          </div>
            <div id="right" class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2">
              <BaseLogin/> 
            </div>
        </div>
    </div>
</template>
