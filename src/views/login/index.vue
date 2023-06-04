<script setup lang="ts">
import BaseLogin from '../../components/LoginComponents/BaseLogin.vue';
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router'
import { watch } from 'vue';

const userStore = useUserStore()
const router = useRouter()

watch(() => userStore.loading, (newResponse) => {
  if(!newResponse) {
    if(userStore.userType === 'student') {
      router.push('/student/dashboard')
    } else if(userStore.userType === 'guidance') {
      router.push('/guidance/dashboard') 
    } else {
      console.log('error?')
    }
  }
})
</script>

<template>
    <div class="w-full h-[80vh] flex justify-center items-center bg-[#fdfdfd]">
        <div v-if="userStore.loading" class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-center items-center lg:max-w-[60rem] flex-col">
          <p>Loading...</p>
          <img
                  id="loginpic"
                  class="h-60"
                  src="https://images.squarespace-cdn.com/content/v1/58334b19579fb3628a7146d2/1479920558610-HKJIOE92XN0I2KH6RDFU/Seagull_04.gif?format=1500w"
                  alt="fillerpic"
                />
        </div>
        <div v-if="!userStore.loading" id="book" class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]">
            <div id="left" class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center lg:flex">
                <img
                id="loginPic"
                class="h-60"
                src="https://pbs.twimg.com/profile_images/1478882427695210498/pSgQxw9V_400x400.jpg"
                alt="filler img"/>
            </div>
            <div id="right" class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2">
                <!-- <h1 class="text-4xl font-bold
              ">I am a...</h1>
                <RouterLink to="/login/student">
                <button class="bg-primary-s w-40 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
                  Student
                </button>
              </RouterLink>
              <RouterLink to="/login/guidance">
                <button class="bg-primary-s w-40 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
                  Counselor
                </button>
              </RouterLink> -->
              <BaseLogin></BaseLogin>
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