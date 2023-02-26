<script setup lang="ts">
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()
let userOpen = ref(false)

const toggleUser = () => {
    if (!userOpen.value) {
        userOpen.value = true
    } else {
        userOpen.value = false
    }
}

onMounted(() => {
    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power2.out'
            }
        })

        tl.from('#link', {
            x: -100, 
            opacity: 0,
            stagger: 0.2,
        }, '-=0.2')

    document.querySelector('#user')?.addEventListener('click', () => {
        const tl2 = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'power1.out'
            }
        })

        tl2.from('#user-link', {
            y: -50, 
            opacity: 0,
            stagger: 0.15,
        }, '-=0.2')
    })
})
</script>

<template>
    <div id="menu" class="fixed inset-0 h-screen w-full  ease-in duration-200 md:hidden">
        <div id="overlay" class="absolute inset-0 w-full h-full bg-white opacity-100 -z-10"></div>
        <div v-if="userStore.isLoggedIn" class="h-full absolute top-48 left-16 flex flex-col justify-start items-start space-y-8 z-10">
            <RouterLink @click="$emit('e')" id="link" to="/survey"><p class="text-4xl">Survey</p></RouterLink>
            <RouterLink @click="$emit('e')" id="link" to="/courses"><p class="text-4xl">Courses</p></RouterLink>
            <div class="space-y-5" id="link">
                <p @click="toggleUser" id="user" class="text-4xl cursor-pointer">Jessie Yang</p>
                <div v-if="userOpen" class="flex flex-col justify-center items-start space-y-4 px-2">
                    <RouterLink @click="$emit('e')" id="user-link" to="/profile"><p class="text-3xl">Profile</p></RouterLink>
                    <RouterLink @click="$emit('e')" id="user-link" to="/settings"><p class="text-3xl">Settings</p></RouterLink>
                    <p id="user-link" @click="$emit('e')" class="text-3xl text-red-500 cursor-pointer">Logout</p>
                </div>
            </div>
        </div>
        <div v-else id="links" class="h-full absolute top-60 left-16 flex flex-col justify-start items-start space-y-8 z-10">
            <RouterLink @click="$emit('e')" id="link" to="/courses"><p class="text-4xl">Courses</p></RouterLink>
            <RouterLink @click="$emit('e')" id="link" to="/login"><p class="text-4xl">Login</p></RouterLink>
        </div>
    </div>
</template>