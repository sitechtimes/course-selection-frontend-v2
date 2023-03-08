<template>
    <section class="mt-[7rem] text-center justify-center" > <!-- This one is the same for every year -->
        <div class="border-white border-solid border-[1rem] w-[70%] rounded-lg ring-[#D9E9F9] ring-[1.5rem] mt-[7rem]" >
            <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold">Thank you for submitting!</h1>
            <h2 class="text-3xl">Your guidance counselor will be reaching out to you.</h2>
            <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem] mb-[2rem]">
                Return to Home
            </button>
        </div>
        <h1 class="mt-3">&nbsp</h1> <!-- I did this because otherwise the bottom of the ring doesn't show. I am unsure as to how to show the bottom of the ring without having something exist underneath it. Margin is there to make sure there's emough space for the ring to show. -->
    </section>
</template>

<script setup lang="ts">
import pageOne from '../components/SurveyPageComponents/pages/pageOne.vue';
import backButton from '../components/SurveyPageComponents/backButton.vue'
</script>

<style scoped> 

</style>