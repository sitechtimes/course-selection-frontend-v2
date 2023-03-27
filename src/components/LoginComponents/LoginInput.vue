<script setup lang="ts">
defineProps({
    name: String,
    type: String,
    required: Boolean,
    label: String,
    id: String,

})
</script>

<template>
  <div class="relative z-0 w-full group overflow-visible">
    <input class="block py-2.5 px-2 mt-2.5 w-full text-sm text-zinc-900 bg-transparent rounded-md border border-solid border-zinc-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer" placeholder=" " :id="id" :name="name" :type="type" :required="required ? true : false" />
    <label :for="label" class="peer-focus:font-medium absolute text-sm px-1 mt-2.5 text-zinc-400 duration-200 transform -translate-y-8 translate-x-1 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:translate-x-1 peer-focus:z-20 peer-focus:px-1 overflow-visible">
      <slot></slot>
    </label>
  </div>
</template>