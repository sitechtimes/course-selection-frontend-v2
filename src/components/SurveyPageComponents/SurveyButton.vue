<template>
    <div v-for="choice in form" :key="choice" class="field">
        <input type="radio" class="w-6 h-6 m-2 shadow-2xl outline-1 checked:border-1 checked:border-black outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1]" :id="choice.id" :name="name" />
        <label :for="choice.id">Not sure</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    form: Array,
    name: String
})
</script>
