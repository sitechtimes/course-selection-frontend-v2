<template>
    <section class="mt-[7rem] md:text-left text-center"> <!-- This one is the same for every year -->
      <h1 class="text-[#37394F] text-4xl md:text-6xl font-bold text-center">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
      <div class="mt-[3rem] text-2xl md:text-4xl text-black md:ml-32"><label for="major">How many AP or college-level courses are you interested in taking?</label>
        <input type="text" id="major" class="mt-[2rem] h-[4rem] w-[90%] rounded-xl border-4 border-[#7D7D7D]"/>
      </div>
      <surveyButton :form="form" :question="question" />
      <nextButton class="mt-8 mb-8 absolute md:mt-16 right-10 md:right-32 md:bottom-32"></nextButton>
      <backButton class="mt-8 mb-8 absolute md:mt-16 left-10 md:left-32 md:bottom-32"></backButton>
    </section>
  </template>
  
  <script setup lang="ts">
  import nextButton from "../reusables/nextButton.vue";
  import backButton from "../reusables/backButton.vue";
  import surveyButton from "../reusables/surveyButton.vue";
  
  const form = [
    {
      id: "first-question",
      answer: "Yes",
    },
    {
      id: "second-question",
      answer: "No",
    },
    {
      id: "third-question",
      answer: "Not Sure",
    },
  ];
  const question = "Are you interested in a 8th academic period (1-9 schedule)?";
  </script>
  
  <style scoped></style>
  