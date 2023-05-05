<template>
    <section class="mt-[2rem] md:mt-[5rem] pb-9 text-center flex justify-center " > <!-- This one is the same for every year -->
        <div class="border-white border-solid border-[1rem] w-[65%] rounded-lg ring-[#A3C2DF] ring-[1rem] mt-[7rem]" >
            <img src="../../icons/Bookmark.png" alt="" class="w-16 mt-[-1rem] ml-6 absolute">
            <h1 class="text-[#37394F] text-4xl mt-8 md:text-6xl font-bold">______ Year Survey</h1>     <!-- Fill in ______ with the year -->
            <div class="flex place-content-between h-[28rem] mt-6">
            <section class="w-[45%] h-[100%] flex flex-wrap items-center justify-center place-content-around">
                <h2 class="font-bold text-3xl text-black">Rank Interested P.E. Courses</h2>
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <h2 class="text-[#606060] text-[2rem] ml-6">1.</h2>
                </div> <!-- need a v-for in this part. -->
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <h2 class="text-[#606060] text-[2rem] ml-6">2.</h2>
                </div>
                <div class="border-dashed border-[#7D7D7D] border-2 w-[22rem] h-[4rem] flex items-center rounded-2xl">
                    <h2 class="text-[#606060] text-[2rem] ml-6">3.</h2>
                </div>
            </section>
            <div class="border-solid border-black border-[1px] h-[103%]"></div>
            <section class="w-[45%] h-[100%] flex flex-wrap items-center justify-center place-content-around">
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
            <div class="flex justify-between">
                <backButton></backButton>
                <button class="bg-[#6A9FD1] text-white w-[30%] h-[3.5rem] text-[1.5rem] md:w-[10rem] md:text-[2rem]">
                    Confirm
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import backButton from '../reusables/backButton.vue'
</script>

<style scoped> 

</style>