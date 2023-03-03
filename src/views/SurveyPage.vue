<template>
    <section class="mt-[7rem] text-center"> <!-- This one is the same for every year -->
    <h1 class="text-[#37394F] text-6xl">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="mt-[3rem] text-4xl"><label for="major">What college majors are you considering upon graduation from high school?</label>
    <input type="text" id="major" class="mt-[2rem] h-[4rem] w-[90rem] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <div class="mt-[3rem] text-4xl"><label for="career">What careers are you considering upon graduation?</label>
    <input type="text" id="career" class="mt-[2rem] h-[4rem] w-[90rem] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <div class="mt-[3rem] text-4xl"><label for="afterSchool">List after-school activities such as clubs, teams, volunteer, or paid employment.</label>
    <input type="text" id="afterSchool" class="mt-[2rem] h-[4rem] w-[90rem] rounded-xl border-4 border-[#7D7D7D]"/></div>
    </section>
    <nextButton></nextButton>
</template>

<script setup lang="ts">
import nextButton from '../components/SurveyPageComponents/nextButton.vue';
</script>

<style scoped> 

</style>