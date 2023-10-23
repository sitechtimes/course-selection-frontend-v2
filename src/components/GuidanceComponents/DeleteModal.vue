<template>
    <div v-if="showDetails"
        class="absolute left-[20%] right-[20%] top-[40%] bg-white flex flex-col m-auto mt-5 p-8 w-fit h-fit rounded-[1rem] border border-black">
        <h2 class="h2 font-bold text-[1.5rem] mb-2 text-left">Are you sure?</h2>
        <p class="my-4">Delete Bridget's meeting on 10/29/23</p>
        <div class="flex flex-row items-center justify-end"> <button @click="toggleDetails"
                class="duration-300 font-bold px-4 py-2 rounded-2xl w-fit h-fit opacity-0.5:hover">Cancel</button>
            <button
                class="duration-300 font-bold bg-[#f28e8e] px-4 py-2 rounded-lg w-fit h-fit opacity-0.5:hover">Delete</button>
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref, Ref } from "vue"
const showDetails: Ref<boolean> = ref(true);

const toggleDetails = () => {
    showDetails.value = !showDetails.value
}

</script>

<style>
.modal {
    position: fixed;
    top: 50%;
    left: 13%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
</style>
  