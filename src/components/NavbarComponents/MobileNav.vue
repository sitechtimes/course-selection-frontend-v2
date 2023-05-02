<script setup lang="ts">
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()

const redirect = () => {
    if (userStore.isLoggedIn === true) {
        if (userStore.userType === 'student') {
            return '/student/dashboard'
        } 
        if (userStore.userType === 'guidance') {
            return '/guidance/dashboard'
        }
    } else {
        return '/'
    }
}

const link = ref(null)

onMounted(() => {
    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power2.out'
            }
        })

        tl.from(link.value, {
            x: -100, 
            opacity: 0,
            stagger: 0.2,
        }, '-=0.2')
})
</script>

<template>
    <div id="menu" class="fixed inset-0 h-screen w-full  ease-in duration-200 md:hidden z-30">
        <div id="overlay" class="absolute inset-0 w-full h-full bg-white opacity-100 -z-10"></div>
        <div v-if="userStore.isLoggedIn" class="h-full absolute top-40 left-16 flex flex-col justify-start items-start space-y-8 z-10">
            <RouterLink @click="$emit('e')" ref="link" to="/"><p class="text-4xl" >Home</p></RouterLink>
            <RouterLink @click="$emit('e')" ref="link" to="/survey"><p class="text-4xl">Survey</p></RouterLink>
            <RouterLink @click="$emit('e')" ref="link" to="/"><p class="text-4xl">Courses</p></RouterLink>
            <p ref="link" @click="$emit('e'), userStore.isLoggedIn = false" class="text-4xl text-red-500 cursor-pointer">Logout</p>
        </div>
        <div v-else class="h-full absolute top-56 left-16 flex flex-col justify-start items-start space-y-8 z-10">
            <RouterLink @click="$emit('e')" ref="link" to="/"><p class="text-4xl">Home</p></RouterLink>
            <RouterLink @click="$emit('e')" ref="link" to="/courses"><p class="text-4xl">Courses</p></RouterLink>
            <RouterLink @click="$emit('e')" ref="link" to="/login"><p class="text-4xl">Login</p></RouterLink>
        </div>
    </div>
</template>