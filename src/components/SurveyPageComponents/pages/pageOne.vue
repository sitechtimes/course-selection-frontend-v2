<template>
    <section class="mt-[7rem] md:text-left text-center"> <!-- This one is the same for every year -->
    <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="mt-[3rem] text-2xl md:text-4xl text-black md:ml-32"><label for="major">What college majors are you considering upon graduation from high school?</label>
    <input type="text" id="major" class="mt-[2rem] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <div class="mt-[3rem] text-2xl md:text-4xl text-black md:ml-32"><label for="career">What careers are you considering upon graduation?</label>
    <input type="text" id="career" class="mt-[2rem] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <div class="mt-[3rem] text-2xl md:text-4xl text-black md:ml-32"><label for="afterSchool">List after-school activities such as clubs, teams, volunteer, or paid employment.</label>
    <input type="text" id="afterSchool" class="mt-[2rem] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/></div>
    <nextButton class="mt-8 mb-8 md:absolute md:mt-16 md:right-32"></nextButton>
    </section>
</template>

<script setup lang="ts">
import nextButton from '../reusables/nextButton.vue';
</script>

<style scoped> 

</style>