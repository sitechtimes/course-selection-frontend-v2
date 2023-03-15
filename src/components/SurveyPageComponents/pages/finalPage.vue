<template>
    <section class="mt-[7rem] text-center"> <!-- This one is the same for every year -->
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="mt-[3rem] text-2xl md:text-4xl text-black"><label for="amountAP">Last notes to your guidance councelor:</label>
    <input type="text" id="amountAP" class="mt-[2rem] h-[4rem] w-[90%] lg:w-[80%] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <backButton class="mt-8 mb-8 absolute md:mt-16 left-10 md:left-32 bottom-32"></backButton>
    <button class="mt-8 mb-8 absolute md:mt-16 right-10 md:right-32 bottom-32 bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">
    Submit
    </button>
    </section>
</template>

<script setup lang="ts">
import nextButton from '../reusables/nextButton.vue';
import backButton from '../reusables/backButton.vue'
</script>

<style scoped> 

</style>