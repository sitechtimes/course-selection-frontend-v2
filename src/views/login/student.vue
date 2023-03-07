<script setup lang="ts">
import StudentLogin from '../../components/LoginComponents/BaseLogin.vue';
import StudentSignup from '../../components/LoginComponents/StudentSignup.vue'
import BackBtnSmall from '../../components/Buttons/BackBtnSmall.vue';
import { ref } from 'vue';

let login = ref(false)
let signup = ref(false)
let main = ref(true)
</script>

<template>
    <div id="student" class="w-full h-screen flex justify-center items-center bg-[#fefefe]">
        <div id="book" class="mt-12 w-11/12 max-w-[32rem] max-h-[45rem] h-4/5 border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]">
          <div id="left" class="hidden w-1/2 h-full border-zinc-400 lg:border-r flex-col justify-center space-y-6 items-center lg:flex">
              <h1 v-if="login || signup" class="text-4xl font-bold
              ">Student</h1>
              <button v-if="login || signup" @click="$router.go(-1)" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold">
                Back
              </button>
                <img v-if="main"
                  id="loginpic"
                  class="h-60"
                  src="https://images.squarespace-cdn.com/content/v1/58334b19579fb3628a7146d2/1479920558610-HKJIOE92XN0I2KH6RDFU/Seagull_04.gif?format=1500w"
                  alt="fillerpic"
                />
            </div>
            <div id="right" class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2">
              <h1 v-if="main" class="text-4xl font-bold
              ">Student</h1>
                <button v-if="main" @click="login = true, main = false, signup = false" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Login
                </button>
                <button v-if="main" @click="signup = true, main = false, login = false" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Sign Up
                </button>
                <button v-if="main" @click="$router.go(-1)" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Back
                </button>
                <StudentLogin v-if="login">
                  <BackBtnSmall @click="main = true, login = false, signup = false" />
                </StudentLogin>
                <StudentSignup v-if="signup">
                  <BackBtnSmall @click="main = true, login = false, signup = false" />
              </StudentSignup>
            </div>
        </div>
    </div>
</template>
