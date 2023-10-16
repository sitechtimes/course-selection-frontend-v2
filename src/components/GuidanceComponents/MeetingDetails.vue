<template>
    <div v-if="show" class="flex flex-row m-auto mt-5 w-fit h-fit rounded-[1rem] border border-black">
      <div class="event flex flex-col">
        <div class="top flex-row flex items-center justify-between">
          <h2 class="h2 font-bold text-[2rem] m-8 mb-4">Meeting Details</h2>
          <button class="mt-5 mr-12" @click="toggleEvent">
          <svg class="x fill-current text-37394f transition duration-300 mt-4 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
//@ts-nocheck
import { ref, Ref, reactive, onMounted } from "vue";

const show: Ref<boolean> = ref(true);

function toggleEvent(){
  show.value=!show.value
}
</script>
