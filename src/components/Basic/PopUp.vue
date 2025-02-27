<template>
  <div
    id="popUp"
    :class="`${color ?? 'bg-red-500'} ${message.length === 0 ? 'hidden' : ''}
    } w-[60%] min-h-12 h-1 fixed z-[9999] left-[20%] top-[7%] transform -translate-y-1/2 `"
  >
    <div
      class="flex items-center justify-between h-[calc(100%-.25rem)] text-white"
    >
      <p class="ml-3">{{ message }}</p>
      <button class="ml-auto mr-3" @click="$emit('cancel', true)">✕</button>
    </div>
    <div
      :class="`${
        message.length === 0 ? '' : 'animate-width'
      } w-full h-1 bg-red-300 rounded-sm`"
    ></div>
  </div>
</template>
<script setup lang="ts">
defineEmits(["cancel"]);
defineProps<{ color?: string; message: string }>();
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
