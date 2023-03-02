<script setup lang="ts">
import StudentLogin from '@/components/LoginComponents/StudentLogin.vue'
import { ref } from 'vue';

let login = ref(true)
let signup = ref(false)
let main = ref(false)

const loginClick = () => {
  login = ref(true)
  signup = ref(false)
  main = ref(false)
}
const signupClick = () => {
  signup = ref(true)
  login = ref(false)
  main = ref(false)
}
const backClick = () => {
  main = ref(true)
  signup = ref(false)
  login = ref(false)
}
</script>

<template>
    <div id="student" class="w-full h-screen flex justify-center items-center bg-[#fefefe]">
        <div id="book" class="mt-12 w-[70%] h-[80%] border-primary-s border-[10px] rounded-xl flex justify-between items-center">
            <div id="left" class="w-[50%] h-full border-zinc-400 border-r flex flex-col justify-center items-center space-y-6">
              <h1 class="text-4xl font-bold
              ">Student</h1>
                <button v-if="main" @click="loginClick" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Login
                </button>
                <button v-if="main" @click="signupClick" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Sign Up
                </button>
                <button v-if="!main" @click="backClick" class="bg-primary-s w-40 h-14 rounded text-xl font-semibold hover:bg-other-s">
                  Back
                </button>
            </div>
            <div id="right" class="w-[50%] h-full flex justify-center items-center">
                <img v-if="main"
                id="loginpic"
                src="https://images.squarespace-cdn.com/content/v1/58334b19579fb3628a7146d2/1479920558610-HKJIOE92XN0I2KH6RDFU/Seagull_04.gif?format=1500w"
                alt="fillerpic"
                />
                <div>
                  
                </div>
            </div>
        </div>
    </div>
</template>
