<template>
    <div v-if="showDetails">
        <h2>Dear {{ meetingDetails.name }}</h2>
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