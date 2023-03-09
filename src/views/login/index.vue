<script setup lang="ts">

</script>

<template>
    <div id="student" class="w-full h-screen flex justify-center items-center bg-[#fefefe]">
        <div id="book" class="mt-12 w-11/12 max-w-[32rem] max-h-[45rem] h-4/5 border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]">
            <div id="left" class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center lg:flex">
                <img
                id="loginPic"
                class="h-60"
                src="https://pbs.twimg.com/profile_images/1478882427695210498/pSgQxw9V_400x400.jpg"
                alt="filler img"/>
            </div>
            <div id="right" class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2">
                <h1 class="text-4xl font-bold
              ">I am a...</h1>
                <RouterLink to="/login/student">
                <button class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Student
                </button>
              </RouterLink>
              <RouterLink to="/login/guidance">
                <button class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Counselor
                </button>
              </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
#loginPic {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>