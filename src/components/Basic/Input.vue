<template>
  <div class="relative w-full group overflow-visible text-left">
    <input
      @change="(event: Event) =>  $emit('update', (event.target as HTMLInputElement).value)"
      :value="value"
      class="block py-2.5 px-2 mt-2.5 w-full text-sm text-zinc-900 bg-transparent rounded-md border border-solid border-zinc-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
      placeholder=""
      :type="type"
      :required="required"
      :id="label"
    />
    <label
      :for="label"
      class="peer-focus:font-medium absolute top-[40%] text-md px-1 text-zinc-400 duration-200 transform -translate-y-8 translate-x-1 scale-75 z-[1000] origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[150%] peer-focus:translate-x-1 peer-focus:px-1 overflow-visible"
    >
      <slot></slot>
    </label>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  type: string;
  required: boolean;
  label: string;
  value: string;
}>();
defineEmits(["update"]);
</script>
