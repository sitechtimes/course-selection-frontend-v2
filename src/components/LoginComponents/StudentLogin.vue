<template>
    <section id="login-container"
        class="w-[90%] lg:w-[75%] m-auto mt-[25%] lg:mt-[6%] lg:h-[35rem] rounded-2xl flex flex-col lg:flex-row border-solid border-8 shadow-xl border-blue-200 ">
        <div id="login-display" class="text-center lg:border-r-4 border-solid border-black lg:flex-[50%] flex flex-col items-center justify-center">
            <h1 class="p-8 lg:mt-40 text-2xl lg:text-4xl font-semibold text-center">Student</h1>
            <button id="back-button" class="lg:mt-[5%] transition duration-300 text-xl rounded-lg lg:text-2xl m-auto w-60 p-5 font-bold text-center bg-[#E9F0FA] hover:bg-[#c1d6eb]"
                @click="goBack">Back</button>
        </div>
        <div id="login" class="flex-[50%]">
            <h3 class="mt-8 text-2xl lg:text-4xl font-semibold text-center">Log In</h3>
            <button id="googleSignIn"
                class="transition duration-300 rounded-lg text-gray-700 bg-blue-50 px-4 py-2 m-auto block flex-row mt-5 mb-4 lg:mb-2 hover:bg-[#c1d6eb]">
                <div class="inner flex flex-row items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    <!-- <svg class="1-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg> -->
                    <span class="font-bold p-3 flex items-center text-base lg:text-xl ml-2">Sign in with Google</span>
                </div>
            </button>
            <h2 class="text-xl text-center">or</h2>
            <div class="flex flex-col items-center text-left">
                <label class="text-lg lg:text-xl mt-4 block font-bold" for="email" id="email">Email</label>
                <input class="w-[90%] lg:w-[80%] border-2 border-black border-solid mb-4 mt-4 rounded-lg p-2" type="email" name="email">
                <label class="text-lg lg:text-xl mt-4 block font-bold" for="password">Password</label>
                <input class="w-[90%] lg:w-[80%] border-2 border-black border-solid mb-4 mt-4 rounded-lg input p-2" type="password" name="password" id="password" />
                <h3 class="w-1/2 m-auto mt-1 lg:font-bold text-center">Forgot Password?</h3>
                <button id="loginButton"
                    @click="signIn"
                    class="transition duration-300 text-xl text-white font-bold w-32 mt-4 mb-4 py-2 bg-blue-500 rounded-md text-center hover:bg-[#c1d6eb]">Login</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
    router.go(-1);
}
async function signIn() {
    alert('User clicked login button.')
}
</script>