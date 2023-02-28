<template>
    <section class=PageOne> <!-- This one is the same for every year -->
    <h1>______ Year Survey</h1>     <!-- Fill in ______ with the year -->
    <div class="pageOneDiv"><label for="major">What college majors are you considering upon graduation from high school?</label>
    <input type="text" id="major"/></div>
    <div class="pageOneDiv"><label for="career">What careers are you considering upon graduation?</label>
    <input type="text" id="career"/></div>
    <div class="pageOneDiv"><label for="afterSchool">List after-school activities such as clubs, teams, volunteer, or paid employment.</label>
    <input type="text" id="afterSchool"/></div>
    </section>
    <nextButton></nextButton>
</template>

<script setup lang="ts">
import nextButton from '../components/SurveyPageComponents/nextButton.vue';
</script>

<style scoped> 
    *, html, body {
        text-align: center;
        align-items: center;
        align-self: center;
    }
    h1 {
        margin-top: 5rem;    
        font-size: 3.5rem;
        color: #37394F;
    }
    label {
        font-size: 2.2rem;
    }
    input {
        border: solid 0.2rem #7D7D7D;
        border-radius: 0.4rem;
        width: 90rem;
        height: 4rem;
        margin-top: 2rem;
    }
    .pageOneDiv {
        margin-top: 3rem;
    }
</style>