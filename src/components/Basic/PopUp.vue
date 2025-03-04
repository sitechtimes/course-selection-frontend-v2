<template>
  <div
    v-if="userStore.popup.message"
    :key="`popup-${userStore.popup.update}`"
    class="w-[60%] min-h-12 h-1 fixed z-[9999] rounded-sm left-[20%] top-[7%]"
    :style="{ backgroundColor: getColor[0] }"
  >
    <div
      class="flex items-center justify-between h-[calc(100%-.25rem)] text-white"
    >
      <p class="ml-3">{{ userStore.popup.message }}</p>
      <button class="ml-auto mr-3" @click="userStore.popup.message = ''">
        ✕
      </button>
    </div>
    <div
      class="w-full h-1 rounded-sm"
      :class="{ 'animate-width': userStore.popup.message }"
      :style="{ backgroundColor: getColor[1] }"
      @animationend="userStore.popup.message = ''"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { computed, watch } from "vue";
const userStore = useUserStore();

watch(
  () => userStore.popup.message,
  () => {
    console.log(userStore.popup.message);
  }
);

const getColor = computed(() =>
  userStore.popup.error ? ["#F44336", "#feb2b2"] : ["#4299e1", "#90cdf4"]
);
</script>
<style scoped>
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
.animate-width {
  animation: shrink 3s linear forwards;
}
</style>
