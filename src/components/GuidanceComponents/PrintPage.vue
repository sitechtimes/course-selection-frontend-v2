<template>
    <div class="">
        <h1>Dear {{ meetingDetails.name}}</h1>
    </div>
</template>

<script>
import { useGuidanceStore } from "../../stores/guidance";
import { ref, defineProps } from "vue";

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