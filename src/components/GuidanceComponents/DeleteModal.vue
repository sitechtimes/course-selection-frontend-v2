<template>
    <div v-if="showDetails"
        class="absolute left-[20%] right-[20%] top-[40%] bg-white flex flex-col m-auto mt-5 p-8 w-fit h-fit rounded-[1rem] border border-black">
        <h2 class="h2 font-bold text-[1.5rem] mb-2 text-left">Are you sure?</h2>
        <p class="my-4">Delete {{ meetingDetails.name }}'s meeting on {{ meetingDetails.date }}</p>
        <p class="mb-6">{{ meetingDetails.name }} will be notified of this change</p>
        <div class="flex flex-row items-center justify-end"> <button @click="toggleDetails"
                class="duration-300 font-bold px-4 py-2 rounded-2xl w-fit h-fit opacity-0.5:hover">Cancel</button>
            <button
                class="duration-300 font-bold bg-[#f28e8e] px-4 py-2 rounded-lg w-fit h-fit opacity-0.5:hover">Delete</button>
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref, Ref, defineProps } from "vue"

const showDetails: Ref<boolean> = ref(true);
defineProps({
  meetingDetails: {
    type: Object,
    required: true,
  },
});

const toggleDetails = () => {
    showDetails.value = !showDetails.value
}
</script>

  