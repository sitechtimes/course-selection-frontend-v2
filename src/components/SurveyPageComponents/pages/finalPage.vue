<template>
    <section class="md:mt-[4%] mt-[20%] lg:text-left text-center"> <!-- This one is the same for every year -->
    <h1 class="text-[#37394F] text-[225%] md:text-[375%] font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="mt-[3rem] lg:mt-[5%] text-2xl md:text-[240%] text-black lg:ml-[8%]">
            <label for="amountAP">Last notes to your guidance councelor:</label>
    <input type="text" id="amountAP" class="mt-[2rem] lg:mt-[2%] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <backButton class="mt-8 mb-8 absolute left-10 md:left-32 bottom-32"></backButton>
    <button class="mt-8 mb-8 absolute md:mt-16 right-10 md:right-32 bottom-32 bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">
    Submit
    </button>
    </section>
</template>

<script setup lang="ts">
import backButton from '../Reusables/backButton.vue'
</script>

<style scoped> 

</style>