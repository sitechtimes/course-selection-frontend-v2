<template>
    <section class="mt-[2rem] md:mt-[7rem] pb-9 text-center flex justify-center" > <!-- This one is the same for every year -->
        <div class="border-white border-solid border-[1rem] w-[70%] rounded-lg ring-[#A3C2DF] ring-[1rem] mt-[7rem]"  >
            <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
                <section>
                    <h2 class="font-bold text-3xl text-black">Rank Interested P.E. Courses</h2> <!-- This is gonna have to change based on the page you're on-->
                    <div class="border-dashed border-[#7D7D7D] border-2">

                    </div>
                </section>
                <section>
                    <h2 class="font-bold text-3xl text-black">Interested Courses</h2>
                    <div class="bg-[#D6EEFF] w-[5rem]">
                        <p class="text-black text-[1.4rem] ">General Physical Education</p>
                    </div>
                </section>
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