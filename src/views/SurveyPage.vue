<template>
  <!-- Page 1 (for everyone)
    <h1>______ Year Survey</h1>     Fill in ______ with the year
    <label for="major">What college majors are you considering upon graduation from high school?</label>
    <input type="text" id="major"/>
    <label for="career">What careers are you considering upon graduation?</label>
    <input type="text" id="career"/>
    <label for="afterSchool">List after-school activities such as clubs, teams, volunteer, or paid employment.</label>
    <input type="text" id="afterSchool"/> -->

  <!-- Page 2 (for everyone) -->
  <!-- <div class="survey">
    <h1 class="text-4xl font-semibold">______ Year Survey</h1>
    <fieldset class="flex flex-col">
      <label for="AP-interested" class=""
        >How Many AP or college-level courses are you interested in
        taking?</label
      >
      <input type="text" class="border-2 border-gray-500 rounded-sm w-4/5" id="AP-interested" />
    </fieldset>

    <h2>Are you interested in a 8th academic period (1-9 schedule)?</h2>
    <fieldset>
      <input type="radio" id="eighth-yes" name="eighth" />
      <label for="eighth-yes">Yes</label>
      <input type="radio" id="eighth-no" name="eighth" />
      <label for="eighth-no">No</label>
      <input type="radio" id="eighth-ns" name="eighth" />
      <label for="eighth-ns">Not sure</label>
    </fieldset>
  </div> -->
  <div class="mt-96 height-48">
    <input type="radio" class="w-6 h-6 m-2 shadow-2xl outline-1 checked:border-1 checked:border-black hover:checked:border-1 outline-black checked:outline-black checked:outline-1 checked:outline-offset-0 bg-[#EAEAEA] focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:hover:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1]" id="eighth-ns" name="eighth" />
  <label for="eighth-ns">Not sure</label>
    <input type="radio" class="ml-3 bg-[#EAEAEA] shadow-2xl form-radio focus:ring-transparent checked:bg-none checked:bg-[#6A9FD1] checked:focus:bg-[#6A9FD1]" id="eighth-sure" name="eighth" />
  <label for="eighth-sure">Sure</label>
  </div>
  
</template>

<style>
</style>

<script></script>
