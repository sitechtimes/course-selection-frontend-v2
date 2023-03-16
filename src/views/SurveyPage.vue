<template>
    <section class="mt-[2rem] md:mt-[7rem] pb-9 text-center flex justify-center " > <!-- This one is the same for every year -->
        <div class="border-white border-solid border-[1rem] w-[70%] rounded-lg ring-[#A3C2DF] ring-[1rem] mt-[7rem]"  >
            <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
            <div class="flex">
            <section class="w-[45%] h-[20rem] flex flex-wrap items-center">
                <h2 class="font-bold text-3xl text-black">Rank Interested P.E. Courses</h2>
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <p class="text-[#606060] text-[2rem] ml-6">1.</p>
                </div> <!-- need a v-for in this part. -->
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <p class="text-[#606060] text-[2rem] ml-6">2.</p>
                </div>
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <p class="text-[#606060] text-[2rem] ml-6">3.</p>
                </div>
            </section>
            <section class="w-[45%] h-[20rem] flex flex-wrap items-center">
                <h2 class="font-bold text-3xl text-black">Interested Courses</h2>
                <div class="bg-[#D6EEFF] w-[22rem] h-[5rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl">
                    <p class="text-black text-[1.3rem]">General Physical Education</p>
                </div> <!-- need a v-for in this part. -->
                <div class="bg-[#D6EEFF] w-[22rem] h-[5rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl">
                    <p class="text-black text-[1.3rem]">Volleyball Elective</p>
                </div>
                <div class="bg-[#D6EEFF] w-[22rem] h-[5rem] flex justify-center items-center shadow-[4px_3px_3px_rgba(0,0,0,0.3)] rounded-2xl">
                    <p class="text-black text-[1.3rem]">Basketball Elective</p>
                </div>
            </section>
            </div>
            <backButton></backButton>
            <nextButton></nextButton>
        </div>
    </section>
</template>

<script setup lang="ts">
import pageOne from '../components/SurveyPageComponents/pages/returnToHome.vue';
import backButton from '../components/SurveyPageComponents/reusables/backButton.vue'
import nextButton from '../components/SurveyPageComponents/Reusables/nextButton.vue'
</script>

<style scoped> 

</style>