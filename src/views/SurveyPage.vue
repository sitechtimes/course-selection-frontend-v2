<template>
    <section class="text-center flex justify-center mt-72 " >
        <div class="border-white border-solid border-[1rem] w-[50%] rounded-lg ring-[#A3C2DF] ring-[0.5rem]">
            <h1 class="text-[#37394F] font-bold text-5xl mb-16">By pressing Confirm, you are confirming that this is your order of preference for the course(s) you selected.</h1>
            <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2.5rem] mr-8">
                Edit
            </button>
            <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2.5rem] ml-8">
                Confirm
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import pageOne from '../components/SurveyPageComponents/pages/pageOne.vue';
import backButton from '../components/SurveyPageComponents/backButton.vue'
</script>

<style scoped> 

</style>